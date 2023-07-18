<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-card>
          <div
            slot="header"
            class="clearfix"
          >
            <span style="font-weight: bold; color: #016dbe">追责问责列表</span>
          </div>

          <el-form
            :model="queryParams"
            ref="queryForm"
            :inline="true"
            label-width="68px"
          >

            <el-row type="flex">
              <div
                class="numberDiv"
                style="flex:1"
              >
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="handleAdd"
                  >新建追责问责</el-button>
                </el-form-item>
              </div>

              <div>

                <el-form-item>
                  请选择时间段：
                  <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="selectTime"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>

              <!-- <el-form-item>
                <el-button
                  type="warning"
                  plain
                  icon="el-icon-download"
                  @click="handleExport"
                >导出</el-button>
              </el-form-item> -->
            </el-row>

          </el-form>

          <el-table
            v-loading="loading"
            :data="dataList"
          >

            <el-table-column
              label="发生时间"
              align="center"
              prop="create_datetime"
              width="180"
            >
            </el-table-column>

            <el-table-column
              label="问责对象"
              align="center"
              width="150"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope"> {{ scope.row.type=='PERSON'?scope.row.to_real_name:scope.row.to_department_name }} </template>
            </el-table-column>

            <el-table-column
              label="类型"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                {{ scope.row.type=='PERSON'?'个人':'单位' }}
              </template>
            </el-table-column>

            <el-table-column
              label="问责类别"
              align="center"
              prop="accountable_type_name"
              width="150"
              :show-overflow-tooltip="true"
            />

            <el-table-column
              label="问责详情"
              align="center"
              prop="content"
              :show-overflow-tooltip="true"
            />

            <el-table-column
              label="关联问题编号"
              align="center"
              prop="number"
              width="110"
            >
              <template slot-scope="scope"> <el-link
                  v-if="scope.row.problem_number"
                  @click="handleView(scope.row.problem_number)"
                >#{{ scope.row.problem_number }}</el-link> </template>
            </el-table-column>

            <el-table-column
              label="记录单位"
              align="center"
              prop="from_department_name"
              width="150"
              :show-overflow-tooltip="true"
            />

            <el-table-column
              label="记录人"
              align="center"
              prop="from_real_name"
              width="120"
            />

            <el-table-column
              label="操作"
              align="center"
              width="160"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleEdit(scope.row)"
                >修改</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
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
      width="600px"
      append-to-body
      :close-on-click-modal="false"
    >

      <div class="dialog">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-position="top"
        >

          <el-row>
            <el-col :span="8">
              <el-form-item
                label="问责对象"
                prop="type"
              >
                <el-radio-group
                  v-model="form.type"
                  @change="changeType"
                >
                  <el-radio label="PERSON">个人</el-radio>
                  <el-radio label="DEPARTMENT">单位</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="16">
              <el-form-item
                prop="to_uuid"
                label=" "
              >
                <el-select
                  v-if="form.type=='DEPARTMENT'"
                  v-model="form.to_uuid"
                  placeholder="请选择单位"
                  filterable
                  clearable
                  style="width:100%"
                >
                  <el-option
                    v-for="item in departList"
                    :key="item.uuid"
                    :label="item.name"
                    :value="item.uuid"
                  />
                </el-select>

                <el-select
                  v-if="form.type=='PERSON'"
                  v-model="form.to_uuid"
                  filterable
                  remote
                  placeholder="请输入姓名或警号"
                  :remote-method="remotePerson1"
                  @change="$forceUpdate()"
                  style="width: 100%"
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
              </el-form-item>
            </el-col>

          </el-row>

          <el-form-item
            label="问责类型"
            prop="type_uuid"
          >
            <el-select
              v-model="form.type_uuid"
              placeholder="请选择问责类型"
              filterable
              clearable
              style="width:100%"
            >
              <el-option
                v-for="item in acctableList"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
              />
            </el-select>

          </el-form-item>

          <el-form-item
            label="问责详情"
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
          </el-form-item>

          <el-form-item label="关联问题编号">
            <el-row :gutter="20">
              <el-col :span="20">
                <el-input
                  type="number"
                  placeholder="请输入关联问题编号"
                  v-model="form.problem_number"
                >
                </el-input>
              </el-col>
              <el-col :span="4">
                <el-button
                  type="primary"
                  @click="handleView(form.problem_number)"
                >查看</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="问责记录人">
                <el-input
                  v-model="form.from_real_name"
                  disabled
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="问责记录时间">
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

        </el-form>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitForm"
        >确 定</el-button>
        <el-button @click="open=false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { saveAs } from "file-saver";
