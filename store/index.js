import * as Utils from "@contentstack/utils";
import { BOOKS_QUERY } from '../queries';

export const state = () => ({
    books: [],
    limit: 2,
    skip: 0
})

export const mutations = {
    setBooks(state, v) {
        state.books = v;
    },
    setSkip(state, v) {
        state.skip += state.limit;
    }
}

export const actions = {
    async getBooks({ commit, state }) {
        const apollo = this.app.apolloProvider.defaultClient;
        const response = await apollo.query({
            query: BOOKS_QUERY,
            variables: {
              limit: state.limit,
              skip: state.skip,
            }
          });

        Utils.jsonToHTML({ entry: response.data.all_book.items, paths: ['description', 'description.json']});

        const getAuthors = (arr) => {
            const authorsArr = arr.map((authorObj) => {
                return authorObj.node.author_name;        
            });
            
            return authorsArr.join(', ');
        }

        const books = response.data.all_book.items.map((book) => {
            return {
                authors: getAuthors(book.authorsConnection.edges),
                uid: book.system.uid,
                imageUrl: book.imageConnection.edges[0].node.url,
                title: book.book_title,
                description: book.description.json,
                number_of_pages: book.number_of_pages,
                link: {
                    href: book.link.href,
                    title: book.link.title 
                }
            };
        });

        commit('setBooks', books);
    },
    setSkip({ commit }) {
        commit('setSkip');
    }
}

export const getters = {
    books: state => state.books
}