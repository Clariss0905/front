<template>
  <div>
    <div>
      <!-- 搜索框 -->
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="form.year" placeholder="请输入查询年级"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="form.class_id" placeholder="请选择学院">
            <el-option
              v-for="(item, i) in classs"
              :key="i"
              :label="item.class_name"
              :value="item.class_id"
              @click.native="listenUp()"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="form.course_id" placeholder="请选择学院">
            <el-option
              v-for="(item, i) in course"
              :key="i"
              :label="item.course_name"
              :value="item.course_id"
            ></el-option>
          </el-select>
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
        :data="gradeData"
        border
        style="width: 100%"
        height="500"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column prop="year" label="年级" width="180">
        </el-table-column>
        <el-table-column prop="class_name" label="班级" width="180">
        </el-table-column>
        <el-table-column prop="student_id" label="学生" width="180">
        </el-table-column>
        <el-table-column prop="course_name" label="课程"> </el-table-column>
        <el-table-column prop="course_mark" label="成绩" sortable>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row.student_id,scope.$index)"
              type="text"
              size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="成绩修改" :visible.sync="dialogFormVisible">
      <el-form :model="mark">
        <el-form-item label="成绩" :label-width="formLabelWidth">
          <el-input v-model="mark.course_mark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeMark()">确 定</el-button>
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
      classs: [],
      course: [],
      form: {
        year: "",
        class_id: "",
        course_id: "",
      },
      mark: {
        student_id: "",
        course_mark: "",
        course_id: "",
      },
      gradeData: [],
      dialogFormVisible: false,
      index:"",
    };
  },
  methods: {
    getParams() {
      var _this = this;
      var data = sessionStorage.getItem("id");
      _this.uid = data;
      var path = "http://127.0.0.1:5000/teacherClass?userid=" + _this.uid;
      axios.get(path).then(function (reqs) {
        _this.classs = reqs.data;
        console.log(reqs.data);
      });
    },
    listenUp() {
      var _this = this;
      var path =
        "http://127.0.0.1:5000/teacherCourse?userid=" +
        _this.uid +
        "&class_id=" +
        _this.form.class_id;
      axios.get(path).then(function (reqs) {
        _this.course = reqs.data;
        console.log(reqs.data);
      });
    },
    onSubmit() {
      var _this = this;
      var path = "http://127.0.0.1:5000/teacherCourseMark";
      axios({
        url: path,
        method: "POST",
        data: {
          teacher_id: _this.uid,
          year: _this.form.year,
          class_id: _this.form.class_id,
          course_id: _this.form.course_id,
        },
      }).then(function (resp) {
        _this.gradeData = resp.data;
      });
    },
    handleClick(student_id,index) {
      console.log(index)
      var _this = this;
      console.log(student_id);
      _this.index = index
      _this.mark.student_id = student_id;
      _this.mark.course_id = _this.form.course_id;
      _this.dialogFormVisible = true;
    },
    changeMark() {
      var _this = this;
      _this.dialogFormVisible = false;
      console.log( _this.gradeData[_this.index])
      _this.gradeData[_this.index].course_mark = _this.mark.course_mark
      console.log( _this.gradeData[_this.index])
      var path = "http://127.0.0.1:5000/updateMark";
      console.log(_this.mark)
      axios({
        url: path,
        method: "POST",
        data: {
          student_id: _this.mark.student_id,
          course_mark: _this.mark.course_mark,
          course_id: _this.mark.course_id,
        },
      }).then(function (resp) {
        alert(resp.data.msg)
        
      });
    },
  },
};
</script>

<style>
</style>