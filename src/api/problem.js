import request from "@/utils/request";

// 刷新Token
export function refreshAdminToken(data) {
  return request({
    url: "/supervision-spot/module/security.Admin/refreshAdminToken",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 个人问题分类
export function getProblemPersonType(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.ProblemPersonType/getProblemPersonType",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 单位问题分类
export function getProblemDepartmentType(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.ProblemDepartmentType/getProblemDepartmentType",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 获取单位
export function getDepartment(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Department/getDepartment",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 更新用户
export function modifyAdmin(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.AdminInfo/modifyAdmin",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 新增问题
export function addProblem(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/addProblem",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 删除问题
export function deleteProblemByUuid(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/deleteProblemByUuid",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 修改问题
export function editProblem(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/modifyProblem",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//获取问题列表
export function getProblem(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/getProblem",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//民警获取问题列表
export function getProblemByFromUuidOrToUuid(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/getProblemByFromUuidOrToUuid",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//单位领导获取问题列表
export function getProblemByLeader(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/getProblemByLeader",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//统计问题流量
export function getProblemCountStatistics(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/getProblemCountStatistics",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//获取管理员
export function getAdmin(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.AdminInfo/getAdmin",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 问题反馈
export function addFeedback(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Feedback/addFeedback",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//获取问题反馈
export function getFeedback(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Feedback/getFeedback",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//问题反馈编辑
export function modifyFeedback(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Feedback/modifyFeedback",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//添加消息
export function addMessage(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Message/addMessage",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//获取消息
export function getMessage(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Message/getMessage",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
//修改消息
export function modifyMessage(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Message/modifyMessage",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 单位问题统计
export function getDepartmentProblemCount(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Department/getDepartmentProblemCount",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 问题类型统计
export function getProblemDepartmentTypeCount(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.ProblemDepartmentType/getProblemDepartmentTypeCount",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 工作量统计
export function getDepartmentWorkloadByLT(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Department/getDepartmentWorkloadByLT",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//删除文件
export function removeStorageFile(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.StorageFile/removeStorageFile",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//增加文件
export function addStorageFileBatch(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.StorageFile/addStorageFileBatch",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//获取登录日志
export function getLogonLogoffInfo(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.LogonLogoffInfo/getLogonLogoffInfo",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//从缓存获取数据
export function getDepartmentWorkloadFromCache(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Department/getDepartmentWorkloadFromCache",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//getProblemExact 获取问题列表
export function getProblemExact(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/getProblemExact",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//getProblemCountInfo
export function getProblemCountInfo(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/getProblemCountInfo",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//getProblemByPolice
export function getProblemByPolice(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/getProblemByPolice",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//getProblemByLv2
export function getProblemByLv2(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/getProblemByLv2",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export function getAdminShort(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.AdminInfo/getAdminShort",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export function getProblemByPoliceFast(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/getProblemByPoliceFast",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

/**
 * 生成报表
 * @param {*} data
 * @returns
 */
export function getReportFile(url, data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Report/" + url,
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

// 添加问题
export function addProblemWithUuid(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/addProblemWithUuid",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export function getProblemExactExport(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Problem/getProblemExactExport",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//问责类型
export function getAccountableType(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.AccountableType/getAccountableType",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export function getAccountable(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Accountable/getAccountable",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
export function addAccountable(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Accountable/addAccountable",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
export function modifyAccountable(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Accountable/modifyAccountable",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
export function deleteAccountableByUuid(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Accountable/deleteAccountableByUuid",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
export function getAccountableStatistics(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Accountable/getAccountableStatistics",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

//问题评论
export function addComment(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Comment/addComment",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
//获取问题评论
export function getComment(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Comment/getComment",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
//删除问题评论
export function removeComment(data) {
  return request({
    url: "/supervision-spot/module/supervision.spot.Comment/removeComment",
    method: "post",
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
