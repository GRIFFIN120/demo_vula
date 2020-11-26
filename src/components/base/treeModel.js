import meta from './meta'

export default {
  mixins: [meta],
  props: {
    search: {
      type: Object,
      default: function () {
        return {
          exact: {},
          fuzzy: {},
          page: 1,
          size: 0
        }
      }
    },
    width: {
      default: '40%'
    }

  },
  data () {
    return {
      title: '',
      exact: {},
      results: {},
      item: {},
      tree: [],
      filterText: '',
      checkedKeys: [],
      defaultExpandedKeys: [0]
    }
  },
  mounted () {
    this.exact = this.$utils.deepClone(this.search.exact) // 默认的exact搜索条件不作为表格的搜素条件，需要固定住
    this.initMeta(this.load())
  },
  watch: {
    // 搜索条件发生变化时，重新搜索
    search: {
      handler: function () {
        // （清理掉搜索中的空字符）
        console.log('search changed', this.search)
        for (const key in this.search.exact) {
          if (this.search.exact[key] === '') {
            delete this.search.exact[key]
          }
        }
        for (const key in this.search.fuzzy) {
          if (this.search.fuzzy[key] === '') {
            delete this.search.fuzzy[key]
          }
        }
        this.load()
      },
      deep: true
    },
    type () {
      this.loaded = false
      this.initMeta(this.load())
    },
    filterText (val) {
      this.$refs.elTree.filter(val)
    },
    checked () {
      this.$refs.elTree.setCheckedKeys(this.checked)
    }
  },
  methods: {
    getMeta () {
      return this.META
    },
    getData () {
      return this.results.list
    },
    load (callback) {
      const root = {
        name: this.rootLabel,
        icon: 'fa fa-home',
        id: 0,
        pid: -1
      }
      this.$base.tree(this.entity, this.search)
        .then(res => {
          root.children = res.data
          this.tree = [root]
          this.$refs.elTree.setCheckedKeys(this.checkedKeys)
          if (callback) callback()
        })
    },
    reload (data) {
      this.defaultExpandedKeys = [data.pid]
      this.item = data
      const th = this
      this.load(function () {
        setTimeout(function () {
          th.$refs.elTree.setCurrentKey(data.id)
        }, 100)
      })
    },
    select (item, node, component) {
      this.item = item
      this.$refs.elTree.setCurrentKey(item.id)
    },
    handleCheck (node, data) {
      this.checkedKeys = data.checkedKeys
    },

    // 查询
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    /// /////// 拖拽相关
    allowDrop (draggingNode, dropNode, type) {
      const flag = !(dropNode.data.id === 0 && type !== 'inner')
      if (this.checkDrop) {
        const check = this.checkDrop(draggingNode, dropNode, type)
        return check && flag
      } else {
        return flag
      }

      // 不能移动到根结点外，别的随意
    },
    allowDrag (draggingNode) {
      // 不能拖动根结点，别的随意
      const flag = draggingNode.data.id !== 0
      return flag
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      if (dropType === 'inner') {
        const bean = {
          id: draggingNode.data.id,
          pid: dropNode.data.id
        }
        this.$base.update(this.entity, bean)
          .then((res) => {
            this.reload(res.data)
            this.$emit('modified')
          })
      } else {
        const dgid = draggingNode.data.id
        const dpid = dropNode.data.id
        const dir = dropType
        this.$base.place(this.entity, dgid, dpid, dir)
          .then((res) => {
            draggingNode.data.pid = dropNode.data.pid
            this.reload(draggingNode.data)
            this.$emit('modified')
          })
      }
    },
    /// /////// 增，删，改
    save (data) {
      const item = this.$refs.form.getData()
      if (data.id) {
        item.id = data.id
      } else {
        item.pid = data.pid
      }
      this.$base.update(this.entity, item)
        .then(res => {
          this.dialogVisible = false
          this.load()
        })
    },
    remove (row) {
      if (this.checkedKeys.length !== 0) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteSelected()
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      } else {
        this.$message.warning('请勾选要删除的节点')
      }
    },
    deleteSelected () {
      // 搜索已经展开的节点
      const dek = []
      const th = this
      this.checkedKeys.filter(function (e) {
        const node = th.$refs.elTree.getNode(e)
        if (node && node.data) {
          const check = dek.filter(function (ee) {
            if (ee === node.data.pid) return true
          })
          if (check.length === 0) {
            dek.push(node.data.pid)
          }
        }
      })
      // 删除 重制
      this.defaultExpandedKeys = dek
      if (this.checkedKeys.length !== 0) {
        this.$base.removeAll(this.entity, this.checkedKeys)
          .then(() => {
            this.deleteKeys = []
            this.$refs.elTree.setCurrentKey(0)
            this.load()
            this.$emit('modified')
          })
      } else {
        this.$message.warning('请勾选要删除的节点')
      }
    }

  }
}