import { checkAdmin } from "@/utils/ruoyi";
import localJson from "/static/local.json";
import {
  getAccountable,
  addAccountable,
  modifyAccountable,
  deleteAccountableByUuid,
  getAccountableType,
  getDepartment,
  getAdminShort,
  getAdmin,
  getProblemExactExport,
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
      dataList: [],

      dateRange: null,

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      localJson,

      departList: [],
      userList: [],
      personList1: [],

      acctableList: [],

      title: "",
      open: false,

      form: {},
      rules: {
        type: [
          {
            required: true,
            message: "问责对象类型不能为空",
            trigger: "change",
          },
        ],
        to_uuid: [
          { required: true, message: "问责对象不能为空", trigger: "change" },
        ],
        type_uuid: [
          { required: true, message: "问责类型不能为空", trigger: "change" },
        ],
        content: [
          { required: true, message: "问责详情不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.checkRole();
    this.getAccountableTypeList();
    this.getDepartmentList();
    this.getUserList();
    this.handleQuery();
    console.log(this.admin);
    // this.getDepartmentList();
    // this.getProblemDepartmentTypeList();
  },
  methods: {
    getAccountableTypeList() {
      getAccountableType().then((resp) => {
        console.log(resp);
        this.acctableList = resp.array;
      });
    },

    getDepartmentList() {
      const query = {
        level: 2,
      };
      getDepartment(query).then((resp) => {
        this.departList = resp.array.map((item) => {
          return {
            name: item.name,
            uuid: item.uuid,
          };
        });
      });
    },

    getUserList() {
      const queryParams = {
        rows: 9999,
        offset: 0,
      };
      getAdminShort(queryParams).then((response) => {
        this.userList = response.array;
      });
    },

    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList2();
    },

    getList2() {
      this.loading = true;
      this.queryParams.rows = this.queryParams.pageSize;
      this.queryParams.offset =
        (this.queryParams.pageNum - 1) * this.queryParams.pageSize;

      if (!this.queryParams.number) {
        delete this.queryParams.number;
      }

      if (this.dateRange) {
        this.queryParams.start_create_datetime =
          this.parseTime(this.dateRange[0], "{y}-{m}-{d}") + " 00:00:00";

        this.queryParams.end_create_datetime =
          this.parseTime(this.dateRange[1], "{y}-{m}-{d}") + " 23:59:59";
      } else {
        delete this.queryParams.start_create_datetime;
        delete this.queryParams.end_create_datetime;
      }

      getAccountable(this.queryParams).then((resp) => {
        this.loading = false;
        this.dataList = resp.array;
        this.total = resp.count;
      });
    },

    checkRole() {
      if (localJson.delUser.includes(this.admin.name)) {
        this.delDisabled = false;
      }
    },

    selectTime(val) {
      this.handleQuery();
    },

    changeType(e) {
      this.form.to_uuid = undefined;
    },

    remotePerson1(query) {
      let count = 0;
      this.personList1 = [];
      this.userList.forEach((item) => {
        if (item.real_name.indexOf(query) != -1 && count <= 20) {
          this.personList1.push(item);
          count++;
        } else if (item.name.indexOf(query) != -1 && count <= 20) {
          this.personList1.push(item);
          count++;
        }
      });
    },

    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "新建问责记录";
    },

    handleEdit(row) {
      this.reset();
      var model = { ...row };

      this.form = {
        uuid: model.uuid,
        type: model.type,
        to_uuid: model.to_uuid,
        problem_number: model.problem_number,
        type_uuid: model.type_uuid,
        content: model.content,
        to_lv2_department_uuid: model.to_lv2_department_uuid,
        create_datetime: model.create_datetime,

        from_uuid: model.from_uuid,
        from_lv2_department_uuid: model.from_department_uuid,
        from_real_name: model.from_real_name,
      };

      if (this.form.type == "PERSON") {
        this.personList1 = [];
        this.userList.forEach((item) => {
          if (item.uuid == this.form.to_uuid) {
            this.personList1.push(item);
          }
        });
      }

      this.open = true;
      this.title = "修改问责记录";
    },

    async submitForm() {
      await this.setToLV2();

      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.uuid != undefined) {
            if (!this.form.problem_number) {
              this.form.problem_number = "null";
            }

            modifyAccountable(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList2();
            });
          } else {
            addAccountable(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList2();
            });
          }
        }
      });
    },

    reset() {
      this.form = {
        type: "PERSON",
        to_uuid: undefined,
        problem_number: undefined,
        from_uuid: this.admin.uuid,
        type_uuid: undefined,
        content: undefined,
        from_lv2_department_uuid: this.admin.department_uuid2,
        to_lv2_department_uuid: this.admin.department_uuid2,
        create_datetime: this.parseTime(new Date()),
        from_real_name: this.admin.real_name,
      };
      this.resetForm("form");
    },

    setToLV2() {
      return new Promise((resolve) => {
        debugger;
        if (!this.form.to_uuid) {
          return resolve("nextt");
        }
        if (this.form.type == "PERSON") {
          const query2 = {
            uuid: this.form.to_uuid,
            offset: 0,
            rows: 10,
          };
          getAdmin(query2).then((resp) => {
            var deptId = resp.array[0].department_uuid;
            switch (resp.array[0].parent_array.length) {
              case 2:
                deptId = resp.array[0].parent_array[1].uuid;
                break;
            }
            this.form.to_lv2_department_uuid = deptId;

            console.log(this.form);
            return resolve("nextt");
          });
        } else if (this.form.type == "DEPARTMENT") {
          this.form.to_lv2_department_uuid = this.form.to_uuid;
          return resolve("nextt");
        } else {
          return resolve("nextt");
        }
      });
    },

    handleView(number) {
      if (number) {
        const route = this.$router.resolve({
          name: "view",
          query: {
            number: number,
            operate: "view",
          },
        });

        window.open(route.href, "_blank");

        // this.$router.push({
        //   path: "/problem/view",
        //   query: { number: this.form.problem_number, operate: "view" },
        // });
      }
    },

    handleDelete(row) {
      this.$modal
        .confirm("是否确认删除该数据")
        .then(function () {
          return deleteAccountableByUuid({ uuid: row.uuid });
        })
        .then(() => {
          this.handleQuery();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },

    // handleExport() {
    //   this.loading = true;

    //   if (!this.queryParams.number) {
    //     delete this.queryParams.number;
    //   }

    //   if (this.dateRange) {
    //     this.queryParams.start_create_datetime =
    //       this.parseTime(this.dateRange[0], "{y}-{m}-{d}") + " 00:00:00";
    //     this.queryParams.end_create_datetime =
    //       this.parseTime(this.dateRange[1], "{y}-{m}-{d}") + " 23:59:59";
    //   } else {
    //     delete this.queryParams.start_create_datetime;
    //     delete this.queryParams.end_create_datetime;
    //   }

    //   this.queryParams = checkAdmin(this.admin, this.queryParams, true);

    //   var query = { ...this.queryParams };
    //   query.rows = 99999;
    //   query.offset = 0;

    //   getProblemExactExport(query).then((resp) => {
    //     debugger;
    //     let file = this.b64toFile(
    //       resp,
    //       "问题列表",
    //       "application/vnd.ms-excel;charset=utf-8"
    //     );
    //     saveAs(file, "问题列表.csv");
    //     this.loading = false;
    //   });
    // },

    // b64toFile(b64Data, filename, contentType) {
    //   let sliceSize = 512;
    //   let byteCharacters = atob(b64Data);
    //   let byteArrays = [];

    //   for (
    //     let offset = 0;
    //     offset < byteCharacters.length;
    //     offset += sliceSize
    //   ) {
    //     let slice = byteCharacters.slice(offset, offset + sliceSize);
    //     let byteNumbers = new Array(slice.length);

    //     for (let i = 0; i < slice.length; i++) {
    //       byteNumbers[i] = slice.charCodeAt(i);
    //     }
    //     let byteArray = new Uint8Array(byteNumbers);
    //     byteArrays.push(byteArray);
    //   }

    //   let file = new File(byteArrays, filename, { type: contentType });
    //   return file;
    // },
  },
};
</script>

<style lang="scss" scope >
.el-dialog__body {
  padding: 10px 20px;
}

.dialog {
  .el-input__inner::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .el-input__inner[type="number"] {
    -moz-appearance: textfield;
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  .el-form--label-top .el-form-item__label {
    padding: 0 0 0 0;
  }
}
</style>