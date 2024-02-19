import {
  initMap,
  addGeoJSONSource,
  addImageSource,
  removeLayerById,
  removeLayersByIds
} from './map'
import { addTextLayer } from './layer/text'
import { addImageLayer } from './layer/image'
import { addCircleLayer } from './layer/circle'
import { addLineLayer } from './layer/line'
import { addFillLayer } from './layer/fill'
import { addFillExtrusionLayer } from './layer/fill-extrusion'
import { addHeatmapLayer } from './layer/heatmap'

const getColorSteps = ({
  type = 'ratio',
  array,
  count = 7,
  colorList = [
    '#78fa8a',
    '#adfd52',
    '#fce148',
    '#faaa42',
    '#ff712f',
    '#fa3131',
    '#b80e03'
  ],
  maxIndex = 1,
  reverse = false
}: {
  type: 'eqCount_Ratio' | 'ratio' | any
  array: number[]
  count: number
  colorList: string[]
  maxIndex: number
  reverse: boolean
}) => {
  if (reverse) {
    colorList.reverse()
  }
  let steps: any[] = []
  array.sort((a, b) => a - b)
  const length = array.length
  const max = array[length - maxIndex]

  //  248等比分割
  if (type == 'eqCount_Ratio') {
    let multiple = 0
    let power = length >= 5000 ? 3 : 2
    for (let i = 0; i < count; i++) {
      multiple += power ** i
    }
    const minX = length / multiple
    colorList.forEach((item, index) => {
      if (index == 0) {
        steps.push([array[0], item])
      } else {
        const i = Math.floor(length - minX * power ** (count - (index + 1)))
        steps.push([Math.floor(array[i]), item])
      }
    })
    return steps
  }

  // 125等比分割
  if (type == 'ratio' && max > 100) {
    // 获取位数n
    let n = 0
    let num = max
    while (num >= 1) {
      num = num / 10
      n++
    }
    // 计算图例
    let item = []
    n = n - 1
    switch (true) {
      case max > 5 * Math.pow(10, n):
        item.push(
          5 * Math.pow(10, n),
          2 * Math.pow(10, n),
          1 * Math.pow(10, n),
          5 * Math.pow(10, n - 1),
          2 * Math.pow(10, n - 1),
          1 * Math.pow(10, n - 1),
          5 * Math.pow(10, n - 2)
        )
        break

      case max > 2 * Math.pow(10, n):
        item.push(
          2 * Math.pow(10, n),
          1 * Math.pow(10, n),
          5 * Math.pow(10, n - 1),
          2 * Math.pow(10, n - 1),
          1 * Math.pow(10, n - 1),
          5 * Math.pow(10, n - 2),
          5 * Math.pow(10, n - 2)
        )
        break

      case max > 1 * Math.pow(10, n):
        item.push(
          1 * Math.pow(10, n),
          5 * Math.pow(10, n - 1),
          2 * Math.pow(10, n - 1),
          1 * Math.pow(10, n - 2),
          5 * Math.pow(10, n - 2),
          2 * Math.pow(10, n - 2),
          1 * Math.pow(10, n - 2)
        )
        break

      case max > 5 * Math.pow(10, n - 1):
        item.push(
          5 * Math.pow(10, n - 1),
          2 * Math.pow(10, n - 1),
          1 * Math.pow(10, n - 1),
          5 * Math.pow(10, n - 2),
          2 * Math.pow(10, n - 2),
          1 * Math.pow(10, n - 2),
          5 * Math.pow(10, n - 3)
        )
        break

      default:
        console.error('125等比分割失败')
        break
    }
    item.sort((a, b) => a - b)
    for (let i = 0; i < 7; i++) {
      let stepsItem = []
      stepsItem.push(item[i], colorList[i])
      steps.push(stepsItem)
    }
    steps[0][0] = 0
    return steps
  } else if (max > count) {
    // 等量分割
    for (let i = 0; i < count; i++) {
      let item = []
      let num = array[Math.floor((length * i) / count)]
      if (steps.length > 0 && num <= steps[steps.length - 1][0]) {
        // 去重
        num = steps[steps.length - 1][0] + 1
      }
      item.push(num, colorList[i])
      steps.push(item)
    }
    return steps
  }

  // 最小图例
  for (let i = 0; i < count; i++) {
    let item = []
    item.push(i, colorList[i])
    steps.push(item)
  }
  return steps
}

export {
  initMap,
  addGeoJSONSource,
  addImageSource,
  removeLayerById,
  removeLayersByIds,
  addTextLayer,
  addImageLayer,
  addCircleLayer,
  addLineLayer,
  addFillLayer,
  addFillExtrusionLayer,
  addHeatmapLayer,
  getColorSteps
}
