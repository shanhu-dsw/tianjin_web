<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

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
      type: Array,
      default: [
        { value: 1, name: "Gold" },
        { value: 1, name: "Forecasts" },
      ],
    },
  },
  data() {
    return {
      chart: null,
    };
  },

  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
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

    setOptions(data) {
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        // legend: {
        //   type: "scroll",
        //   orient: "vertical",
        //   right: 20,
        //   top: 0,
        //   data: data.map((item) => item.name),
        //   formatter: function (params) {
        //     var val = "";
        //     if (params.length > 10) {
        //       val = params.substr(0, 10) + "...";
        //       return val;
        //     }
        //     return params;
        //   },
        // },
        series: [
          {
            type: "pie",
            // roseType: "radius",
            // radius: [15, 95],
            radius: ["30%", "60%"],
            center: ["50%", "50%"],
            data: data,
            label: {
              show: true,
              formatter: function (arg) {
                return arg.name + "\n" + arg.value + "个\n" + arg.percent + "%";
              },
              textStyle: {
                //数值样式
                color: "#fff",
                fontSize: "9",
              },
            },
            // animationEasing: "cubicInOut",
            // animationDuration: 2600,
          },
        ],
      });
    },
  },
};
</script>
