import * as Utils from "@contentstack/utils";
import { BOOKS_QUERY } from '../queries';
import { convertBookObj } from "../Utils/helpers";

export const state = () => ({
    books: [],
    limit: 2,
    skip: 0,
    count: 0
})

export const mutations = {
    setBooks(state, v) {
        state.books = v;
    },
    setSkip(state, v) {
        state.skip += state.limit;
    },
    setCount(state, v) {
        state.count = v;
    }
}

export const actions = {
    async setBooks({ commit, state }) {
        const apollo = this.app.apolloProvider.defaultClient;
        const resp = await apollo.query({
            query: BOOKS_QUERY,
            variables: {
              limit: state.limit,
              skip: state.skip,
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
    setSkip({ commit }) {
        commit('setSkip');
    },
    setCount({ commit }) {
        commit('setCount');
    }
}

export const getters = {
    getBooks: state => state.books,
    getBookById: (state) => (id) => {
        return state.books.find(book => book.uid === id);
    },
    getCount: state => state.count
}