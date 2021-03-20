<template>
  <div class="regist">
    <el-form ref="registForm" :model="registData" label-width="100px">
      <el-form-item
        label="用户名"
        prop="id"
        :rules="[{ required: true, message: '用户名不能为空' }]"
      >
        <el-input
          ref="id"
          type="text"
          v-model="registData.id"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
      >
        <el-input
          ref="password"
          type="text"
          v-model="registData.password"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="年龄"
        prop="age"
        :rules="[{ required: true, message: '年龄不能为空' }]"
      >
        <el-input
          ref="age"
          type="number"
          v-model="registData.age"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="入学年份"
        prop="enter_time"
        :rules="[{ required: true, message: '入学年份不能为空' }]"
      >
        <el-input
          ref="enter_time"
          type="number"
          v-model="registData.enter_time"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="registData.sex" placeholder="请选择性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="电话"
        prop="telephone"
        :rules="[{ required: true, message: '电话不能为空' }]"
      >
        <el-input
          ref="telephone"
          type="number"
          v-model="registData.telephone"
          autocomplete="off"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="学院">
        <el-select v-model="registData.college_id" placeholder="请选择学院">
          <el-option
            v-for="(item, i) in college"
            :key="i"
            :label="item.college_name"
            :value="item.college_id"
            @click.native="listenUp2()"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="registData.major_id" placeholder="请选择专业">
          <el-option
            v-for="(item, i) in major"
            :key="i"
            :label="item.major_name"
            :value="item.major_id"
            @click.native="listenUp3()"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="registData.class_id" placeholder="请选择班级">
          <el-option
            v-for="(item, i) in classs"
            :key="i"
            :label="item.class_name"
            :value="item.class_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份">
        <el-select v-model="registData.root" placeholder="请选择身份">
          <el-option label="学生" value="0"></el-option>
          <el-option label="老师" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created: function () {
    this.listenUp1();
  },
  name: "registForm",
  data() {
    return {
      registData: {
        id: "",
        password: "",
        age: "",
        sex: "",
        telephone: "",
        college_id: "",
        major_id: "",
        class_id: "",
        root: "",
        enter_time: "",
      },
      college: [],
      major: [],
      classs: [],
    };
  },

  methods: {
    listenUp1() {
      var _this = this;
      axios.get("http://127.0.0.1:5000/college_info").then((resq) => {
        console.log(resq);
        _this.college = resq.data;
        console.log(_this.college);
      });
    },
    listenUp2() {
      var _this = this;
      var url =
        "http://127.0.0.1:5000/major_info?college_id=" +
        this.registData.college_id;
      axios.get(url).then((resq) => {
        console.log(resq);
        _this.major = resq.data;
        console.log(_this.major);
      });
    },
    listenUp3() {
      var _this = this;
      var url =
        "http://127.0.0.1:5000/class_info?major_id=" + this.registData.major_id;
      axios.get(url).then((resq) => {
        console.log(resq);
        _this.classs = resq.data;
        console.log(_this.classs);
      });
    },
    submitForm() {
      console.log(this.registData);
      var id = this.registData.id;
      var password = this.registData.password;
      var age = this.registData.age;
      var sex = this.registData.sex;
      var telephone = this.registData.telephone;
      var class_id = this.registData.class_id;
      var root = this.registData.root;
      var enter_time = this.registData.enter_time;
      var path = "http://127.0.0.1:5000/register";
      let _this = this;
      axios({
        url: path,
        method: "post",
        data: {
          id: id,
          password: password,
          age: age,
          sex: sex,
          telephone: telephone,
          class_id: class_id,
          root: root,
          enter_time: enter_time,
        },
      }).then(function (resp) {
        if (resp.data.code == 200) {
          alert("注册成功");
          _this.$root.push({ path: "/Login" });
        } else if (resp.data.code == 0) {
          alert("有参数没有填写");
        } else if (resp.data.code == 500) {
          alert("该用户已被注册");
        }
      });
    },
  },
};
</script>

<style>
</style>