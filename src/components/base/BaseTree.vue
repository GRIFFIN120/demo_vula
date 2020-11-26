<template>
  <div v-if="loaded">
    <BaseDialog ref="dialog" :title="title" width="400px" @confirm="save">
      <template v-slot="{data}">
        <!--  3. 引入对话框中的模版  -->
        <BaseForm ref="form" :item="data" :meta="META" ></BaseForm>
      </template>
    </BaseDialog>
    <el-row style="margin-bottom: 10px">
      <el-col :span="12">
        <el-input
          clearable
          size="small"
          placeholder="输入关键字进行节点过滤"
          v-model="filterText">
          <template slot="append"><i class="fa fa-filter"></i>&nbsp;过滤</template>
        </el-input>
      </el-col>
      <el-col :span="12" align="right">
        <slot name="operation" :item="item"></slot>
        <div v-if="META.OPERATION.enable" style="display: inline; margin-left: 10px">
          <el-button v-if="META.OPERATION.view" circle size="small" type="primary" @click="$refs.dialog.open(item,false)" icon="fa fa-eye"></el-button>
          <el-button v-if="META.OPERATION.insertion" circle size="small" type="success" @click="openInsert(item)" icon="fa fa-plus"></el-button>
          <el-button v-if="META.OPERATION.edit" circle size="small" type="warning" @click="openEdit(item)" icon="fa fa-edit"></el-button>
          <el-button v-if="META.OPERATION.remove" circle size="small" type="danger" @click="remove(item)" icon="fa fa-remove"></el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="tree-scroll">
      <el-tree
        ref="elTree"
        class="tree-class"
        :data="tree"

        node-key="id"
        :props="{children: 'children',label: 'name'}"

        :default-expanded-keys="defaultExpandedKeys"
        :check-on-click-node = "false"
        :expand-on-click-node = "false"
        :default-expand-all = 'defaultExpandAll'
        :show-checkbox="checkable"
        :draggable="META.OPERATION.enable && META.OPERATION.pop"

        :filter-node-method="filterNode"

        @node-collapse="highlight"
        @node-expand="highlight"
        @node-click="highlight"

        @check = "handleCheck"

        @node-drop="handleDrop"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"

      >
          <span  slot-scope="{ node, data }">
              <span class="iconLabel" v-html="label(data)"></span>
          </span>
      </el-tree>
    </el-row>

  </div>
</template>

<script>
import mix from './treeModel'
import meta from './meta'
import BaseDialog from './BaseDialog'
import BaseForm from './BaseForm'

export default {
  name: 'index',
  components: {
    BaseDialog,
    BaseForm
  },
  mixins: [mix, meta],
  props: {
    rootLabel: {
      default: '根结点'
    },
    defaultExpandAll: {
      default: false
    },
    checkDrop: {
      type: Function
    },
    beforeInsert: {
      type: Function
    },
    beforeEdit: {
      type: Function
    },
    checkable: {
      type: Boolean,
      default: true
    },
    checked: {
      type: Array,
      default: function () {
        return []
      }
    },
    label: {
      type: Function,
      default: (data) => { return data.name }
    }
  },
  data () {
    return {

    }
  },
  methods: {

    getRoot () {
      return this.$refs.elTree.getNode(0).data
    },
    getSelectedItem () {
      return this.item
    },
    getCheckedKeys () {
      return this.$refs.elTree.getCheckedKeys()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    highlight (item, node, component) { /// select
      this.item = item
      this.$refs.elTree.setCurrentKey(item.id)
    },
    handleCheck (node, data) {
      this.checkedKeys = data.checkedKeys
    },

    openInsert (item) {
      this.title = '新增数据'
      this.editable = true
      let object = {}
      object = this.$utils.objectMerge(object, this.search.exact)
      object = this.$utils.objectMerge(object, this.search.fuzzy)
      object.pid = item !== undefined && item.id !== undefined ? item.id : 0
      this.$refs.dialog.open(object)
    },
    openEdit (row) {
      this.title = '编辑数据'
      this.editable = true
      this.$refs.dialog.open(row)
    },
    openView (row) {
      this.title = '数据详情'
      this.editable = false
      this.$refs.dialog.open(row)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-tree {
    min-width: 800px;
    min-height: 500px;
  }

  .el-tree>.el-tree-node {
    display: inline-block;
  }
  .tree-scroll{
    background-color: #f3f3f3;
    width: 100%;
    overflow-x: scroll;
    border: 1px solid #eeeeee;
  }
  .tree-class{
    max-height: 600px;
    background-color: #f3f3f3;
  }
  .iconLabel{
    padding-left: 10px;
    color: #7b7c7d;
  }
</style>
