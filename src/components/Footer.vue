<template>
  <div class="footer">
    <p>本程序为无记名投票,源代码开源至github，<a href="https://github.com/cbpc/performance2016">点击此处</a>查看源码</p>
    <p class="copyright" v-html="message"></p>
  </div>
</template>

<script>
export default {
  name: 'el-footer',
  data(){
    return{
      message:'2017 &copy; CBPC All Rights Reserved.'
    }
  }
};
</script>
<style>
  .footer{
    text-align:center;
    padding-top: 5px;
    border-top: 1px solid #dde;
    color:#99a9bf;
    font-size:10pt;
  }
</style>