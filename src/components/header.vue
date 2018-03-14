<!-- 导航 -->
<template>
  <div class="container">
    <el-menu :router="true" :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
      <el-menu-item class="logo" index="/">FS</el-menu-item>
      <el-menu-item index="/list">探索</el-menu-item>

      <template v-if="user">
        <li class="el-menu-item right" @click="heandleExit">注销</li>
        <el-submenu index="5" class="right">
          <span slot="title">{{ user.getUsername() }}</span>
          <el-menu-item index="5-1">个人中心</el-menu-item>
          <el-menu-item index="5-2">发布文章</el-menu-item>
          <el-menu-item index="5-3">消息</el-menu-item>
        </el-submenu>
      </template>

      <template v-else>
        <el-menu-item index="/signUp" class="right">注册</el-menu-item>
        <el-menu-item index="/signIn" class="right">登录</el-menu-item>   
      </template>   
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Header',

  data () {
    return {
      activeIndex: '1'
    };
  },
  created() {
    this.activeIndex = this.$route.path; //解决刷新不高亮
    this.$router.afterEach((to, from) => {
      this.activeIndex = to.path
    })

  },
  computed: mapState(['user']),
  
  methods: {
    handleSelect(key,keyPath) {
      console.log(key, keyPath)
    },
    ...mapActions({
      exit: 'exit'
    }),
    heandleExit() {
      this.exit();
      this.$api.SDK.User.logOut();
      this.$message.success('登出成功')
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

  .logo {
    margin-left: 0;
    font-size: 25px;
    font-weight: 100;
    background: #20a0ff;
    color: #fff;
  }
</style>