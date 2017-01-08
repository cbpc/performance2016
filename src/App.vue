<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  },// :users="users" :scoreList="scoreList" :voteType="voteType" :showList="showList" :voteNum="voteNum" :curLimit="curLimit" :submit="submit" :back="back"
  //props:['scoreList','users','voteType','showList','voteNum','curLimit','submit','back'],
  // computed: {
  //   scoreLimit: () => {
  //     let obj = {
  //       excellent: 0,
  //       good: 0
  //     };
  //     this.$store.state.users.forEach((item) => {
  //       obj.excellent += (item.value == '10');
  //       obj.good += (item.value == '8');
  //     });
  //     return obj;
  //   }
  // },
  // watch: {
  //   showList: (val) => {
  //     this.$store.state.$message({
  //       message: '返回列表',
  //       type: 'success'
  //     });
  //   },
  //   users: {
  //     handler: () => {
  //       let scoreLimit = this.$store.state.scoreLimit;
  //       if (scoreLimit.excellent > 2 || scoreLimit.good > 2) {
  //         this.$store.state.$message({
  //           message: '最多只允许选取6名优秀/良好',
  //           type: 'error'
  //         });
  //       }
  //       this.$store.state.curLimit = scoreLimit;
  //     },
  //     deep: true
  //   }
  // },
  // methods: {
  //   submit: () => {
  //     var votes = [];
  //     votes = this.$store.state.users.map(function(item) {
  //       return [item.name, item.dpt, item.value, isGM];
  //     });
  //     //console.log(JSON.stringify(votes));
  //     this.$store.state.voteNum[this.$store.state.voteType] = 1;
  //     //this.$store.state.back();
  //     //write the data to localStorage
  //   },
  //   back: () => {
  //     this.$store.state.showList = true;
  //   }
  // }
}
</script>
