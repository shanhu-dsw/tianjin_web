<template>
  <div
    class="app-container"
    v-loading="loading"
  >
    <el-row>
      <el-col>
        <el-card>
          <div
            slot="header"
            class="clearfix"
          >
            <span style="font-weight: bold; color: #016dbe">录入问题</span>
          </div>

          <div style="display: flex">
            <div style="display: flex; flex: 1">
              <el-form
                ref="form"
                label-position="top"
                :model="form"
                :rules="rules"
                style="width: 100%"
              >
                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item
                      label="被检查单位类别"
                      prop="dept_uuid_type"
                    >
                      <el-select
                        v-model="form.dept_uuid_type"
                        placeholder="被选择被检查单位类别"
                        @change="deptTypeSelChange"
                        style="width: 100%"
                        filterable
                      >
                        <el-option
                          v-for="item in deptList1"
                          :key="item"
                          :label="item"
                          :value="item"
                        />
                      </el-select>

                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item
                      label="被检查问题单位"
                      prop="to_uuid"
                    >
                      <el-select
                        v-model="form.to_uuid"
                        placeholder="被选择检查问题单位"
                        @change="deptSelChange"
                        style="width: 100%"
                        filterable
                      >
                        <el-option
                          v-for="item in deptList2"
                          :key="item.uuid"
                          :label="item.name"
                          :value="item.uuid"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="30">
                  <el-col :span="12">
                    <el-form-item
                      label="问题类型"
                      prop="problem_type"
                    >
                      <el-radio-group
                        v-model="form.problem_type"
                        @input="typeSelChange"
                      >
                        <el-radio-button
                          v-for="item in problemType1"
                          :key="item.value"
                          :label="item.value"
                        >{{ item.name }}</el-radio-button>
                      </el-radio-group>

                      <el-tooltip
                        effect="dark"
                        placement="top"
                      >
                        <div slot="content">派出所只能选择“自查问题”；<br />直属单位可以选择“自查问题”和“检查问题”。</div>
                        <i
                          class="el-icon-warning"
                          style="color:#009cff;margin-left: 5px;"
                        ></i>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item
                      label="问题子类"
                      prop="type_uuid"
                    >
                      <el-select
                        style="width: 100%"
                        v-model="form.type_uuid"
                        placeholder="请选择问题分类"
                        clearable
                        filterable
                      >
                        <el-option
                          v-for="item in problemType3"
                          :key="item.uuid"
                          :label="item.name"
                          :value="item.uuid"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="30">
                  <el-col :span="8">
                    <el-form-item label="问题负责人">
                      <el-select
                        v-model="form.to_uuid_person"
                        filterable
                        remote
                        multiple
                        placeholder="请输入姓名或警号"
                        :remote-method="remotePerson1"
                        @change="$forceUpdate()"
                        style="width: 90%"
                        clearable
                      >
                        <el-option
                          v-for="item in personList1"
                          :key="item.uuid"
                          :label="item.name + '-' + item.real_name"
                          :value="item.uuid"
                        >
                        </el-option>
                      </el-select>

                      <el-tooltip
                        effect="dark"
                        placement="top"
                      >
                        <div slot="content">可以输入警号或者姓名，也可以输入多个责任人；<br />如果没有指定的责任人，可以不填。</div>
                        <i
                          class="el-icon-warning"
                          style="color:#009cff;margin-left: 5px;"
                        ></i>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item
                      label="问题通知人"
                      prop="to_uuid_message"
                    >
                      <el-select
                        v-model="form.to_uuid_message"
                        filterable
                        remote
                        multiple
                        placeholder="请输入关键词"
                        :remote-method="remotePerson2"
                        @change="$forceUpdate()"
                        style="width: 90%"
                      >
                        <el-option
                          v-for="item in personList2"
                          :key="item.uuid"
                          :label="
                            item.name +
                            (item.uuid == '0' ? '' : '_') +
                            item.real_name
                          "
                          :value="item.uuid"
                        >
                        </el-option>
                      </el-select>
                      <el-tooltip
                        effect="dark"
                        placement="top"
                      >
                        <div slot="content">问题会默认推送给被创建问题单位的领导和管理员。</div>
                        <i
                          class="el-icon-warning"
                          style="color:#009cff;margin-left: 5px;"
                        ></i>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">
                    <el-form-item label="督导检查时间">
                      <el-date-picker
                        v-model="form.create_datetime"
                        type="datetime"
                        placeholder="选择日期时间"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="width: 100%"
                      >
                      </el-date-picker>

                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="30">
                  <el-col :span="24">
                    <el-form-item
                      label="问题描述"
                      prop="content"
                    >
                      <el-input
                        type="textarea"
                        rows="5"
                        placeholder="请输入内容"
                        v-model="form.content"
                        maxlength="5000"
                        show-word-limit
                      >
                      </el-input>
                      <!-- <editor v-model="form.content" :min-height="200" /> -->
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="问题附件">
                      <ZMUpload :uploadList.sync="beforeUpdateImg"></ZMUpload>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item>
                  <el-button
                    type="primary"
                    icon="el-icon-check"
                    @click="onSubmit"
                  >确定</el-button>
                  <el-button
                    type="info"
                    icon="el-icon-close"
                    @click="reset"
                  >重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="help">
              <h3 style="text-align: center;">使用帮助</h3>
              <p>1、创建自查问题的权限：派出所领导、管理员；支队领导、管理员。
                创建检查问题的权限：支队领导、管理员、民警。</p>

              <p>2、自查问题：是对单位内部进行检查。</p>

              <p>3、检查问题：是对其他单位创建问题。</p>
              <p>4、问题责任人：指的是这个问题的承担者，要为这个问题承担后果。</p>
              <p>5、如遇到问题可以点击“消息通知”——“发送信息给管理员”，把遇到的问题发送给管理员。</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ZMUpload from "@/components/ZMUpload";
