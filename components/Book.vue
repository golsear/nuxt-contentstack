<template>
  <div class="book">
    <div v-if="imageUrl"><img :src="imageUrl + '?width=100'"/></div>
    <div v-if="title">{{ title }}</div>
    <div v-if="authors">{{ authors }}</div>
    <div v-html="description" v-if="description"></div>
    <a :href="link.href" target="_blank">{{ link.title }}</a>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: ['bookData'],
  data () {
    const bookData = this.bookData;
    
    return {
      imageUrl: bookData.image.url,
      title: bookData.book_title,
      //authors: bookData.authors,
      description: bookData.description,
      link: bookData.link
    }
  },
  computed: {
    authors: function () {
      console.log(this.bookData.authors);
      return 'Okk';
    }
  }
}
</script>
