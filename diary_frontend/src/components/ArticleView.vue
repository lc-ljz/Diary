<template>
  <div class="table-page">

    <!-- 标题区 -->
    <div class="header-bar">
      <h2 class="page-title">文章列表</h2>
      <el-button type="primary">上传文章</el-button>
    </div>

    <!-- 表格卡片 -->
    <el-card shadow="hover" class="table-card">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="50" />

        <el-table-column fixed prop="date" label="Date" width="140" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column 
          prop="address" 
          label="Address" 
          min-width="250" 
          show-overflow-tooltip 
        />
        <el-table-column prop="zip" label="Zip" width="120" />

        <el-table-column fixed="right" label="Operations" width="140">
          <template #default="{ row }">

            <el-tooltip content="Detail" placement="top">
              <el-button link size="large" type="primary" @click="handleClick(row)">
                <el-icon><Document /></el-icon>
              </el-button>
            </el-tooltip>

            <el-tooltip content="Edit" placement="top">
              <el-button link size="large" type="success">
                <el-icon><Edit /></el-icon>
              </el-button>
            </el-tooltip>

          </template>
        </el-table-column>

      </el-table>
    </el-card>

  </div>
</template>

<script setup>
import { Document, Edit } from '@element-plus/icons-vue'

const handleClick = (row) => {
  console.log('Detail →', row)
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
</script>

<style scoped>
.table-page {
  padding: 20px;
}

.table-card {
  padding: 12px;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}
</style>
