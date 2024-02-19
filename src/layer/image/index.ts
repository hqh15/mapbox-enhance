import { addGeoJSONSource } from '../../map'

export const addImageLayer = ({
  map,
  id,
  data,
  zoomScope = [0, 24],
  image,
  size = 1,
  opacity = 1,
  isAllowOverlap = false,
  filter,
  beforeId
}: {
  map: any
  id: string
  data: any
  zoomScope: number[]
  image: string
  size: number | any[]
  opacity: number | any[]
  isAllowOverlap: boolean
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
        'icon-image': image,
        'icon-size': size,
        'icon-opacity': opacity,
        'icon-allow-overlap': isAllowOverlap
      },
      filter
    },
    beforeId
  )
}
