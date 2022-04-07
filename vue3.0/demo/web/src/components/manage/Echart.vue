<template>
  <div>
    <div class="mychart">

    <div id="main" ref="main"></div>
    <div id="main2" ref="main2"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import bugModel from "../../model/user/bug";
export default {
  data() {
    return {
      xList: [],
      yList: [],
      list: [],
    };
  },
  async mounted() {
    this.myChart = echarts.init(this.$refs.main);
    this.myChart2 = echarts.init(this.$refs.main2);
    let { data } = await bugModel.group();
    console.log(data);

    // this.list = data.data;
    this.list=data.data.map(item=>{
      let obj={};
      obj.value=item.count;
      obj.name=item._id;
      return obj;

    })

    this.xList = data.data.map((item) => item._id);
    this.yList = data.data.map((item) => item.count);
    var option = {
      xAxis: {
        type: "category",
        data: this.xList, //开发名称
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: this.yList, //bug的次数
          type: "bar",
          showBackground: true,
          barWidth: 40, //柱图宽度
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    };

    var option2 = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: this.list
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);
    this.myChart2.setOption(option2);
  },
};
</script>

<style scoped>
.mychart{
  display: flex;
}
#main {
  width: 600px;
  height: 400px;
}
#main2 {
  width: 600px;
  height: 400px;
}
</style>