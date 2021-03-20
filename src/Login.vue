<template>
  <div class="login">
    <h1>{{ titleMsg }}</h1>
    <el-form ref="loginForm" :model="loginData" label-width="100px">
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[{ required: true, message: '用户名不能为空' }]"
      >
        <el-input
          ref="username"
          type="text"
          v-model="loginData.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
      >
        <el-input
          type="password"
          v-model="loginData.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "loginForm",
  data() {
    return {
      titleMsg: "欢迎登录评奖评优系统",
      loginData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      var path = "http://127.0.0.1:5000/login";
      var id = parseInt(this.loginData.username);
      var password = this.loginData.password;
      let _this = this;
      axios({
        url: path,
        method: "post",
        data: {
          id: id,
          password: password,
        },
      }).then(function (resp) {
        var a = _this.loginData.username.toString()
        console.log("我是"+a)
        console.log(typeof(a))
        sessionStorage.setItem('id',a)
        if (resp.data.code == 200 && resp.data.root == 0) {
          //登录成功切换页面
          _this.$router.push({ path: "/student", query:{uid: id}});
        } else if (resp.data.code == 200 && resp.data.root == 1){
          _this.$router.push({ path: "/teacher", query:{uid: id} });
        }
          else if (resp.data.code == 400) {
          alert("用户名或密码错误");
        } else if (resp.data.code == 0) {
          alert("用户名或密码未填写");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      console.log("reset");
    },
  },
};
</script>