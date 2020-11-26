<template>
  <div>
    <div id="chartdiv" ></div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

import XLSX from 'xlsx'
am4core.useTheme(am4themesAnimated)

export default {
  props: ['bean'],
  data () {
    return {
      data: [],
      value1: 100,
      value2: 300,
      value3: 400,
      names: ['Raina',
        'Demarcus',
        'Carlo',
        'Jacinda',
        'Richie',
        'Antony',
        'Amada',
        'Idalia',
        'Janella',
        'Marla',
        'Curtis',
        'Shellie',
        'Meggan',
        'Nathanael',
        'Jannette',
        'Tyrell',
        'Sheena',
        'Maranda',
        'Briana'
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$base.dfs.getBinary(this.bean)
        .then(res => {
          this.showData(res.data)
        })
    },
    showData (data) {
      try {
        const workbook = XLSX.read(data, {
          type: 'array'
        })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonArr = XLSX.utils.sheet_to_json(sheet, { header: 1 })
        const header = jsonArr[0]
        const dataArray = jsonArr.splice(1)
        const dataSet = []
        dataArray.filter(function (ar) {
          const obj = {}
          for (let i = 0; i < header.length; i++) {
            const key = header[i]
            const val = ar[i]
            obj[key] = val
          }
          dataSet.push(obj)
        })
        this.makeChart(dataSet)
      } catch (e) {
        this.$message.warning('文件类型不正确！')
      }
    },
    makeChart (data) {
      const interfaceColors = new am4core.InterfaceColorSet()
      const chart = am4core.create('chartdiv', am4charts.XYChart)

      chart.data = data
      chart.bottomAxesContainer.layout = 'horizontal'
      chart.bottomAxesContainer.reverseOrder = true
      const yAxis = chart.yAxes.push(new am4charts.ValueAxis())
      yAxis.renderer.inversed = true
      const titles = ['AC', 'CNL', 'DEN', 'GR', 'RD']

      for (let i = 0; i < titles.length; i++) {
        const title = titles[i]
        const category = 'DEPT'

        const valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
        valueAxis.tooltip.disabled = true
        valueAxis.renderer.baseGrid.disabled = true
        valueAxis.marginRight = 60
        valueAxis.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground')
        valueAxis.renderer.gridContainer.background.fillOpacity = 0.05
        valueAxis.renderer.grid.template.stroke = interfaceColors.getFor('background')
        valueAxis.renderer.grid.template.strokeOpacity = 1
        valueAxis.title.text = '指标：' + title
        valueAxis.title.fontWeight = 800

        const series = chart.series.push(new am4charts.LineSeries())
        series.dataFields.valueX = title
        series.dataFields.valueY = category
        series.name = title
        series.tooltipText = '{value}'
        series.xAxis = valueAxis
        series.strokeWidth = 3
        series.tooltip.pointerOrientation = 'vertical'
      }

      chart.cursor = new am4charts.XYCursor()
      chart.cursor.behavior = 'zoomY'

      const scrollbarY = new am4core.Scrollbar()
      chart.scrollbarY = scrollbarY
    }
  }

}
</script>

<style scoped>
#chartdiv{
  width:100%;
  height: 600px;
}
</style>
