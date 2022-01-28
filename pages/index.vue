<template>
  <div>
    <!-- <BookList :books="books"/> -->
    <Book :book-data="bookData"/>

    {{bbb}}

    <button v-if="showMoreEnabled" @click="showMore">Show more</button>
    
  </div>
</template>

<script>
import Stack from "../Utils/contentstack";
import gql from 'graphql-tag';
import * as Utils from "@contentstack/utils";

const ALL_BOOK_QUERY = gql`
query allBook ($limit: Int!, $skip: Int!) {
  all_book (limit: $limit, skip: $skip) {
    total
    items {
      number_of_pages
      book_title
      description {
        json
      }
      link {
        href
        title
      }
      authorsConnection {
        edges {
          node {
            ... on Author {
              title
              author_name
            }
          }
        }
      }
      imageConnection {
        edges {
          node {
            title
            url
            content_type
            filename
            file_size
            description
          }
        }
      }
    }
  }
  }
  `;

export default {
  name: 'IndexPage',
  apollo: {
    all_book: {
      query: ALL_BOOK_QUERY,
      prefetch: true,
      variables: {
        limit: 2,
        skip: 0,
      },
    },
    
  },
  computed: {
    // a computed getter
    bbb: function () {
      let self = this;
      if(self.all_book){
        Utils.jsonToHTML({ entry: this.all_book.items, paths: ['description', 'description.json']})
        console.log('ent', this.all_book);
      }
      
      
      
      return this.all_book;
    }
  },
  async asyncData({$axios}) {
    let books = [];
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
        
        console.log('bookData>>>', bookData);
        console.log(ALL_BOOK_QUERY)

        books = resp.data;
    } catch (err) {
        console.error('Something was wrong: ', err);
    }
    
    return {
      books,
      bookData
    }
  },
   mounted () {
      // TODO: store books
      // console.log('books', this.books);
  },
  data: () => ({
    skip: 0,
    limit: 2,
    showMoreEnabled: true,
  }),
  methods: {
    showMore () {
      this.skip += 2;
      console.log('Okkk', this.limit, this.skip);
      // Fetch more data and transform the original result
      this.$apollo.queries.all_book.fetchMore({
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
      })
    },
  }
}
</script>
