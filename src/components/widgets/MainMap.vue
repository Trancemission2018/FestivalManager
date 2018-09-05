<template>

    <div
            v-on:keyup.esc="undoPoint"
    >
        <v-tabs
                v-model="activeTab"
                light
                slider-color="teal"
        >
            <v-tab
                    v-for="section in $store.state.sections"
                    :key="section.name"
                    :ripple="false"
            >
                {{ section.name }}
            </v-tab>
        </v-tabs>

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
                :editable="true"
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

            <!--
            <l-polygon
                    v-for="layer in $store.getters.polygons"
                    :key="layer._id"
                    :lat-lngs="layer.data.points"
                    :color="layer.data.colour"
                    :fillColor="layer.data.colour"
                    @click="selectLayer(layer)"
                    :weight="$store.getters.strokeWeight(layer)"
                    :draggable="true"
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
            </l-polyline>
                        -->

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

  require('leaflet-hotline/dist/leaflet.hotline')
  require('leaflet.path.drag')
  require('../../Leaflet.Editable')

  import {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LPolygon,
    LTooltip,
    LPopup,
    LIconDefault,
    LCircleMarker
  } from 'vue2-leaflet'

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
      LIconDefault,
      LCircleMarker
    },
    props: [],
    data() {
      return {
        tooltipOptions: {
          permanent: true,
          direction: 'center',
        },
        activeTab: 0,
        addedMarker: false,
        glasto: {
          lat: 51.15271479940974,
          lng: -2.6097464561462402
        },
        marker: {
          lat: 51.15271479940974,
          lng: -2.6097464561462402
        },
        "hotline": [
          [
            51.149499607732,
            -2.5778259311664153,
            0
          ],
          [51.15088093939987,
            -2.576794012616706,
            15
          ],
          [51.15103572673043,
            -2.5767189304888305,
            25
          ],
          [51.15125781199356,
            -2.5763381568402592,
            37
          ],
          [51.15139240860256,
            -2.576268437721521,
            10
          ],
          [51.15150345050945,
            -2.576322067812869,
            50
          ],
          [51.151698614425555,
            -2.576418601977291,
            65
          ],
          [51.1517659121363,
            -2.5765312251691235,
            100
          ],
          [51.15186685851837,
            -2.5775823749595133,
            58
          ],
          [51.15192742624161,
            -2.5778290733797053,
            40
          ],
          [51.15223026366542,
            -2.5787032438686412,
            20
          ],
          [51.152324479347506,
            -2.578837319097021,
            10
          ]
        ],
        editLayer: {
          id: '',
          name: '',
          section: '',
          type: ''
        }
      }
    },
    mounted() {
      L.hotline(this.hotline, {min: 1, max: 100, weight: 5, outlineWidth: 0}).addTo(this.$refs.mainMap.mapObject)
      this.loadLayers().then(() => {
        this.$store.getters.polygons.map(polyData => {
          let thisPoly = []
          polyData.data.points.map(point => {
            thisPoly.push([
              point.lat,
              point.lng
            ])
          })
          let thisLayer = L.polygon(thisPoly, {
            color: polyData.data.colour
          }).addTo(this.$refs.mainMap.mapObject, {draggable: true})
              .addTo(this.$refs.mainMap.mapObject)
          thisLayer.id = polyData._id
          thisLayer.on('dragend', this.dragPolyEnd)
          thisLayer.on('dragstart', this.dragPolyStart)
          thisLayer.on('drag', this.draggingPoly)
          thisLayer.on('click', this.layerClick)
          this.$store.dispatch('addLayerToMap', thisLayer)
        })
      })
      this.$store.state.mappedLayers.forEach(layer => {
        let weight = 0
        setInterval(() => {
          layer.setStyle({
            weight: weight
          })
        })
        if (weight <= 7) {
          weight++
        } else if (weight === 8) {
          weight--
        }
      }, 100)

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
      layerClick(layer) {
        this.$store.state.mappedLayers.map(layer => {
          layer.dragging.disable() // And also reset the color?
          layer.setStyle({
            color: 'green'
          })
        })
        if (layer.originalEvent.ctrlKey) {
          alert("ctr key was pressed during the click")
        }
        console.log('Layer id', layer.target.id)
        layer.target.setStyle({color: 'red'})
        layer.target.dragging.enable()
        layer.target.enableEdit()

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
      dragPolyEnd(ev) {
        console.log('Done dragging?', ev)
      },
      dragPolyStart(ev) {
        console.log('Start dragging?', ev)
      },
      draggingPoly(ev) {
        console.log('Are dragging?', ev)
      },
      deleteLayer() {
        if (confirm('Really?')) {
          console.log('Ok delete', this.editLayer.id)

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
      getRandomColor() {
        var letters = '0123456789ABCDEF'
        var color = '#'
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
        return color
      },
      dragEnd(e) {
        this.$store.dispatch('setMarkerPoint', e.target._latlng)
      },
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