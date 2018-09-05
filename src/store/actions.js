import axios from 'axios'

const Api = axios.create({
  baseURL: `http://localhost:6969/`,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {

  setActiveSection(context, tabId) {
    this.commit('SET_ACTIVE_TAB', tabId)
    this.commit('SET_SECTION', tabId)
    this.commit('SET_ACTIVE_SECTION', tabId)
  },
  setAddingLayer() {
    this.commit('SET_ADDING_LAYER')
  },
  cancelAddingLayer() {
    this.commit('CANCEL_ADDING_LAYER')
    this.commit('CANCEL_EDITING_LAYER')
  },
  setAddingLayerType(context, layerType) {
    this.commit('SET_ADDING_LAYER_TYPE', layerType)
  },
  addPointToLayer(context, point) {
    this.commit('ADD_POINT_TO_LAYER', point)
  },
  setMarkerPoint(context, point) {
    this.commit('SET_MARKER_POINT', point)
  },
  undoPointToLayer(context) {
    this.commit('UNDO_POINT_TO_LAYER')
  },
  setActiveColour(context, colour) {
    this.commit('SET_ACTIVE_COLOUR', colour)
  },
  setStrokeWidth(context, width) {
    this.commit('SET_STROKE_WIDTH', width)
  },
  setLayerName(context, layerName) {
    this.commit('SET_LAYER_NAME', layerName)
  },
  setIconUrl(context, iconUrl) {
    this.commit('SET_ICON_URL', iconUrl)
  },
  setActiveLayer(context, layerId) {
    this.commit('SET_EDITING_LAYER')
    return new Promise(resolve => {
      this.commit('SET_ACTIVE_LAYER', layerId)
      resolve()
    })
  },
  setPresetColours(context, colours) {
    this.commit('SET_PRESET_COLOURS', colours)
  },
  addPresetColour(context, colour) {
    return new Promise((resolve) => {
      this.commit('ADD_PRESET_COLOUR', colour)
      resolve()
    })
  },
  loadLayers() {
    return new Promise((resolve, reject) => {
      Api.get('/layers').then(response => {
        console.log('Load these layers now', response)
        this.commit('ADD_LAYERS_TO_MAP', response.data)
        resolve()
      })
    })
  },
  addLayerToMap(context, layer) {
    this.commit('ADD_LAYER_TO_MAP', layer)
  },
  saveLayer({context, dispatch}, layerData) {
    Api.post('/layer', layerData).then(response => {
      console.log('Saved', response)
      dispatch('loadLayers')
    })
  },
  updateLayer({context, dispatch}, layerData) {
    Api.put('/layer', layerData).then(response => {
      console.log('Saved', response)
      dispatch('loadLayers')
    })
  },
  deleteLayer({context, dispatch}, layerData) {
    return new Promise((resolve, reject) => {
      Api.delete(`/layer/${layerData.id}`).then(() => {
        dispatch('loadLayers')
        resolve()
      })
    })
  }
}
