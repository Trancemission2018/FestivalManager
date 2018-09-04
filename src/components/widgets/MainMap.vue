<template>

    <div
            v-on:keyup.esc="undoPoint"
    >

        <div
                v-if="$store.state.editingLayer.active"
                class="pa-2"
        >
            <v-layout row align-center>
                <v-flex xs2>
                    <v-text-field
                            small
                            v-model="editLayer.name"
                            v-on:keyup.enter=""
                    ></v-text-field>
                </v-flex>
                <v-flex xs2>
                    <v-select :items="$store.state.sectionTypes"
                              v-model="editLayer.type"
                              class="zTop"
                              label="Type"/>
                </v-flex>
                <v-flex xs2>
                    <v-select :items="sections"
                              v-model="editLayer.section"
                              class="zTop"
                              label="Section"/>
                </v-flex>
                <v-flex xs4>
                    <v-btn
                            small
                            color="green"
                            @click="updateLayer"
                    >
                        Save
                    </v-btn>
                    <v-btn
                            small
                            color="yellow"
                            @click="$store.dispatch('cancelAddingLayer')"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                            small
                            color="red"
                            @click="deleteLayer(editLayer)"
                    >
                        Delete
                    </v-btn>
                </v-flex>
            </v-layout>

        </div>

        <l-map
                :style="mapHeight"
                ref="mainMap"
                :zoom="15"
                :maxZoom="22"
                :center="$store.state.glasto"
                @click="mapClick"
                @mousemove="mouseMove"
        >

            <l-tile-layer :url="activeTileLayer"></l-tile-layer>

            <l-polyline
                    v-if="$store.state.addingLayer.layerType==='polyline'"
                    :lat-lngs="$store.state.addingLayer.points"
                    :color="$store.state.addingLayer.colour"
                    :weight="$store.state.addingLayer.strokeWidth"
            />

            <l-polygon
                    v-if="$store.state.addingLayer.layerType==='polygon'"
                    :lat-lngs="$store.state.addingLayer.points"
                    :color="$store.state.addingLayer.colour"
                    :fillColor="$store.state.addingLayer.colour"
                    :weight="$store.state.addingLayer.strokeWidth"
            >
            </l-polygon>

            <l-marker
                    v-if="$store.state.addingLayer.layerType==='marker'"
                    :lat-lng="$store.state.addingLayer.markerPoint"
                    :draggable="true"
                    :icon="icon"
                    @dragend="dragEnd"
            >

                <l-tooltip
                        :content="`<div class='markerLabel'>${$store.state.addingLayer.layerName}</div>`"
                        :options="tooltipOptions"></l-tooltip>
            </l-marker>

            <l-polygon
                    v-for="layer in $store.getters.polygons"
                    :key="layer._id"
                    :lat-lngs="layer.data.points"
                    :color="layer.data.colour"
                    :fillColor="layer.data.colour"
                    @click="selectLayer(layer)"
                    :weight="$store.getters.strokeWeight(layer)"
            >
                <l-tooltip
                        v-if="layer.data.points.length > 3"
                        :icontent="`<i class='fas fa-car fa-3x'></i><br />${layer.data.layerName}`"
                        :content="`<div class='tooltip-stage'>${layer.data.layerName}</div>`"
                        :options="tooltipOptions"
                        class="tooltip-stage"
                ></l-tooltip>
            </l-polygon>
            <l-polyline
                    v-for="layer in $store.getters.polylines"
                    :key="layer._id"
                    :lat-lngs="layer.data.points"
                    :color="layer.data.colour"
                    :fillColor="layer.data.colour"
                    @click="selectLayer(layer)"
                    :weight="$store.getters.strokeWeightPath(layer)"
            >
                <!--
                <l-tooltip
                        v-if="layer.data.points.length > 2"
                        :content="layer.data.layerName"
                        :options="tooltipOptions"></l-tooltip>
                        -->
            </l-polyline>

            <l-marker
                    v-for="layer in $store.getters.markers"
                    :key="layer._id"
                    :lat-lng="layer.data.markerPoint"
                    @click="selectLayer(layer)"
                    :draggable="layer.data.draggable"
                    :icon="iconFromUrl(layer.data.iconUrl)"
            >

                <l-tooltip
                        :content="`<div class='markerLabel'>${layer.data.layerName}</div>`"
                        :options="tooltipOptions"></l-tooltip>
            </l-marker>

        </l-map>
    </div>

