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
    bookList: function () {
      let self = this;
      let items = [];
      if(self.all_book){
        Utils.jsonToHTML({ entry: this.all_book.items, paths: ['description', 'description.json']})
        //console.log('ent', this.all_book.items);
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
  async created() {
    await this.getBooks();
  },
  methods: {
    ...mapActions([
      'getBooks'
    ]),
  }
}
</script>
