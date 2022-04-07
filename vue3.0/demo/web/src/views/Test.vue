 <template>
  <div>
    <div class="nav-top">
      <h1>Bug{{$t('lang.managementSystem')}}<span class="el-icon-setting"></span></h1>
      <h3>{{$t("lang.TestPersons")}}<span class="el-icon-user-solid"></span></h3>
      <div class="user">
        <p>{{$t("lang.welcome")}}:{{ username }}</p>
        <p @click="exit()">{{$t('lang.exist')}}</p>
      </div>
       <el-select  placeholder="中文" v-model="language" @change="changeLang">
          <el-option label="english" value="en"></el-option>
          <el-option label="中文" value="zh"></el-option>
        </el-select>
    </div>
    <el-tabs :tab-position="tabPosition">
      <!-- <el-tab-pane label="人员注册">用户管理</el-tab-pane>
      <el-tab-pane label="人员查看">配置管理</el-tab-pane> -->
      <el-tab-pane label="Bug测试">
        <div>
          <!-- <h3 class="title"> <span class="el-icon-coordinate"></span> 测试人员操作台</h3> -->
          <add></add>
          <div class="navtop">
            <!-- <span class="zp">搜索指派开发人员:</span> -->
            <!-- <div class="search">
              <el-input v-model="key" placeholder="请输入内容"></el-input>
            </div>  -->
            <div class="select">
              <el-select v-model="type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- @updatetype="updateType" -->
          <el-list :list="bugList" @updatetype="updateType" type="3"></el-list>
          <div class="page">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="pagesize"
              @current-change = "change"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="图表统计">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import list from "../components/test/List.vue";
import add from "../components/test/Add.vue";
import leaveModel from "../model/bugleave/index";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      language:"",
      tabPosition: "left",
      key: "",
      // list: [],
      total: 10, //总数
      pagesize: 5, //每页显示10条
      page: 1, //默认第一页
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
          value: "3",
          label: "修复成功"
        }
      ],
      type: ""
    };
  },
  watch:{
    type(){
      this.page = 1;
      this.search();
    },
    key(){
      this.page = 1;
      this.search();
    }
  },
  computed: {
    ...mapState("testbug", ["bugList"])
  },
  methods: {
    ...mapActions("testbug", ["allUserbugList","orderBugList"]),
    change(page){
      this.page = page;
      this.search();
    },
    changeLang() {
      // let lang = this.$i18n.locale === "zh" ? "en" : "zh";
      // this.$i18n.locale = lang;
      this.$i18n.locale=this.language

    },
    search(){
      this.orderBugList({
        page:this.page,
        type:this.type,
        key:this.key,
        shownum:this.pagesize
      }).then(res=>{
        if(res.code == 1){
          console.log("正确");
          this.total = res.total;
        }
      })
    },
    async updateType(info) {
      //info是一个对象  对象里面有两个属性 一个item(对象)  type
      console.log(info);
      info.item.type = info.type;
      await leaveModel.update({ _id: info.item._id, type: info.type });
    },
    exit(){ // 退出
      window.localStorage.removeItem("token");
      this.$router.push("/");
    }
  },
  created() {
    this.search();
    this.username = window.localStorage.getItem("userinfo");
    
  },
  components: {
    add,
    elList: list
  }
};
</script>

<style scoped>
.nav-top {
  background-color: rgb(58, 56, 56);
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-between;
  line-height: 100px;
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
*{
  margin: 0;
  padding: 0;
}
.title {
  color: wheat;
  display: flex;
  padding-left: 50px;
  background-color: cornflowerblue;
  line-height: 65px;
}
.title span{
  line-height: 65px;
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
.select {
  width: 150px;
  margin-left: 15px;
}
.page {
  margin: 20px 0;
}
.zp{
  margin-left: 15px;
  font-size:14px;
  font-weight: 600;
}
</style>
