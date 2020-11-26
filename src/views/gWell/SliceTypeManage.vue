<template>
  <div>
    <!--  1. 修改 entity 和 type  -->
    <BaseTable ref="table" :entity="entity" :type="type" >
    </BaseTable>
  </div>
</template>

<script>
import BaseTable from '~table'
export default {
  components: {
    BaseTable
  },
  data () {
    return {
      entity: 'slice-type',
      type: 'edit',
      auth: false
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
      this.$refs.table.load()
    }
  }
}
</script>

<style scoped>

</style>
