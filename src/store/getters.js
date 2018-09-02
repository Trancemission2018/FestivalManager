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
  layersBySection: state => section => {
    return state.currentMap.layers.filter(currentLayer => currentLayer.data.section === state.activeSection)
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
