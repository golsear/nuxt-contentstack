<template>
  <div class="book">
    <div v-if="imageUrl"><img :src="imageUrl"/></div>
    <div v-if="title">{{ title }}</div>
    <div v-if="authors">{{ authors }}</div>
    <div v-if="description">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: ['bookData'],
  data () {
    const bookData = this.bookData;
    
    return {
      imageUrl: bookData.hasOwnProperty('imageUrl') ? bookData.imageUrl : null,
      title: bookData.hasOwnProperty('title') ? bookData.title : null,
      authors: bookData.hasOwnProperty('authors') ? bookData.authors : null,
      description: bookData.hasOwnProperty('description') ? bookData.description : null
    }
  }
}
</script>
