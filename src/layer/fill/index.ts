import { addGeoJSONSource } from '../../map'

export const addFillLayer = ({
  map,
  id,
  data,
  zoomScope = [0, 24],
  color = '#000',
  opacity = 1,
  filter,
  beforeId
}: {
  map: any
  id: string
  data: any
  zoomScope: number[]
  color: string | any[]
  opacity: number | any[]
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
      type: 'fill',
      source: id,
      minzoom: zoomScope[0],
      maxzoom: zoomScope[1],
      paint: {
        'fill-color': color,
        'fill-opacity': opacity
      },
      filter
    },
    beforeId
  )
}
