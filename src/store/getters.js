export default {
  layerTypes: state => {
    return state.layerTypes
  },
  layerType: state => layerTypeId => {
    return state.layerTypes.find(layerType => layerType.id === layerTypeId)
  },
  polylines: state => {
    return state.currentMap.layers.filter(layer => layer.data.layerType === 'polyline')
  },
  polygons: state => {
    return state.currentMap.layers.filter(layer => layer.data.layerType === 'polygon')
  }
}
