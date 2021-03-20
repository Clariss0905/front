<template>
  <el-container style="height: 720px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-user"></i>用户信息</template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="toInfo()">我的信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-reading"></i>成绩查询</template
          >
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="toCourse()"
              >课程成绩</el-menu-item
            >
            <el-menu-item index="2-2" @click="toTotal()"
              >查询综合成绩</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-notebook-2"></i>获奖惩记录</template
          >
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="toAward()"
              >查看获奖惩记录</el-menu-item
            >
            <el-menu-item index="3-2" @click="toApply()">奖惩申请</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span style="text-align: left">欢迎登录评奖评优系统学生端</span>
        <el-dropdown>
          <i class="el-icon-arrow-down" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
            <!-- 登录退出功能 -->
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ userInfo[0].id }}</span>
      </el-header>

      <el-main>
        <router-view v-if="isRouterAlive"> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import axios from "axios";
export default {
  created: function () {
    this.getParams();
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      uid: "",
      userInfo: [],
      isRouterAlive: true,
    };
  },
  methods: {
    getParams() {
      // 取到路由带过来的参数
      var _this = this;
      var data = sessionStorage.getItem("id");
      _this.uid = data;
      console.log(_this.uid);
      var url = "http://127.0.0.1:5000/userInfo?userid=" + _this.uid;
      axios.get(url).then(function (reqs) {
        _this.userInfo = reqs.data;
        console.log(_this.userInfo);
      });
    },

    toInfo() {
      var id = this.uid;
      // 跳转用户信息页面
      this.$router.push({ path: "/info", query: { id: id } });
    },
    toCourse() {
      var id = this.uid;
      // 跳转用户信息页面
      this.$router.push({ path: "/course", query: { id: id } });
    },
    toAward() {
      var id = this.uid;
      // 跳转用户信息页面
      this.$router.push({ path: "/award", query: { id: id } });
    },
    toApply() {
      var id = this.uid;
      // 跳转用户信息页面
      this.$router.push({ path: "/studentapplyaward", query: { id: id } });
    },
    toTotal() {
      var id = this.uid;
      // 跳转用户信息页面
      this.$router.push({ path: "/totalgrade", query: { id: id } });
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>