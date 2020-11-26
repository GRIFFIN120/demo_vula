<template>
  <div>
    <el-row>
      <el-col :span="24" >
        <h3>欢迎使用"准噶尔盆地克拉美丽复杂火山岩气藏岩性快速识别系统"</h3>
        在充分调研国内外火山岩岩性识别方法和技术的基础上，结合钻井（岩心、薄片）、测井、录井、地震反射特征 等确定，快速进行火山岩岩性识别，确定一套适合克拉美丽火山岩岩性识别技术与方法。该系统平台设立数据查询、 数据编辑、常规岩性识别（图版）、非常规智能识别等方式，目的是要形成一套实用快捷的复杂火山岩性系统。
      </el-col>
    </el-row>

    <el-row style="margin-top: 50px">
      <el-col :span="12" align="center">
        <el-image :src="img1" :preview-src-list="[img1]" style="width:80%"></el-image>
      </el-col>
      <el-col :span="12" align="center">
        <el-image :src="img2" :preview-src-list="[img2]" style="width:80%"></el-image>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import img1 from '../assets/首页1.png'
import img2 from '../assets/首页2.png'
export default {
  components: {},
  props: [],
  data () {
    return {
      img1,
      img2
    }
  },
  mounted () {
  },
  methods: {

  }

}
</script>

<style scoped>

</style>
