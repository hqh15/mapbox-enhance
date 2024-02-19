import { addGeoJSONSource } from '../../map'

export const addHeatmapLayer = ({
  map,
  id,
  data,
  zoomScope = [0, 24],
  color = [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'blue',
    0.1,
    'royalblue',
    0.3,
    'cyan',
    0.5,
    'lime',
    0.7,
    'yellow',
    1,
    'red'
  ],
  intensity = 1,
  opacity = 1,
  radius = 30,
  weight = 1,
  filter,
  beforeId
}: {
  map: any
  id: string
  data: any
  zoomScope: number[]
  color: string | any[]
  intensity: number | any[]
  opacity: number | any[]
  radius: number | any[]
  weight: number | any[]
  filter: any[]
  beforeId?: string
}) => {
  if (map.getLayer(id) || map.getSource(id)) {
    console.error(`已有${id}图层/源`)
    return
  }
  addGeoJSONSource(map, id, data)
  return map.addLayer(
    {
      id,
      type: 'heatmap',
      source: id,
      minzoom: zoomScope[0],
      maxzoom: zoomScope[1],
      paint: {
        'heatmap-color': color,
        'heatmap-intensity': intensity,
        'heatmap-opacity': opacity,
        'heatmap-radius': radius,
        'heatmap-weight': weight
      },
      filter
    },
    beforeId
  )
}
