(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d0eb5756","chunk-36853cd8"],{"011d":function(e,t,a){},"0481":function(e,t,a){"use strict";var i=a("23e7"),n=a("a2bf6"),r=a("7b0b"),l=a("07fa"),o=a("5926"),s=a("65f0");i({target:"Array",proto:!0},{flat:function(){var e=arguments.length?arguments[0]:void 0,t=r(this),a=l(t),i=s(t,0);return i.length=n(i,t,t,a,0,void 0===e?1:o(e)),i}})},"04d1":function(e,t,a){var i=a("342f"),n=i.match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},1641:function(e){e.exports=JSON.parse('{"user":{"username":"supervision_271898","password":"271898","source_type":"Admin"},"delUser":["271822","271898","271809"]}')},4069:function(e,t,a){var i=a("44d2");i("flat")},"4e82":function(e,t,a){"use strict";var i=a("23e7"),n=a("e330"),r=a("59ed"),l=a("7b0b"),o=a("07fa"),s=a("083a"),u=a("577e"),c=a("d039"),d=a("addb"),p=a("a640"),m=a("04d1"),f=a("d998"),h=a("2d00"),b=a("512ce"),g=[],v=n(g.sort),_=n(g.push),y=c((function(){g.sort(void 0)})),k=c((function(){g.sort(null)})),x=p("sort"),w=!c((function(){if(h)return h<70;if(!(m&&m>3)){if(f)return!0;if(b)return b<603;var e,t,a,i,n="";for(e=65;e<76;e++){switch(t=String.fromCharCode(e),e){case 66:case 69:case 70:case 72:a=3;break;case 68:case 71:a=4;break;default:a=2}for(i=0;i<47;i++)g.push({k:t+i,v:a})}for(g.sort((function(e,t){return t.v-e.v})),i=0;i<g.length;i++)t=g[i].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}})),T=y||!k||!x||!w,O=function(e){return function(t,a){return void 0===a?-1:void 0===t?1:void 0!==e?+e(t,a)||0:u(t)>u(a)?1:-1}};i({target:"Array",proto:!0,forced:T},{sort:function(e){void 0!==e&&r(e);var t=l(this);if(w)return void 0===e?v(t):v(t,e);var a,i,n=[],u=o(t);for(i=0;i<u;i++)i in t&&_(n,t[i]);d(n,O(e)),a=o(n),i=0;while(i<a)t[i]=n[i++];while(i<u)s(t,i++);return t}})},"512ce":function(e,t,a){var i=a("342f"),n=i.match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},"5f38":function(e,t,a){"use strict";a("011d")},"91f4":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-row",[a("el-col",[a("el-card",[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticStyle:{"font-weight":"bold",color:"#016dbe"}},[e._v("视频督察问题导入工具")]),a("div",{staticClass:"pull-right"},[a("el-button",{attrs:{type:"primary"},on:{click:e.handleQuery}},[e._v("刷新数据")])],1)]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.dataList}},[a("el-table-column",{attrs:{fixed:"",align:"center","header-align":"center",prop:"id",label:"问题编号"}}),a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",prop:"problem_status",label:"问题状态"}},[e._v(" 已确认 ")]),a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",prop:"date",label:"单位"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.location.name))])]}}])}),a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",prop:"date",label:"问题类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.problem_category?t.row.problem_category.name:"暂无问题类型"))])]}}])}),a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",prop:"active_at",label:"督导检查时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("format")(t.row.issued_at)))])]}}])}),a("el-table-column",{attrs:{fixed:"","header-align":"center",align:"center",prop:"date",label:"问题图片"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("el-image",{staticStyle:{width:"100px",height:"50px","border-radius":"5px"},attrs:{src:e.row.first_evidence?e.row.first_evidence.src:""}})]}}])}),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small",disabled:!!t.row.discover_type},on:{click:function(a){return e.update(t.row)}}},[e._v("导入")])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,page:e.queryParams.pageNum,limit:e.queryParams.pageSize},on:{"update:page":function(t){return e.$set(e.queryParams,"pageNum",t)},"update:limit":function(t){return e.$set(e.queryParams,"pageSize",t)},pagination:e.getList2}})],1)],1)],1),a("el-dialog",{attrs:{title:e.title,visible:e.open,width:"1000px","append-to-body":""},on:{"update:visible":function(t){e.open=t}}},[a("OldItem",{attrs:{token:e.token,id:e.id,admin:e.admin},on:{"update:token":function(t){e.token=t},"update:id":function(t){e.id=t},"update:admin":function(t){e.admin=t},change:function(t){return e.updatetChange(t)}}})],1)],1)},n=[],r=a("c7eb"),l=a("1da1"),o=a("5530"),s=(a("14d9"),a("ac1f"),a("5319"),a("d3b7"),a("e9c4"),a("159b"),a("2f62")),u=a("b211"),c=a("1641"),d=a("bc3a"),p=a.n(d),m=a("9d9a"),f={computed:Object(o["a"])({},Object(s["b"])(["admin"])),components:{OldItem:u["default"]},data:function(){return{loading:!0,queryParams:{pageNum:1,pageSize:10},total:0,dataList:[],token:"",title:"",open:!1,id:0,localJson:c}},filters:{isImg:function(e){var t=[];return t.push(e.src),t},format:function(e){return new Date(1e3*(new Date(e)/1e3+28800)).toISOString().replace(/T/g," ").replace(/\.[\d]{3}Z/,"")}},created:function(){this.handleQuery()},methods:{login:function(){var e=this;return new Promise((function(t){var a={user:c.user};p.a.post("http://17.62.1.11/api/auth/validate_username_password",a).then((function(i){return i.data.data.token?(e.token=i.data.data.token,t("success")):(e.$modal.msgError("视频督察预警登陆失败,帐号=》"+JSON.stringify(a)),t("error"))})).catch((function(i){return e.$modal.msgError("视频督察预警登陆失败,帐号=》"+JSON.stringify(a)),t("error")}))}))},handleQuery:function(){this.queryParams.pageNum=1,this.getList2()},getList2:function(){var e=this;return Object(l["a"])(Object(r["a"])().mark((function t(){return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.token){t.next=3;break}return t.next=3,e.login();case 3:if(e.token){t.next=5;break}return t.abrupt("return");case 5:p.a.get("http://17.62.1.11/api/problems/",{params:{page:e.queryParams.pageNum,page_size:e.queryParams.pageSize,query_problem_status:"correcting"},headers:{Authorization:"Bearer "+e.token}}).then((function(t){e.dataList=t.data.data,e.total=t.data.total,e.dataList.forEach((function(e,t){Object(m["C"])({offset:0,rows:1,uuid:e.id}).then((function(t){t.count>0?e.discover_type=!0:e.discover_type=!1}))}))})).catch((function(e){console.log(e)}));case 6:case"end":return t.stop()}}),t)})))()},update:function(e){this.id=e.id,this.open=!0},updatetChange:function(e){console.log(e),this.open=e,this.getList2()}}},h=f,b=(a("5f38"),a("2877")),g=Object(b["a"])(h,i,n,!1,null,null,null);t["default"]=g.exports},a2bf6:function(e,t,a){"use strict";var i=a("e8b5"),n=a("07fa"),r=a("3511"),l=a("0366"),o=function(e,t,a,s,u,c,d,p){var m,f,h=u,b=0,g=!!d&&l(d,p);while(b<s)b in a&&(m=g?g(a[b],b,t):a[b],c>0&&i(m)?(f=n(m),h=o(e,t,m,f,h,c-1)-1):(r(h+1),e[h]=m),h++),b++;return h};e.exports=o},addb:function(e,t,a){var i=a("4dae"),n=Math.floor,r=function(e,t){var a=e.length,s=n(a/2);return a<8?l(e,t):o(e,r(i(e,0,s),t),r(i(e,s),t),t)},l=function(e,t){var a,i,n=e.length,r=1;while(r<n){i=r,a=e[r];while(i&&t(e[i-1],a)>0)e[i]=e[--i];i!==r++&&(e[i]=a)}return e},o=function(e,t,a,i){var n=t.length,r=a.length,l=0,o=0;while(l<n||o<r)e[l+o]=l<n&&o<r?i(t[l],a[o])<=0?t[l++]:a[o++]:l<n?t[l++]:a[o++];return e};e.exports=r},b211:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"update"},[a("div",{staticClass:"top"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"left"},[e._m(0),a("el-input",{attrs:{disabled:!0},model:{value:e.oldOddsStatus.id,callback:function(t){e.$set(e.oldOddsStatus,"id",t)},expression:"oldOddsStatus.id"}}),a("el-input",{attrs:{disabled:!0},model:{value:e.oldlocation,callback:function(t){e.oldlocation=t},expression:"oldlocation"}}),a("el-input",{attrs:{disabled:!0},model:{value:e.oldName,callback:function(t){e.oldName=t},expression:"oldName"}}),a("el-input",{attrs:{disabled:!0},model:{value:e.oldTime,callback:function(t){e.oldTime=t},expression:"oldTime"}}),a("el-input",{attrs:{disabled:!0},model:{value:e.oldProblem,callback:function(t){e.oldProblem=t},expression:"oldProblem"}})],1),a("div",{staticClass:"right"},[e._m(1),a("el-form",{attrs:{"label-position":e.labelPosition,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"问题编号","label-width":"100px"}},[a("el-input",{model:{value:e.uuid,callback:function(t){e.uuid=t},expression:"uuid"}})],1),a("el-form-item",{attrs:{label:"责任单位","label-width":"100px"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.unitMultipleValue,callback:function(t){e.unitMultipleValue=t},expression:"unitMultipleValue"}},e._l(e.unitMultiple,(function(e){return a("el-option",{key:e.uuid,attrs:{label:e.name,value:e.uuid}})})),1)],1),a("el-form-item",{attrs:{label:"问题类型","label-width":"100px"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.problemType,callback:function(t){e.problemType=t},expression:"problemType"}},e._l(e.problemTypeList,(function(e){return a("el-option",{key:e.uuid,attrs:{label:e.name,value:e.uuid}})})),1)],1),a("el-form-item",{attrs:{label:"检查时间","label-width":"100px"}},[a("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期时间"},model:{value:e.newTime,callback:function(t){e.newTime=t},expression:"newTime"}})],1),a("el-form-item",{attrs:{label:"问题描述","label-width":"100px"}},[a("el-input",{model:{value:e.description,callback:function(t){e.description=t},expression:"description"}})],1),a("el-form-item",{attrs:{label:"创建单位","label-width":"100px"}},[a("el-input",{model:{value:e.admin.department_uuid2_name,callback:function(t){e.$set(e.admin,"department_uuid2_name",t)},expression:"admin.department_uuid2_name"}})],1),a("el-form-item",{attrs:{label:"创建人","label-width":"100px"}},[a("el-input",{model:{value:e.admin.real_name,callback:function(t){e.$set(e.admin,"real_name",t)},expression:"admin.real_name"}})],1),a("el-form-item",{attrs:{label:"问题附件图片","label-width":"100px"}},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.getRandomObjects(e.fileImgUrl)}}},[e._v("随机筛选")]),a("el-button",{attrs:{type:"primary"},on:{click:e.order}},[e._v("顺序筛选")])],1)],1)],1)]),a("div",{staticClass:"img"},[a("el-checkbox-group",{on:{change:e.handleCheckedCitiesChange},model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},e._l(e.fileImgUrl[e.imgIndex],(function(e){return a("el-checkbox",{key:e,attrs:{label:e}},[a("el-image",{staticStyle:{width:"15em",height:"10em",display:"block",margin:"0 auto"},attrs:{src:e}})],1)})),1)],1),a("div",{staticClass:"btnPre"},[a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.previous(1)}}},[a("i",{staticClass:"el-icon-back"}),e._v(" 上一页")]),a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.previous()}}},[e._v("下一页 "),a("i",{staticClass:"el-icon-right"})])],1),a("div",{staticClass:"bottom-btn"},[a("el-button",{attrs:{type:"info"},on:{click:e.empty}},[e._v("清空还原")]),a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("确认导入")])],1)])},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"oldOdds"},[a("span",[e._v("原始记录")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:" newOdds"},[a("span",[e._v("新系统记录")])])}],r=(a("a9e3"),a("0481"),a("4069"),a("4e82"),a("fb6a"),a("a15b"),a("d3b7"),a("159b"),a("14d9"),a("a4d3"),a("e01a"),a("25f0"),a("b0c0"),a("4de4"),a("d81d"),a("bc3a")),l=a.n(r),o=a("9d9a"),s={name:"",data:function(){return{pingUrl:"",pingUrlSuffix:"",imgIndex:0,checkList:[],fileImgUrl:[],newTime:"",description:"",unitMultipleValue:"",uuid:"",loading:!1,dataForm:{},message_user:[],labelPosition:"right",problemTypeList:[],problemType:"",oldOddsStatus:[],oldlocation:"",oldName:"",oldTime:"",oldProblem:"",unitMultiple:[]}},props:{token:{type:String},id:{type:Number,default:0},admin:{type:Object}},watch:{id:{handler:function(e){e&&(console.log(this.unitMultipleValue),this.unitMultipleValue="",this.problemType="",this.init(e))},deep:!0,immediate:!0}},filters:{},methods:{empty:function(){},getRandomObjects:function(e){var t=e.flat();t.sort((function(){return.5-Math.random()}));var a=t.slice(0,10);return this.checkList=a},order:function(){this.checkList=this.fileImgUrl[0]},submit:function(){var e=this;this.pingUrl=this.checkList.join("|");var t=[];this.checkList.forEach((function(e){t.push(e.substring(e.lastIndexOf(".")+1))})),this.pingUrlSuffix=t.join("|").toUpperCase(),console.log(this.pingUrlSuffix);var a={uuid:this.uuid,type:"DEPARTMENT",from_uuid:this.admin.uuid,to_uuid:this.unitMultipleValue,type_uuid:this.problemType,content:this.description,file_url:this.pingUrl,file_suffix:this.pingUrlSuffix,problem_type:"CHECK",from_lv2_department_uuid:this.admin.department_uuid2,to_lv2_department_uuid:this.unitMultipleValue,create_datetime:this.newTime};this.pingUrl||delete a.pingUrl,this.pingUrlSuffix||delete a.file_suffix,Object(o["f"])(a).then((function(t){e.$message({message:"导入成功",type:"success"}),e.$emit("change",!1),e.getmessage_user(t.uuid)})).catch((function(t){t.toString().indexOf("svp_problem.PRIMARY")>-1?e.$message.error("问题编号已存在！！"):e.$message.error(t)}))},getmessage_user:function(e){var t=this,a={rows:1e3,offset:0,manage_department_uuid_like:this.unitMultipleValue};Object(o["o"])(a).then((function(a){t.message_user=a.array;var i=t.admin.real_name+"("+t.admin.name+")",n=t.problemTypeList.filter((function(e){return e.uuid==t.problemType}))[0].name,r=t.unitMultiple.filter((function(e){return e.uuid==t.unitMultipleValue}))[0].name;console.log(n),console.log(r);var l=r+",于“"+t.newTime+"”被“"+i+"”发现“"+n+"”的问题，请及时整改。",s={from_uuid:t.admin.uuid,to_uuid:"",title:"发现"+n+"的问题",content:l,remark:e};t.message_user.map((function(e){s.to_uuid=e.uuid,Object(o["d"])(s).then((function(){})).catch((function(e){console.log(e)}))}))}))},previous:function(e){if(1==e){if(!(this.imgIndex>0))return this.$message.error("已经是第一页了！");this.imgIndex--}else{if(!(this.imgIndex<this.fileImgUrl.length-1))return this.$message.error("已经是最后一页了！");this.imgIndex++}},handleCheckedCitiesChange:function(e){console.log(e),e.length>10&&(alert("不能大于十张"),this.checkList.pop())},init:function(e){var t=this;this.loading=!0,this.uuid=e,l()({url:"http://17.62.1.11/api/problems/"+e,method:"GET",params:{},headers:{Authorization:"Bearer "+this.token}}).then((function(e){if(200==e.status){t.loading=!1,t.getUnit(),t.oldOddsStatus=e.data.data,t.oldName=e.data.data.problem_category.name,e.data.data.location.path.length>3&&(t.oldlocation=e.data.data.location.path[3].name),t.oldTime=t.parseTime(e.data.data.issued_at),t.newTime=t.oldTime,t.oldProblem=e.data.data.note?e.data.data.note:e.data.data.problem_category.name,t.description=e.data.data.note?e.data.data.note:e.data.data.problem_category.name;var a=e.data.data.problem_evidences,i=[];a.forEach((function(e){i.push(e.img_data.src?e.img_data.src:"")}));var n=10;t.fileImgUrl=t.twoDimensional(i,n)}else t.$message.error("请求失败")})).catch((function(e){console.log(e)}))},getUnit:function(){var e=this;Object(o["q"])({level:2}).then((function(t){var a=t.array;e.unitMultiple=t.array,a.forEach((function(t){if("督察审计支队"==t.name){var a=t.problem_types.filter((function(e){return"检查问题"==e.name}))[0].uuid;e.problemTypeList=t.problem_types.filter((function(e){return e.parent_uuid==a})),e.problemTypeList.forEach((function(t){-1!=t.name.indexOf(e.oldName)&&(console.log(t,"item"),e.problemType=t.uuid)}))}t.name==e.oldlocation&&(e.unitMultipleValue=t.uuid)}))}))},getProblem:function(){var e=this;Object(o["A"])().then((function(t){e.problemTypeList=t.array,e.problemTypeList.forEach((function(t){-1!=t.name.indexOf(e.oldName)&&(e.problemType=t.uuid)}))}))},twoDimensional:function(e,t){for(var a=[],i=e.length,n=i%t==0?i/t:Math.ceil(i/t),r=0;r<n;r++){var l=e.slice(r*t,(r+1)*t);a.push(l)}return a}},computed:{}},u=s,c=(a("e51d"),a("2877")),d=Object(c["a"])(u,i,n,!1,null,"7f968246",null);t["default"]=d.exports},c971:function(e,t,a){},d998:function(e,t,a){var i=a("342f");e.exports=/MSIE|Trident/.test(i)},e51d:function(e,t,a){"use strict";a("c971")}}]);