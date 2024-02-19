import mapboxgl from 'mapbox-gl'

export const initMap = ({
  accessToken,
  container,
  center,
  bearing = 0,
  pitch = 0,
  style = {
    version: 8,
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
    sources: {},
    layers: []
  },
  zoom = 8
}: {
  accessToken: string
  container: string
  center: [number, number]
  bearing: number
  pitch: number
  style: mapboxgl.Style
  zoom: number
}) => {
  // init map
  const map = new mapboxgl.Map({
    accessToken,
    container,
    center,
    bearing,
    pitch,
    style,
    zoom
  })

  if (typeof style === 'object') {
    console.error('请自行添加底图')
  }

  return map
}

export const addGeoJSONSource = (map: any, id: string, data: any) => {
  map.addSource(id, {
    type: 'geojson',
    data
  })
}

export const addImageSource = (
  map: any,
  url: string,
  id: string,
  data: any
) => {
  map.loadImage(url, (error: any, image: any) => {
    if (error) throw error
    map.addImage(id, image)
    map.addSource(id, {
      type: 'geojson',
      data
    })
  })
}

export const removeLayerById = (
  map: any,
  id: string,
  isRemoveSource = true
) => {
  if (map.getLayer(id)) {
    map.removeLayer(id)
  }
  if (isRemoveSource && map.getSource(id)) {
    map.removeSource(id)
  }
}

export const removeLayersByIds = (
  map: any,
  ids: string[],
  isRemoveSource = true
) => {
  ids.forEach((id) => {
    removeLayerById(map, id, isRemoveSource)
  })
}
