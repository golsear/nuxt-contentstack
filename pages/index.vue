<template>
  <div>
    <BookList :books="books"/>
  </div>
</template>

<script>
import { Stack } from "../Utils/contentstack";

export default {
  name: 'IndexPage',
  async asyncData({$axios}) {
    let books = [];

    try {
        //const data = await Stack.ContentType('book').Entry('blt856591f28b525834').toJSON().fetch();
        //const list = await Stack.getEntries({contentTypeUid:'blog_post',referenceFieldPath: [`author`, `related_post`], jsonRtePath:["body"]})
        const resp = await $axios.get('https://37f1d601-e3aa-43a3-96d8-007912c25b5e.mock.pstmn.io/success/books');
        
        books = resp.data;
    } catch (err) {
        console.error('Something was wrong: ', err);
    }
    
    return {
      books
    }
  },
   mounted () {
      // TODO: store books
      console.log('books', this.books);
  },
}
</script>
