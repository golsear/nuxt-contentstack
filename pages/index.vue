<template>
  <div>
    <BookList :books="books"/>
  </div>
</template>

<script>
import Stack from "../Utils/contentstack";
import * as Utils from "@contentstack/utils";
import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'IndexPage',
  computed: {
    ...mapGetters([
      'books',
    ]),
    /* bookList: function () {
      let self = this;
      let items = [];
      if(self.all_book){
        Utils.jsonToHTML({ entry: this.all_book.items, paths: ['description', 'description.json']})
        items = this.all_book.items.slice();  
      }
      
      return items;
    } */
  },
  /* async asyncData({$axios}) {
    //let books = [];
    let bookData = {}; 

    try {
        const data = await Stack.getEntryByUid({
          contentTypeUid: 'book',
          entryUid: 'blt856591f28b525834',
          referenceFieldPath: [`authors`],
          jsonRtePath: ['description', 'book.description'],
        });

        bookData = data[0];
        
        
    } catch (err) {
        console.error('Something was wrong: ', err);
    }
    
    return {
      //books,
      bookData
    }
  }, */
  async created() {
    await this.getBooks();
  },
  /* mounted: function () {
    console.log(this.$store.state)
  }, */
  methods: {
    ...mapActions([
      'getBooks'
    ]),
  }
}
</script>
