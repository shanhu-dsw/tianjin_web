(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-afd60cd0"],{"0074":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"user"},[a("div",{staticClass:"info-title"},[t._v(" 个人信息 ")]),a("div",{staticClass:"flex",staticStyle:{"align-items":"center"}},[a("div",{staticClass:"flex info-content"},[a("div",{staticClass:"nfo-user"},[a("img",{staticStyle:{width:"100px"},attrs:{src:t.img1},on:{click:function(e){return t.goOldList()}}})]),a("div",{staticClass:"flexc info-text "},[a("span",[t._v("姓名："+t._s(t.admin.real_name))]),a("span",[t._v("警号："+t._s(t.admin.name))]),a("span",[t._v("单位："+t._s(t.admin.full_name))]),a("span",[t._v("登录："+t._s(t.logTime))])])]),a("div",{staticClass:"flex"},[a("el-button",{attrs:{type:"primary"},on:{click:t.changePwd}},[t._v("修改登录密码")])],1)]),a("div",{staticClass:"info-title"},[t._v(" 个人记录 ")]),a("div",{staticClass:"flex"},[a("div",{staticClass:"flexc log-left"},[a("el-link",{staticStyle:{"margin-bottom":"20px"},attrs:{type:"info"},on:{click:function(e){return t.quickTo(1)}}},[t._v("登录记录")]),a("el-link",{staticStyle:{"margin-bottom":"20px"},attrs:{type:"info"},on:{click:function(e){return t.quickTo(2)}}},[t._v("我记录的问题")]),a("el-link",{attrs:{type:"info"},on:{click:function(e){return t.quickTo(3)}}},[t._v("我反馈的问题")])],1),a("div",{staticClass:"flex1",staticStyle:{padding:"20px"}},[t._m(0),a("div",{staticClass:"flexc"},[a("el-table",{attrs:{data:t.list0}},[a("el-table-column",{attrs:{label:"登陆IP",align:"center",prop:"ip_addr"}}),a("el-table-column",{attrs:{label:"登陆时间",align:"center",prop:"create_datetime"}}),a("el-table-column",{attrs:{label:"登陆方式",align:"center",prop:"type"}}),a("el-table-column",{attrs:{label:"备注",align:"center",prop:"number"}})],1)],1),t._m(1),a("div",{staticClass:"flexc"},[a("el-table",{attrs:{data:t.list1}},[a("el-table-column",{attrs:{label:"问题编号",align:"center",prop:"number",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" #"+t._s(e.row.number)+" ")]}}])}),a("el-table-column",{attrs:{label:"问题状态",align:"center",prop:"status",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return["UN_FEEDBACK"==e.row.status?a("el-tag",{attrs:{type:"warning",effect:"dark"}},[t._v("未反馈")]):t._e(),"FEEDBACK"==e.row.status?a("el-tag",{attrs:{type:"success",effect:"dark"}},[t._v("已反馈")]):t._e(),"FILED"==e.row.status?a("el-tag",{attrs:{type:"info",effect:"dark"}},[t._v("已归档")]):t._e()]}}])}),a("el-table-column",{attrs:{label:"问题类型",align:"center",prop:"problem_department_type_parent_name",width:"140"}}),a("el-table-column",{attrs:{label:"问题类别",align:"center",prop:"problem_department_type_name","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{label:"发生时间",align:"center",prop:"create_datetime",width:"180"}}),a("el-table-column",{attrs:{label:"问题单位",align:"center",prop:"department_name","show-overflow-tooltip":!0}}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.handleView(e.row.uuid)}}},[t._v("查看")])]}}])})],1),a("pagination",{attrs:{autoScroll:!1,pageSizes:t.pageSize,total:t.total1,page:t.query1.pageNum,limit:t.query1.pageSize},on:{"update:page":function(e){return t.$set(t.query1,"pageNum",e)},"update:limit":function(e){return t.$set(t.query1,"pageSize",e)},pagination:t.getList1}})],1),t._m(2),a("div",{staticClass:"flexc"},[a("el-table",{attrs:{data:t.list2}},[a("el-table-column",{attrs:{label:"问题编号",align:"center",prop:"number",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" #"+t._s(e.row.problem_array[0].number)+" ")]}}])}),a("el-table-column",{attrs:{label:"问题状态",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return["UN_FEEDBACK"==e.row.problem_array[0].status?a("el-tag",{attrs:{type:"warning",effect:"dark"}},[t._v("未反馈")]):t._e(),"FEEDBACK"==e.row.problem_array[0].status?a("el-tag",{attrs:{type:"success",effect:"dark"}},[t._v("已反馈")]):t._e(),"FILED"==e.row.problem_array[0].status?a("el-tag",{attrs:{type:"info",effect:"dark"}},[t._v("已归档")]):t._e()]}}])}),a("el-table-column",{attrs:{label:"问题类型",align:"center",width:"140"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.problem_array[0].problem_department_type_parent_name)+" ")]}}])}),a("el-table-column",{attrs:{label:"问题类别",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.problem_array[0].problem_department_type_name)+" ")]}}])}),a("el-table-column",{attrs:{label:"问题单位",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.problem_array[0].department_name)+" ")]}}])}),a("el-table-column",{attrs:{label:"检查单位",align:"center","show-overflow-tooltip":!0},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.problem_array[0].from_department_name)+" ")]}}])}),a("el-table-column",{attrs:{label:"反馈时间",align:"center",prop:"create_datetime",width:"180"}}),a("el-table-column",{attrs:{label:"反馈内容",align:"center",prop:"content",width:"180"}}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.handleView(e.row.problem_array[0].uuid)}}},[t._v("查看")])]}}])})],1),a("pagination",{attrs:{autoScroll:!1,pageSizes:t.pageSize,total:t.total2,page:t.query2.pageNum,limit:t.query2.pageSize},on:{"update:page":function(e){return t.$set(t.query2,"pageNum",e)},"update:limit":function(e){return t.$set(t.query2,"pageSize",e)},pagination:t.getList2}})],1)])])]),a("el-dialog",{attrs:{title:"修改密码",visible:t.open,width:"500px","close-on-click-modal":!1,"append-to-body":""},on:{"update:visible":function(e){t.open=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"新密码",prop:"newPassword"}},[a("el-input",{attrs:{placeholder:"请输入新密码",type:"password","show-password":""},model:{value:t.form.newPassword,callback:function(e){t.$set(t.form,"newPassword",e)},expression:"form.newPassword"}})],1),a("el-form-item",{attrs:{label:"确认密码",prop:"confirmPassword"}},[a("el-input",{attrs:{placeholder:"请确认新密码",type:"password","show-password":""},model:{value:t.form.confirmPassword,callback:function(e){t.$set(t.form,"confirmPassword",e)},expression:"form.confirmPassword"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.submitForm}},[t._v("保存")]),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){t.open=!1}}},[t._v("关闭")])],1)],1)],1)],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex",staticStyle:{"margin-top":"20px","margin-bottom":"30px"},attrs:{id:"div1"}},[a("div",{staticClass:"log-title"},[t._v("登陆记录")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex",staticStyle:{"margin-top":"20px","margin-bottom":"30px"},attrs:{id:"div2"}},[a("div",{staticClass:"log-title"},[t._v("我记录的问题")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex",staticStyle:{"margin-top":"20px","margin-bottom":"30px"},attrs:{id:"div3"}},[a("div",{staticClass:"log-title"},[t._v("我反馈的问题")])])}],s=a("5530"),l=(a("d9e2"),a("caad"),a("2532"),a("b0c0"),a("14d9"),a("2f62")),n=a("1641"),o=a("9d9a"),u={computed:Object(s["a"])({},Object(l["b"])(["admin"])),data:function(){var t=this,e=function(e,a,r){t.form.newPassword!==a?r(new Error("两次输入的密码不一致")):r()};return{localJson:n,img1:a("3810"),logTime:void 0,list0:[],pageSize:[5,10,20,30],total1:0,query1:{pageNum:1,pageSize:5,offset:0,rows:5},list1:[],total2:0,query2:{pageNum:1,pageSize:5,offset:0,rows:5},list2:[],open:!1,form:{newPassword:void 0,confirmPassword:void 0},rules:{newPassword:[{required:!0,message:"新密码不能为空",trigger:"blur"},{min:6,max:20,message:"长度在 6 到 20 个字符",trigger:"blur"}],confirmPassword:[{required:!0,message:"确认密码不能为空",trigger:"blur"},{required:!0,validator:e,trigger:"blur"}]}}},created:function(){console.log(this.admin),this.getUserLog(),this.getList1(),this.getList2()},methods:{quickTo:function(t){this.$el.querySelector("#div"+t).scrollIntoView({block:"start",behavior:"smooth"})},goOldList:function(){n.delUser.includes(this.admin.name)&&this.$router.push("/problem/oldList")},getUserLog:function(){var t=this,e={name:this.admin.name,type:"LOGIN",offset:1,rows:5};Object(o["u"])(e).then((function(e){e.array.length>0?(t.list0=e.array,t.logTime=t.parseTime(e.array[0].create_datetime,"{y}年{m}月{d}日 {h}:{i}:{s}")):t.logTime=t.parseTime(new Date,"{y}年{m}月{d}日 {h}:{i}:{s}")}))},getList1:function(){var t=this;this.query1.rows=this.query1.pageSize,this.query1.offset=(this.query1.pageNum-1)*this.query1.pageSize,this.query1.from_uuid=this.admin.uuid,Object(o["C"])(this.query1).then((function(e){t.list1=e.array,t.total1=e.count}))},getList2:function(){var t=this;this.query2.rows=this.query2.pageSize,this.query2.offset=(this.query2.pageNum-1)*this.query2.pageSize,this.query2.from_uuid=this.admin.uuid,Object(o["t"])(this.query2).then((function(e){t.list2=e.array,t.total2=e.count}))},changePwd:function(){this.form={newPassword:void 0,confirmPassword:void 0},this.open=!0},submitForm:function(){var t=this;this.$refs["form"].validate((function(e){if(e){var a={uuid:t.admin.uuid,password:t.form.newPassword};Object(o["G"])(a).then((function(e){t.$modal.msgSuccess("修改成功"),t.open=!1}))}}))},handleView:function(t){this.$router.push({path:"/problem/view",query:{id:t,operate:"view"}})}}},c=u,p=(a("bc3a3"),a("2877")),d=Object(p["a"])(c,r,i,!1,null,null,null);e["default"]=d.exports},1641:function(t){t.exports=JSON.parse('{"user":{"username":"supervision_271898","password":"271898","source_type":"Admin"},"delUser":["271822","271898","271809"]}')},3810:function(t,e,a){t.exports=a.p+"static/img/user.790aa4ed.jpg"},bc3a3:function(t,e,a){"use strict";a("fc38")},fc38:function(t,e,a){}}]);