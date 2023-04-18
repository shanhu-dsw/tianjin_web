<template>
  <div class="app-container">
    <el-row
      type="flex"
      justify="space-between"
      class="top-group"
    >
      <div
        class="card-panel"
        @click="gotoAddProblem"
        style="background: #00db96"
      >
        <div class="card-panel-icon-wrapper">
          <img
            :src="img1"
            style="width: 50px"
          />
        </div>
        <div class="card-panel-text-wrapper">录入问题</div>
        <div class="card-panel-bottom-wrapper"></div>
      </div>
      <div
        class="card-panel"
        @click="gotoFeedBackList"
        style="background: #ffc200"
      >
        <div class="card-panel-icon-wrapper">
          <img
            :src="img2"
            style="width: 50px"
          />
        </div>
        <div class="card-panel-text-wrapper">情况反馈</div>
        <div class="card-panel-bottom-wrapper"></div>
      </div>
      <div
        class="card-panel"
        @click="gotoAllList"
        style="background: #009cff"
      >
        <div class="card-panel-icon-wrapper">
          <img
            :src="img3"
            style="width: 50px"
          />
        </div>
        <div class="card-panel-text-wrapper">问题列表</div>
        <div class="card-panel-bottom-wrapper"></div>
      </div>
      <div
        class="card-panel"
        @click="gotoReport"
        style="background: #ff4257"
      >
        <div class="card-panel-icon-wrapper">
          <img
            :src="img4"
            style="width: 50px"
          />
        </div>
        <div class="card-panel-text-wrapper">统计信息</div>
        <div class="card-panel-bottom-wrapper"></div>
      </div>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { exportWord, getBase64Sync } from "@/utils/exportFile.js";

export default {
  name: "index",
  computed: {
    ...mapGetters(["admin"]),
  },

  data() {
    return {
      img1: require("../assets/images/h1.png"),
      img2: require("../assets/images/h2.png"),
      img3: require("../assets/images/h3.png"),
      img4: require("../assets/images/h4.png"),
      curMonth: new Date().getMonth() + 1,
      curYear: new Date().getFullYear(),

      test: {
        startTime: "2022年4月5日",
        endTime: "2022年4月6日",
        minjing: [
          {
            index: 1,
            name: "测试1",
            dept: "部门1",
            count: 10,
          },
          {
            index: 2,
            name: "测试1",
            dept: "部门1",
            count: 10,
          },
          {
            index: 3,
            name: "测试1",
            dept: "部门1",
            count: 10,
          },
          {
            index: 4,
            name: "测试1",
            dept: "部门1",
            count: 10,
          },
          {
            index: 5,
            name: "测试1",
            dept: "部门1",
            count: 10,
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    gotoAddProblem() {
      if (
        this.admin.role_name == "fu_jing" ||
        this.admin.role_name == "min_jing"
      ) {
        this.$modal.msgError("您无此权限!");
        return;
      }
      this.$router.push("/problem/add");

      // exportWord(
      //   "/tempDocx/问题高发人员统计报告.docx",
      //   this.test,
      //   "问题高发人员统计报告.docx",
      //   null
      // );
    },

    gotoFeedBackList() {
      this.$router.push({
        path: "/problem/list",
        query: { status: "UN_FEEDBACK" },
      });
    },

    gotoAllList() {
      this.$router.push("/problem/list");
    },

    gotoReport() {
      this.$router.push("/problem/report");
    },
  },
};
</script>

<style lang="scss" scoped>
.top-group {
  width: 100%;
  .card-panel {
    width: 280px;
    height: 350px;
    cursor: pointer;
    border-radius: 6px;
    background: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .card-panel-icon-wrapper {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: #ffffff6e;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .card-panel-text-wrapper {
      color: #fff;
      font-size: 30px;
      font-weight: bold;
    }

    .card-panel-bottom-wrapper {
      background-image: url("../assets/images/b1.png");
      background-size: cover;
      height: 100px;
      width: 100%;
      position: absolute;
      bottom: -13px;
    }
  }

  .test {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
  }
}
</style>

