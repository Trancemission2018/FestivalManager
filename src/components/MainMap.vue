<template>
    <div fluid v-on:keyup.esc="undoPoint">
        <v-layout>
            <v-flex xs8 class="text-xs-center">
                <div
                >
                    <l-map
                            :style="mapHeight"
                            ref="mainMap"
                            :zoom="currentZoom"
                            :center="mapCentre"
                            @click="mapClick"
                    >
                        <l-tile-layer :url="currentTile" :attribution="attribution"></l-tile-layer>
                        <l-marker
                                :lat-lng="marker"
                                :icon="mapIcon"
                        >

                        </l-marker>
                        <l-polyline
                                v-if="$store.state.addingLayer.layerType==='polyline'"
                                v-for="layer in $store.getters.polygons"
                                :lat-lngs="$store.state.addingLayer.points"
                                :color="$store.state.addingLayer.colour"
                        />
                        <l-polygon
                                v-if="$store.state.addingLayer.layerType==='polygon'"
                                @click="selectLayer(123)"
                                :lat-lngs="$store.state.addingLayer.points"
                                :color="$store.state.addingLayer.colour"
                                :fillColor="$store.state.addingLayer.colour"
                        >
                            <l-tooltip
                                    v-if="$store.state.addingLayer.points.length > 3"
                                    :content="$store.state.addingLayer.layerName" :options="tooltipOptions"></l-tooltip>
                        </l-polygon>

                        <!-- v-for="layer in $store.state.currentMap.layers" -->
                        <l-polygon
                                v-for="layer in $store.getters.polygons"
                                :key="layer._id"
                                :lat-lngs="layer.data.points"
                                :color="layer.data.colour"
                                :fillColor="layer.data.colour"
                                @click="selectLayer(layer)"
                                :weight="1"
                        >
                            <l-tooltip
                                    v-if="layer.data.points.length > 3"
                                    :content="layer.data.layerName"
                                    :options="tooltipOptions"></l-tooltip>
                        </l-polygon>
                        <l-polyline
                                v-for="layer in $store.getters.polylines"
                                :key="layer._id"
                                :lat-lngs="layer.data.points"
                                :color="layer.data.colour"
                                :fillColor="layer.data.colour"
                                @click="selectLayer(layer)"
                                :weight="1"
                        >
                            <l-tooltip
                                    v-if="layer.data.points.length > 3"
                                    :content="layer.data.layerName"
                                    :options="tooltipOptions"></l-tooltip>
                        </l-polyline>

                    </l-map>

                </div>
            </v-flex>
            <v-flex class="pa-2">
                <v-layout row align-center>
                    <v-flex xs1>
                        Map
                    </v-flex>
                    <v-flex xs1>
                        <v-switch
                                v-model="selectedTile"
                        ></v-switch>
                    </v-flex>
                    <v-flex xs1>
                        Sat
                    </v-flex>
                </v-layout>
                <v-tabs
                        v-model="activeTab"
                        color="white"
                        dark
                        slider-color="blue"
                >
                    <v-tab
                            v-for="tab in tabs"
                            :key="tab.name"
                            ripple
                    >
                        {{ tab.name }}

                    </v-tab>
                    <v-tab-item
                            v-for="tab in tabs"
                            :key="tab.name"
                    >
                        <v-card flat>
                            <component :is="tab.component"></component>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
                <div v-if="this.addingLine.active">
                    <v-layout>
                        <v-flex xs6>
                            <v-text-field
                                    label="Name"
                                    v-model="addingLine.name"
                            ></v-text-field>
                        </v-flex>


                    </v-layout>
                    <v-layout>
                        <v-flex xs4>
                            <v-btn @click="undoPoint">Undo</v-btn>
                        </v-flex>
                        <v-flex xs4>
                            <v-btn @click="saveAddingLine">Save</v-btn>
                        </v-flex>
                        <v-flex xs4>
                            <v-btn @click="cancelAddingLine">Cancel</v-btn>
                        </v-flex>
                    </v-layout>
                </div>

            </v-flex>
        </v-layout>
    </div>
