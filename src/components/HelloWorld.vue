<template>
    <v-container fluid>
        <v-layout>
            <v-flex xs10 class="text-xs-center">
                <div>
                    <l-map
                            style="height: 900px; cursor: crosshair !important;"
                            ref="mainMap"
                            :zoom="currentZoom"
                            :center="mapCentre"
                            @click="mapClick"
                            @mousedown="mouseMove"
                    >
                        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                        <l-marker :lat-lng="marker"></l-marker>
                        <l-polyline :lat-lngs="$store.state.currentMap.activeLine" color="#3e3e3e"
                        />
                    </l-map>
                </div>
            </v-flex>
            <v-flex>
                <div v-if="$store.state.currentMap.addingLine">
                    Adding Line
                    <v-btn @click="cancelAddingLine">Cancel</v-btn>
                </div>
                <v-btn @click="addLine">Add Security Fence</v-btn>
                <v-btn @click="saveCentre">Save Map View</v-btn>

            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  import {LMap, LTileLayer, LMarker, LPolyline} from 'vue2-leaflet'

  export default {
    name: 'example',
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPolyline
    },
    data() {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: L.latLng(47.413220, -1.219482),
      }
    },
    computed: {

      mapWidth() {
        return '100px'
      },
      mapCentre() {
        return L.latLng(this.$store.state.currentMap.position.lat, this.$store.state.currentMap.position.long)
      },
      currentZoom() {
        return this.$store.state.currentMap.zoom
      }
    },
    methods: {
      addLine() {
        this.$store.commit('TOGGLE_ADDING_LINE')
      },
      cancelAddingLine() {
        this.$store.commit('CANCEL_ADDING_LINE')
      },
      mapClick(event) {
        switch (this.$store.state.currentMap.addingLine) {
          case true:
            this.$store.commit('ADD_POINT', event.latlng)
            break
        }
        console.log('You clicked on the map', event)
      },
      mouseMove() {
        console.log('The mouse is moving')

      },
      saveCentre() {
        console.log('This is the mapm centr', this.$refs.mainMap.mapObject.getCenter())

        this.$store.commit('SET_MAP_CENTRE', this.$refs.mainMap.mapObject.getCenter())

        this.$store.commit('SET_MAP_ZOOM', this.$refs.mainMap.mapObject.getZoom())
        console.log('Updated, ', this.$refs.mainMap.mapObject.getZoom())
      }
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.3/leaflet.css');

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
