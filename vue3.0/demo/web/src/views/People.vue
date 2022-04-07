<template>
  <div>
    <div class="nav-top">
      <h1>bug管理系统</h1>
      <h3>开发者</h3>
      <div class="user">
        <p>欢迎:{{ username }}</p>
        <!-- <p>欢迎:yiyang</p> -->
        <p @click="exit">退出</p>
      </div>
    </div>

    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="Bug状态">
        <div class="navtop">
          <span class="zp">搜索bug详情:</span>
          <div class="search">
            <el-input v-model="key" placeholder="请输入内容"></el-input>
          </div>
          <div class="item">
            <el-select v-model="type" placeholder="请选择状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <el-list :list="userbugList" type="2" @updatetype="updateType"></el-list>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pagesize"
            @current-change="changePage"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import list from "../components/development/List.vue";
import leaveModel from "../model/bugPeople";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      username:"",
      tabPosition: "left",
      total: 10, //所有的bug数
      pagesize: 5, //每页显示的数据条数
      page: 1, //第几页
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "待修复"
        },
        {
          value: "2",
          label: "修复完成"
        }
      ],
      type: "", //筛选的状态
      key: ""
    };
  },
  watch: {
    type() {
      this.page = 1;
      this.search();
    },
    key() {
      this.page = 1;
      this.search();
    }
  },
  computed: {
    ...mapState("bugInfo", ["userbugList"])
  },
  methods: {
    ...mapActions("bugInfo", ["initUserbugList", "orderBugList"]),
    exit() {
      window.localStorage.removeItem("token");
      this.$router.push("/");
    },
    changePage(page) {
      // console.log(111);
      this.page = page;
      this.search();
    },
    search() {
      this.orderBugList({
        page: this.page,
        type: this.type,
        key: this.key,
        shownum: this.pagesize
      }).then(res => {
        if (res.code == 1) {
          console.log(1111);
          this.total = res.total;
        }
      });
    },
    async updateType(info) {
      // console.log(info);
      info.item.type = info.type; //把对象里面的type赋值给页面点击的那行
      console.log(info);
      await leaveModel.update({ _id: info.item._id, type: info.type });
    }
  },
  created() {
    this.search();
    
    this.username = window.localStorage.getItem("userinfo");
  },
  components: {
    elList: list
  }
};
</script>

<style scoped>
.nav-top {
  background-color: rgb(58, 56, 56);
  display: flex;
  align-items: center;
  color: bisque;
  justify-content: space-between;
}
.nav-top h1 {
  font-size: 24px;
  margin-left: 20px;
  font-weight: normal;
  color: rgba(19, 218, 245, 0.548);
}
.user {
  display: flex;
}
.user p {
  margin: 0 20px;
}
.el-table .el-table__cell {
  text-align: center;
}
.navtop {
  display: flex;
  margin: 20px 0;
  line-height: 40px;
}
.search {
  margin-left: 15px;
  width: 300px;
}
.item {
  width: 120px;
  margin-left: 15px;
}
.page {
  margin: 20px 0;
}
</style>
