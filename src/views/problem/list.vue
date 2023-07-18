<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-card>
          <div
            slot="header"
            class="clearfix"
          >
            <span style="font-weight: bold; color: #016dbe">问题列表</span>
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
                  <el-input
                    v-model="queryParams.number"
                    placeholder="输入问题编号"
                    prefix-icon="el-icon-search"
                    style="width:100%"
                  >
                    <el-button
                      slot="append"
                      @click="handleQuery"
                    >搜索</el-button>
                  </el-input>
                </el-form-item>
              </div>

              <div>
                <el-form-item>
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

              <el-form-item>
                <el-button
                  type="warning"
                  plain
                  icon="el-icon-download"
                  @click="handleExport"
                >导出</el-button>
              </el-form-item>
            </el-row>

          </el-form>

          <el-table
            v-loading="loading"
            :data="dataList"
            @filter-change="filterChange"
          >

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
              column-key="status"
              :filter-multiple="false"
              :filters="statusList"
              filter-placement="bottom"
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
              label="检查单位"
              align="center"
              prop="from_department_name"
              column-key="from_department_uuid"
              :filter-multiple="false"
              :filters="fromDeptList"
              filter-placement="bottom"
            />

            <el-table-column
              label="问题类型"
              align="center"
              prop="problem_department_type_parent_name"
              width="140"
              column-key="problem_type"
              :filter-multiple="false"
              :filters="typeList"
              filter-placement="bottom"
            />

            <el-table-column
              label="问题类别"
              align="center"
              prop="problem_department_type_name"
              :show-overflow-tooltip="true"
              column-key="type_uuids"
              :filters="problemTypeList"
              filter-placement="bottom"
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
              column-key="to_department_uuid"
              :filter-multiple="false"
              :filters="toDeptList"
              filter-placement="bottom"
            />

            <el-table-column
              label="责任人"
              align="center"
              width="120"
              prop="responsible_real_name"
              :show-overflow-tooltip="true"
              column-key="responsible"
              :filter-multiple="false"
              :filters="responsibleList"
              filter-placement="bottom"
            >
              <template slot-scope="scope"> {{(scope.row.responsible_real_name&&scope.row.responsible_real_name.length>0)?scope.row.responsible_real_name.join(','):'' }} </template>
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              width="160"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleView(scope.row)"
                >查看</el-button>
                <el-button
                  type="primary"
                  size="small"
                  v-if="!delDisabled"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { saveAs } from "file-saver";
