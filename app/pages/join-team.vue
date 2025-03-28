<script setup lang="ts">
const route = useRoute()
const token = route.query.token as string
const client = useSupabaseClient()

const { data, error } = await useFetch(`/api/teams/join`, {
  method: 'POST',
  body: { token },
})

// If user is not logged in, redirect to sign up
const user = useSupabaseUser()
if (!user.value) {
  const redirectTo = `/join-team?token=${token}`
  navigateTo(`/auth/signup?redirect=${encodeURIComponent(redirectTo)}`)
}

// Handle invitation acceptance
if (error.value) {
  // Show error message
} else {
  // Redirect to team dashboard
  navigateTo(`/app/${data.value.teamId}/dashboard`)
}
</script> 