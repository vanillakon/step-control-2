import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    books: [],
    visitors: [],
    cards: [],
  },
  getters: {
    getBooks: (state) => state.books,
    bookById: (state) => (id) => state.books.find((book) => book.id === id),
    /* getBooksAfterRemove: (state) => state.books, */
    getVisitors: (state) => state.visitors,
    getInd: (state) => state.visitors.length + 1,
    getPagesBooks: (state, getters) => Math.ceil(getters.getBooks.length / 8),
    getPagesVisitors: (state, getters) =>
      Math.ceil(getters.getVisitors.length / 8),
    getLastBooksInd(state) {
      return state.books[state.books.length - 1].id;
    },
    getLastVisitorsInd(state) {
      return state.visitors[state.visitors.length - 1].id;
    },
    getCards: (state) => state.cards,
    getPagesCards: (state, getters) => Math.ceil(getters.getCards.length / 8),
    getBooksWithQuantity: (state) => {
      return state.books.filter((book) => book.quantity >= 1);
    },
    getLastCardsInd(state) {
      return state.cards[state.cards.length - 1].id;
    },
  },
  mutations: {
    addBook(state, payload) {
      state.books.push(payload);
    },
    addVisitor(state, payload) {
      state.visitors.push(payload);
    },
    addCard(state, payload) {
      state.cards.push(payload);
    },
    changeVisitor(state, payload) {
      state.visitors.find((visitor) => {
        if (visitor.id == payload.ind) {
          visitor.name = payload.name;
          visitor.phone = payload.phone;
        }
      });
    },
    setBooksToState(state, books) {
      state.books = Object.keys(books).map((key) => {
        return {
          idByBase: key,
          id: books[key].id,
          title: books[key].title,
          author: books[key].author,
          year: books[key].year,
          publisher: books[key].publisher,
          pages: books[key].publisher,
          quantity: books[key].quantity,
        };
      });
    },
    removeBookNow(state, id) {
      state.books = state.books.filter((book) => book.id !== id);
    },
    setVisitorsToState(state, visitors) {
      state.visitors = Object.keys(visitors).map((key) => {
        return {
          idByBase: key,
          id: visitors[key].id,
          name: visitors[key].name,
          phone: visitors[key].phone,
        };
      });
    },
    setCardsToState(state, cards) {
      state.cards = Object.keys(cards).map((key) => {
        return {
          idByBase: key,
          id: cards[key].id,
          visitor: cards[key].visitor,
          book: cards[key].book,
          borrow: cards[key].borrow,
        };
      });
    },
    setReturnBookDate(state, id) {
      state.cards.map((card) => {
        if (card.idByBase == id) card.return = new Date().toLocaleDateString();
      });
    },
  },
  actions: {
    async addBook(context, payload) {
      try {
        await axios.post(
          "https://vue-library-2-default-rtdb.europe-west1.firebasedatabase.app/books.json",
          payload
        );
      } catch (e) {
        console.log(e.message);
      }
    },
    async getBookFromBase({ commit }) {
      try {
        const { data } = await axios.get(
          "https://vue-library-2-default-rtdb.europe-west1.firebasedatabase.app/books.json"
        );
        if (!data) {
          throw new Error("List of books is empty.");
        }
        commit("setBooksToState", data);
        return data;
      } catch (e) {
        console.log(e.message);
        return e;
      }
    },
    async removeBook(context, id) {
      try {
        await axios.delete(
          `https://vue-library-2-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`
        );
      } catch (e) {
        console.log(e.message);
      }
    },
    async addVisitor(context, payload) {
      try {
        await axios.post(
          "https://vue-library-2-default-rtdb.europe-west1.firebasedatabase.app/visitors.json",
          payload
        );
      } catch (e) {
        console.log(e.message);
      }
    },
    async getVisitorsFromBase({ commit }) {
      try {
        const { data } = await axios.get(
          "https://vue-library-2-default-rtdb.europe-west1.firebasedatabase.app/visitors.json"
        );
        if (!data) {
          throw new Error("List of visitors is empty.");
        }
        commit("setVisitorsToState", data);
        return data;
      } catch (e) {
        console.log(e.message);
        return e;
      }
    },
    async addCard(context, payload) {
      try {
        await axios.post(
          "https://vue-library-2-default-rtdb.europe-west1.firebasedatabase.app/cards.json",
          payload
        );
      } catch (e) {
        console.log(e.message);
      }
    },
    async getCardsFromBase({ commit }) {
      try {
        const { data } = await axios.get(
          "https://vue-library-2-default-rtdb.europe-west1.firebasedatabase.app/cards.json"
        );
        if (!data) {
          throw new Error("List of cards is empty.");
        }
        commit("setCardsToState", data);
        return data;
      } catch (e) {
        console.log(e.message);
        return e;
      }
    },
    async returnBook(context, payload) {
      try {
        const data = await axios.patch(
          `https://vue-library-2-default-rtdb.europe-west1.firebasedatabase.app/cards/${payload}.json`,
          { return: new Date().toLocaleDateString() }
        );
      } catch (e) {
        console.log(e.message);
      }
    },
  },
});
