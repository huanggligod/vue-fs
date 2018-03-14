<!-- signIn -->
<template>
  <div class="container">
      <h1>登录</h1>
      <div class="form-panel">
          <el-form :label-position="labelPosition" ref="form" :rules="rules" :model="user" label-width="80px">
              <el-form-item label="用户名" prop="name">
                  <el-input type="username" v-model="user.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="passwd">
                  <el-input type="password" v-model="user.passwd"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button class="submit" type="primary" @click="submitForm('form')">登录</el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'signIn',

  data () {
     var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.user.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      labelPosition: 'top',
      user: {
        name: '',
        passwd:''
      },
      rules: {
        name : [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在3到16个字符', trigger: 'blur'}
        ],
        passwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.$api.SDK.User.logIn(this.user.name, this.user.passwd).then((loginedUser) => {      
          this.$store.dispatch('login', loginedUser); //保存的vuex
          this.$router.push({path: '/'}) // 回到首页
          this.$message.success("登陆成功！")
        }).catch(error => {
          console.log(error)
          this.$message.error(error.message)
        })  
        }else {
            console.log('登录失败！')
            this.$message.error("您填写的信息有误，请按照提示修改。")
            return false
        }
      })
    }
  }
}

</script>
<style lang='css' scoped>
</style>