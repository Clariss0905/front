//引入vue
import Vue from 'vue';
//引入vue-router
import VueRouter from 'vue-router';
//第三方库需要use一下才能用
Vue.use(VueRouter)
import Home from './Home.vue'
//引用page1页面
import Login from './Login.vue';
//引用page2页面
import Regist from './Regist.vue';
import Student from './Student.vue';
import Teacher from './Teacher.vue';
import Info from './Info.vue';
import Course from "./Course.vue";
import Award from './Award.vue';
import TeacherInfo from "./TeacherInfo.vue"
import StudentApplyAward from "./StudentApplyAward.vue"
import TotalGrade from "./TotalGrade.vue"
import TeacherClassGrade from "./TeacherClassGrade.vue"
import TeacherApplyAward from "./TeacherApplyAward.vue"


//定义routes路由的集合，数组类型
const routes = [
    //单个路由均为对象类型，path代表的是路径，component代表组件
    {
        path: '/',
        component: Home,

    },
    {
        path: '/home',
        component: Home,
        children: [{
                path: '/login',
                component: Login,
            },
            {
                path: "/regist",
                component: Regist
            },
        ]
    },
    {
        path: "/student",
        component: Student,
        children: [{
                path: "/info",
                component: Info
            },
            {
                path: "/course",
                component: Course
            },
            {
                path: "/award",
                component: Award
            },
            {
                path: "/studentapplyaward",
                component:StudentApplyAward
            },
            {
                path: "/totalgrade",
                component:TotalGrade
            }
        ]
    },
    {
        path: "/teacher",
        component: Teacher,
        children: [{
                path: "/teacherinfo",
                component: TeacherInfo
            },
            {
                path: "/teacherclassgrade",
                component: TeacherClassGrade
            },
            {
                path: "/teacherapplyaward",
                component:TeacherApplyAward
            },
        ]
    }
]

//实例化VueRouter并将routes添加进去
const router = new VueRouter({
    //ES6简写，等于routes：routes
    routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router