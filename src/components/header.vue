<!-- 导航 -->
<template>
  <div class="container">
    <el-menu :router="true" :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/">FS</el-menu-item>
      <el-menu-item index="/list">探索</el-menu-item>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="/signUp" class="right">注册</el-menu-item>
      <el-menu-item index="5" class="right">登录</el-menu-item>   
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Header',

  data () {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect(key,keyPath) {
      console.log(key, keyPath)
    }
  }
}

</script>
<style lang='css' scoped>

  .container{
    padding: 0 10%;
    background: #eef1f6;
  }

  .right{
    float: right;
  }

  .el-menu-item:first-child {
    margin-left: 0;
    font-size: 25px;
    font-weight: 100;
    background: #20a0ff;
    color: #fff;
  }
</style>