<template>
  <div class="book">
    Book detail {{ this.$route.params.id }}
    <!-- <Book :book="{}"/> -->
  </div>
</template>

<script>
export default {
  mounted () {
    console.log('mounted: book id', this.$route.params.id);
  }
}
</script>
