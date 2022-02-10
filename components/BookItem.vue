<template>
  <div v-if="book" class="book-item d-flex flex-column">
    <NuxtLink :to="{ path: book.uid }"
              class="mb-1">
      <img :src="book.imageUrl + '?width=100&height=100&fit=crop'"/>
    </NuxtLink>
    <NuxtLink :to="{ path: book.uid }">{{ book.title }}</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: ['book']
}
</script>
