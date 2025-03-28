<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const schema = toTypedSchema(z.object({
  email: z.string().email('Please enter a valid email'),
}))

const form = useForm({
  validationSchema: schema,
})

const { handleSubmit } = form

const emit = defineEmits(['close'])

async function onSubmit(values: { email: string }) {
  try {
    const { error } = await useFetch('/api/teams/invite', {
      method: 'POST',
      body: {
        email: values.email,
      },
    })

    if (error.value) throw error.value

    emit('close')
  }
  catch (err) {
    console.error('Failed to send invitation:', err)
  }
}
</script>

<template>
  <DialogContent class="invite-modal">
    <DialogHeader>
      <DialogTitle>Invite Team Member</DialogTitle>
      <DialogDescription>
        Send an invitation email to add someone to your team
      </DialogDescription>
    </DialogHeader>

    <Form @submit="handleSubmit(onSubmit)" class="invite-modal__form">
      <FormField name="email">
        <FormLabel>Email address</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Enter email address" />
        </FormControl>
        <FormMessage />
      </FormField>

      <Button type="submit" class="invite-modal__submit">
        Send Invitation
      </Button>
    </Form>
  </DialogContent>
</template> 