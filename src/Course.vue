<template>
  <div>
    <div>
      <!-- 搜索框 -->
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="form.year" placeholder="请输入查询年份"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <!-- 成绩展示 -->
      <el-table
        :data="courseData"
        border
        style="width: 100%"
        height="500"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="course_date" label="学年" width="180">
        </el-table-column>
        <el-table-column prop="course_name" label="课程" width="180">
        </el-table-column>
        <el-table-column prop="course_credit" label="学分" sortable>
        </el-table-column>
        <el-table-column prop="course_mark" label="成绩" sortable>
        </el-table-column>
      </el-table>
      <span style="font-size:20px; font-weight:bold">综合成绩：{{this.totalCredit}}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created: function () {
    this.getParams();
  },
  data() {
    return {
      uid: "",
      form: { year: "" },
      courseData: [],
      totalCredit:''
    };
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      var data = sessionStorage.getItem('id')
      this.uid = data;
    },
    onSubmit() {
      var _this = this;
      var path = "http://127.0.0.1:5000/searchCourse";
      var uid = _this.uid
      var year = _this.form.year
      axios({
        url: path,
        method: "POST",
        data: {
          id: uid,
          year: year,
        },
      }).then(function (resp) {
        if (resp.data.code == 500) {
          alert(resp.data.msg);
        } else {
          _this.courseData = resp.data[0];
          _this.totalCredit = resp.data[1];
          console.log(_this.courseData);
        }
      });
    },
  },
};
</script>

<style>
</style>