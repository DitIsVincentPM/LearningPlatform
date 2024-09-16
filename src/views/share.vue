<template>
  <div>Processing your share link...</div>
</template>

<script>
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

export default {
  async created() {
    const token = this.$route.params.token;
    const toast = useToast();
    const router = useRouter();

    try {
      const response = await fetch(`http://localhost:8080/api/share/${token}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const message = await response.text();

      if (response.ok) {
        toast.add({severity: 'success', summary: 'Success', detail: message});
      } else {
        toast.add({severity: 'error', summary: 'Error', detail: `Error: ${message}`});
      }

      // Navigate back to the cards page
      router.push({name: 'Cards'});

    } catch (error) {
      console.error('Error:', error);
      toast.add({severity: 'error', summary: 'Error', detail: 'Failed to process share link'});
      // Navigate back to the cards page
      router.push({name: 'Cards'});
    }
  }
}
</script>
