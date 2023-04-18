<template>
  <div class="app-container">
    <div class="user">
      <div class="info-title">
        个人信息
      </div>
      <div
        class="flex"
        style="align-items: center;"
      >

        <div class="flex info-content">
          <div class="nfo-user">
            <img
              :src="img1"
              style="width:100px"
              @click="goOldList()"
            />
          </div>
          <div class="flexc info-text ">
            <span>姓名：{{ admin.real_name }}</span>
            <span>警号：{{ admin.name }}</span>
            <span>单位：{{ admin.full_name }}</span>
            <span>登录：{{ logTime }}</span>
          </div>
        </div>

        <div class="flex">
          <el-button
            type="primary"
            @click="changePwd"
          >修改登录密码</el-button>
        </div>

      </div>

      <div class="info-title">
        个人记录
      </div>

      <div class="flex">
        <div class="flexc log-left">
          <el-link
            type="info"
            style="margin-bottom: 20px;"
            @click="quickTo(1)"
          >登录记录</el-link>
          <el-link
            type="info"
            style="margin-bottom: 20px;"
            @click="quickTo(2)"
          >我记录的问题</el-link>
          <el-link
            type="info"
            @click="quickTo(3)"
          >我反馈的问题</el-link>
        </div>

        <div
          class="flex1"
          style="padding:20px"
        >
          <div
            id="div1"
            class="flex"
            style="margin-top:20px;margin-bottom:30px"
          >
            <div class="log-title">登陆记录</div>
          </div>
          <div class="flexc">
            <el-table :data="list0">
              <el-table-column
                label="登陆IP"
                align="center"
                prop="ip_addr"
              ></el-table-column>
              <el-table-column
                label="登陆时间"
                align="center"
                prop="create_datetime"
              ></el-table-column>
              <el-table-column
                label="登陆方式"
                align="center"
                prop="type"
              ></el-table-column>
              <el-table-column
                label="备注"
                align="center"
                prop="number"
              ></el-table-column>
            </el-table>
          </div>

          <div
            id="div2"
            class="flex"
            style="margin-top:20px;margin-bottom:30px"
          >
            <div class="log-title">我记录的问题</div>
          </div>

          <div class="flexc">

            <el-table :data="list1">
              <el-table-column
                label="问题编号"
                align="center"
                prop="number"
                width="100"
              >
                <template slot-scope="scope"> #{{ scope.row.number }} </template>
              </el-table-column>

              <el-table-column
                label="问题状态"
                align="center"
                prop="status"
                width="120"
              >
                <template slot-scope="scope">
                  <el-tag
                    v-if="scope.row.status == 'UN_FEEDBACK'"
                    type="warning"
                    effect="dark"
                  >未反馈</el-tag>
                  <el-tag
                    v-if="scope.row.status == 'FEEDBACK'"
                    type="success"
                    effect="dark"
                  >已反馈</el-tag>
                  <el-tag
                    v-if="scope.row.status == 'FILED'"
                    type="info"
                    effect="dark"
                  >已归档</el-tag>
                </template>
              </el-table-column>

              <el-table-column
                label="问题类型"
                align="center"
                prop="problem_department_type_parent_name"
                width="140"
              />

              <el-table-column
                label="问题类别"
                align="center"
                prop="problem_department_type_name"
                :show-overflow-tooltip="true"
              />

              <el-table-column
                label="发生时间"
                align="center"
                prop="create_datetime"
                width="180"
              >
              </el-table-column>

              <el-table-column
                label="问题单位"
                align="center"
                prop="department_name"
                :show-overflow-tooltip="true"
              />

              <el-table-column
                label="操作"
                align="center"
                width="80"
              >
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="handleView(scope.row.uuid)"
                  >查看</el-button>
                </template>
              </el-table-column>
            </el-table>

            <pagination
              :autoScroll="false"
              :pageSizes="pageSize"
              :total="total1"
              :page.sync="query1.pageNum"
              :limit.sync="query1.pageSize"
              @pagination="getList1"
            />

          </div>

          <div
            id="div3"
            class="flex"
            style="margin-top:20px;margin-bottom:30px"
          >
            <div class="log-title">我反馈的问题</div>
          </div>

          <div class="flexc">

            <el-table :data="list2">
              <el-table-column
                label="问题编号"
                align="center"
                prop="number"
                width="100"
              >
                <template slot-scope="scope"> #{{ scope.row.problem_array[0].number }} </template>
              </el-table-column>

              <el-table-column
                label="问题状态"
                align="center"
                width="120"
              >
                <template slot-scope="scope">
                  <el-tag
                    v-if="scope.row.problem_array[0].status == 'UN_FEEDBACK'"
                    type="warning"
                    effect="dark"
                  >未反馈</el-tag>
                  <el-tag
                    v-if="scope.row.problem_array[0].status == 'FEEDBACK'"
                    type="success"
                    effect="dark"
                  >已反馈</el-tag>
                  <el-tag
                    v-if="scope.row.problem_array[0].status == 'FILED'"
                    type="info"
                    effect="dark"
                  >已归档</el-tag>
                </template>
              </el-table-column>

              <el-table-column
                label="问题类型"
                align="center"
                width="140"
              >
                <template slot-scope="scope">
                  {{ scope.row.problem_array[0].problem_department_type_parent_name }}
                </template>
              </el-table-column>

              <el-table-column
                label="问题类别"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.problem_array[0].problem_department_type_name }}
                </template>
              </el-table-column>

              <el-table-column
                label="问题单位"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.problem_array[0].department_name }}
                </template>
              </el-table-column>

              <el-table-column
                label="检查单位"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.problem_array[0].from_department_name }}
                </template>
              </el-table-column>

              <el-table-column
                label="反馈时间"
                align="center"
                prop="create_datetime"
                width="180"
              >
              </el-table-column>

              <el-table-column
                label="反馈内容"
                align="center"
                prop="content"
                width="180"
              >
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                width="80"
              >
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="handleView(scope.row.problem_array[0].uuid)"
                  >查看</el-button>
                </template>
              </el-table-column>

            </el-table>

            <pagination
              :autoScroll="false"
              :pageSizes="pageSize"
              :total="total2"
              :page.sync="query2.pageNum"
              :limit.sync="query2.pageSize"
              @pagination="getList2"
            />

          </div>
        </div>

      </div>
    </div>

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
import { mapGetters } from "vuex";
import localJson from "/static/local.json";