</template>
<script>

  import {LMap, LTileLayer, LMarker, LPolyline, LPolygon, LTooltip, LPopup, LIconDefault} from 'vue2-leaflet'
  import axios from 'axios'

  export default {
    name: "main-map",
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPolyline,
      LPolygon,
      LTooltip,
      LPopup,
      LIconDefault
    },
    props: [],
    data() {
      return {
        tooltipOptions: {
          permanent: true,
          direction: 'center',
        },
        addedMarker: false,
        glasto: {
          lat: 51.15271479940974,
          lng: -2.6097464561462402
        },
        marker: {
          lat: 51.15271479940974,
          lng: -2.6097464561462402
        },
        editLayer: {
          id: '',
          name: '',
          section: '',
          type: ''
        }
      }
    },
    mounted() {
      this.loadLayers().then(() => {
        this.$refs.mainMap.mapObject.eachLayer(layer => {
        })
      })
    },
    computed: {

      activeTileLayer() {
        return this.$store.state.currentMap.tileLayers[this.$store.state.currentMap.activeTile]
      },
      icon() {
        return L.icon({
          iconUrl: this.$store.state.addingLayer.iconUrl,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        })
      },
      mapHeight() {
        let windowHeight = window.innerHeight
        return `height: ${windowHeight}px`
      },
      sections() {
        let sectionArray = []
        this.$store.state.sections.map((section, idx) => {
          sectionArray.push({
            value: idx,
            text: section.name
          })
        })
        return sectionArray
      }
    },
    getters: {},
    methods: {
      iconFromUrl(iconUrl) {
        return L.icon({
          iconUrl,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        })
      },
      changeTile() {

        if (this.$store.state.currentMap.activeTile === this.$store.state.currentMap.tileLayers.length - 1) {
          this.$store.commit('SET_TILE_LAYER', 0)
        } else {
          let layer = this.$store.state.currentMap.activeTile + 1
          this.$store.commit('SET_TILE_LAYER', layer)
        }
      },
      selectLayer(layer) {
        layer.data.draggable = true
        this.editLayer.name = layer.data.layerName
        this.$store.dispatch('setActiveLayer', layer._id).then(() => {
          console.log('Select drop down', layer.data.section)
          this.editLayer.id = layer._id
          this.editLayer.section = layer.data.section
          this.editLayer.type = layer.data.type
        })
      },
      undoPoint(event) {
        this.$store.dispatch('undoPointToLayer', event.latlng)
      },
      mapClick(event) {
        switch (this.$store.state.addingLayer.layerType) {
          case 'marker':
            this.$store.dispatch('setMarkerPoint', event.latlng)
            break
          default:

            switch (this.$store.state.addingLayer.active) {
              case true:
                this.$store.dispatch('addPointToLayer', event.latlng)
                break
            }
        }
      },
      updateLayer() {
        let layerData = {
          _id: this.$store.state.currentMap.activeLayerId,
          name: this.editLayer.name,
          section: this.editLayer.section,
          type: this.editLayer.type
        }
        this.$store.dispatch('updateLayer', layerData)
      },
      deleteLayer() {
        if (confirm('Really?')) {
          console.log('Ok delete',this.editLayer.id)

          let layerData = {
            id: this.editLayer.id
          }
          this.$store.dispatch('deleteLayer', layerData)
        }
      },
      mouseMove(event) {

        return
        if (this.$store.state.addingLayer.points.length > 1) {

          switch (this.$store.state.addingLayer.layerType) {
            case 'marker':
              this.$store.dispatch('setMarkerPoint', event.latlng)
              break
            default:

              switch (this.$store.state.addingLayer.active) {
                case true:
                  this.$store.dispatch('addPointToLayer', event.latlng)
                  break
              }
          }
        }
      },
      dragEnd(e) {
        this.$store.dispatch('setMarkerPoint', e.target._latlng)
      },
      downloadData() {
        let dataStr = JSON.stringify(this.$store.state)
        let encodedUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
        let link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "data.json")
        link.innerHTML = "Click Here to download"
        document.body.appendChild(link) // Required for FF
        link.click()
        link.remove()
      },
      exportLayers() {
        alert('Disabled')
        return
        this.$store.state.currentMap.layers.map(layer => {
          console.log('Exporting Layer', layer.data)
          axios.post('http://localhost:6969/layer', layer.data).then(response => {
            console.log('Saved layer', response)
          })

        })

      }
    },
    watch: {
      '$store.state.addingLayer.active'() {
        switch (this.$store.state.addingLayer.active) {
          case true:
            L.DomUtil.addClass(this.$refs.mainMap.mapObject._container, 'crosshair-cursor-enabled')
            break
          case false:
            L.DomUtil.removeClass(this.$refs.mainMap.mapObject._container, 'crosshair-cursor-enabled')
            break
        }
      },
    }
  }
</script>

<style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.3/leaflet.css'); /* TODO host locally */

    .leaflet-tooltip {
        font-weight: bold;
        background: none;
        border: none;
        box-shadow: none;
    }

    .tooltip-stage {
        color: #536DFE;
        padding: 5px;
        border-radius: 25px;
    }

    .crosshair-cursor-enabled {
        cursor: crosshair;
    }

    .zTop {
        z-index: 1000;
    }

    .markerLabel {
        margin-top: 62px;
    }

</style>