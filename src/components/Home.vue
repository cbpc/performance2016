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
import app from '../assets/js/common';
const dateName = app.getDate();
let home = {
  name: 'home',
  computed: {
    taskList() {
      return this.$store.state.taskList
    },
    active() {
      if (this.$store.state.voteStep == 0) {
        let info = app.readInfo(this.$store.state.voteType);
        if (dateName == info.date) {
          this.$store.state.voteStep = info.data.step;
        }
      }
      return this.$store.state.voteStep
    }
  },
  methods: {
    location(idx) {
      if (idx == this.$store.state.voteStep) {
        this.$router.push({
          name: 'vote',
          params: {
            id: idx
          }
        });
      }
    }
  },
  components: {
    ElFooter
  },
  // beforeMount(){
  // 当组件中载入子组件时，不能调用mounted,beforeMount等事件，否则报错
  // }
};
export default home;
</script>

<style lang="less">
  @import '../less/home.less';
</style>