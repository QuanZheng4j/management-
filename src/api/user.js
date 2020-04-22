import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/retLoginCode',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export function successuser(data) {
  return request({
    url: '/api/user/selectSuccessUser',
    method: 'post',
    data
  })
}

export function approval(data) {
  return request({
    url: '/api/user/approvalList',
    method: 'get',
    data
  })
}

export function sendmsg(data) {
  return request({
    url: '/api/socket/requestSendFile',
    method: 'post',
    data
  })
}

export function uploadFile(data) {
  return request({
    url: '/api/fileUpload/uploadWork',
    method: 'post',
    data
  })
}

export function cancelSend(data) {
  return request({
    url: '/api/socket/cancel',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/api/user/userList',
    method: 'post',
    data
  })
}

export function deleteUserOne(data) {
  return request({
    url: '/api/user/deleteUser',
    method: 'post',
    data
  })
}

export function getAllDepartment(data) {
  return request({
    url: '/api/operation/selectReasonDTO',
    method: 'post',
    data
  })
}

export function selectDepartment(data) {
  return request({
    url: '/api/department/operationList',
    method: 'get',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/api/user/insertNewUser',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/api/user/updateUser',
    method: 'post',
    data
  })
}

export function selectDepartmentDTO(data) {
  return request({
    url: '/api/department/selectDepartmentDTO',
    method: 'post',
    data
  })
}

export function deleteOneDepartment(data) {
  return request({
    url: '/api/department/deleteDepartment',
    method: 'post',
    data
  })
}

export function insertDepartment(data) {
  return request({
    url: '/api/department/insertDepartment',
    method: 'post',
    data
  })
}

export function updateDepartment(data) {
  return request({
    url: '/api/department/updateDepartment',
    method: 'post',
    data
  })
}

export function updateUserPassWord(data) {
  return request({
    url: '/api/user/updateUserPassWord',
    method: 'post',
    data
  })
}

export function excelRemove(data) {
  return request({
    url: '/api/excel/excelDownload',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

