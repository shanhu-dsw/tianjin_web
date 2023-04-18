<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-card>
          <div
            slot="header"
            class="clearfix"
          >
            <span style="font-weight: bold">消息列表（未读{{ total2 }}条，总共{{ total }}条）</span>
            <div class="pull-right">
              <el-button
                type="primary"
                @click="openDialog"
              >发送信息给管理员</el-button>
            </div>
          </div>

          <ul
            class="list-group"
            style="margin: 0"
          >
            <li
              class="list-group-item"
              v-for="(item, index) in dataList"
              v-bind:key="index"
              @click="readMsg(item, false)"
            >
              <div>
                <svg-icon
                  v-if="item.is_read == 'UN_READ'"
                  icon-class="message-no"
                  style="font-size: 20px; margin-right: 5px"
                /><svg-icon
                  v-if="item.is_read == 'READ'"
                  icon-class="message-yes"
                  style="font-size: 20px; margin-right: 5px"
                />

                <span :style="{
                    color: item.is_read == 'UN_READ' ? '#0b615a' : '#000',
                  }">{{ item.title }}</span>
              </div>

              <div :style="{
                  'margin-top': '10px',
                  height: '60px',
                  color: item.is_read == 'UN_READ' ? '#0b615a' : '#000',
                }">
                {{ item.content }}
              </div>

              <div style="display: flex; align-items: center">
                <div style="width: 300px">
                  <svg-icon icon-class="user" />
                  {{getUser(item)}}
                </div>
                <svg-icon
                  icon-class="time"
                  style="margin-right: 5px"
                />
                {{ item.create_datetime }}
                <div style="flex: 1; text-align: right">
                  <el-button
                    v-show="item.remark"
                    icon="el-icon-right"
                    size="small"
                    type="success"
                    @click="readMsg(item, true)"
                  >跳转问题详情</el-button>
                </div>
              </div>
            </li>
          </ul>

          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog
      title="发送消息给管理员"
      :visible.sync="open"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        label-position="top"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="To">
          <el-input
            v-model="to"
            placeholder=""
            disabled
          />
        </el-form-item>

        <el-form-item
          label="消息内容"
          prop="content"
        >
          <el-input
            type="textarea"
            rows="5"
            placeholder="请输入内容"
            v-model="form.content"
            maxlength="5000"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitForm"
        >确 定</el-button>
        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { checkAdmin } from "@/utils/ruoyi";
import {
  getAdmin,
  getMessage,
  modifyMessage,
  addMessage,
  getProblemExact,
} from "@/api/problem";

export default {
  computed: {
    ...mapGetters(["admin"]),
  },

  data() {
    return {
      loading: true,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        offset: 0,
        rows: 10,
      },
      total: 0,
      total2: 0,
      dataList: [],
      open: false,
      form: { content: "" },
      to: "系统管理员",

      rules: {
        content: [
          { required: true, message: "消息内容不能为空", trigger: "change" },
        ],
      },

      userList: [],
    };
  },

  created() {
    this.getUserList();
    this.getList();
  },
  methods: {
    getUserList() {
      const queryParams = {
        rows: 9999,
        offset: 0,
      };

      getAdmin(queryParams).then((response) => {
        this.userList = response.array.filter(
          (item) => item.role_name == "superadmin"
        );
        console.log(this.userList);
      });
    },

    getList() {
      this.loading = true;

      const query = {
        rows: this.queryParams.pageSize,
        offset: (this.queryParams.pageNum - 1) * this.queryParams.pageSize,
        to_uuid: this.admin.uuid,
      };

      getMessage(query).then((resp) => {
        this.dataList = resp.array;
        this.total = resp.count;

        const query2 = {
          rows: 1,
          offset: 0,
          to_uuid: this.admin.uuid,
          read: "UN_READ",
        };

        getMessage(query2).then((resp) => {
          this.loading = false;
          this.total2 = resp.count;
        });
      });
    },

    getUser(item) {
      if (item.from_uuid_info) {
        return item.from_uuid_info.real_name + "-" + item.from_uuid_info.name;
      } else {
        return "系统自动发送";
      }
    },

    readMsg(model, go) {
      if (model.is_read == "UN_READ") {
        const query = {
          uuid: model.uuid,
          read: "READ",
        };
        modifyMessage(query).then((resp) => {
          model.is_read = "READ";
          this.total2--;

          const query2 = {
            rows: 1,
            offset: 0,
            to_uuid: this.admin.uuid,
            read: "UN_READ",
          };
          this.$store.dispatch("GetNoRead", query2).then((resp) => {
            if (model.remark && go) {
              this.handleQuery(model.remark);
            }
          });
        });
      } else {
        if (model.remark && go) {
          this.handleQuery(model.remark);
        }
      }
    },

    handleQuery(id) {
      let query = {
        uuid: id,
        offset: 0,
        rows: 1,
      };
      query = checkAdmin(this.admin, query, false);
      getProblemExact(query).then((resp) => {
        if (resp.count == 1) {
          this.$router.push({
            path: "/problem/view",
            query: { number: resp.array[0].number },
          });
        } else {
          this.$modal.notifyError("抱歉，无权限查看问题！");
        }
      });
    },

    openDialog() {
      this.form.content = "";
      this.resetForm("form");
      this.open = true;
    },

    async submitForm() {
      var check = false;
      this.$refs["form"].validate((valid) => {
        check = valid;
      });

      if (!check) {
        return;
      }
      for (let i = 0; i < this.userList.length; i++) {
        await this.sendMsg(this.userList[i].uuid);
      }

      const query = {
        offset: 0,
        rows: 1,
        read: "UN_READ",
        to_uuid: this.admin.uuid,
      };
      this.$store.dispatch("GetNoRead", query);
      this.getList();
      this.open = false;
    },

    sendMsg(touuid) {
      return new Promise((resolve) => {
        let query = {
          from_uuid: this.admin.uuid,
          to_uuid: touuid,
          title:
            this.admin.real_name + "(" + this.admin.name + ")" + "提交问题",
          content: this.form.content,
        };

        addMessage(query).then((response) => {
          return resolve("next");
        });
      });
    },
  },
};
</script>

<style>
.list-group-item {
  border: 1px solid #e7eaec;
  padding: 11px;
  margin-bottom: 15px;
  background: #f4f6f8;
  font-size: 14px;
}
</style>