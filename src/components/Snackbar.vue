<script>
export default {
    props: ['Message'],
}
</script>

<template>
    <v-snackbar
      :timeout="2000"
      color="primary"
      variant="tonal"
      location="top right" 
    >

      {{ Message }}
    </v-snackbar>
</template>