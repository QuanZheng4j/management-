<template>
  <el-card class="main-card">
    <div class="card-title">
      <h3>编辑部门</h3>
    </div>
    <el-col :span="14">
      <el-form ref="formInfo" :model="form" label-width="120px">
          <el-form-item label="部门：" prop="departmentType">
            <el-input size="medium" :maxlength="20" v-model="form.departmentType" placeholder="请输入新的部门名称"></el-input>
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
import { updateDepartment } from '@/api/user'
export default {
  data() {
    return {
      id: '',
      form: {
        departmentType: ''
      }
    }
  },
  mounted() {
    console.log(this.$route)
    this.form.departmentType = this.$route.query.department
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
        departmentType: this.form.departmentType,
        createTime: '',
        updateTime: ''
      }
      if (data.departmentType === '') {
        this.$message({
          showClose: true,
          message: '部门名不能为空',
          type: 'error'
        })
        return
      }
      console.log(data)
      updateDepartment(data).then(res => {
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
            message: '已存在该部门',
            type: 'error'
          })
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
