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

  setAddingLayer() {
    this.commit('SET_ADDING_LAYER')
  },
  cancelAddingLayer() {
    this.commit('CANCEL_ADDING_LAYER')
  },
  setAddingLayerType(context, layerType) {
    this.commit('SET_ADDING_LAYER_TYPE', layerType)
  },
  addPointToLayer(context, point) {
    this.commit('ADD_POINT_TO_LAYER', point)
  },
  undoPointToLayer(context) {
    this.commit('UNDO_POINT_TO_LAYER')
  },
  setActiveColour(context, colour) {
    this.commit('SET_ACTIVE_COLOUR', colour)
  },
  setLayerName(context, layerName) {
    this.commit('SET_LAYER_NAME', layerName)
  },
  setActiveLayer(context, layerId) {
    console.log('Setting layer', layerId)
    this.commit('SET_ACTIVE_LAYER', layerId)
  },
  loadLayers() {
    Api.get('/layers').then(response => {
      this.commit('ADD_LAYERS_TO_MAP', response.data)
    })

  },
  saveLayer(context, layerData) {
    return new Promise((resolve, reject) => {
      Api.post('/layer', layerData).then(response => {
        resolve(response)
        console.log('Response:', response)
      }).catch(error => reject(error))
    })
  },
  deleteLayer({context, dispatch} , layerData) {
    return new Promise((resolve, reject) => {
      Api.delete(`/layer/${layerData._id}`).then(response => {
        dispatch('loadLayers')
        console.log('Response:', response)
        resolve(response)
      }).catch(error => reject(error))
    })
  }
}
