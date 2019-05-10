// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import app from '../assets/js/common';
import taskList from '../assets/js/taskList';

// 默认部门/公司
let voteType = app.getUrlParam('type');
voteType = voteType == null ? 1 : Number.parseInt(voteType, 10);
let isgm = app.getUrlParam('gm') !== null ? 1 : app.getUrlParam('gm');

//vuex中数据
const state = {
  voteType: voteType, //默认公司测试
  isgm,
  voteStep: 0,
  users: [],
  curLimit: {
    excellent: 0,
    good: 0
  },
  taskList: taskList(voteType)
};

//计算属性
const getters = {
  scoreLimit: (state) => {
    let obj = {
      excellent: 0,
      good: 0
    };
    state.users.forEach((item) => {
      obj.excellent += item.value == '5';
      obj.good += item.value == '4';
    });
    return obj;
  }
};

export default new Vuex.Store({
  state,
  // mutations,
  // actions,
  getters
});
