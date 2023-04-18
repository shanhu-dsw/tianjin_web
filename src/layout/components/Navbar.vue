<template>
  <div
    class="navbar"
    :style="'height:' + height"
  >
    <el-row
      type="flex"
      justify="center"
      align="middle"
      class="top-menu"
    >
      <el-col class="logo">
        <a @click="$router.push('/index')">津北公安E监督</a></el-col>
      <el-col><el-input
          style="font-size: 16px"
          class="el-input-search"
          placeholder="输入问题编号跳转到问题"
          prefix-icon="el-icon-search"
          v-model="number"
          clearable
          maxlength="11"
          type="number"
          @keyup.enter.native="handleQuery"
        >
        </el-input></el-col>
      <el-col>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
        >
          <el-col style="text-align: center">
            <el-badge
              :value="noRead"
              :max="100"
              @click.native="$router.push('/problem/message')"
            >
              <svg-icon
                icon-class="lingdang"
                style="font-size: 30px; color: #fff"
              />
            </el-badge>
          </el-col>

          <el-col>

            <el-dropdown
              class="avatar-container right-menu-item hover-effect"
              trigger="click"
            >
              <div class="avatar-wrapper">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
                <span class="user-name">{{ admin.real_name}}({{admin.name }})</span>
                <i class="el-icon-caret-bottom" />
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="gotoScreen"
                  v-if="checkScreen()"
                >
                  <span>数据概览</span>
                </el-dropdown-item>

                <el-dropdown-item
                  @click.native="gotoReport2"
                  v-if="checkReportFile()"
                >
                  <span>督察报告</span>
                </el-dropdown-item>

                <el-dropdown-item @click.native="gotoUser">
                  <span>个人信息</span>
                </el-dropdown-item>
                <el-dropdown-item @click.native="logout">
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row
      type="flex"
      v-if="isIndex"
      style="padding: 10px 100px 0 140px"
    >
      <el-row
        type="flex"
        style="align-items: center"
      >
        <img
          style="height: 200px; opacity: 0.5"
          :src="logo"
        />
      </el-row>

      <el-row
        type="flex"
        style="
          font-size: 25px;
          color: #fff;
          font-weight: bold;
          margin-left: 30px;
          flex-direction: column;
          justify-content: center;
        "
      >
        <el-col>
          欢迎<span
            style="color: #ff6d41; text-decoration: underline;cursor:pointer"
            @click="gotoUser"
          >
            {{ admin.real_name }}（#{{ admin.name }}）</span>访间本系统，最近登录时间为：{{ logTime }} 。</el-col>
      </el-row>
    </el-row>

    <el-row
      type="flex"
      justify="space-between"
      class="top-group"
      v-if="!isIndex"
    >
      <el-col
        class="card-panel"
        @click.native="gotoAddProblem"
        style="background: #00db96"
      >
        <div class="card-panel-icon-wrapper">
          <img
            :src="img1"
            style="height: 70px"
          />
        </div>
        <div class="card-panel-text-wrapper">录入问题</div>

        <b :class="{
            active: $route.path == '/problem/add',
          }"></b>
      </el-col>
      <el-col
        class="card-panel"
        @click.native="gotoFeedBackList"
        style="background: #ffc200"
      >
        <div class="card-panel-icon-wrapper">
          <img
            :src="img2"
            style="height: 70px"
          />
        </div>
        <div class="card-panel-text-wrapper">情况反馈</div>
        <b :class="{
            active: $route.path == '/problem/list2',
          }"></b>
      </el-col>
      <el-col
        class="card-panel"
        @click.native="gotoAllList"
        style="background: #009cff"
      >
        <div class="card-panel-icon-wrapper">
          <img
            :src="img3"
            style="height: 70px"
          />
        </div>
        <div class="card-panel-text-wrapper">问题列表</div>
        <b :class="{
            active: $route.path == '/problem/list',
          }"></b>
      </el-col>
      <el-col
        class="card-panel"
        @click.native="gotoReport"
        style="background: #ff4257"
      >
        <div class="card-panel-icon-wrapper">
          <img
            :src="img4"
            style="height: 70px"
          />
        </div>
        <div class="card-panel-text-wrapper">统计信息</div>
        <b :class="{
            active: $route.path == '/problem/report',
          }"></b>
      </el-col>
    </el-row>
    <el-dialog
      title="修改密码"
      :visible.sync="open"
      width="500px"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item
          label="新密码"
          prop="newPassword"
        >
          <el-input
            v-model="form.newPassword"
            placeholder="请输入新密码"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="confirmPassword"
        >
          <el-input
            v-model="form.confirmPassword"
            placeholder="请确认新密码"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="submitForm"
          >保存</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="open = false"
          >关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  refreshAdminToken,
  getProblem,
  modifyAdmin,
  getProblemByFromUuidOrToUuid,
  getProblemByLeader,
  getLogonLogoffInfo,
  getProblemExact,
} from "@/api/problem";
import { setToken } from "@/utils/auth";
import { mapGetters } from "vuex";
import { checkAdmin } from "@/utils/ruoyi";

