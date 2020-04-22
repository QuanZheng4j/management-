<template>
  <div>
    <el-button class="out" @click='handleLogOut()'>退出登录</el-button>
    <el-button class="uppwd" @click="dialogVisible = true">修改密码</el-button>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form>
       <el-form-item prop="fileSize">
        <el-input v-model="updatepwd" placeholder="请输入新密码" id="updatepwd"></el-input>
       </el-form-item>
      </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" v-on:click="updatepassword()">确 定</el-button>
        </div>
    </el-dialog>
    <div class="title">
      <h3>文件导出申请系统</h3>
      <div>
        <el-form :label-position="lablePosition" :model="ruleFrom" ref="ruleFrom" label-width="100px" class="demo-ruleFrom" enctype="multipart/form-data">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleFrom.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="ruleFrom.department" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="申请文件名" prop="fileName">
            <el-input v-model="ruleFrom.fileName" :disabled="true" placeholder="选择文件后自动填充" id="inputname"></el-input>
          </el-form-item>
          <el-form-item label="申请文件大小" prop="fileSize">
            <el-input v-model="ruleFrom.fileSize" :disabled="true" placeholder="选择文件后自动填充" id="inputsize"></el-input>
          </el-form-item>
          <el-form-item label="审批人" prop="dep">
            <el-select v-model="value" placeholder="请选择"  style="width:450px">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">{{item.name}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请原因" prop="reason">
            <el-input type="textarea" v-model="ruleFrom.reason" resize="none" rows="3" maxlength="200" placeholder="最大输入200个字符" id="reasons" show-word-limit></el-input>
          </el-form-item>
          <div>
            <el-button type="primary" icon="el-icon-folder-opened" v-on:click="openFile()" round :disabled="choseIsable">选择文件</el-button>
            <el-button type="warning" icon="el-icon-s-platform" v-on:click="subMsg()" round :disabled="subIsable" :loading="sunIsLoading">提交审核</el-button>
            <el-button type="danger" icon="el-icon-delete" v-on:click="clearSub()" round :disabled="clearIsable">取消审核</el-button>
            <el-button type="success" icon="el-icon-thumb" round :disabled="sendIsable" :loading="sendLoading">自动发送</el-button>
            <input class="file" type="file" name="file" id="open" style="display:none" @change="showRealPath()"/>
          </div>
        </el-form>
      </div>
      <el-divider><i class="el-icon-star-off"></i></el-divider>
      <div><el-link type="danger" target="_blank">文件导入内网手动复制下面路径，具体使用方法请参考李嘉祺发送的outlook邮件</el-link></div>
      <div><el-link type="danger" target="_blank">file://192.168.1.102/importDir/<i class="el-icon-view el-icon--right"></i></el-link></div>
      <div><el-link type="danger" target="_blank">ftp://192.168.1.102/importDir/<i class="el-icon-view el-icon--right"></i></el-link></div>
      <!-- <div>
          <el-progress id="progress" class="progress" type="circle" :percentage="percentage" :color="colors"></el-progress>
      </div> -->
    </div>
  </div>
