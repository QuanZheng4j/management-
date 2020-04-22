<template>
  <el-card class="main-card">
    <div style="display: flex">
      <div style="flex: 1;">
        <el-button type="primary" size="small" icon="el-icon-edit" @click="handleAddTeacher">添加用户</el-button>
      </div>
      <el-form :inline="true">
        <el-form-item>
          <el-input size="small" v-model="content" placeholder="按姓名模糊搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" fit border stripe :header-cell-style="getCellStyle">
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="department" label="部门" width="160"></el-table-column>
      <el-table-column prop="role" label="权限"></el-table-column>
      <el-table-column prop="userName" label="账号"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="operate" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEditTeacher(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleRemove(scope.row.id, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        :total="total"
        :page-size="pageSize"
        @current-change="handlePageChange"
        layout="total, prev, pager, next, jumper"/>
    </div>
  </el-card>
</template>

<script>
import { getUserList, deleteUserOne } from '../../api/user'
export default {
  data() {
    return {
      total: 0, // 数据总长度
      pageNum: 1, // 当前页面数
      pageSize: 10, // 页面显示数量
      content: '', // 搜索内容
      tableData: [] // 表格数据
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 点击搜索
    handleSearch() {
      console.log('search')
      this.pageNum = 1
      this.getData()
    },
    // 点击添加
    handleAddTeacher() {
      this.$router.push('addTeacher')
      console.log(this.$route)
    },
    getCellStyle({row, column, rowIndex, columnIndex}) {
      console.log(columnIndex)
      // if (rowIndex === 0) {
      //   return 'backgroundColor : #409EFF;color: #ffffff;font-weight: normal;'
      // } else {
      //   return ''
      // }
    },
    // 获取审批结果
    getData() {
      let that = this
      let data = {}
      data.pageNum = that.pageNum // 页数
      data.pageSize = that.pageSize // 分页的数量
      data.content = that.content // 查询内容
      console.log(data)
      getUserList(data).then(res => {
        console.log(res)
        if (res.data) {
          that.total = res.data.total
          that.tableData = res.data.result
        } else {
          that.total = 0
          that.tableData = []
        }
      })
    },
    // 分页器发生变化
    handlePageChange(val) {
      this.pageNum = val
      this.getData()
    },
    // 点击编辑
    handleEditTeacher(row) {
      this.$router.push({path: 'editTeacher', query: row})
    },
    // 点击删除
    handleRemove(id, e) {
      this.$confirm('确定删除这个用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(id)
        deleteUserOne({id: id}).then(res => {
          console.log(res)
          if (res.data === '1') {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
          }
          if (e === 0 && !this.tableData[1]) {
            this.pageNum = (this.pageNum - 1) > 0 ? (this.pageNum - 1) : 1
          }
          this.getData()
        })
      }).catch(() => {
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
</style>
