import {
  FETCH_START
} from './mutations.type';

const state = {
  isLoading: true,
  data: undefined
};

const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  data(state) {
    return state.data;
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](status) {
    state.isLoading = status;
  },/*
  [FETCH_DATA](data) {
    state.data = data;
  }*/
};

const actions = {
  [FETCH_START]({commit}) {
    commit(FETCH_START, state);
  },
/*  [FETCH_DATA]({commit}) {
  /!*  return TagsService.get()
      .then(({data}) => {*!/
        commit(FETCH_DATA, data.tags);
      /!*})
      .catch(error => {
        throw new Error(error);
      });*!/
  }*/
};

export default {
  state,
  getters,
  actions,
  mutations
};
