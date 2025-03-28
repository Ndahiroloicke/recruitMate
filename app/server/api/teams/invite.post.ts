import { serverSupabaseClient } from '#supabase/server'
import { z } from 'zod'
import { getMe } from '~/server/utils/me'
import { createApiResponse } from '~/server/utils/useHelper'

const schema = z.object({
  emails: z.array(z.string().email()),
  teamId: z.string().or(z.number()).transform(val => Number(val)),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log('Received request body:', body)
    
    const { emails, teamId } = schema.parse(body)
    console.log('Parsed data:', { emails, teamId })
    
    const client = await serverSupabaseClient(event)
    const me = await getMe(event)

    if (!me.data) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized',
      })
    }

    // Get the team using the numeric ID
    const { data: team, error: teamError } = await client
      .from('teams')
      .select('*')
      .eq('id', teamId)
      .single()

    if (teamError || !team) {
      throw createError({
        statusCode: 404,
        message: 'Team not found',
      })
    }

    // Create invitations using auth_id (UUID) instead of numeric id
    const { data: invitations, error: inviteError } = await client
      .from('invited_members')
      .insert(emails.map(email => ({
        email,
        inviter: me.data.auth_id, // Use auth_id which is a UUID
        invite_date: new Date().toISOString(),
      })))
      .select()

    if (inviteError) {
      throw createError({
        statusCode: 400,
        message: `Failed to create invitations: ${inviteError.message}`
      })
    }

    // Create team members
    const { error: memberError } = await client
      .from('teams_members')
      .insert(emails.map(email => ({
        team_id: team.id,
        role: 'member',
        permissions: {
          key: "member",
          name: "Member",
          access: {
            read: true,
            view: true,
            write: false,
            delete: false
          }
        }
      })))

    if (memberError) {
      // If team members creation fails, cleanup the invitations
      await client
        .from('invited_members')
        .delete()
        .in('id', invitations.map((inv: { id: number }) => inv.id))

      throw createError({
        statusCode: 400,
        message: `Failed to create team members: ${memberError.message}`
      })
    }

    return createApiResponse(200, { 
      success: true, 
      invitations
    })
  } catch (error: any) {
    console.error('API error:', error)
    
    // Handle timeout errors specifically
    if (error.name === 'TimeoutError' || error.cause?.name === 'TimeoutError') {
      throw createError({
        statusCode: 408,
        message: 'Request timed out. Please try again.'
      })
    }
    
    throw error
  }
}) 