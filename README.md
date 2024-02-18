# MapboxGL Functions README

This repository contains a set of functions for working with MapboxGL maps in a web application. Below are the instructions on how to use each exported function:

## `initMap`

Initializes a MapboxGL map with specified parameters.

```ts
initMap({
  accessToken: string,
  container: string,
  center: [number, number],
  bearing: number,
  pitch: number,
  style: mapboxgl.Style,
  zoom: number
})
```

## `addTextLayer`

Adds a text layer to the map.

```ts
addTextLayer({
  map: any,
  id: string,
  data: any,
  zoomScope: number[],
  textField: string | any[],
  textColor: string | any[],
  textSize: number | any[],
  filter: any[],
  beforeId: string | undefined
})
```

## `addImageLayer`

Adds an image layer to the map.

```ts
addImageLayer({
  map: any,
  id: string,
  data: any,
  zoomScope: number[],
  image: string,
  size: number | any[],
  opacity: number | any[],
  isAllowOverlap: boolean,
  filter: any[],
  beforeId: string | undefined
})
```

## `addCircleLayer`

Adds a circle layer to the map.

```ts
addCircleLayer({
  map: any,
  id: string,
  data: any,
  zoomScope: number[],
  color: string | any[],
  opacity: number | any[],
  radius: number | any[],
  filter: any[],
  beforeId: string | undefined
})
```

## `addLineLayer`

Adds a line layer to the map.

```ts
addLineLayer({
  map: any,
  id: string,
  data: any,
  zoomScope: number[],
  color: string | any[],
  dasharray: number[],
  opacity: number | any[],
  width: number | any[],
  filter: any[],
  beforeId: string | undefined
})
```

## `addFillLayer`

Adds a fill layer to the map.

```ts
addFillLayer({
  map: any,
  id: string,
  data: any,
  zoomScope: number[],
  color: string | any[],
  opacity: number | any[],
  filter: any[],
  beforeId: string | undefined
})
```

## `addFillExtrusionLayer`

Adds a fill extrusion layer to the map.

```ts
addFillExtrusionLayer({
  map: any,
  id: string,
  data: any,
  zoomScope: number[],
  color: string | any[],
  base: number | any[],
  height: number | any[],
  opacity: number | any[],
  filter: any[],
  beforeId: string | undefined
})
```

## `addHeatmapLayer`

Adds a heatmap layer to the map.

```ts
addHeatmapLayer({
  map: any,
  id: string,
  data: any,
  zoomScope: number[],
  color: string | any[],
  intensity: number | any[],
  opacity: number | any[],
  radius: number | any[],
  weight: number | any[],
  filter: any[],
  beforeId: string | undefined
})
```

## `removeLayerById`

Removes a specific layer from the map.

```ts
removeLayerById(map: any, id: string, isRemoveSource: boolean)
```

## `removeLayersByIds`

Removes multiple layers by their IDs from the map.

```ts
removeLayersByIds(map: any, ids: string[], isRemoveSource: boolean)
```

Feel free to use these functions to enhance your MapboxGL maps in your web application!
