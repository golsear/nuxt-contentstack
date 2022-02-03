<template>
  <div v-if="book" class="book">
    <NuxtLink :to="{ path: book.uid }">
      <img :src="book.imageUrl + '?width=100'"/>
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
