<template>
  <el-form
    inline
    size="medium"
  >
    <el-form-item style="margin-bottom: 0px">
      <el-select
        v-model="lidu"
        placeholder="请选择"
        @change="changeSize"
        size="small"
        style="width: 100px"
      >
        <el-option
          label="按日"
          :value="1"
        ></el-option>
        <el-option
          label="按周"
          :value="2"
        ></el-option>
        <el-option
          label="按月"
          :value="3"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="margin-bottom: 0px">
      <el-date-picker
        size="small"
        style="width: 300px"
        v-model="datePicker"
        :type="lidu == 3 ? 'monthrange' : 'daterange'"
        align="left"
        unlink-panels
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
        @change="changeDate"
        @focus="setWeekClass"
      ></el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
import { parseTime } from "@/utils/ruoyi";
export default {
  data() {
    return {
      // 粒度 1：日，2：周，3：月
      lidu: 1,
      // 时间区间选择
      datePicker: [],
      pickerOptions: {
        firstDayOfWeek: 1,
        shortcuts: [],
      },
    };
  },
  methods: {
    // 切换粒度
    changeSize(val) {
      this.datePicker = [];
      let shortcuts = [];
      // 一天时间
      const day = 3600 * 1000 * 24;
      const date = new Date();
      const end = date - day;
      // 日粒度
      if (val == 1) {
        //   初始化时间 默认最近7天
        this.changeDate([date - day * 7, date - day]);
        //   昨日
        const latelyDay = this.setShortcut("昨日", end, end);
        //   上周
        const curDay = date.getDay();
        const lastWeek = this.setShortcut(
          "上周",
          date - day * (7 + curDay),
          date - day * (1 + curDay)
        );
        //   本月
        const curMonth = this.setShortcut("本月", new Date().setDate(1), end);
        //   上月  上个月第一天 ~ 上个月最后一天
        const lastMonth = this.setShortcut(
          "上月",
          new Date(date.getFullYear(), date.getMonth(), 0).setDate(1),
          new Date().setDate(0)
        );
        //   最近一周
        const latelyWeek = this.setShortcut("最近7天", date - day * 7, end);
        //   最近15天
        const latelyHalfMonth = this.setShortcut(
          "最近15天",
          date - day * 15,
          end
        );
        //   最近30天
        const latelyMonth = this.setShortcut("最近30天", date - day * 31, end);
        //   最近90天
        const lately3Month = this.setShortcut("最近90天", date - day * 91, end);
        shortcuts.push(
          latelyDay,
          lastWeek,
          curMonth,
          lastMonth,
          latelyWeek,
          latelyHalfMonth,
          latelyMonth,
          lately3Month
        );
        // 选择限制 不能选今天以后
        // this.pickerOptions.disabledDate = (time) => {
        //   return time.getTime() + 86400000 >= Date.now();
        // };
      }
      // 周粒度
      if (val == 2) {
        //   初始化时间 默认最近7天
        this.changeDate([date - day * 7, date - day]);
        //   最近7天
        const latelyWeek = this.setShortcut("最近7天", date - day * 7, end);
        // 最近30天
        const latelyMonth = this.setShortcut("最近30天", date - day * 31, end);
        // 最近90天
        const lately3Month = this.setShortcut("最近90天", date - day * 91, end);
        shortcuts.push(latelyWeek, latelyMonth, lately3Month);
        // 选择限制 不能选今天以后
        // this.pickerOptions.disabledDate = (time) => {
        //   return time.getTime() + 86400000 >= Date.now();
        // };
      }
      // 月粒度 都是到上个月的最后一天
      if (val == 3) {
        const lastMonth1 = new Date(
          date.getFullYear(),
          date.getMonth(),
          0
        ).setDate(1);
        // 初始化时间 默认上月
        this.changeDate([lastMonth1, lastMonth1]);
        // 上月
        const last1M = this.setShortcut("上月", lastMonth1, lastMonth1);
        // 今年
        const curYear = this.setShortcut(
          "今年",
          new Date(date.getFullYear(), 0),
          lastMonth1
        );
        // 最近三个月
        const last3M = this.setShortcut(
          "最近三个月",
          new Date(date.getFullYear(), date.getMonth() - 3),
          lastMonth1
        );
        // 最近六个月
        const last6M = this.setShortcut(
          "最近六个月",
          new Date(date.getFullYear(), date.getMonth() - 6),
          lastMonth1
        );
        shortcuts.push(last1M, curYear, last3M, last6M);
        // 选择限制 不能选上个月最后一天之后
        // this.pickerOptions.disabledDate = (time) => {
        //   return time.getTime() + 86400000 >= new Date().setDate(0);
        // };
      }
      // console.log('快捷设置：', shortcuts)
      this.pickerOptions.shortcuts = shortcuts;
    },
    setShortcut(text, start, end) {
      return {
        text,
        onClick(picker) {
          picker.$emit("pick", [
            parseTime(new Date(start), "{y}-{m}-{d}"),
            parseTime(new Date(end), "{y}-{m}-{d}"),
          ]);
        },
      };
    },
    // 所选时间
    changeDate(date) {
      if (!date) return;
      // 日粒度
      if (this.lidu == 1) {
        date = [
          parseTime(new Date(date[0]), "{y}-{m}-{d}"),
          parseTime(new Date(date[1]), "{y}-{m}-{d}"),
        ];
        this.datePicker = this.datePicker.length ? this.datePicker : date;
      }
      // 周粒度
      if (this.lidu == 2) {
        // 取出开始时间和结束时间分别是周几
        const day = 3600 * 1000 * 24;
        const yesterday = new Date() - day;
        const start = new Date(date[0]);
        const end = new Date(date[1]);
        // 开始时间是距离周一天数
        const startDay = start.getDay() == 0 ? 6 : start.getDay() - 1;
        // 结束时间是距离周日天数
        const endDay = end.getDay() == 0 ? 6 : end.getDay() - 1;
        // 距离上周一天数
        const monDay = 13 - new Date().getDay();
        const lastMonday = new Date() - day * monDay;
        // 距离上周日天数
        const sunDay = new Date().getDay() == 0 ? 7 : new Date().getDay();
        const lastSunday = new Date() - day * sunDay;
        const res = [];
        // 计算所选开始时间的周一  （判断当前所选日期的周一是否 > 上周一）
        res[0] =
          Number(start) - day * startDay > Number(lastMonday)
            ? Number(lastMonday)
            : Number(start) - day * startDay;
        // 计算所选结束时间的周日   （判断当前所选日期的周日是否 > 上周日）
        res[1] =
          Number(end) + day * (6 - endDay) > Number(lastSunday)
            ? Number(lastSunday)
            : Number(end) + day * (6 - endDay);
        this.datePicker = [
          parseTime(new Date(res[0]), "{y}-{m}-{d}"),
          parseTime(new Date(res[1]), "{y}-{m}-{d}"),
        ];
      }
      // 月粒度
      if (this.lidu == 3) {
        const endTime = new Date(date[1]);
        endTime.setMonth(endTime.getMonth() + 1);
        const endDay = endTime.setDate(0);
        // console.log('结束时间的月底', parseTime(new Date(endDay), 'YYYY-MM-dd'))
        this.datePicker = [
          parseTime(new Date(date[0]), "{y}-{m}-{d}"),
          parseTime(new Date(endDay), "{y}-{m}-{d}"),
        ];
      }
      // console.log('this.datePicker',this.datePicker)
      this.$emit("changeDate", this.lidu, this.datePicker);
    },
    // 如果是周粒度的时候 首次进入需要绑定样式 is-week-mode
    setWeekClass(event) {
      if (
        this.lidu == 2 &&
        event.picker &&
        event.picker.$children[0].$el.className != "el-date-table is-week-mode"
      ) {
        // console.log(event.picker)
        event.picker.$children.forEach((r) => {
          //   console.log(r.$el)
          r.$el.className = `el-date-table is-week-mode`;
        });
      } else if (
        this.lidu != 2 &&
        event.picker &&
        event.picker.$children[0].$el.className == "el-date-table is-week-mode"
      ) {
        event.picker.$children.forEach((r) => {
          //   console.log(r.$el)
          r.$el.className = `el-date-table`;
        });
      }
    },
  },
  mounted() {
    // 默认日粒度
    this.changeSize(1);
  },
};
</script>

<style>
</style>