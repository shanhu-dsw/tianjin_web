<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 0;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    chartData: {
      type: Object,
      default: {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yData: [79, 52, 200, 334, 390, 330, 220],
      },
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },

  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },

    setOptions({ xData, yData }) {
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 20,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              interval: 0,
              rotate: 45, //倾斜度 -90 至 90 默认为0
              color: "#fff",
              fontSize: "16",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                type: "dashed", // y轴分割线类型
                color: "#bababa75",
              },
            },
            axisLabel: {
              color: "#fff",
              fontSize: "16",
            },
            splitArea: {
              // 分割区域
              show: false,
              areaStyle: {},
            },
          },
        ],
        series: [
          {
            type: "bar",
            stack: "vistors",
            barWidth: 15,
            data: yData,
            animationDuration,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  { offset: 0, color: "#ffba3f" },
                  { offset: 1, color: "#ff8734" },
                ]),
                barBorderRadius: [5, 5, 0, 0], // （顺时针左上，右上，右下，左下）
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#fff",
                    fontSize: "16",
                  },
                },
              },
            },
          },
        ],
      });
    },
  },
};
</script>
