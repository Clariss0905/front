<template>
  <div>
    <div style="padding: 5px">
      <el-button type="primary" @click="dialogFormVisible = true"
        >申请</el-button
      >
    </div>
    <div>
      <el-table
        :data="applyData"
        border
        style="width: 100%"
        height="500"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="apply_time" label="时间" width="180" sortable>
        </el-table-column>
        <el-table-column prop="award_kind" label="类型" width="180">
        </el-table-column>
        <el-table-column prop="info" label="备注"> </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
      </el-table>
    </div>
    <el-dialog title="奖惩申请" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="获奖学年" :label-width="formLabelWidth">
          <el-input v-model="form.year" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="得奖时间（YY-MM-DD）"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.apply_time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="奖惩类型">
          <el-select v-model="form.award_id" placeholder="请选择奖惩类型">
            <el-option
            v-for="(item, i) in award"
            :key="i"
            :label="item.award_name"
            :value="item.award_id"
            
          ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.info" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created: function () {
    this.getParams();
    this.searchAward();
  },
  inject: ["reload"],
  data() {
    return {
      uid: "",
      form: {
        apply_time: "",
        award_id: "",
        info: "",
        year: "",
        state: "0",
      },
      applyData: [],
      dialogFormVisible: false,
      award:[]
    };
  },
  methods: {
    getParams() {
      var _this = this;
      // 取到路由带过来的参数
      var data = sessionStorage.getItem('id')
      _this.uid = data;
      var url = "http://127.0.0.1:5000/searchApply?userid=" + _this.uid;
      axios.get(url).then(function (reqs) {
        _this.applyData = reqs.data;
        console.log(_this.applyData);
      });
    },
    submit() {
      var _this = this;
      var path = "http://127.0.0.1:5000/apply";
      axios({
        url: path,
        method: "POST",
        data: {
          student_id: _this.uid,
          award_id: _this.form.award_id,
          apply_id: _this.uid,
          state: _this.form.state,
          info: _this.form.info,
          apply_time: _this.form.apply_time,
          year: _this.form.year,
        },
      }).then(function (resp) {
        alert(resp.data.msg);
        _this.reload();
      });
    },
    searchAward(){
        var _this = this;
        axios.get("http://127.0.0.1:5000/searchApplyKind").then(function (resp){
            _this.award = resp.data
        })
    }
  },
};
</script>

<style>
</style>