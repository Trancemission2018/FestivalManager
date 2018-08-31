export default {
  SET_ACTIVE_TAB(state, tabId){
    state.activeTab = tabId
  },
  SET_SECTION(state, section){
    state.addingLayer.section = section
  },
  SET_ACTIVE_SECTION(state, section){
    state.activeSection = section
  },
  SET_MAP_CENTRE(state, coords) {
    state.currentMap.position.lat = coords.lat
    state.currentMap.position.long = coords.lng
  },
  SET_MAP_ZOOM(state, zoomLevel) {
    state.currentMap.zoom = zoomLevel
  },
  SAVE_LINE(state, lineData) {
    state.currentMap.lines.push(lineData)
  },
  SET_ADDING_LAYER(state) {
    state.addingLayer.active = true
  },
  CANCEL_ADDING_LAYER(state) {
    state.addingLayer.active = false
    state.addingLayer.points = []
  },
  SET_ADDING_LAYER_TYPE(state, layerType) {
    state.addingLayer.layerType = layerType
  },
  ADD_POINT_TO_LAYER(state, point) {
    state.addingLayer.points.push(point)
  },
  SET_MARKER_POINT(state, point) {
    state.addingLayer.markerPoint = point
  },
  SET_ICON_URL(state, url) {
    state.addingLayer.iconUrl = url
  },
  UNDO_POINT_TO_LAYER(state) {
    state.addingLayer.points.pop()
  },
  SET_ACTIVE_COLOUR(state, colour) {
    state.addingLayer.colour = colour
  },
  SET_LAYER_NAME(state, layerName) {
    state.addingLayer.layerName = layerName
  },
  SET_ACTIVE_LAYER(state, layerId) {
    state.currentMap.activeLayerId  = layerId
  },
  ADD_LAYERS_TO_MAP(state, layers) {
    state.currentMap.layers = layers
  }
}
