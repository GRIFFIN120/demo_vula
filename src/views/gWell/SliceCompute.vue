<template>
  <div>

    <!--    重新上传-对话框  -->
    <BaseDialog ref="chart" title="上传图片" width="60%">
      <template v-slot="{data}">
        <!--  3. 引入对话框中的模版  -->
        <TrainChart  :bean="data"></TrainChart>
      </template>
    </BaseDialog>

    <BaseTable ref="table" :entity="entity" :type="type" :search="search" >
      <template v-if="auth" #operation="data">

        <el-tooltip class="item" effect="light" content="查看训练集" placement="top">
          <el-button
            @click="openChart(data.row)"
            size="mini" type="success"  circle plain><i class="fa fa-line-chart"></i></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="智能识别" placement="top">
          <el-button
            @click="compute(data.row)"
            size="mini" type="success"  circle plain><i class="fa fa-calculator"></i></el-button>
        </el-tooltip>

      </template>
    </BaseTable>
  </div>
</template>

<script>
import BaseTable from '~table'
import BaseDialog from '~dialog'
import TrainChart from './dialog/TrainChart'

export default {
  components: {
    BaseTable,
    BaseDialog,
    TrainChart
  },
  data () {
    return {
      entity: 'compute',
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
    openChart (row) {
      console.log(row)

      const train = row.train
      if (train) {
        this.$base.get('train', train)
          .then(res => {
            const bean = res.data
            this.$refs.chart.open(bean)
          })
      } else {
        this.$message.warning('请选择训练集')
      }
    },
    compute (row) {
      if (row.train) {
        const url = 'compute/compute/' + row.id
        this.$base.http.get(url)
          .then(res => {
            this.$refs.table.load()
          })
      } else {
        this.$message.warning('请选择训练集')
      }
    }
  }
}
</script>

<style scoped>

</style>
