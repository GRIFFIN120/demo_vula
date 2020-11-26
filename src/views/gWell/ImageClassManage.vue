<template>
  <div>
    <!--    重新上传-对话框  -->
    <BaseDialog ref="dialog" title="上传图片" width="400px">
      <template v-slot="{data}">
        <!--  3. 引入对话框中的模版  -->
        <BaseUpload :entity="entity" type="image" :data="data" @success="confirm"></BaseUpload>
      </template>
    </BaseDialog>

    <BaseTable ref="table" :entity="entity" :type="type" :search="search" >
      <template v-if="auth" #operation="data">
        <!--    重新上传-按钮  -->
        <el-tooltip class="item" effect="light" content="重新上传" placement="top">
          <el-button
            @click="$refs.dialog.open(data.row)"
            size="mini" type="success"  circle plain><i class="fa fa-upload"></i></el-button>
        </el-tooltip>
      </template>
    </BaseTable>
  </div>
</template>

<script>
import BaseTable from '~table'
import BaseDialog from '~dialog'
import BaseUpload from '../../components/base/BaseUpload'

export default {
  components: {
    BaseTable,
    BaseDialog,
    BaseUpload
  },
  data () {
    return {
      entity: 'class-image',
      type: 'edit',
      auth: false,
      search: {
        page: 1,
        size: 10,
        exact: {
          domain: 'a'
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
    confirm () {
      // 4. 表单提交后的操作
      this.$refs.dialog.close()
      this.$refs.table.load()
    }
  }
}
</script>

<style scoped>

</style>
