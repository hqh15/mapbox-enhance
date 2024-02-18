"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLayersByIds = exports.removeLayerById = exports.addHeatmapLayer = exports.addFillExtrusionLayer = exports.addFillLayer = exports.addLineLayer = exports.addCircleLayer = exports.addImageLayer = exports.addTextLayer = exports.initMap = void 0;
const mapbox_gl_1 = __importDefault(require("mapbox-gl"));
const initMap = ({ accessToken, container, center, bearing = 0, pitch = 0, style = {
    version: 8,
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
    sources: {},
    layers: []
}, zoom = 8 }) => {
    // init map
    const map = new mapbox_gl_1.default.Map({
        accessToken,
        container,
        center,
        bearing,
        pitch,
        style,
        zoom
    });
    return map;
};
exports.initMap = initMap;
function addGeoJSONSource(map, id, data) {
    map.addSource(id, {
        type: 'geojson',
        data
    });
}
const addTextLayer = ({ map, id, data, zoomScope = [0, 24], textField = 'name', textColor = '#000', textSize = 12, filter, beforeId }) => {
    if (map.getLayer(id) || map.getSource(id)) {
        console.error('已有该图层/源');
        return;
    }
    addGeoJSONSource(map, id, data);
    map.addLayer({
        id,
        type: 'symbol',
        source: id,
        minzoom: zoomScope[0],
        maxzoom: zoomScope[1],
        layout: {
            'text-field': typeof textField === 'string'
                ? ['format', ['get', textField]]
                : textField,
            'text-size': textSize
        },
        paint: {
            'text-color': textColor
        },
        filter
    }, beforeId);
};
exports.addTextLayer = addTextLayer;
const addImageLayer = ({ map, id, data, zoomScope = [0, 24], image, size, opacity, isAllowOverlap, filter, beforeId }) => {
    if (map.getLayer(id) || map.getSource(id)) {
        console.error('已有该图层/源');
        return;
    }
    addGeoJSONSource(map, id, data);
    map.addLayer({
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
    }, beforeId);
};
exports.addImageLayer = addImageLayer;
const addCircleLayer = ({ map, id, data, zoomScope = [0, 24], color = '#000', opacity = 1, radius = 5, filter, beforeId }) => {
    if (map.getLayer(id) || map.getSource(id)) {
        console.error('已有该图层/源');
        return;
    }
    addGeoJSONSource(map, id, data);
    map.addLayer({
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
    }, beforeId);
};
exports.addCircleLayer = addCircleLayer;
const addLineLayer = ({ map, id, data, zoomScope = [0, 24], color = '#000', dasharray, opacity = 1, width = 1, filter, beforeId }) => {
    if (map.getLayer(id) || map.getSource(id)) {
        console.error('已有该图层/源');
        return;
    }
    addGeoJSONSource(map, id, data);
    map.addLayer({
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
    }, beforeId);
};
exports.addLineLayer = addLineLayer;
const addFillLayer = ({ map, id, data, zoomScope = [0, 24], color = '#000', opacity = 1, filter, beforeId }) => {
    if (map.getLayer(id) || map.getSource(id)) {
        console.error('已有该图层/源');
        return;
    }
    addGeoJSONSource(map, id, data);
    map.addLayer({
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
    }, beforeId);
};
exports.addFillLayer = addFillLayer;
const addFillExtrusionLayer = ({ map, id, data, zoomScope = [0, 24], color = '#000', base, height, opacity = 1, filter, beforeId }) => {
    if (map.getLayer(id) || map.getSource(id)) {
        console.error('已有该图层/源');
        return;
    }
    addGeoJSONSource(map, id, data);
    map.addLayer({
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
    }, beforeId);
};
exports.addFillExtrusionLayer = addFillExtrusionLayer;
const addHeatmapLayer = ({ map, id, data, zoomScope = [0, 24], color = [
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
], intensity = 1, opacity = 1, radius = 30, weight = 1, filter, beforeId }) => {
    if (map.getLayer(id) || map.getSource(id)) {
        console.error('已有该图层/源');
        return;
    }
    addGeoJSONSource(map, id, data);
    map.addLayer({
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
    }, beforeId);
};
exports.addHeatmapLayer = addHeatmapLayer;
const removeLayerById = (map, id, isRemoveSource = true) => {
    if (map.getLayer(id)) {
        map.removeLayer(id);
    }
    if (isRemoveSource && map.getSource(id)) {
        map.removeSource(id);
    }
};
exports.removeLayerById = removeLayerById;
const removeLayersByIds = (map, ids, isRemoveSource = true) => {
    ids.forEach((id) => {
        (0, exports.removeLayerById)(map, id, isRemoveSource);
    });
};
exports.removeLayersByIds = removeLayersByIds;
