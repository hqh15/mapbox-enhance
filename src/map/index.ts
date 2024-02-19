import mapboxgl from 'mapbox-gl'

const wgs84BaseMap = [
  {
    id: '灰色底图',
    url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}'
  },
  {
    id: '蓝色底图',
    url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
  },
  {
    id: '暖色底图',
    url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}'
  }
]

const gcj02BaseMap = []

export const initMap = ({
  accessToken,
  container,
  coordinateSystem = 'wgs84',
  baseMapId = '蓝色底图',
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
  coordinateSystem: 'wgs84' | 'gcj02'
  baseMapId: string
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

  map.on('load', () => {
    if (coordinateSystem === 'wgs84') {
      wgs84BaseMap.forEach((item) => {
        map.addSource(item.id, {
          type: 'raster',
          tiles: [item.url],
          tileSize: 256
        })
        map.addLayer({
          id: item.id,
          type: 'raster',
          source: item.id
        })
        if (item.id != baseMapId) {
          map.setLayoutProperty(item.id, 'visibility', 'none')
        }
      })
    } else {
    }
  })

  return map
}

function addGeoJSONSource(map: any, id: string, data: any) {
  map.addSource(id, {
    type: 'geojson',
    data
  })
}

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
  filter?: any[]
  beforeId?: string
}) => {
  if (map.getLayer(id) || map.getSource(id)) {
    console.error('已有该图层/源')
    return
  }
  addGeoJSONSource(map, id, data)
  map.addLayer(
    {
      id,
      type: 'symbol',
      source: id,
      minzoom: zoomScope[0],
      maxzoom: zoomScope[1],
      layout: {
        'text-field':
          typeof field === 'string' ? ['format', ['get', field]] : field,
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

export const addImageLayer = ({
  map,
  id,
  data,
  zoomScope = [0, 24],
  image,
  size,
  opacity,
  isAllowOverlap,
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
  filter?: any[]
  beforeId?: string
}) => {
  if (map.getLayer(id) || map.getSource(id)) {
    console.error('已有该图层/源')
    return
  }
  addGeoJSONSource(map, id, data)
  map.addLayer(
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

export const addCircleLayer = ({
  map,
  id,
  data,
  zoomScope = [0, 24],
  color = '#000',
  opacity = 1,
  radius = 5,
  filter,
  beforeId
}: {
  map: any
  id: string
  data: any
  zoomScope: number[]
  color: string | any[]
  opacity: number | any[]
  radius: number | any[]
  filter?: any[]
  beforeId?: string
}) => {
  if (map.getLayer(id) || map.getSource(id)) {
    console.error('已有该图层/源')
    return
  }
  addGeoJSONSource(map, id, data)
  map.addLayer(
    {
      id,
      type: 'circle',
      source: id,
      minzoom: zoomScope[0],
      maxzoom: zoomScope[1],
      paint: {
        'circle-color': color,
        'circle-opacity': opacity,
        'circle-radius': radius
      },
      filter
    },
    beforeId
  )
}

export const addLineLayer = ({
  map,
  id,
  data,
  zoomScope = [0, 24],
  color = '#000',
  dasharray,
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
  dasharray: number[]
  opacity: number | any[]
  width: number | any[]
  filter?: any[]
  beforeId?: string
}) => {
  if (map.getLayer(id) || map.getSource(id)) {
    console.error('已有该图层/源')
    return
  }
  addGeoJSONSource(map, id, data)
  map.addLayer(
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
        'line-dasharray': dasharray,
        'line-opacity': opacity,
        'line-width': width
      },
      filter
    },
    beforeId
  )
}

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
  filter?: any[]
  beforeId?: string
}) => {
  if (map.getLayer(id) || map.getSource(id)) {
    console.error('已有该图层/源')
    return
  }
  addGeoJSONSource(map, id, data)
  map.addLayer(
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

export const addFillExtrusionLayer = ({
  map,
  id,
  data,
  zoomScope = [0, 24],
  color = '#000',
  base,
  height,
  opacity = 1,
  filter,
  beforeId
}: {
  map: any
  id: string
  data: any
  zoomScope: number[]
  color: string | any[]
  base: number | any[]
  height: number | any[]
  opacity: number | any[]
  filter?: any[]
  beforeId?: string
}) => {
  if (map.getLayer(id) || map.getSource(id)) {
    console.error('已有该图层/源')
    return
  }
  addGeoJSONSource(map, id, data)
  map.addLayer(
    {
      id,
      type: 'fill-extrusion',
      source: id,
      minzoom: zoomScope[0],
      maxzoom: zoomScope[1],
      paint: {
        'fill-extrusion-color': color,
        'fill-extrusion-base': base,
        'fill-extrusion-height': height,
        'fill-extrusion-opacity': opacity
      },
      filter
    },
    beforeId
  )
}

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
  filter?: any[]
  beforeId?: string
}) => {
  if (map.getLayer(id) || map.getSource(id)) {
    console.error('已有该图层/源')
    return
  }
  addGeoJSONSource(map, id, data)
  map.addLayer(
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
