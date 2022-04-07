<template>
  <div>
    <div class="nav-top">
      <h1>BUG{{$t('lang.managementSystem')}}</h1>
      <h3>{{$t("lang.itemProject")}}</h3>
      <div class="user">
        <p>{{$t("lang.welcome")}}:{{ username }}</p>
        <p @click="gotoHome">{{$t('lang.exist')}}</p>
       
        
      </div>
      <el-select  placeholder="中文" v-model="language" @change="changeLang">
          <el-option label="english" value="en"></el-option>
          <el-option label="中文" value="zh"></el-option>
        </el-select>
    </div>

    <el-tabs :tab-position="tabPosition" @tab-click="change">
      <el-tab-pane :label="$t('lang.personalRegister')">
        <add-user></add-user>
      </el-tab-pane>
      <el-tab-pane :label="$t('lang.personalFind')">
        <find-user></find-user>
      </el-tab-pane>
      <el-tab-pane :label="$t('lang.bugFind')">
        <all-bugs></all-bugs>
      </el-tab-pane>
      <el-tab-pane :label="$t('lang.echarts')">
        <echart-statis></echart-statis>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import addUser from "../components/manage/AddUser.vue";
import findUser from "../components/manage/FindUser.vue";
import allBugs from "../components/manage/AllBugs.vue";
import echartStatis from "../components/manage/Echart.vue";
export default {
  data() {
    return {
      tabPosition: "left",
      username: "",
      language:""
    };
  },
  methods: {
    change(index) {
      // console.log(index);
    },
    gotoHome() {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userinfo");
      this.$router.push("/");
    },
    changeLang() {
      // let lang = this.$i18n.locale === "zh" ? "en" : "zh";
      // this.$i18n.locale = lang;
      this.$i18n.locale=this.language

    },
  },
  components: {
    addUser,
    findUser,
    allBugs,
    echartStatis,
  },
  created() {
    this.username = window.localStorage.getItem("userinfo");
  },
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
  color: rgba(19, 218, 245, 0.546);
}
.user {
  display: flex;
}
.user p {
  margin: 0 20px;
  text-align: center;
  
}

</style>
