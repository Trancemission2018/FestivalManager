export default {
  activeTab: state => {
    return state.sections[state.activeTab]
  },
  layerTypes: state => {
    return state.layerTypes
  },
  layerType: state => type => {
    return state.layerTypes.find(layerType => layerType.type === type)
  },
  layersByType: state => type => {
    return state.currentMap.layers.filter(currentLayer => currentLayer.type === type)
  },
  polylines: state => {
    return state.currentMap.layers.filter(layer => layer.data.layerType === 'polyline')
  },
  polygons: state => {
    return state.currentMap.layers.filter(layer => layer.data.layerType === 'polygon')
  },
  markers: state => {
    return state.currentMap.layers.filter(layer => layer.data.layerType === 'marker')
  },
}
