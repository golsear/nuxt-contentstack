<!-- Please remove this file from your project -->
<template>
  <div class="book">
    <div>Book component</div>
    <div>Book id: {{ $route.params.id }}</div>
  </div>
</template>

<script>
export default {
  name: 'Book'
}
</script>
