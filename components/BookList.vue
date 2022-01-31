<template>
  <div class="book-list">
    {{ this.$store.state.bookList }}
    <template v-if="books.length">
      <div v-for="book in books" 
         :key="'book' + book.id">
          <Book :book-data="book"/>
          <NuxtLink :to="{ path: 'book/' + book.id }">More</NuxtLink>
      </div>
    </template>
    <template v-else>
      Books were not found        
    </template>
    <Pagination/>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  props: ['books'],
  mounted () {
    console.log('book list: ', this.books, this.$store.state.bookList);
  }
}
</script>
