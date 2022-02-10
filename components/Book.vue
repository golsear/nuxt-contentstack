<template>
  <div v-if="book" class="book row">
    <div class="col-12 col-sm-4 mb-3 mb-sm-0">
      <img class="book__image" 
           :src="book.imageUrl + '?width=500'"/>
    </div>
    <div class="col-12 col-sm-8">
      <h1 class="book__title mb-3">{{ book.title }}</h1>
      <div class="book__author mb-1">Author(s): {{ book.authors }}</div>
      <div class="book__pages mb-3">Pages: {{ book.number_of_pages }}</div>
      <div class="book__description mb-3" v-html="book.description"></div>
      <a :href="book.link.href" 
         target="_blank"
         class="book__link btn btn-primary">{{ book.link.title }}</a>
      <NuxtLink :to="{ path: '/book/list' }" 
                class="btn btn-outline-primary ms-3">Back to list</NuxtLink>   
    </div>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: ['book']
}
</script>
