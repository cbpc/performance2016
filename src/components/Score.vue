<template>
  <div>
    <h2 class="title">2016年度绩效评价得分</h2>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="userType"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="dpt"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="leader"
        label="领导打分">
      </el-table-column>
      <el-table-column
        prop="other"
        label="互评得分">
      </el-table-column>
    </el-table>

    <el-table
      :data="distribData"
      stripe class="margin-top-20"
      style="width: 100%">
      <el-table-column
        prop="userType"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="dpt"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="score3"
        label="不称职">
      </el-table-column>
      <el-table-column
        prop="score5"
        label="基本称职">
      </el-table-column>
      <el-table-column
        prop="score7"
        label="称职">
      </el-table-column>
      <el-table-column
        prop="score8"
        label="良好">
      </el-table-column>
      <el-table-column
        prop="score10"
        label="优秀">
      </el-table-column>
      <el-table-column
        prop="count"
        label="总票数">
      </el-table-column>
    </el-table>
    <div class="submit">
      <button class="button" @click="refresh">刷新数据</button>
      <button class="button" @click="clear">清理缓存</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'score',
    data() {
      return {
        tableData: [],
        distribData:[]
      }
    },
    methods: {
      refresh() {
        this.$http.jsonp('http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getPerformanceScore', {
            params: {
              id: this.$store.state.voteType
            }
          })
          .then((response) => {
            this.tableData = response.data;
            this.$message({
              message: '数据刷新完毕',
              type: 'success'
            });
          });

        this.$http.jsonp('http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getPerformanceDis', {
            params: {
              id: this.$store.state.voteType
            }
          })
          .then((response) => {
            this.distribData = response.data;
            this.$message({
              message: '数据刷新完毕',
              type: 'success'
            });
          });

      },
      clear() {
        localStorage.removeItem('performance-1');
        localStorage.removeItem('performance-2');
        this.$message({
          message: '缓存清理完毕',
          type: 'success'
        });
      }
    },
    mounted() {
      this.refresh();
    }
  }
  </script>

  <style lang="less">
    @import '../less/vote.less';
  </style>