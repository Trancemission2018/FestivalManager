<template>
    <div>
        <v-card v-if="!addingLayer"
                color="grey lighten-4"
                flat
                tile
        >
            <v-toolbar dense class="mt-2">
                <v-btn small
                       @click="addLayer(1)"
                >
                    Add Fence
                </v-btn>
                <v-btn small
                       @click="addLayer(2)"
                >
                    Add Zone
                </v-btn>
                <v-btn small
                       @click="addLayer(3)"
                >
                    Add Checkpoint
                </v-btn>
            </v-toolbar>
            <v-content class="pa-2 text-xs-left">
                <list-layers />
            </v-content>
        </v-card>
        <v-card v-if="addingLayer" class="elevation-6 pt-2">

            <v-layout>
                <v-flex xs8>
                    <v-text-field
                            label="Name"
                            v-model="layerName"
                    ></v-text-field>
                </v-flex>
                <v-flex xs4 class="pt-4 ml-4">
                    <input type="color" v-model="activeColour"/>
                </v-flex>
            </v-layout>

            <v-btn small
                   @click="saveLayer()"
            >
                Save
            </v-btn>

            <v-btn small
                   @click="cancelAddLayer()"
            >
                Cancel
            </v-btn>

        </v-card>
    </div>

</template>

<script>
  import ListLayers from "../widgets/ListLayers"
  export default {
    name: "",
    components: {ListLayers},
    props: [],
    data: () => ({
      addingLayer: false,
      layerName: '',
      activeColour: '#000000',
      layer: {
        name: null
      }
    }),
    mounted() {
      this.loadLayers()
    },
    methods: {
      addLayer(layerTypeId) { // This really should not be here but hey ho

        let layerDetail = this.$store.getters.layerType(layerTypeId)
        let componentType = layerDetail.component

        this.$store.dispatch('setAddingLayer')
        this.$store.dispatch('setAddingLayerType', componentType)
        this.addingLayer = true
        console.log('Ah you want to add', componentType)
      },
      cancelAddLayer() {
        this.$store.dispatch('cancelAddingLayer')
        this.addingLayer = false
        this.layerName = ''
      },
      saveLayer() {
        console.log('Saving ', this.$store.state.addingLayer)
        this.$store.dispatch('saveLayer', this.$store.state.addingLayer).then(() => {
          this.loadLayers()
          this.$store.dispatch('cancelAddingLayer')
          this.addingLayer = false
          this.layerName = ''
        })
      },
      loadLayers() {
        this.$store.dispatch('loadLayers')
      },
    },
    watch: {
      layerName(layerName) {
        this.$store.dispatch('setLayerName', layerName)
      },
      activeColour(colour) {
        this.$store.dispatch('setActiveColour', colour)

      }
    }
  }
</script>

<style scoped>

</style>