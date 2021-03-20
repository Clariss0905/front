<template>
  <div>
    <div>
      <!-- 搜索框 -->
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="form.year" placeholder="请输入查询年份"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()" icon="el-icon-search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div>
      <!-- 成绩展示 -->
      <el-table
        :data="awardData"
        border
        style="width: 100%"
        height="500"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="award_time" label="获奖时间" width="180" sortable>
        </el-table-column>
        <el-table-column prop="award_name" label="获奖名称" width="180">
        </el-table-column>
        <el-table-column prop="mark" label="奖惩分数" sortable>
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
      awardData:[]
    };
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      let routerParams = this.$route.query.id;
      // 将数据放在当前组件的数据内
      this.uid = routerParams;
    },
    onSubmit(){
        var _this = this;
      var path = "http://127.0.0.1:5000/award";
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
          _this.awardData = resp.data
        }
      });
    }
  },
};
</script>

<style>
</style>