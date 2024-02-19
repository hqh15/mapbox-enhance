import { addGeoJSONSource } from '../../map'

export const addLineLayer = ({
  map,
  id,
  data,
  zoomScope = [0, 24],
  color = '#000',
  opacity = 1,
  width = 1,
  filter,
  beforeId
}: {
  map: any
  id: string
  data: any
  zoomScope: number[]
  color: string | any[]
  opacity: number | any[]
  width: number | any[]
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
      type: 'line',
      source: id,
      minzoom: zoomScope[0],
      maxzoom: zoomScope[1],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': color,
        'line-opacity': opacity,
        'line-width': width
      },
      filter
    },
    beforeId
  )
}
