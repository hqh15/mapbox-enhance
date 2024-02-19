import { addGeoJSONSource } from '../../map'

export const addTextLayer = ({
  map,
  id,
  data,
  zoomScope = [0, 24],
  field = 'name',
  color = '#000',
  size = 12,
  filter,
  beforeId
}: {
  map: any
  id: string
  data: any
  zoomScope: number[]
  field: string | any[]
  color: string | any[]
  size: number | any[]
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
      type: 'symbol',
      source: id,
      minzoom: zoomScope[0],
      maxzoom: zoomScope[1],
      layout: {
        'text-field': typeof field === 'string' ? ['get', field] : field,
        'text-size': size
      },
      paint: {
        'text-color': color
      },
      filter
    },
    beforeId
  )
}
