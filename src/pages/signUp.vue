<!-- signup -->
<template>
  <div class="container"> 
    <h1>注册</h1>
    <div class="form-panel"> 
      <el-form labelPosition="top" :rules="rules" :model="user" ref="form" label-width="100px" class="form">
        <el-form-item label="用户名" prop="name">
          <el-input  v-model="user.name" type="username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input  v-model="user.email" type="email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input  v-model="user.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input  v-model="user.checkPass" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'SignUp',

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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'top',
      user: {
        name: '',
        email: '',
        password:'',
        checkPass: ''
      },

      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 16, message: '长度在3-16个字符之间', trigger:'blur' }
        ],
        email: [
          {required: true, message: '请填入邮箱', trigger:'blur'},
          {type: 'email', message: '必须是合法的邮箱格式', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '必须填写', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {required: true, message: '必须填写', trigger: 'blur'},
          {validator: validatePass2, trigger:'blur'}
        ]
      }

    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let user = new this.$api.SDK.User()
          user.setUsername(this.user.name)
          user.setPassword(this.user.password)
          user.setEmail(this.user.email)

          user.signUp().then((loginUser) => {
            this.$store.dispatch('login',loginUser) //保存到vuex
            this.$router.go(-1)
            this.$message({
              message:"注册成功！",
              type:'success'
            })
          }).catch(error => {
            console.log(error)
            this.$message({
              message: error.message,
              type:'error'
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}

</script>
<style lang='css' scoped>

  .form-panel {
    width: 50%;
    margin: 0 auto;
  }
</style>