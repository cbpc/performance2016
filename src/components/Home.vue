<template>
  <div>
    <h2 class="title">2016年度绩效评价</h2>
    <div class="list">
      <el-steps :space="100" direction="vertical" finish-status="success" :active="active">
        <div v-for="task,idx in taskList">
          <div @click="location(idx)">
            <el-step :title="task"></el-step>
          </div>
        </div>
      </el-steps>
    </div>
    <el-footer/>
  </div>
</template>

<script>

import ElFooter from './Footer';
// import getUrlParam from '../assets/js/common';

// const voteType = (getUrlParam('type') !== null) ? 1 : 0;

var home = {
  name: 'home',
  computed: {
    taskList() {
      return this.$store.state.taskList
    },
    active(){
      return this.$store.state.voteStep
    }
  },
  methods:{
    location(idx){
      if( idx == this.$store.state.voteStep ){
        this.$router.push({ name: 'vote', params: { id: idx }});
      }
    }
  },
  components:{
    ElFooter
  }
};
export default home;
</script>

<style lang="less">
  @import '../less/home.less';
</style>