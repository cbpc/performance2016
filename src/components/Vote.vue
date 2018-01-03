<template>
  <div>
    <h2 class="title">{{title}}</h2>
    <div class="content">说明：本轮最多评选{{limitSetting.excellent}}位优秀，{{limitSetting.good}}位良好。</div>
    <div>
      <div v-for="(user,idx) in users" :key="idx">
        <div class="card">
          <div class="card-header">
            <span>{{idx+1}}</span>.{{user.name}}
            <span class="depart">{{user.dpt}}</span>
          </div>
          <div class="card-content">
            <p class="desc" v-if="showDesc">{{user.desc}}</p>
            <div class="vote">
              <el-rate v-model="user.value" :texts="scoreList" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" show-text>
              </el-rate>
            </div>
            <p class="votenum">优秀:
              <span :class="{'warnning':warn.excellent}">{{curLimit.excellent}}</span> /{{limitSetting.excellent}},良好:
              <span :class="{'warnning':warn.good}">{{curLimit.good}}</span>/{{limitSetting.good}}</p>
          </div>
        </div>
      </div>
      <div class="submit">
        <button v-if="shouldSubmit&&!hideSubmit" class="button" @click="submit">提交</button>
        <button class="button" @click="back">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import userList from "../assets/js/userList";
import app from "../assets/js/common";

const isGM = app.getUrlParam("gm") !== null ? 1 : 0;

let vote = {
  name: "vote",
  data() {
    return {
      title: "",
      scoreList: ["不称职", "基本称职", "称职", "良好", "优秀"],
      limitSetting: {
        excellent: 0,
        good: 0
      }
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    voteStep() {
      return this.$store.state.voteStep;
    },
    curLimit() {
      return this.$store.state.curLimit;
    },
    warn() {
      return {
        excellent: this.curLimit.excellent > this.limitSetting.excellent,
        good: this.curLimit.good > this.limitSetting.good
      };
    },
    showDesc() {
      return this.$store.state.voteType == 0;
    },
    shouldSubmit() {
      return this.$store.state.voteStep == this.$route.params.id;
    },
    hideSubmit() {
      return this.warn.excellent || this.warn.good;
    }
  },
  methods: {
    back() {
      //this.$router.go(-1);
      this.$router.push("/home");
    },
    submit() {
      if (this.warn.excellent || this.warn.good) {
        this.$message({
          message: "优秀或良好人数不符合规定",
          type: "error"
        });
        return;
      }

      let votes = [];
      let rate2Score = [0, 3, 5, 7, 8, 10];
      const dateName = app.getDate();
      const voteTime = app.getDate(1);
      //姓名，部门，得分，用户身份，是否领导评分，活动id，投票日期,提交时间
      votes = this.$store.state.users.map(item => {
        return [
          item.name,
          item.dpt,
          rate2Score[item.value],
          this.title,
          isGM,
          this.$store.state.voteType,
          dateName,
          voteTime
        ];
      });

      let url =
        "//cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/addPerformanceScore";
      let params = JSON.stringify(votes)
        .replace(/\],\[/g, "),(")
        .replace("[[", "(")
        .replace("]]", ")");

      //Vue-Resource中使用post需加入emulateJSON选项,否则无法解析数据
      this.$http
        .post(
          url,
          {
            values: params
          },
          {
            emulateJSON: true
          }
        )
        .then(response => {
          if (!response.ok) {
            this.$message({
              message: "数据提交失败",
              type: "error"
            });
            return;
          }

          var data = response.data;
          this.back();
          if (data.status > "0") {
            this.$message({
              message: "提交数据成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "服务器写入数据失败",
              type: "error"
            });
          }

          app.saveInfo({
            step: this.$store.state.voteStep + 1,
            type: this.$store.state.voteType
          });
          this.$store.state.voteStep = this.$store.state.voteStep + 1;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  watch: {
    users: {
      handler() {
        this.$store.state.curLimit = this.$store.getters.scoreLimit;
        if (this.warn.excellent) {
          this.$message({
            message: "最多只允许选取" + this.limitSetting.excellent + "名优秀",
            type: "error"
          });
        }
        if (this.warn.good) {
          this.$message({
            message: "最多只允许选取" + this.limitSetting.good + "名良好",
            type: "error"
          });
        }
      },
      deep: true
    }
  },
  beforeMount() {
    let userInfo = userList(this.$route.params.id, this.$store.state.voteType);
    this.$store.state.users = userInfo.data;
    this.title = userInfo.title;
    this.limitSetting = userInfo.limit;
  }
};
export default vote;
</script>

<style lang="less">
@import "../less/vote.less";
</style>