import {
  getProblemExact,
  getFeedback,
  getLogonLogoffInfo,
  modifyAdmin,
} from "@/api/problem";

export default {
  computed: {
    ...mapGetters(["admin"]),
  },
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.form.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      localJson,
      img1: require("../../assets/images/user.jpg"),
      logTime: undefined,
      list0: [],
      pageSize: [5, 10, 20, 30],

      total1: 0,
      query1: {
        pageNum: 1,
        pageSize: 5,
        offset: 0,
        rows: 5,
      },
      list1: [],

      total2: 0,
      query2: {
        pageNum: 1,
        pageSize: 5,
        offset: 0,
        rows: 5,
      },
      list2: [],

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
    };
  },
  created() {
    console.log(this.admin);
    this.getUserLog();
    this.getList1();
    this.getList2();
  },
  methods: {
    quickTo(n) {
      this.$el
        .querySelector("#div" + n)
        .scrollIntoView({ block: "start", behavior: "smooth" });
    },

    goOldList() {
      if (localJson.delUser.includes(this.admin.name)) {
        this.$router.push("/problem/oldList");
      }
    },

    getUserLog() {
      const query = {
        name: this.admin.name,
        type: "LOGIN",
        offset: 1,
        rows: 5,
      };
      getLogonLogoffInfo(query).then((resp) => {
        if (resp.array.length > 0) {
          this.list0 = resp.array;
          this.logTime = this.parseTime(
            resp.array[0].create_datetime,
            "{y}年{m}月{d}日 {h}:{i}:{s}"
          );
        } else {
          this.logTime = this.parseTime(
            new Date(),
            "{y}年{m}月{d}日 {h}:{i}:{s}"
          );
        }
      });
    },

    getList1() {
      this.query1.rows = this.query1.pageSize;
      this.query1.offset = (this.query1.pageNum - 1) * this.query1.pageSize;

      this.query1.from_uuid = this.admin.uuid;

      getProblemExact(this.query1).then((resp) => {
        this.list1 = resp.array;
        this.total1 = resp.count;
      });
    },
    getList2() {
      this.query2.rows = this.query2.pageSize;
      this.query2.offset = (this.query2.pageNum - 1) * this.query2.pageSize;

      this.query2.from_uuid = this.admin.uuid;

      getFeedback(this.query2).then((resp) => {
        this.list2 = resp.array;
        this.total2 = resp.count;
      });
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

    handleView(uuid) {
      this.$router.push({
        path: "/problem/view",
        query: { id: uuid, operate: "view" },
      });
    },
  },
};
</script>

<style lang="scss" scope>
.user {
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .flex {
    display: flex;
  }
  .flexc {
    display: flex;
    flex-direction: column;
  }

  .flex1 {
    flex: 1;
  }

  .info-title {
    padding-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #e3e3e3;
    color: #333;
  }

  .info-content {
    margin: 20px 20px 20px 0px;
    padding: 20px;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    font-size: 13px;
    width: 500px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .info-user {
      width: 100px;
      height: 100px;
    }
    .info-text {
      justify-content: space-between;
      padding-left: 20px;
      color: #333;
    }
  }

  .log-title {
    display: flex;
    background: #409eff;
    color: #fff;
    font-size: 13px;
    width: 150px;
    line-height: 30px;
    justify-content: center;
    border-radius: 10px 10px 0 0;
  }

  .log-left {
    width: 200px;
    align-items: self-end;
    border-right: 1px solid #e3e3e3;
    padding: 20px;
  }
}
</style>