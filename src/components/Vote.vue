<template>
  <div>
    <h2 class="title">{{title}}</h2>
    <div class="content">说明：本轮最多评选6位优秀，6位良好。</div>
    <div>
      <div v-for="user,idx in users">
        <div class="card">
          <div class="card-header">
            <span>{{idx+1}}</span>.{{user.name}}
            <span class="depart">{{user.dpt}}</span>
          </div>
          <div class="card-content">
            <p class="desc">{{user.desc}}</p>
            <div class="vote">
              <el-rate
                v-model="user.value"
                :texts="scoreList"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                show-text>
              </el-rate>
            </div>
            <p class="votenum">优秀:<span :class="{'warnning':warn.excellent}">{{curLimit.excellent}}</span> /6,良好:<span :class="{'warnning':warn.good}">{{curLimit.good}}</span>/6</p>
          </div>
        </div>
      </div>
      <div class="submit">
        <button class="button" @click="submit">提交</button>
        <button class="button" @click="back">返回</button>
      </div>
    </div>
  </div>
</template>

<script>

import userList from '../assets/js/userList';
import getUrlParam from '../assets/js/common';

const isGM = (getUrlParam('gm') !== null) ? 1 : 0;

var vote = {
  name: 'vote',
  data(){
    return{
      title:'',
      scoreList:['不称职', '基本称职', '称职', '良好', '优秀']
    }
  },
  computed: {
    users() {
      return this.$store.state.users
    },
    voteStep() {
      return this.$store.state.voteStep
    },
    curLimit() {
      return this.$store.state.curLimit
    },
    warn(){
      return{
        excellent:this.curLimit.excellent > 6,
        good:this.curLimit.good > 6
      }
    }
  },
  methods:{
    back() {
      //调用mutations
      //this.$store.commit('back')
      this.$router.push('/');
    },
    submit() {
      //调用actions
      //this.$store.dispatch('submit');
      var votes = [];
      var rate2Score=[0,3,5,7,8,10];
      votes = this.$store.state.users.map(function(item) {
        return [item.name, item.dpt, rate2Score[item.value], isGM];
      });
      //state.back();
      //write the data to localStorage
      // var url='http://localhost/DataInterface/Api';
      // console.log('以下是将要提交的数据：\n',JSON.stringify(votes));
      // this.$http.jsonp(
      //   url,
      //   {
      //     params: {
      //       Token:'79d84495ca776ccb523114a2120e273ca80b315b',
      //       ID:'290',
      //       M:'0',
      //       cart:'1620A285',
      //       cache:'60'
      //     }
      //   }
      // ).then((response) => {
      //   console.log(response.data);
      //   this.$store.state.voteStep = this.$store.state.voteStep+1;
      //   this.back();
      //   this.$message({
      //     message: '提交数据成功',
      //     type: 'success'
      //   });
      // }, (response) => {
      //     console.log(response);
      // });
      this.back();
        this.$message({
          message: '提交数据成功',
          type: 'success'
        });
    }
  },
  watch: {
    users: {
      handler() {
        let scoreLimit = this.$store.getters.scoreLimit;
        if (scoreLimit.excellent > 6 || scoreLimit.good > 6) {
          this.$message({
            message: '最多只允许选取6名优秀/良好',
            type: 'error'
          });
        }
        this.$store.state.curLimit = scoreLimit;
      },
      deep: true
    }
  },
  beforeMount(){
    var userInfo = userList(this.$route.params.id);
    this.$store.state.users = userInfo.data;
    this.title = userInfo.title;
  }
};
export default vote;
</script>

<style lang="less">
  @import '../less/vote.less';
</style>