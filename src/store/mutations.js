export default {
  SET_MAP_CENTRE(state, coords) {
    state.currentMap.position.lat = coords.lat
    state.currentMap.position.long = coords.lng
  },
  SET_MAP_ZOOM(state, zoomLevel) {
    state.currentMap.zoom = zoomLevel
  },
  ADD_POINT(state, latlng) {
    state.currentMap.addingLine.points.push(latlng)
  },
  TOGGLE_ADDING_LINE(state) {
    state.currentMap.addingLine.active = true
  },
  CANCEL_ADDING_LINE(state) {
    state.currentMap.addingLine.points = []
    state.currentMap.addingLine.active = false
  }
}
