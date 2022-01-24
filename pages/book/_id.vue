<template>
  <div class="book">
    <Book/>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log('mounted: book id', this.$route.params.id);
  }
}
</script>
