<template>
  <div>
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
  beforeMount () {
    const user = JSON.parse(this.$cookies.get('USER'))
    this.auth = (user.roles.indexOf(2) !== -1) || (user.roles.indexOf(1) !== -1)
    this.type = this.auth ? 'edit' : 'display'
  },
  data () {
    return {
      entity: 'slice-attr',
      type: 'edit',
      auth: false
    }
  }
}
</script>

<style scoped>

</style>
