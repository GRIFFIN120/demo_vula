
module.exports = [
  {
    path: '/',
    name: '主页',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    name: '欢迎使用',
    // redirect: '/MyTask'
    component: () => import('../views/Welcome')
  },
  {
    path: '/menuManagement',
    name: '菜单管理',
    component: () => import('../components/base/system/MenuManagement')
  },
  {
    path: '/userInfoManagement',
    name: '用户列表',
    component: () => import('../components/base/system/UserInfoManagement')
  },
  {
    path: '/userRoleManagement',
    name: '角色管理',
    component: () => import('../components/base/system/UserRoleManagement')
  },
  {
    path: '/metaManagement',
    name: '实体元数据管理',
    component: () => import('../components/base/system/major/EntityMeta')
  },
  {
    path: '/uniMetaManagement',
    name: '全局元数据管理',
    component: () => import('../components/base/system/major/UniMeta')
  },
  {
    path: '/typesManagement',
    name: '类型常量管理',
    component: () => import('../components/base/system/major/SysTypes')
  },
  {
    path: '/mapStyle',
    name: '底图样式管理',
    component: () => import('../components/map/style/MapStyle')
  },
  {
    path: '/polygonStyle',
    name: '多边形样式管理',
    component: () => import('../components/map/style/PolygonStyle')
  },
  {
    path: '/polylineStyle',
    name: '折线样式管理',
    component: () => import('../components/map/style/PolylineStyle')
  },
  {
    path: '/markStyle',
    name: '标签样式管理',
    component: () => import('../components/map/style/MarkStyle')
  },
  //

  {
    path: '/SliceManage',
    name: '岩性管理',
    component: () => import('../views/gWell/SliceManage')
  },
  {
    path: '/SliceTypeManage',
    name: '岩性类别',
    component: () => import('../views/gWell/SliceTypeManage')
  }, {
    path: '/SliceAttrManage',
    name: '测井类别',
    component: () => import('../views/gWell/SliceAttrManage')
  }, {
    path: '/WellManage',
    name: '气井数据',
    component: () => import('../views/gWell/WellManage')
  },
  {
    path: '/WellInfoManage',
    name: '基础信息',
    component: () => import('../views/gWell/WellInfoManage')
  },
  {
    path: '/SliceCompute',
    name: '岩性识别',
    component: () => import('../views/gWell/SliceCompute')
  },
  {
    path: '/SliceTrain',
    name: '训练数据',
    component: () => import('../views/gWell/SliceTrain')
  },
  {
    path: '/ImageClassManage',
    name: '图版大类',
    component: () => import('../views/gWell/ImageClassManage')
  },
  {
    path: '/ImageCompute',
    name: '图版识别',
    component: () => import('../views/gWell/ImageCompute')
  }
]
