export default {

  methods: {
    addLayer(layerType) {

      console.log('And the layer type is ', layerType)
      this.$store.dispatch('setAddingLayer')
      this.$store.dispatch('setAddingLayerType', layerType)
    },
    cancelAddLayer() {
      this.$store.dispatch('cancelAddingLayer')
    },
    saveLayer() {
      this.$store.dispatch('saveLayer', this.$store.state.addingLayer).then(() => {
        this.loadLayers()
        this.$store.dispatch('cancelAddingLayer')
      })
    },
    loadLayers() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('loadLayers').then(() => resolve())
      })
    },
  }
}