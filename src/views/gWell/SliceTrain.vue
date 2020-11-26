<template>
  <div>
    <div id="tableau"></div>
    <!--    上传按钮  -->
<!--    <el-button v-if="auth" @click="$refs.dialog.open({id:-1})" icon="fa fa-cloud-upload" type="success" size="small"> 新的全景影像</el-button>-->

    <!--    重新上传-对话框  -->
    <BaseDialog ref="dialog" title="上传图片" width="400px">
      <template v-slot="{data}">
        <!--  3. 引入对话框中的模版  -->
        <BaseUpload :entity="entity" type="file" :data="data" @success="confirm"></BaseUpload>
      </template>
    </BaseDialog>

    <!--    重新上传-对话框  -->
    <BaseDialog ref="chart" title="上传图片" width="60%">
      <template v-slot="{data}">
        <!--  3. 引入对话框中的模版  -->
        <TrainChart  :bean="data"></TrainChart>
      </template>
    </BaseDialog>

    <BaseTable ref="table" :entity="entity" :type="type" :search="search" >
      <template v-if="auth" #operation="data">
        <!--    重新上传-按钮  -->
        <el-tooltip class="item" effect="light" content="数据上传" placement="top">
          <el-button
            @click="$refs.dialog.open(data.row)"
            size="mini" type="success"  circle plain><i class="fa fa-upload"></i></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="查看数据" placement="top">
          <el-button
            @click="$refs.chart.open(data.row)"
            size="mini" type="success"  circle plain><i class="fa fa-line-chart"></i></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="数据下载" placement="top">
          <el-button
            @click="download(data.row)"
            size="mini" type="success"  circle plain><i class="fa fa-download"></i></el-button>
        </el-tooltip>

      </template>
    </BaseTable>
  </div>
</template>

<script>
import BaseTable from '~table'
import BaseDialog from '~dialog'
import BaseUpload from '../../components/base/BaseUpload'
import TrainChart from './dialog/TrainChart'

export default {
  components: {
    BaseTable,
    BaseDialog,
    BaseUpload,
    TrainChart
  },
  data () {
    return {
      entity: 'train',
      type: 'edit',
      auth: false,
      search: {
        page: 1,
        size: 10,
        exact: {
        },
        fuzzy: {}
      }
    }
  },
  beforeMount () {
    const user = JSON.parse(this.$cookies.get('USER'))
    this.auth = (user.roles.indexOf(2) !== -1) || (user.roles.indexOf(1) !== -1)
    this.type = this.auth ? 'edit' : 'display'
  },
  methods: {
    download (row) {
      window.open(row.server + row.url)
    }
  }
}
</script>

<style scoped>

</style>
