<template>
  <div class="bg">
    <div class="top">
      <div style="padding: 10px; width: 240px">{{ curTime }}</div>
      <div style="
          flex: 1;
          display: flex;
          justify-content: center;
          height: 100px;
          align-items: center;
        ">
        <img
          :src="img1"
          style="height: 90px"
        />
        <span style="font-size: 30px; font-weight: bold">津北公安E监督</span>
      </div>
      <div style="padding: 10px; width: 240px; text-align: right;">
        <el-button
          size="small"
          type="primary"
          @click="gotSystem"
        >业务操作</el-button>
        <div style="padding-top: 30px;    display: flex;align-items: center;">
          <div style="text-align: center;width: 45px;"> <el-button
              style="color:#fff;font-weight: bold;"
              icon="el-icon-caret-left"
              type="text"
              @click="getPreMonth"
            >上月</el-button></div>
          <div style="flex:1;text-align: center;">{{ dateTime }}</div>
          <div style="text-align: center;width: 45px;">
            <el-button
              style="color:#fff;font-weight: bold;"
              type="text"
              @click="getNexMonth"
              v-show="hasNextMonth"
            >下月<i class="el-icon-caret-right el-icon--right"></i></el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div
        class="item"
        style="margin-right: 10px"
      >
        <div
          class="box"
          style="margin-bottom: 10px"
        >
          <div class="item-title2">
            <el-radio-group
              fill="#0072c8"
              :border="true"
              v-model="model1"
              @change="handleChange"
            >
              <el-radio-button label="民警"></el-radio-button>
              <el-radio-button label="辅警"></el-radio-button>
            </el-radio-group>
            <span style="margin-left: 20px">问题Top10</span>
          </div>
          <div class="item-content">
            <div
              v-for="(item, index) in topList"
              v-bind:key="index"
              class="child"
            >
              <span style="width: 80px">{{ item.real_name }}</span>
              <span style="width: 200px;white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                overflow: hidden;">{{ item.dep_name }}</span>
              <span style="width: 50px;text-align: center;">{{ item.problem_count }}</span>

              <div style="flex: 1">
                <el-progress
                  size="small"
                  :define-back-color="'#1855ac'"
                  :show-text="false"
                  :stroke-width="15"
                  :percentage="topNumber==0?0:(item.problem_count / topNumber) * 100"
                ></el-progress>
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="item-title">视频督察问题实时预警</div>
          <div
            class="item-content"
            :id="scrollId"
          >
            <div
              v-for="(item, index) in rtList5"
              v-bind:key="index"
              class="child"
            >
              <div>
                {{ item.place }}【{{ item.datetime }}】发生了<span style="color: #ff653f">【{{ item.event }}】</span>的预警
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="item"
        style="margin-right: 10px"
      >
        <div
          class="box1"
          style="margin-bottom: 10px"
        >
          <div
            class="box1-box img1"
            style="margin-right: 10px"
          >
            <span class="title">{{ problemTJ.all_problem_count }}个</span>
            <span>全部问题</span>
          </div>
          <div
            class="box1-box img2"
            style="margin-right: 10px"
          >
            <span class="title">{{ problemTJ.check_problem_count }}个</span>
            <span>分局检查</span>
          </div>
          <div class="box1-box img3">
            <span class="title">{{ problemTJ.self_problem_count }}个</span>
            <span>各单位自查</span>
          </div>
        </div>
        <div
          class="box"
          style="margin-bottom: 10px"
        >
          <div class="item-title">各派出所问题数量</div>
          <div class="item-content">
            <bar-chart :chart-data="rtList1" />
          </div>
        </div>
        <div class="box">
          <div class="item-title">各派出所自查问题数量</div>
          <div class="item-content">
            <bar-chart :chart-data="rtList2" />
          </div>
        </div>
      </div>
      <div class="item">
        <div
          class="box"
          style="margin-bottom: 10px"
        >
          <div class="item-title">各业务警种检查发现问题数</div>
          <div class="item-content">
            <bar-chart2 :chart-data="rtList3" />
          </div>
        </div>

        <div class="box2">
          <div
            class="box2-item"
            style="margin-right: 10px"
          >
            <div class="item-title">问题整改反馈情况</div>
            <div class="item-content">
              <div style="
                  display: flex;
                  flex-direction: column;
                  height: 150px;
                  justify-content: space-between;
                ">
                <div style="display: flex">
                  <div style="width: 100px"></div>
                  <div class="flex1">问题数</div>
                  <div class="flex1">待整改</div>
                  <div class="flex1">已整改</div>
                </div>
                <div
                  style="display: flex"
                  v-for="(item, index) in problemStatusTJ"
                  v-bind:key="index"
                >
                  <div style="width: 100px">{{ item.type }}</div>
                  <div class="flex1">{{ item.allCount }}</div>
                  <div class="flex1">{{ item.unFeedCount }}</div>
                  <div class="flex1">{{ item.feedCount }}</div>
                </div>
              </div>

              <div style="flex: 1; display: flex">
                <pie-chart :chart-data="rtList4" />
              </div>
            </div>
          </div>
          <div class="box2-item">
            <div class="item-title">问题追责问责情况</div>
            <div class="item-content">
              <div
                v-for="(item, index) in wzList"
                v-bind:key="index"
                class="child2"
              >
                <div style="flex: 1;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">{{ item.accountable_type }}</div>
                <span style="width: 30px">{{ item.accountable_count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "./dashboard/BarChart3";
import BarChart2 from "./dashboard/BarChart4";
import PieChart from "./dashboard/PieChart2";
import axios from "axios";
import { mapGetters } from "vuex";

import {
  getProblemCountInfo,
  getProblemByPolice,
  getProblemByLv2,
  getProblemByPoliceFast,
  getAccountableStatistics,
} from "@/api/problem";

export default {
  computed: {
    ...mapGetters(["admin"]),
  },
  components: { BarChart, PieChart, BarChart2 },
  data() {
    return {
      rtList1: {
        xData: [],
        yData: [],
      },
      rtList2: {
        xData: [],
        yData: [],
      },
      rtList3: {
        xData: [],
        yData: [],
      },
      rtList4: [],

      rtList5: [],

      model1: "民警",
      img1: require("../assets/images/logo.png"),
      data: require("../assets/images/data.json"),

      wzList: [],
      timer: null,
      curTime: "",

      scrollTimer: null, // 滚动定时器
      pauseTimer: null, // 暂停定时器
      scrollId: "scrollId", // 滚动容器id
      scrollDirection: "down", // 滚动方向 up向上 down向下

      problemTJ: {},
      problemStatusTJ: [],
      minJingPrTop: [],
      fuJingPrTop: [],

      topList: [],
      topNumber: 0,

      curMonth: new Date().getMonth() + 1,
      curYear: new Date().getFullYear(),

      dateRange: ["", ""],
      dateTime: undefined,
      hasNextMonth: false,

      pcs0: [
        "墙子派出所",
        "光复道派出所",
        "望海楼派出所",
        "鸿顺里派出所",
        "新开河派出所",
        "月牙河派出所",
        "宁园街派出所",
        "江都路派出所",
        "建昌道派出所",
        "铁东路派出所",
      ],
      pcs1: [
        "墙子",
        "光复道",
        "望海楼",
        "鸿顺里",
        "新开河",
        "月牙河",
        "宁园街",
        "江都路",
        "建昌道",
        "铁东路",
      ],
      zsdw0: [
        "指挥室",
        "政治处",
        "督察审计支队",
        "纪委办公室",
        "警务保障室",
        "治安管理支队",
        "法制支队",
        "国内安全保卫支队",
        "打击犯罪侦查支队",
        "网络安全保卫支队",
        "科技信息化支队",
      ],
      zsdw1: [
        "指挥室",
        "政治处",
        "督审支队",
        "纪委办",
        "警保室",
        "治安支队",
        "法制支队",
        "国保支队",
        "打侦支队",
        "网安支队",
        "科信支队",
      ],
    };
  },
  created() {
    if (
      this.admin.role_name == "superadmin" ||
      this.admin.role_name == "admin" ||
      (this.admin.role_name == "ds_admin" &&
        ((this.admin.department_uuid2_name.indexOf("督察审计支队") != -1 &&
          this.admin.full_name.indexOf("督察审计支队二大队") == -1) ||
          this.admin.department_uuid2_type == "分局"))
    ) {
      // this.$router.push({ path: "/screen" }).catch(() => { });
    } else {
      this.$modal.msgError("您无此权限访问!");
      this.$router.push("/index");
      return;
    }

    this.getCurDate();

    // this.rtList2.xData = this.data.pcsZCPrTop.map((item) => item.name);
    // this.rtList2.yData = this.data.pcsZCPrTop.map((item) => item.count);

    this.curTime = this.parseTime(new Date());
    this.timer = setInterval(() => {
      this.curTime = this.parseTime(new Date());
    }, 1 * 1000);
    this.getJson2();

    this.getData();
  },

  destroyed() {
    // 清理定时器
    clearTimeout(this.pauseTimer);
    this.pauseTimer = null;
    clearInterval(this.scrollTimer);
    this.scrollTimer = null;
    // 清理点击监听
    window.document.removeEventListener("click", this.pauseScroll);
  },

  mounted() {
    this.$nextTick(() => {
      // 在这里执行需要在数据渲染完成后进行的操作
    });
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //关闭
    }
  },
  methods: {
    gotSystem() {
      this.$router.push({ path: "/" });
    },

    handleChange(val) {
      this.getTopData();
    },

    getData() {
      const query = {};
      if (this.dateRange[0]) {
        query.start_create_datetime = this.dateRange[0];
      }
      if (this.dateRange[1]) {
        query.end_create_datetime = this.dateRange[1];
      }

      getProblemCountInfo(query).then((resp) => {
        this.rtList4 = [];
        this.problemStatusTJ = [];
        this.problemTJ = resp;
        var obj1 = {
          type: "全部问题",
          allCount: this.problemTJ.all_problem_count,
          feedCount: this.problemTJ.all_feedback_count,
          unFeedCount: this.problemTJ.all_unfeedback_count,
        };
        var obj2 = {
          type: "分局检查",
          allCount: this.problemTJ.check_problem_count,
          feedCount: this.problemTJ.check_feedback_count,
          unFeedCount: this.problemTJ.check_unfeedback_count,
        };
        var obj3 = {
          type: "各单位自查",
          allCount: this.problemTJ.self_problem_count,
          feedCount: this.problemTJ.self_feedback_count,
          unFeedCount: this.problemTJ.self_unfeedback_count,
        };
        this.problemStatusTJ.push(obj1);
        this.problemStatusTJ.push(obj2);
        this.problemStatusTJ.push(obj3);

        var obj4 = {
          name: "分局检查",
          value: this.problemTJ.check_problem_count,
        };
        var obj5 = {
          name: "各单位自查",
          value: this.problemTJ.self_problem_count,
        };
        this.rtList4.push(obj4);
        this.rtList4.push(obj5);
      });
      getProblemByPoliceFast(query).then((resp) => {
        resp.array.forEach((item) => {
          if (item.name == "minjing") {
            this.minJingPrTop = item.list.slice(0, 10);
          } else {
            this.fuJingPrTop = item.list.slice(0, 10);
          }
          this.getTopData();
        });
      });
      getProblemByLv2(query).then((resp) => {
        this.rtList1.xData = [];
        this.rtList1.yData = [];

        this.rtList2.xData = [];
        this.rtList2.yData = [];

        this.rtList3.xData = [];
        this.rtList3.yData = [];

        if (resp.array.length > 0) {
          resp.array.forEach((item) => {
            if (item.name == "paichusuo") {
              var list1 = [...item.list].sort(
                this.sortBy("created_problem_count")
              );
              var list2 = [...item.list].sort(
                this.sortBy("self_problem_count")
              );

              for (let i = 0; i < list1.length; i++) {
                for (let j = 0; j < this.pcs0.length; j++) {
                  if (list1[i].name == this.pcs0[j]) {
                    this.rtList1.xData.push(this.pcs1[j]);
                    this.rtList1.yData.push(list1[i].created_problem_count);
                  }
                }
              }

              for (let i = 0; i < list2.length; i++) {
                for (let j = 0; j < this.pcs0.length; j++) {
                  if (list2[i].name == this.pcs0[j]) {
                    this.rtList2.xData.push(this.pcs1[j]);
                    this.rtList2.yData.push(list2[i].self_problem_count);
                  }
                }
              }
            } else {
              var list1 = [...item.list].sort(
                this.sortBy("check_problem_count")
              );
              for (let i = 0; i < list1.length; i++) {
                for (let j = 0; j < this.zsdw0.length; j++) {
                  if (list1[i].name == this.zsdw0[j]) {
                    this.rtList3.xData.push(this.zsdw1[j]);
                    this.rtList3.yData.push(list1[i].check_problem_count);
                  }
                }
              }
            }
          });

          console.log(this.rtList1);
          console.log(this.rtList3);
        }
      });
      getAccountableStatistics(query).then((resp) => {
        console.log(resp);
        this.wzList = resp.array;
      });
    },

    async getJson2() {
      await this.getJson();
      this.dataCompleteFun();
    },
    getJson() {
      return new Promise((resolve) => {
        axios
          .get(process.env.VUE_APP_BASE_API + "/webapp/data.json")
          .then((res) => {
            this.rtList5 = res.data;
            resolve("next");
          });
      });
    },

    getCurDate() {
      let date1 = new Date(this.parseTime(this.curYear + "-" + this.curMonth));
      let date2 = new Date(this.curYear, this.curMonth, 0);

      this.dateRange[0] = this.parseTime(date1, "{y}-{m}-{d}") + " 00:00:00";
      this.dateRange[1] = this.parseTime(date2, "{y}-{m}-{d}") + " 23:59:59";

      this.dateTime = this.parseTime(date1, "{y}年{m}月");
    },

    getPreMonth() {
      this.curMonth--;
      if (this.curMonth == 0) {
        this.curYear--;
        this.curMonth = 12;
      }
      this.hasNextMonth = true;
      this.getCurDate();
      this.getData();
    },

    getNexMonth() {
      let nowMonth = new Date().getMonth() + 1;
      let nowYear = new Date().getFullYear();
      this.curMonth++;
      if (this.curMonth == 13) {
        this.curMonth = 1;
        this.curYear++;
      }

      if (this.curMonth == nowMonth && this.curYear == nowYear) {
        this.hasNextMonth = false;
      }

      this.getCurDate();
      this.getData();
    },

    getTopData() {
      if (this.model1 == "民警") {
        this.topList = this.minJingPrTop;
      } else {
        this.topList = this.fuJingPrTop;
      }

      if (this.topList.length == 0) {
        this.topNumber = 0;
      } else {
        this.topNumber = this.topList[0].problem_count;
      }
    },

    sortBy(field) {
      return (x, y) => {
        return y[field] - x[field];
      };
    },

    // 数据加载完成方法
    dataCompleteFun() {
      // 开启滚动
      this.autoScroll();
    },
    autoScroll() {
      const scrollHeight = document.getElementById(this.scrollId).scrollHeight;
      const clientHeight = document.getElementById(this.scrollId).clientHeight;
      const scroll = scrollHeight - clientHeight;
      // 滚动长度为0
      if (scroll === 0) {
        return;
      }
      // 触发滚动方法
      this.scrollFun();
      // 去除点击监听
      window.document.removeEventListener("click", this.pauseScroll);
      // 重设点击监听
      window.document.addEventListener("click", this.pauseScroll, false);
    },
    pauseScroll() {
      // 定时器不为空
      if (this.scrollTimer) {
        // 清除定时器
        clearInterval(this.scrollTimer);
        this.scrollTimer = null;
        // 一秒钟后重新开始定时器
        this.pauseTimer = setTimeout(() => {
          this.scrollFun();
        }, 2000);
      }
    },
    scrollFun() {
      // 如果定时器存在
      if (this.scrollTimer) {
        // 则先清除
        clearInterval(this.scrollTimer);
        this.scrollTimer = null;
      }
      this.scrollTimer = setInterval(() => {
        const scrollHeight = document.getElementById(
          this.scrollId
        ).scrollHeight;
        const clientHeight = document.getElementById(
          this.scrollId
        ).clientHeight;
        const scroll = scrollHeight - clientHeight;
        // 获取当前滚动条距离顶部高度
        const scrollTop = document.getElementById(this.scrollId).scrollTop;
        // 向下滚动
        if (this.scrollDirection === "down") {
          const temp = scrollTop + 2;
          document.getElementById(this.scrollId).scrollTop = temp; // 滚动
          // 距离顶部高度  大于等于 滚动长度
          if (scroll <= temp) {
            // 滚动到底部 停止定时器
            clearInterval(this.scrollTimer);
            this.scrollTimer = null;

            document.getElementById(this.scrollId).scrollTop = 0;

            // // 改变方向
            // this.scrollDirection = "up";
            // // 一秒后重开定时器
            setTimeout(() => {
              this.scrollFun();
            }, 1000);
          }
          // 向上滚动
        } else if (this.scrollDirection === "up") {
          const temp = scrollTop - 0.5;
          document.getElementById(this.scrollId).scrollTop = temp; // 滚动
          // 距离顶部高度  小于等于 0
          if (temp <= 0) {
            // 滚动到底部 停止定时器
            clearInterval(this.scrollTimer);
            this.scrollTimer = null;
            // 改变方向
            this.scrollDirection = "down";
            // 一秒后重开定时器
            setTimeout(() => {
              this.scrollFun();
            }, 1000);
          }
        }
      }, 150);
    },
  },
};
</script>

<style lang="scss" scope >
.bg {
  z-index: 999;
  background: #0d3586;
  padding: 0 10px 10px 10px;
  height: 100vh !important;
  flex-direction: column;
  display: flex;
  overflow: hidden;
  font-size: 16px;

  .el-radio-button__inner {
    background: #0d3586;
    color: #fff;
  }

  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    border: 1px solid #dcdfe6 !important;
    background: #0072c8;
  }

  .top {
    background-image: url("../assets/images/header.png");
    background-size: 100% 100%;
    height: 130px;
    display: flex;
    color: #fff;
  }

  .bottom {
    height: calc(100vh - 130px);
    display: flex;
    color: #fff;

    .item {
      flex: 1;
      display: flex;
      flex-direction: column;

      .box {
        background: #1855ac;
        flex: 1;
        padding: 10px;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .box1 {
        display: flex;
        justify-content: space-between;

        .box1-box {
          border-radius: 10px;
          display: flex;
          height: 120px;
          flex: 1;
          background-size: 100% 100%;
          flex-direction: column;
          justify-content: center;
          padding: 20px;
          color: #fff;

          .title {
            font-size: 30px;
            font-weight: bold;
            color: #fff;
          }
        }

        .img1 {
          background-image: url("../assets/images/r1.png");
        }

        .img2 {
          background-image: url("../assets/images/r2.png");
        }

        .img3 {
          background-image: url("../assets/images/r3.png");
        }
      }

      .box2 {
        flex: 1;
        display: flex;

        .box2-item {
          flex: 1;
          padding: 10px;
          background: #1855ac;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
      }
    }

    .item2 {
      display: flex;
      flex-direction: column;
      width: 450px;
      .box {
        background: #1855ac;
        flex: 1;
        padding: 10px;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
    }

    .item-title {
      font-size: 18px;
      border-bottom: 1px solid #bababa75;
      padding-bottom: 10px;
      font-weight: bold;
    }

    .item-title2 {
      font-size: 18px;
      font-weight: bold;
    }

    .item-content {
      margin-top: 20px;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 0 5px 0 5px;
      .child {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .el-progress-bar__inner {
          background-image: linear-gradient(
            90deg,
            #00ccdf 0%,
            #00b96e 100%
          ); // 给进度条加上渐变色
        }
      }

      .child2 {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 5px;
        .el-progress-bar__inner {
          background-image: linear-gradient(
            90deg,
            #ffba3f 0%,
            #ff8734 100%
          ); // 给进度条加上渐变色
        }
      }
    }

    .item-content::-webkit-scrollbar {
      display: none;
    }
  }

  .flex1 {
    flex: 1;
    text-align: center;
  }
}
</style>