<template>
<el-card class="main-card">
    <div style="display: flex">
      <div style="flex: 1;">
        <el-button type="primary" size="small" icon="el-icon-edit" @click="excelSub">导出excel</el-button>
      </div>
      <el-form :inline="true">
        <el-form-item label="审核时间">
          <el-date-picker size="small" v-model="timeValue" type="daterange" placeholder="开始日期" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input size="small" v-model="content" placeholder="按审批人模糊搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" fit border stripe :header-cell-style="getCellStyle">
      <el-table-column prop="name" label="姓名" width="150"></el-table-column>
      <el-table-column prop="fileName" label="文件名" width="200"></el-table-column>
      <el-table-column prop="fileSize" label="文件大小" width="200"></el-table-column>
      <el-table-column prop="reason" label="申请原因" width="600"></el-table-column>
      <el-table-column prop="approvalName" label="审核人" width="150"></el-table-column>
      <el-table-column prop="approvalResult" label="审批结果" width="100"></el-table-column>
      <el-table-column prop="approvalTime" label="审核时间" width="160"></el-table-column>
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
import { mapGetters } from 'vuex'
import { removeToken } from '@/utils/auth'
import { getAllDepartment, excelRemove } from '../../api/user'
export default {
  data() {
    return {
      timeValue: '',
      total: 0, // 数据总长度
      pageNum: 1, // 当前页面数
      pageSize: 10, // 页面显示数量
      content: '', // 搜索内容
      tableData: [] // 表格数据
    }
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.getData()
  },
  methods: {
    logOut() {
      removeToken()
      this.$router.push(`/login`)
    },
    // 点击搜索
    handleSearch() {
      console.log('search')
      this.pageNum = 1
      this.getData()
    },
    getCellStyle({row, column, rowIndex, columnIndex}) {
      console.log(columnIndex)
      // if (rowIndex === 0) {
      //   return 'backgroundColor : #409EFF;color: #ffffff;font-weight: normal;'
      // } else {
      //   return ''
      // }
    },
    getData() {
      let that = this
      let data = {}
      data.pageNum = that.pageNum // 页数
      data.pageSize = that.pageSize // 分页的数量
      data.content = that.content // 查询内容
      if (that.timeValue != null) {
        data.timeStart = that.timeValue[0]
        data.timeEnd = that.timeValue[1]
      }
      getAllDepartment(data).then(res => {
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
      console.log('this is hear')
      this.pageNum = val
      this.getData()
    },
    excelSub() {
      this.$confirm('确定导出Excel表格吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let that = this
        let data = {}
        if (that.timeValue != null) {
          data.timeStart = that.timeValue[0]
          data.timeEnd = that.timeValue[1]
        }
        excelRemove(data).then(response => {
          let blob = new Blob([response], {
            type: 'application/vnd.ms-excel'
          })
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          a.href = url
          a.download = '审批记录导出' + new Date().toLocaleString() + '.xls'
          a.click()
          window.URL.revokeObjectURL(url)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.main-card {
  /*84 = navbar + tags-view = 50 +34 */
  margin: 20px;
  min-height: calc(100vh - 130px);
}
</style>
