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
                    >
                        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                        <l-marker :lat-lng="marker"></l-marker>
                        <l-polyline :lat-lngs="$store.state.currentMap.addingLine.points" color="#3e3e3e"
                        />
                    </l-map>
                </div>
            </v-flex>
            <v-flex>
                <div v-if="$store.state.currentMap.addingLine.active">
                    Adding Line
                    <v-btn @click="saveAddingLine">Save</v-btn>
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
      mapCentre() {
        return L.latLng(this.$store.state.currentMap.position.lat, this.$store.state.currentMap.position.long)
      },
      currentZoom() {
        return this.$store.state.currentMap.zoom
      }
    },
    mounted(){
      console.log('Mounted', this.$store.state.currentMap.addingLine.active)

    },
    methods: {
      addLine() {
        console.log('Adding line')
        this.$store.commit('TOGGLE_ADDING_LINE')
        console.log('We have tiggled')
      },
      saveAddingLine() {

      },
      cancelAddingLine() {
        this.$store.commit('CANCEL_ADDING_LINE')
      },
      mapClick(event) {
        switch (this.$store.state.currentMap.addingLine.active) {
          case true:
            this.$store.commit('ADD_POINT', event.latlng)
            break
        }
      },
      saveCentre() {
        this.$store.commit('SET_MAP_CENTRE', this.$refs.mainMap.mapObject.getCenter())
        this.$store.commit('SET_MAP_ZOOM', this.$refs.mainMap.mapObject.getZoom())
      }
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.3/leaflet.css'); /* TODO host locally */
</style>
