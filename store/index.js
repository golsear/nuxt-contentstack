import * as Utils from "@contentstack/utils";
import { BOOKS_QUERY } from '../queries';
import { convertBookObj } from "../Utils/helpers";

export const state = () => ({
    books: [],
    limit: 5,
    total: 0,
    currentPage: 1
})

export const mutations = {
    setBooks(state, books) {
        state.books = books;
    },
    setTotal(state, total) {
        state.total = total;
    },
    setCurrentPage(state, page) {
        state.currentPage = page;
    },
}

export const actions = {
    async setBooks({ commit, state }) {
        const skip = ( state.currentPage - 1 ) * state.limit;
        const apollo = this.app.apolloProvider.defaultClient;
        const resp = await apollo.query({
            query: BOOKS_QUERY,
            variables: {
              limit: state.limit,
              skip: skip
            }
          });
        
        Utils.jsonToHTML({ entry: resp.data.all_book.items, paths: ['description', 'description.json']});

        const books = resp.data.all_book.items.map((respObj) => {
            return convertBookObj(respObj, 'contentstackGraphQLAPI');
        });
        const total = resp.data.all_book.total;

        commit('setTotal', total);
        commit('setBooks', books);
    },
    setCurrentPage({ commit, state }, page) {
        commit('setCurrentPage', page);
    },
    setTotal({ commit }) {
        commit('setTotal');
    }
}

export const getters = {
    getBooks: state => state.books,
    getBookById: (state) => (id) => {
        return state.books.find(book => book.uid === id);
    },
    getTotal: state => state.total,
    getLimit: state => state.limit,
    getCurrentPage: state => state.currentPage
}