export default {
  computed: {
    ...mapGetters(["admin", "noRead"]),
  },
  components: {},

  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.form.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      img1: require("../../assets/images/h1.png"),
      img2: require("../../assets/images/h2.png"),
      img3: require("../../assets/images/h3.png"),
      img4: require("../../assets/images/h4.png"),
      isIndex: true,
      height: "300px",
      number: "",
      avatar: require("../../assets/images/user.png"),
      logo: require("../../assets/images/logo.png"),
      timer: null,
      queryParams: {
        offset: 0,
        rows: 1,
        read: "UN_READ",
      },
      open: false,
      form: {
        newPassword: undefined,
        confirmPassword: undefined,
      },

      // 表单校验
      rules: {
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
      },
      logTime: "",
    };
  },

  watch: {
    $route(to, form) {
      if (to.path == "/index") {
        this.isIndex = true;
        this.height = "300px";
      } else {
        this.isIndex = false;
        this.height = "200px";
      }
      console.log(to.path);
    },
  },

  created() {
    this.queryParams.to_uuid = this.admin.uuid;
    this.timer = setInterval(() => {
      refreshAdminToken().then((res) => {
        setToken(res.token);
      });
      this.$store.dispatch("GetNoRead", this.queryParams);
    }, 60 * 1000);

    let path = this.$route.path;
    if (path == "/index") {
      this.isIndex = true;
      this.height = "300px";
    } else {
      this.isIndex = false;
      this.height = "200px";
    }

    this.$store.dispatch("GetNoRead", this.queryParams);
    this.getLog();
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //关闭
    }
  },
  methods: {
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.href = "/webapp/spot-web";
          });
        })
        .catch(() => {});
    },

    getLog() {
      const query = {
        name: this.admin.name,
        type: "LOGIN",
        offset: 1,
        rows: 1,
      };
      getLogonLogoffInfo(query).then((resp) => {
        if (resp.array.length > 0) {
          this.logTime = resp.array[0].create_datetime;
        } else {
          this.logTime = this.parseTime(new Date());
        }
      });
    },

    gotoUser() {
      this.$router.push("/problem/user");
    },

    gotoScreen() {
      this.$router.push("/screen");
    },

    gotoReport2() {
      this.$router.push("/problem/report2");
    },

    gotoAddProblem() {
      if (
        this.admin.role_name == "fu_jing" ||
        this.admin.role_name == "min_jing"
      ) {
        this.$modal.msgError("您无此权限!");
        return;
      }
      this.$router.push("/problem/add");
    },

    gotoFeedBackList() {
      this.$router.push({
        path: "/problem/list2",
        query: { status: "UN_FEEDBACK" },
      });
    },

    gotoAllList() {
      this.$router.push("/problem/list");
    },

    gotoReport() {
      this.$router.push("/problem/report");
    },

    handleQuery() {
      if (this.number) {
        let query = {
          number: this.number,
          offset: 0,
          rows: 1,
        };
        query = checkAdmin(this.admin, query, false);
        getProblemExact(query).then((resp) => {
          if (resp.count == 1) {
            this.$router.push({
              path: "/problem/view",
              query: { number: this.number },
            });
          } else {
            this.$modal.notifyError("抱歉，该问题不存在！");
          }
          this.number = "";
        });
      }
    },

    changePwd() {
      this.form = {
        newPassword: undefined,
        confirmPassword: undefined,
      };
      this.open = true;
    },

    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          const data = {
            uuid: this.admin.uuid,
            password: this.form.newPassword,
          };
          modifyAdmin(data).then((response) => {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
          });
        }
      });
    },

    getNetworkIp() {
      let needHost = ""; // 打开的host
      try {
        // 获得网络接口列表
        let network = os.networkInterfaces();
        // console.log("network",network)
        for (let dev in network) {
          let iface = network[dev];
          for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (
              alias.family === "IPv4" &&
              alias.address !== "127.0.0.1" &&
              !alias.internal
            ) {
              needHost = alias.address;
              // console.log("alias.address",alias.address)
            }
            // console.log("alias",alias)
          }
        }
      } catch (e) {
        needHost = "localhost";
      }
      return needHost;
    },

    checkScreen() {
      if (
        this.admin.role_name == "superadmin" ||
        this.admin.role_name == "admin" ||
        (this.admin.role_name == "ds_admin" &&
          ((this.admin.department_uuid2_name.indexOf("督察审计支队") != -1 &&
            this.admin.full_name.indexOf("督察审计支队二大队") == -1) ||
            this.admin.department_uuid2_type == "分局"))
      ) {
        return true;
      } else {
        return false;
      }
    },

    checkReportFile() {
      if (
        this.admin.role_name == "superadmin" ||
        this.admin.role_name == "admin" ||
        (this.admin.role_name == "ds_admin" &&
          ((this.admin.department_uuid2_name.indexOf("督察审计支队") != -1 &&
            this.admin.full_name.indexOf("督察审计支队二大队") == -1) ||
            this.admin.department_uuid2_type == "分局"))
      ) {
        return true;
      } else if (
        this.admin.department_uuid2_name == "政治处" &&
        this.admin.role_name != "fu_jing"
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.navbar {
  z-index: 999;
  position: relative;
  background: #2057b5;

  ::v-deep .el-input__inner {
    height: 50px;
    width: 500px;
  }

  ::v-deep .el-input--prefix .el-input__inner {
    padding-left: 80px;
  }

  ::v-deep .el-input__prefix {
    font-size: 18px;
    left: 25px;
  }

  ::v-deep .el-input__inner::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::v-deep .el-input__inner[type="number"] {
    -moz-appearance: textfield;
  }

  .top-menu {
    padding: 30px 100px 0px 100px;
    color: #fff;

    .logo {
      font-size: 36px;
      font-weight: 600;
      letter-spacing: 3.24px;
    }
    .avatar-container {
      display: flex;

      .avatar-wrapper {
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }
        .user-name {
          color: #fff;
          font-size: 20px;
          font-weight: 500;
          padding: 0 20px;
          text-align: center;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 15px;
          color: #fff;
        }
      }
    }
  }

  .top-group {
    padding-left: 100px;
    padding-right: 100px;
    position: absolute;
    bottom: -50px;
    width: 100%;

    // .active {
    //   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    // }

    .card-panel {
      width: 280px;
      height: 130px;
      cursor: pointer;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      position: relative;
      overflow: hidden;

      .card-panel-icon-wrapper {
        display: flex;
      }

      .card-panel-text-wrapper {
        font-weight: bold;
        font-size: 25px;
        margin-left: 10px;
      }
    }
  }

  @-webkit-keyframes changeImg {
    from {
      left: -100%;
    }
    100% {
      left: 150%;
    }
  }
  .active {
    position: absolute;
    -webkit-animation: changeImg 3s ease 0s;
    -o-animation: changeImg 3s ease 0s;
    animation: changeImg 3s ease 0s;
    top: 0;
    width: 30%;
    height: 100%;
    content: "";
    background: -webkit-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background: -o-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background: -moz-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
    animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
  }
}
</style>
