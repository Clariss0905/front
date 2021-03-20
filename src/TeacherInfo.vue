<template>
  <div>
    <table style="width: 100%" class="myTable">
      <tr>
        <td class="column">学号</td>
        <td class="column">{{ userInfo[0].id }}</td>
      </tr>
      <tr>
        <td class="column">性别</td>
        <td class="column" v-if="(userInfo[0].sex = 0)">女</td>
        <td class="column" v-else>男</td>
      </tr>
      <tr>
        <td class="column">入职年份</td>
        <td class="column">{{ userInfo[0].entry_time }}</td>
      </tr>
      <tr>
        <td class="column">学院</td>
        <td class="column">{{ userInfo[0].college_name }}</td>
      </tr>
      <tr>
        <td class="column">专业</td>
        <td class="column">{{ userInfo[0].major_name }}</td>
      </tr>
      <tr>
        <td class="column">班级</td>
        <td class="column">{{ userInfo[0].class_name }}</td>
      </tr>
      <tr>
        <td class="column">电话</td>
        <td class="column">{{ userInfo[0].telephone }}</td>
      </tr>
    </table>
    <div>
      <el-button type="primary" class="button" @click="dialogFormVisible = true"
        >修改信息</el-button
      >
    </div>
    <el-dialog title="个人信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created: function () {
    this.getParams();
  },
  inject: ['reload'],
  data() {
    return {
      uid: "",
      userInfo: [],
      dialogFormVisible: false,
      form: {
        telephone: "",
      },
    };
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      var _this = this;
      // 将数据放在当前组件的数据内
      var data = sessionStorage.getItem('id')
      _this.uid = data;
      console.log(this.uid);
      var url = "http://127.0.0.1:5000/userInfo?userid=" + this.uid;
      axios.get(url).then(function (reqs) {
        _this.userInfo = reqs.data;
        console.log(reqs.data);
      });
    },
    changeInfo() {
      var _this = this;
      console.log(111);
      _this.dialogFormVisible = false;
      var path = "http://127.0.0.1:5000/changeInfo";
      axios({
        url: path,
        method: "POST",
        data: {
          id: _this.userInfo[0].id,
          telephone: _this.form.telephone,
        },
      }).then(function (reqs) {
        if(reqs.data.code == 200){
            alert("修改成功")
            _this.reload()
        }else{
            alert("电话格式不正确")
        }
        
      });
    },
  },
};
</script>

<style>
.myTable {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}

.myTable td,
.myTable th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 60px;
}
.button {
  margin-top: 5px;
  float: right;
}
</style>