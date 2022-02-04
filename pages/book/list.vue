<template>
  <div class="container page">
    <div class="row page__banner">
      <div class="col-12">
        <img src=""/>
      </div>
    </div>
    <h1 class="page__title">{{ page.title }}</h1>
    <div class="page__introduction" v-html="page.introduction"></div>
    <div class="page__body" v-html="page.body"></div>
    <template v-if="books.length">
      <BookList :books="books"/>
    </template>
    <template v-else>
      Books are not found
    </template>
  </div>
</template>

<script>
import Stack from "../../Utils/contentstack";
import { mapGetters } from 'vuex';

export default {
  name: 'BookListPage',
  async asyncData({ store, route }) {
    const [books, pageData] = await Promise.all([ 
      store.dispatch('setBooks').then(() => {
        return store.getters.getBooks;
      }),
      Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl: `${route.fullPath}`,
        jsonRtePath: ['body'],
      })
    ]);

    return {
      books,
      page: pageData[0]
    }
  },
  computed: {
    ...mapGetters({
      storedBooks: 'getBooks'
    })
  },
  watch: {
    storedBooks(books) {
      this.books = books;
    }
  },
  head(data) {
    return {
      title: data.page.title,
      meta: [
        {
          title: data.page.title,
          name: data.page.seo.title,
          description: data.page.seo.description,
          keywords: data.page.seo.keywords,
        },
      ],
    }
  },
}
</script>
