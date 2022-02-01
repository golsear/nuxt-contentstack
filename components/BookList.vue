<template>
  <div class="book-list">
    <template v-if="books.length">
      <div v-for="book in books" 
         :key="'book' + book.uid">
          <Book :book="book"/>
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
  props: ['books']
}
</script>
