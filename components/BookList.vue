<template>
  <div class="book-list row mt-3">
    <template v-if="books.length">
      <div class="book-list__item col-12 col-sm-6 col-md-4 mb-3" 
           v-for="book in books" 
           :key="'book' + book.uid">
          <BookItem :book="book"/>
      </div>
      <Pagination/>
    </template>
    <template v-else>
      Books were not found        
    </template>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  props: ['books']
}
</script>