</template>
<script>
  import {LMap, LTileLayer, LMarker, LPolyline, LPolygon, LTooltip, LPopup} from 'vue2-leaflet'
  import Security from './views/Security'
  import Traffic from './views/Traffic'

  export default {
    name: 'example',
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPolyline,
      LPolygon,
      LTooltip,
      LPopup,
      Security,
      Traffic,
    },
    data: () => ({
      tooltipOptions: {
        permanent: true,
        direction: 'center'
      },
      polyOptions: {
        id: 12333,
        weight: 6,
      },
      addingLine: {
        active: false,
        name: '',
        type: '',
        color: '#000',
        points: [],
      },
      activeTab: null,
      layerTypes: ['line', 'area'],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', // This has the fields innit!!!!!!!
      currentTile: 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapView: true,
      marker: L.latLng(47.413220, -1.219482),
      tabs: [
        {
          name: 'Security',
          component: 'security'
        },
        {
          name: 'Traffic',
          component: 'traffic'
        },
        {
          name: 'Water'
        },
        {
          name: 'Electricity'
        },
        {
          name: 'Stages'
        },
        {
          name: 'Production'
        },
      ],
    }),
    computed: {
      mapLayer() {
        switch (this.mapView) {
          case 'true':
            return this.url
          case 'false':
            return this.satUrl
        }
      },
      mapIcon() {
        return L.icon({
          iconUrl: 'https://avatars0.githubusercontent.com/u/3602272?s=88&v=4',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        })
      },
      mapHeight() {
        let windowHeight = window.innerHeight
        return `height: ${windowHeight}px`
      },
      mapCentre() {
        if (localStorage.getItem('mapCentre')) {
          let coords = JSON.parse(localStorage.getItem('mapCentre'))
          return L.latLng(coords.lat, coords.lng)
        }
        // return JSON.parse(localStorage.getItem('mapCentre'))
      },
      currentZoom() {
        if (localStorage.getItem('mapZoom')) {
          return JSON.parse(localStorage.getItem('mapZoom'))
        }
      }
    },
    mounted() {
    },
    methods: {
      addLine() {
        L.DomUtil.addClass(this.$refs.mainMap.mapObject._container, 'crosshair-cursor-enabled')
      },
      saveAddingLine() {

        this.$store.commit('SAVE_LINE', this.addingLine)
        this.addingLine.points = []

        L.DomUtil.removeClass(this.$refs.mainMap.mapObject._container, 'crosshair-cursor-enabled')
        this.addingLine.active = false
      },
      cancelAddingLine() {
        L.DomUtil.removeClass(this.$refs.mainMap.mapObject._container, 'crosshair-cursor-enabled')
      },
      mapClick(event) {
        switch (this.$store.state.addingLayer.active) {
          case true:
            this.$store.dispatch('addPointToLayer', event.latlng)
            break
        }
      },
      selectLayer(layer) {
        this.$store.dispatch('setActiveLayer', layer._id)
      },
      undoPoint() {
        this.$store.dispatch('undoPointToLayer')
      },
      saveCentre() {

        localStorage.setItem('mapCentre', JSON.stringify(this.$refs.mainMap.mapObject.getCenter()))
        localStorage.setItem('mapZoom', JSON.stringify(this.$refs.mainMap.mapObject.getZoom()))

        this.$store.commit('SET_MAP_CENTRE', this.$refs.mainMap.mapObject.getCenter())
        this.$store.commit('SET_MAP_ZOOM', this.$refs.mainMap.mapObject.getZoom())
      }
    },
    watch: {

      '$store.state.addingLayer.active'() {
        console.log('Here we are agin', this.$store.state.addingLayer.active)
        switch (this.$store.state.addingLayer.active) {
          case true:
            console.log('Adding crosshair, but not working') // TODO <--
            this.addLine()
            L.DomUtil.addClass(this.$refs.mainMap.mapObject._container, 'crosshair-cursor-enabled')
            break
          case false:
            L.DomUtil.removeClass(this.$refs.mainMap.mapObject._container, 'crosshair-cursor-enabled')
            break
        }

      }
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.3/leaflet.css'); /* TODO host locally */
    .crosshair-cursor-enabled {
        cursor: crosshair;
    }

    .leaflet-tooltip {
        font-weight: bold;
        background: #ffffff;
        border: none;
    }

    .leaflet-pane {
        z-index: 1 !important;
    }

    .v-dialog .v-dialog--active {
        z-index: 1000 !important;
    }
</style>
