<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-card>
          <div
            slot="header"
            class="clearfix"
          >
            <span style="font-weight: bold; color: #016dbe">视频督察问题导入工具</span>

            <div class="pull-right">
              <el-button
                type="primary"
                @click="handleQuery"
              >刷新数据</el-button>
            </div>
          </div>

          <el-table
            :data="dataList"
            style="width: 100%"
          >
            <el-table-column
              fixed
              align="center"
              header-align="center"
              prop="id"
              label="问题编号"
            >
            </el-table-column>
            <el-table-column
              fixed
              header-align="center"
              align="center"
              prop="problem_status"
              label="问题状态"
            >
              已确认
            </el-table-column>
            <el-table-column
              fixed
              header-align="center"
              align="center"
              prop="date"
              label="单位"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.location.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed
              header-align="center"
              align="center"
              prop="date"
              label="问题类型"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.problem_category ? scope.row.problem_category.name :"暂无问题类型"}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed
              header-align="center"
              align="center"
              prop="active_at"
              label="督导检查时间"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.issued_at | format }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed
              header-align="center"
              align="center"
              prop="date"
              label="问题图片"
            >
              <template slot-scope="scope">
                <el-image
                  style="width: 100px; height: 50px;border-radius: 5px;"
                  :src="scope.row.first_evidence ? scope.row.first_evidence.src : ''"
                >
                </el-image>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              header-align="center"
              align="center"
              width="150"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  :disabled="scope.row.discover_type ? true : false"
                  @click="update(scope.row)"
                >导入</el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList2"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="1000px"
      append-to-body
    >
      <OldItem
        :token.sync="token"
        :id.sync="id"
        :admin.sync="admin"
        @change="updatetChange($event)"
      ></OldItem>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import OldItem from "./oldItem";
import localJson from "/static/local.json";

import axios from "axios";
import { getProblemExact } from "@/api/problem";

export default {
  computed: {
    ...mapGetters(["admin"]),
  },
  components: {
    OldItem,
  },

  data() {
    return {
      loading: true,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      dataList: [],
      token: "",
      title: "",
      open: false,
      id: 0,
      localJson,
    };
  },

  filters: {
    isImg(val) {
      let img = [];
      img.push(val.src);
      return img;
    },
    format(date) {
      return new Date((new Date(date) / 1000 + 8 * 60 * 60) * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
  },

  created() {
    this.handleQuery();
  },
  methods: {
    login() {
      return new Promise((resolve) => {
        const data = {
          user: localJson.user,
        };
        axios
          .post(
            process.env.VUE_APP_OLD_API +
              "/api/auth/validate_username_password",
            data
          )
          .then((res) => {
            if (res.data.data.token) {
              this.token = res.data.data.token;
              return resolve("success");
            } else {
              this.$modal.msgError(
                "视频督察预警登陆失败,帐号=》" + JSON.stringify(data)
              );
              return resolve("error");
            }
          })
          .catch((error) => {
            this.$modal.msgError(
              "视频督察预警登陆失败,帐号=》" + JSON.stringify(data)
            );
            return resolve("error");
          });
      });
    },

    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList2();
    },

    async getList2() {
      if (!this.token) {
        await this.login();
      }

      if (!this.token) {
        return;
      }

      axios
        .get(process.env.VUE_APP_OLD_API + "/api/problems/", {
          params: {
            page: this.queryParams.pageNum,
            page_size: this.queryParams.pageSize,
            query_problem_status: "correcting",
          },
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          this.dataList = res.data.data;
          this.total = res.data.total;

          this.dataList.forEach((item, index) => {
            getProblemExact({
              offset: 0,
              rows: 1,
              uuid: item.id,
            }).then((resp) => {
              if (resp.count > 0) {
                item.discover_type = true;
              } else {
                item.discover_type = false;
              }
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    update(row) {
      this.id = row.id;
      this.open = true;
    },
    updatetChange(value) {
      console.log(value);
      this.open = value;
      this.getList2();
    },
  },
};
</script>

<style lang="scss" scope >
.el-table-filter {
  max-height: 300px;
  overflow: auto;
}

.numberDiv {
  margin-right: 30px;
  .el-form-item {
    width: 100%;
  }

  .el-form-item__content {
    width: 100%;
  }
}

.el-table-filter__bottom {
  text-align: right;
}
.el-table-filter__bottom button {
  font-size: 18px;
  margin-left: 10px;
}
</style>