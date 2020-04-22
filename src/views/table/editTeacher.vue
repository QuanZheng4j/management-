<template>
  <el-card class="main-card">
    <div class="card-title">
      <h3>编辑用户</h3>
    </div>
    <el-col :span="14">
      <el-form ref="formInfo" :model="form" label-width="120px" :label-position="labelPosition">
          <el-form-item label="姓名：" prop="name">
            <el-input size="medium" :maxlength="20" v-model="form.name" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="部门:" prop="department">
            <el-select v-model="value" placeholder="请选择"  style="width:705px">
              <el-option v-for="item in departments" :key="item.id" :label="item.lable" :value="item.departmentType">{{item.departmentType}}</el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="权限:" prop="role">
            <el-radio-group v-model="radio">
              <el-radio :label="2">审批人</el-radio>
              <el-radio :label="3">员工</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="账号：" prop="userName">
            <el-input type="medium" :maxlength="20" v-model="form.userName" placeholder="审批人账号为审批人IP地址" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="medium" :maxlength="20" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      <div style="display: flex;align-items: center;justify-content: center">
        <el-button type="info" @click="handleExit" round>取消</el-button>
        <el-button type="primary" @click="handleConfirm" round>确认</el-button>
      </div>
    </el-col>
  </el-card>
</template>

<script>
import { selectDepartment, updateUser } from '@/api/user'
export default {
  data() {
    return {
      id: '',
      radio: '',
      labelPosition: 'left',
      form: {
        departmentType: '',
        name: '',
        userName: '',
        password: ''
      },
      value: '',
      departments: []
    }
  },
  mounted() {
    console.log(this.$route)
    this.getAllDepartment()
    this.form = this.$route.query
    if (this.$route.query.role === '审批人') {
      this.radio = 2
    } else if (this.$route.query.role === '员工') {
      this.radio = 3
    }
    this.value = this.$route.query.department
    this.id = this.$route.query.id
  },
  methods: {
    // 点击取消
    handleExit() {
      this.$confirm('此时离开将丢失已编辑的内容，是否离开?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {
      })
    },
    // 点击确定
    handleConfirm() {
      const data = {
        id: this.id,
        name: this.form.name,
        userName: this.form.userName,
        passWord: this.form.password,
        roleId: this.radio,
        departmentId: ''
      }
      for (var i = 0; i < this.departments.length; i++) {
        if (this.departments[i].departmentType === this.value) {
          data.departmentId = this.departments[i].id
        }
      }
      if (data.name === '') {
        this.$message({
          showClose: true,
          message: '姓名不能为空',
          type: 'error'
        })
        return
      }
      if (data.userName === '') {
        this.$message({
          showClose: true,
          message: '账号不能为空',
          type: 'error'
        })
        return
      }
      if (data.passWord === '') {
        this.$message({
          showClose: true,
          message: '密码不能为空',
          type: 'error'
        })
        return
      }
      if (data.departmentId === '') {
        this.$message({
          showClose: true,
          message: '请选择部门',
          type: 'error'
        })
        return
      }
      if (data.roleId === '') {
        this.$message({
          showClose: true,
          message: '请选择权限',
          type: 'error'
        })
        return
      }
      console.log(data)
      updateUser(data).then(res => {
        console.log(res)
        if (res.data === 1) {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          this.$router.go(-1)
        } else {
          this.$message({
            showClose: true,
            message: '修改失败',
            type: 'error'
          })
        }
      })
    },
    // 获取部门列表
    getAllDepartment: function() {
      let data = {}
      selectDepartment(data).then(res => {
        console.log(res)
        if (res.code === 1) {
          this.departments = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
  .main-card {
    /*84 = navbar + tags-view = 50 +34 */
    margin: 20px;
    min-height: calc(100vh - 130px);
  }
  .avatar {
    width: 120px;
    height: 120px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
</style>
