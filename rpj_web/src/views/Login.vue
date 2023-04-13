<template>
  <el-form :model="input" :rules="inputCheck" ref="input" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input  type="text" v-model="input.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="input.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button  type="primary" style="width:100%" @click="handleSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      login:false,
      input:{
        username:"admin",
        password:"123"
      },
      inputCheck:{
        username :[
          { require : true, message:"请输入账号",trigger:"blur" }
        ],
        password:[
          { require : true, message:"请输入密码",trigger:"blur" }
        ]
      },
      checked:true
    }
  },
  methods:{
    handleSubmit(){
      let _this = this;
      this.$refs.input.validate((valid) => {
        if(valid){
          this.login = true
          let loginParams = { username: this.input.username,password:this.input.password }
          //TODO:调用接口进行登录验证
        }else{
          //TODO:弹出框提示输入错误
        }
      })
    }
  }
}
</script>

<style scoped>
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>