import { checkAdmin } from "@/utils/ruoyi";
import localJson from "/static/local.json";
import {
  deleteProblemByUuid,
  getProblemDepartmentType,
  getDepartment,
  getProblemExact,
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
      delDisabled: true,

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

      statusList: [
        { text: "未反馈", value: "UN_FEEDBACK" },
        { text: "反馈属实", value: "FACT" },
        { text: "反馈不属实", value: "NOT_FACT" },
        { text: "已归档", value: "FILED" },
      ],
      typeList: [
        { text: "自查", value: "SELF" },
        { text: "检查", value: "CHECK" },
      ],
      responsibleList: [
        { text: "有责任人", value: "true" },
        { text: "无责任人", value: "false" },
      ],

      fromDeptList: [],
      toDeptList: [],

      problemTypeList: [],

      localJson,
    };
  },

  watch: {
    //监听路由地址的改变
    $route: {
      immediate: true,
      handler() {
        //需要监听的参数
        this.queryParams.status = this.$route.query.status;
        console.log(this.queryParams.status);
        this.handleQuery();
      },
    },
  },
  created() {
    this.checkRole();
    this.getDepartmentList();
    this.getProblemDepartmentTypeList();
  },
  methods: {
    filterChange(filterCondition) {
      var str = JSON.stringify(filterCondition);
      var filter = JSON.parse(str);
      if (filter.status) {
        if (filter.status == "FACT" || filter.status == "NOT_FACT") {
          this.queryParams.status = "FEEDBACK";
          this.queryParams.fact = filter.status[0];
        } else {
          this.queryParams.status = filter.status[0];
          delete this.queryParams.fact;
        }
      }
      if (filter.problem_type) {
        this.queryParams.problem_type = filter.problem_type[0];
      }
      if (filter.from_department_uuid) {
        this.queryParams.from_department_uuid = filter.from_department_uuid[0];
      }

      if (filter.to_department_uuid) {
        this.queryParams.to_department_uuid = filter.to_department_uuid[0];
      }
      if (filter.type_uuids) {
        if (filter.type_uuids.length == 0) {
          delete this.queryParams.type_uuids;
        } else {
          this.queryParams.type_uuids = filter.type_uuids.join(";");
        }
      }

      if (filter.responsible) {
        this.queryParams.responsible_uuid_has = filter.responsible[0];
      }

      this.handleQuery();
    },

    getDepartmentList() {
      const query = {
        level: 2,
      };
      getDepartment(query).then((resp) => {
        this.toDeptList = resp.array.map((item) => {
          return {
            text: item.name,
            value: item.uuid,
          };
        });
        this.fromDeptList = [...this.toDeptList];
      });
    },

    getProblemDepartmentTypeList() {
      getProblemDepartmentType().then((resp) => {
        let lv2List = resp.array.filter((item) => item.level == 2);
        this.problemTypeList = lv2List.map((item) => {
          return {
            text: item.name,
            value: item.uuid,
          };
        });
      });
    },

    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList2();
    },

    getList2() {
      console.log(this.queryParams);
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

      this.queryParams = checkAdmin(this.admin, this.queryParams, true);
      getProblemExact(this.queryParams).then((resp) => {
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

    handleView(row) {
      this.$router.push({
        path: "/problem/view",
        query: { number: row.number, operate: "view" },
      });
    },

    handleEdit(row) {
      this.$router.push({
        path: "/problem/view",
        query: { number: row.number, operate: "edit" },
      });
    },

    handleDelete(row) {
      this.$modal
        .confirm('是否确认删除编号为"' + row.number + '"的问题数据')
        .then(function () {
          return deleteProblemByUuid({ uuid: row.uuid });
        })
        .then(() => {
          this.handleQuery();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },

    handleExport() {
      this.loading = true;

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

      this.queryParams = checkAdmin(this.admin, this.queryParams, true);

      var query = { ...this.queryParams };
      query.rows = 99999;
      query.offset = 0;

      getProblemExactExport(query).then((resp) => {
        // 解码Base64数据
        const base64ToUtf8 = (base64) => {
          const binaryString = atob(base64);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const decoder = new TextDecoder("utf-8");
          return decoder.decode(bytes);
        };

        const decodedData = base64ToUtf8(resp);
        // 清除换行符和空格符
        const cleanedData = decodedData.replace(/&nbsp;/g, "");
        // 将清除后的数据转回Base64格式
        const encodedData = this.stringToBase64(cleanedData);

        let file = this.b64toFile(
          encodedData,
          "问题列表",
          "application/vnd.ms-excel;charset=utf-8"
        );
        saveAs(file, "问题列表.csv");
        this.loading = false;
      });
    },

    stringToBase64(str) {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const base64 = this.base64ArrayBuffer(data);
      return base64;
    },

    base64ArrayBuffer(arrayBuffer) {
      let base64 = "";
      const encodings =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

      const bytes = new Uint8Array(arrayBuffer);
      const byteLength = bytes.byteLength;
      const byteRemainder = byteLength % 3;
      const mainLength = byteLength - byteRemainder;

      let a, b, c, d;
      let chunk;

      // Main loop deals with bytes in chunks of 3
      for (let i = 0; i < mainLength; i += 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
        d = chunk & 63; // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
      }

      // Deal with the remaining bytes and padding
      if (byteRemainder === 1) {
        chunk = bytes[mainLength];

        a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4; // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + "==";
      } else if (byteRemainder === 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2; // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + "=";
      }

      return base64;
    },
    b64toFile(b64Data, filename, contentType) {
      let sliceSize = 512;
      let byteCharacters = atob(b64Data);
      let byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      let file = new File(byteArrays, filename, { type: contentType });
      return file;
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