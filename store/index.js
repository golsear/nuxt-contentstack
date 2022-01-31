import gql from 'graphql-tag';

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
      system {
        uid
      }
    }
  }
  }
  `;

export const state = () => ({
    books: [],
    limit: 2,
    skip: 0
})

export const mutations = {
    setBooks(state, v) {
        console.log('state: setBooks');
        state.books = v;
    },
    setSkip(state, v) {
        console.log('state: setSkip');
        state.skip += 2;
    }
}

export const actions = {
    async getBooks({ commit, state }, data) {
        let apollo = this.app.apolloProvider.defaultClient;
        console.log('action: getBooks');
        const response = await apollo.query({
            query: ALL_BOOK_QUERY,
            variables: {
              limit: state.limit,
              skip: state.skip,
            }
          });

          const books = response.data.all_book.items.slice();

          console.log('action: getBooks: response', books);

        commit('setBooks', books);
    },
    setSkip({ commit }) {
        commit('setSkip');
    }
}

export const getters = {
    books: state => {
        console.log('getter: books', state);
      return state.books
    }
  }