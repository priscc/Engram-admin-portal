<template>
  <v-container class="d-flex flex-column">


    <AddContent />


  </v-container>

</template>

<script>
import AddContent from '@/components/AddContent.vue'

export default {
  name: 'Home',
  
  components: {
    AddContent
  }
}
</script>