</template>
<script>
import { removeToken } from '@/utils/auth'
import { successuser, approval, sendmsg, uploadFile, cancelSend, updateUserPassWord } from '@/api/user'
var formData = new window.FormData()
export default {
  name: 'success',
  inject: ['reload'],
  data() {
    return {
      updatepwd: '',
      dialogVisible: false,
      percentage: 0,
      colors: [
        {color: '#E6A23C', percentage: 20},
        {color: '#0000FF', percentage: 40},
        {color: '#FFFF00', percentage: 60},
        {color: '#FF6633', percentage: 80},
        {color: '#67C23A', percentage: 100}
      ],
      lablePosition: 'left',
      ruleFrom: {
        name: '',
        department: '',
        fileName: '',
        fileSize: '',
        textarea: ''
      },
      value: '',
      options: [],
      user: [],
      subIsable: true,
      sendIsable: true,
      clearIsable: true,
      choseIsable: false,
      sunIsLoading: false,
      sendLoading: false
    }
  },
  methods: {
    handleLogOut() {
      removeToken()
      this.$router.push(`/login`)
    },
    handleClose() {
      this.dialogVisible = false
    },
    updatepassword() {
      const data = {
        userName: localStorage.getItem('userName'),
        password: localStorage.getItem('pwd'),
        newPassword: this.updatepwd
      }
      console.log(data)
      if (data.newpassword === '') {
        this.$message({
          message: '请输入新密码',
          type: 'error',
          showClose: true
        })
        return
      }
      updateUserPassWord(data).then(res => {
        console.log(res)
        if (res.data === 1) {
          this.$message({
            message: '修改成功,请重新登录',
            type: 'success',
            showClose: true
          })
          removeToken()
          this.$router.push(`/login`)
        } else if (res.data === -1) {
          this.$message({
            message: '修改失败,请输入正确的账号或密码',
            type: 'error',
            showClose: true
          })
        }
      })
    },
    openFile: function() {
      document.getElementById('open').click()
    },
    showRealPath: function() {
      document.getElementById('inputname').value = document.getElementById('open').files[0].name
      var k = 1024
      var sizes = ['B', 'KB', 'MB', 'GB']
      var si = document.getElementById('open').files[0].size
      var i = Math.floor(Math.log(si) / Math.log(k))
      var usetime = si / Math.pow(k, i).toPrecision(2)
      if (si === 0) {
        usetime = '空文件'
      } else {
        usetime = usetime.toFixed(2) + ' ' + sizes[i]
      }
      document.getElementById('inputsize').value = usetime // + '字节'
      this.$message({
        message: '选择文件成功',
        type: 'success',
        showClose: true
      })
      this.subIsable = false
    },
    // 获取用户信息
    getSuccessUser: function() {
      const data = {
        userName: localStorage.getItem('userName'),
        pwd: localStorage.getItem('pwd')
      }
      successuser(data).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.ruleFrom.name = res.data.name
          this.ruleFrom.department = res.data.departmentType
          this.user = res.data
        }
      })
    },
    // 获取审核人列表
    getapproval: function() {
      let data = {}
      approval(data).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.options = res.data
        }
      })
    },
    subFile() {
      formData = new FormData()
      formData.append('file', document.querySelector('input[type=file]').files[0])
      formData.append('user', this.user.name)
      this.sendIsable = true
      this.sendLoading = true
      uploadFile(formData).then(res => {
        console.log(res)
        if (res === 'SUCCESS') {
          this.reload()
          this.$message({
            showClose: true,
            message: '文件上传成功',
            type: 'success'
          })
        } else if (res === 'EMPTY') {
          this.reload()
          this.$message({
            showClose: true,
            message: '上传了一个空文件',
            type: 'error'
          })
        } else if (res === 'EXCEPTION') {
          this.$message({
            showClose: true,
            message: '上传文件失败,请重新上传',
            type: 'warning'
          })
        }
      })
    },
    // 提交审核
    subMsg() {
      console.log('审批人' + this.value + '用户' + this.user.name)
      if (this.value === this.user.name) {
        this.$alert('您不能审批自己,请更换审批人后重试', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      if (this.value === '' || this.value === null) {
        this.$alert('审核人不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      this.$notify({
        showClose: true,
        message: '审核过程中请勿刷新页面',
        type: 'warning',
        title: '警告'
      })
      this.choseIsable = true
      this.sunIsLoading = true
      this.clearIsable = false
      const data = {
        id: this.user.id,
        name: this.user.name,
        department: this.user.departmentType,
        fileName: document.getElementById('inputname').value,
        fileSize: document.getElementById('inputsize').value,
        approvalName: '',
        approvalIP: '',
        reason: this.ruleFrom.reason
      }
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].name === this.value) {
          data.approvalIP = this.options[i].userName
          data.approvalName = this.options[i].name
        }
      }
      sendmsg(data).then(res => {
        console.log(res)
        if (res.code === 1) {
          if (res.data === 'SUCCESS') {
            this.$message({
              showClose: true,
              message: '审核通过',
              type: 'success'
            })
            this.sendIsable = true
            this.subIsable = true
            setTimeout(function() {
            }, 1000)
            this.subFile()
          } else if (res.data === 'FAIL') {
            this.$message({
              showClose: true,
              message: '审核未通过',
              type: 'error'
            })
            this.choseIsable = false
          } else if (res.data === 'CLOSED') {
            this.$message({
              showClose: true,
              message: '选择的审批人已离线,请更换审批人进行审核',
              type: 'warning'
            })
            this.choseIsable = false
          } else if (res.data === 'EXCEPTION') {
            this.$message({
              showClose: true,
              message: '选择的审批人为离线状态,请更换审批人进行审核',
              type: 'warning'
            })
            this.choseIsable = false
          } else if (res.data === 'NULL') {
            this.$message({
              showClose: true,
              message: '选择的审批人未上线,请更换审批人进行审核',
              type: 'error'
            })
            this.choseIsable = false
          }
          this.sunIsLoading = false
          this.clearIsable = true
        }
      })
    },

    clearSub() {
      this.choseIsable = false
      this.subIsable = false
      this.sunIsLoading = false
      this.clearIsable = true
      const data = {
        name: this.user.name,
        approvalIP: ''
      }
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].name === this.value) {
          data.approvalIP = this.options[i].userName
        }
      }
      console.log(data)
      cancelSend(data).then(res => {
        console.log(res)
        if (res.data === 'SUCCESS') {
          this.$message({
            message: '取消审核成功',
            type: 'success',
            showClose: true
          })
        }
      })
    }
  },
  mounted() {
    this.getapproval()
    this.getSuccessUser()
  }
}
</script>

<style lang="scss" scoped>
.out {
  position: absolute;
  right: 30px;
  top: 20px;
}
.uppwd {
  position: absolute;
  right: 30px;
  top: 70px;
}
.title {
  font-size: 35px;
  color: blue;
  position: absolute;
  text-align: center;
  left: 38%;
}
.progress {
   margin-bottom: 50px;
}
</style>
