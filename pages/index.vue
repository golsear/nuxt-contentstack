<template>
  <div>
    <BookList :books="books"/>
    

    {{ books }}

    <button v-if="showMoreEnabled" @click="showMore">Show more</button>
    
  </div>
</template>

<script>
import Stack from "../Utils/contentstack";
import * as Utils from "@contentstack/utils";
import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'IndexPage',
  computed: {
    ...mapGetters([
      'books',
    ]),
    bookList: function () {
      let self = this;
      let items = [];
      if(self.all_book){
        Utils.jsonToHTML({ entry: this.all_book.items, paths: ['description', 'description.json']})
        console.log('ent', this.all_book.items);
        items = this.all_book.items.slice();  
      }
      
      
      
      return items;
    }
  },
  async asyncData({$axios}) {
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
        
        //bookData = data[0]
        /* const bookQuery = Stack.ContentType('book').Query();
        bookQuery.includeOwner().toJSON();
        const data = bookQuery.where("uid", 'blt856591f28b525834').find();
        
        data.then(
          (result) => {
            console.log('result', result);

            Utils.jsonToHTML({
                entry: result,
                paths: ['description', 'book.description'],
                //renderOption,
            });

            console.log('result', result[0]);
          },
          (error) => {
            reject(error);
          }
        ); */

        //Stack.ContentType('book').Entry('blt856591f28b525834').toJSON().fetch();
        //const list = await Stack.getEntries({contentTypeUid:'blog_post',referenceFieldPath: [`author`, `related_post`], jsonRtePath:["body"]})
        const resp = await $axios.get('https://37f1d601-e3aa-43a3-96d8-007912c25b5e.mock.pstmn.io/success/books');
        
        //books = resp.data;
    } catch (err) {
        console.error('Something was wrong: ', err);
    }
    
    return {
      //books,
      bookData
    }
  },
  data: () => ({
    skip: 0,
    limit: 2,
    showMoreEnabled: true,
  }),
  async created() {
    await this.getBooks({
      skip: 0,
      limit: 2
    });
  },
  methods: {
    ...mapActions([
      'getBooks',
      'setSkip'
    ]),

    async showMore () {
      this.setSkip();
      this.getBooks();
      //this.$store.dispatch('updateBookList', {b: 2});
      //let self = this;
      //this.skip += 2;
       
      /* const response = await this.$apollo.query({
        query: ALL_BOOK_QUERY,
        variables: {
          limit: this.limit,
          skip: this.skip,
        }
      }) */

      /* this.$apollo.queries.all_book.refetch({
         limit: this.limit,
          skip: this.skip,
      }); */

      // Fetch more data and transform the original result
      /* this.$apollo.queries.all_book.fetchMore({
        // New variables
        variables: {
          limit: this.limit,
          skip: this.skip,
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          console.log('prev', previousResult);
          console.log('next', fetchMoreResult);
          const all_book = fetchMoreResult.all_book
          //const hasMore = fetchMoreResult.all_book.hasMore

          //this.showMoreEnabled = hasMore

          return {
            all_book: all_book,
           
            
          }
        },
      }) */
    },
  }
}
</script>
