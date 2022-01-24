<template>
  <div class="book-list">
    <div v-for="book in books" 
         :key="'book' + book.id">
      {{ book.title }}
      <NuxtLink :to="{ path: 'book/' + book.id }">
        Book landing page
      </NuxtLink>
    </div>
    <Pagination/>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  props: ['books'],
  mounted () {
    console.log(this.books);
  }
}
</script>
