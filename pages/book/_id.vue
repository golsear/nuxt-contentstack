<template>
  <div>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
    Book landing page id: {{ $route.params.id }}
  </div>
</template>

<script>
export default {
  mounted () {
    console.log('mounted', this.$route.params.id);
  }
}
</script>