import {
  getProblemDepartmentType,
  addProblem,
  getDepartment,
  getAdmin,
  addMessage,
  getAdminShort,
} from "@/api/problem";
export default {
  computed: {
    ...mapGetters(["admin"]),
  },
  components: {
    ZMUpload,
  },
  data() {
    return {
      loading: false,
      form: {
        to_uuid: undefined,
        type_uuid: undefined,
        to_uuid_message: [],
        content: undefined,
        problem_type: undefined,
        create_datetime: undefined,
        dept_uuid_type: undefined,
        to_uuid_person: [],
      },

      rules: {
        to_uuid: [
          {
            required: true,
            message: "被检查问题单位不能为空",
            trigger: "blur",
          },
        ],
        problem_type: [
          { required: true, message: "问题类型不能为空", trigger: "blur" },
        ],
        type_uuid: [
          { required: true, message: "问题子类不能为空", trigger: "blur" },
        ],
        to_uuid_message: [
          { required: true, message: "问题通知人不能为空", trigger: "blur" },
        ],
        content: [
          { required: true, message: "问题描述不能为空", trigger: "blur" },
        ],
      },

      deptList0: [],
      deptList11: [],
      deptList1: [],
      deptList2: [],

      userList1: [],
      userList2: [],

      personList1: [],
      personList2: [],
      manageUser: [],

      beforeUpdateImg: [],

      problemType1: [
        { name: "检查问题", value: "CHECK" },
        { name: "自查问题", value: "SELF" },
      ],
      problemType2: [],
      problemType3: [],

      adminProblemType: { CHECK: [], SELF: [] },
    };
  },
  created() {
    console.log(this.admin);
    if (
      this.admin.role_name == "fu_jing" ||
      this.admin.role_name == "min_jing"
    ) {
      this.$modal.msgError("您无此权限访问!");
      this.$router.push("/index");
      return;
    }
    this.form.create_datetime = this.parseTime(new Date());
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.loading = true;
      await this.getDepartmentList();
      await this.getAllProblemTypeList();
      await this.getUserList2();
      this.loading = false;
    },

    getDepartmentList() {
      return new Promise((resolve) => {
        const query = {
          level: 2,
        };
        if (this.admin.department_uuid2_type == "派出所") {
          query.uuid = this.admin.department_uuid2;
        }

        getDepartment(query).then((resp) => {
          this.deptList0 = resp.array;

          let map = new Map();
          for (let item of resp.array) {
            map.set(item.type_name, item.type_name);
          }
          this.deptList1 = [...map.values()]; //单位类型

          this.deptList11 = [...this.deptList1];

          if (this.admin.department_uuid2_type == "分局") {
            return resolve("next");
          }

          let curDept = this.deptList0.filter(
            (item) => item.uuid == this.admin.department_uuid2
          );
          if (curDept.length < 1) {
            return resolve("next");
          }

          let tempList = curDept[0].problem_types;

          tempList.forEach((item) => {
            if (item.level == 1) {
              let tempArrys = [];
              tempList.forEach((item2) => {
                if (item.uuid == item2.parent_uuid) {
                  tempArrys.push(item2);
                }
              });
              if (item.name == "检查问题") {
                this.adminProblemType.CHECK = tempArrys;
              }
              if (item.name == "自查问题") {
                this.adminProblemType.SELF = tempArrys;
              }
            }
          });

          return resolve("next");
        });
      });
    },

    getAllProblemTypeList() {
      return new Promise((resolve) => {
        getProblemDepartmentType().then((resp) => {
          this.problemType2 = resp.array;
          console.log(resp.array);
          if (
            this.admin.role_name == "superadmin" ||
            this.admin.role_name == "admin" ||
            this.admin.role_name == "ds_admin"
          ) {
            this.problemType2.forEach((item) => {
              if (item.level == 1) {
                let tempArrys = [];
                this.problemType2.forEach((item2) => {
                  if (item.uuid == item2.parent_uuid) {
                    tempArrys.push(item2);
                  }
                });
                if (item.name == "检查问题") {
                  this.adminProblemType.CHECK = tempArrys;
                }
                if (item.name == "自查问题") {
                  this.adminProblemType.SELF = tempArrys;
                }
              }
            });
          }

          if (this.admin.department_uuid2_type == "派出所") {
            this.typeSelChange(this.problemType1[1].value);
          } else {
            this.typeSelChange(this.problemType1[0].value);
          }

          return resolve("next");
        });
      });
    },

    getUserList1(uuid) {
      const queryParams = {
        rows: 1000,
        offset: 0,
        all_from_department_uuid: uuid,
      };

      getAdminShort(queryParams).then((response) => {
        this.userList1 = response.array;
      });

      const query = {
        offset: 0,
        rows: 1000,
        manage_department_uuid_like: uuid,
      };
      getAdminShort(query).then((resp) => {
        this.manageUser = resp.array;
      });
    },

    getUserList2() {
      return new Promise((resolve) => {
        const queryParams = {
          rows: 9999,
          offset: 0,
        };
        getAdminShort(queryParams).then((response) => {
          this.userList2 = response.array;
          return resolve("next");
        });
      });
    },

    deptTypeSelChange(e) {
      this.form.dept_uuid_type = e;
      console.log(this.deptList0);
      this.deptList2 = this.deptList0.filter((item) => item.type_name == e);

      if (this.form.problem_type == "CHECK") {
        this.deptList2 = this.deptList2.filter(
          (item) => item.uuid != this.admin.department_uuid2
        );
      }
      this.form.to_uuid = "";
      this.form.to_uuid_person = [];
      this.personList1 = [];
      this.personList2 = [];
      this.manageUser = [];
    },

    deptSelChange(e) {
      this.resetDept();

      this.getUserList1(e);

      this.personList2 = [
        {
          uuid: "0",
          real_name: "部门负责人",
          name: "",
        },
      ];
      this.form.to_uuid_message = ["0"];
    },

    typeSelChange(e) {
      this.problemType3 = [];
      this.form.problem_type = e;
      this.form.type_uuid = "";

      if (this.admin.department_uuid2_type == "分局") {
        if (e == "CHECK") {
          this.problemType3 = this.adminProblemType.CHECK;
          console.log(this.problemType3);
          this.problemType3.forEach((item) => {
            item.name = item.name.replace(/u201c/g, "“");
            item.name = item.name.replace(/u201d/g, "”");
            item.name = item.name.replace(/u2014/g, "-");
          });
        }
      } else if (this.admin.department_uuid2_type == "派出所") {
        if (e == "SELF") {
          this.problemType3 = this.adminProblemType.SELF;
          console.log(this.problemType3);
          this.problemType3.forEach((item) => {
            item.name = item.name.replace(/u201c/g, "“");
            item.name = item.name.replace(/u201d/g, "”");
            item.name = item.name.replace(/u2014/g, "-");
          });
        }
      } else if (this.admin.role_name == "zd_admin") {
        if (e == "CHECK") {
          this.problemType3 = this.adminProblemType.CHECK;
          this.problemType3.forEach((item) => {
            item.name = item.name.replace(/u201c/g, "“");
            item.name = item.name.replace(/u201d/g, "”");
            item.name = item.name.replace(/u2014/g, "-");
          });
        }
      } else {
        this.problemType3 = this.adminProblemType[e];
        this.problemType3.forEach((item) => {
          item.name = item.name.replace(/u201c/g, "“");
          item.name = item.name.replace(/u201d/g, "”");
          item.name = item.name.replace(/u2014/g, "-");
        });
      }

      if (e == "SELF" && this.admin.department_uuid2_type != "分局") {
        this.deptList1 = [this.admin.department_uuid2_type];
        this.deptList2 = this.deptList0.filter(
          (item) => item.uuid == this.admin.department_uuid2
        );
        this.form.dept_uuid_type = this.admin.department_uuid2_type;
        this.form.to_uuid = this.admin.department_uuid2;
        this.deptSelChange(this.form.to_uuid);
      }

      if (e == "CHECK" && this.admin.department_uuid2_type != "分局") {
        this.deptList1 = [...this.deptList11];
        this.deptList2 = [];
        this.form.dept_uuid_type = undefined;
        this.form.to_uuid = undefined;
        this.resetDept();
      }
    },

    resetDept() {
      this.form.to_uuid_message = [];
      this.form.to_uuid_person = [];
      this.manageUser = [];
      this.personList1 = [];
      this.personList2 = [];
    },

    remotePerson1(query) {
      let count = 0;
      this.personList1 = [];
      this.userList1.forEach((item) => {
        if (item.real_name.indexOf(query) != -1 && count <= 20) {
          this.personList1.push(item);
          count++;
        } else if (item.name.indexOf(query) != -1 && count <= 20) {
          this.personList1.push(item);
          count++;
        }
      });
    },

    remotePerson2(query) {
      let count = 0;
      this.personList2 = [
        {
          uuid: "0",
          real_name: "部门负责人",
          name: "",
        },
      ];
      console.log(this.userList2);
      this.userList2.forEach((item) => {
        if (item.real_name.indexOf(query) != -1 && count <= 20) {
          this.personList2.push(item);
          count++;
        } else if (item.name.indexOf(query) != -1 && count <= 20) {
          this.personList2.push(item);
          count++;
        }
      });
    },

    reset() {
      this.form = {
        to_uuid: undefined,
        type_uuid: undefined,
        to_uuid_message: undefined,
        content: undefined,
        problem_type: undefined,
        create_datetime: this.parseTime(new Date()),
      };
      this.deptList2 = [];
      this.personList1 = [];
      this.personList2 = [];
      this.manageUser = [];

      this.resetForm("form");
    },

    onSubmit() {
      this.form.from_uuid = this.admin.uuid;
      this.form.type = "DEPARTMENT";
      this.form.from_lv2_department_uuid = this.admin.department_uuid2;
      this.form.to_lv2_department_uuid = this.form.to_uuid;
      // this.form.content = this.form.content.replace(/&nbsp;/g, "");
      console.log(this.form.content);
      if (this.form.to_uuid_person.length > 0) {
        this.form.responsible_uuids = this.form.to_uuid_person.join(";");
      }

      if (this.beforeUpdateImg.length > 0) {
        this.form.file_content = this.beforeUpdateImg
          .map((item) => {
            return item.content;
          })
          .join("|");
        this.form.file_suffix = this.beforeUpdateImg
          .map((item) => {
            return item.suffix;
          })
          .join("|");
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.form.content = this.htmlEncode(this.form.content);
          addProblem(this.form)
            .then((response) => {
              this.sendMsg(response.uuid);
            })
            .catch((err) => {
              this.loading = false;
            });
        }
      });
    },

    sendMsg(uuid) {
      var department_name = this.deptList2.filter(
        (item) => item.uuid == this.form.to_uuid
      )[0].name;

      var datetime = this.parseTime(new Date(), "{y}-{m}-{d}");

      if (this.form.create_datetime) {
        datetime = this.parseTime(this.form.create_datetime, "{y}-{m}-{d}");
      }

      var problem_type_name = this.problemType3.filter(
        (item) => item.uuid == this.form.type_uuid
      )[0].name;

      var from_name = this.admin.real_name + "(" + this.admin.name + ")";

      var msg =
        department_name +
        ",于“" +
        datetime +
        "”被“" +
        from_name +
        "”发现“" +
        problem_type_name +
        "”的问题，请及时整改。";

      let query = {
        from_uuid: this.admin.uuid,
        to_uuid: "",
        title: "发现" + problem_type_name + "的问题",
        content: msg,
        remark: uuid,
      };

      let sendUsers = [];
      if (this.manageUser.length > 0) {
        sendUsers = sendUsers.concat(this.manageUser.map((item) => item.uuid));
      }
      if (this.form.to_uuid_message.length > 0) {
        sendUsers = sendUsers.concat(this.form.to_uuid_message);
      }
      if (this.form.to_uuid_person.length > 0) {
        sendUsers = sendUsers.concat(this.form.to_uuid_person);
      }

      let sendUuids = [...new Set(sendUsers)];

      console.log(sendUuids);

      sendUuids.forEach((item) => {
        if (item != "0") {
          query.to_uuid = item;
          addMessage(query).then((response) => {});
        }
      });

      setTimeout(() => {
        this.loading = false;
        this.$router.push("/problem/list");
      }, 2 * 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.help {
  width: 300px;
  padding: 20px;
  border: 1px solid #e6ebf5;
  font-size: 13px;
  margin-left: 20px;
}
</style>