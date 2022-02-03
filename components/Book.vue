<template>
  <div v-if="book" class="book">
    <div><img :src="book.imageUrl + '?width=100'"/></div>
    <div>{{ book.title }}</div>
    <div>{{ book.authors }}</div>
    <div v-html="book.description"></div>
    <div>{{ book.number_of_pages }}</div>
    <a :href="book.link.href" target="_blank">{{ book.link.title }}</a>
    <NuxtLink :to="{ path: book.uid }">Detail</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: ['book']
}
</script>
