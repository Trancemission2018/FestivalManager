<template>

    <div
            v-on:keyup.esc="undoPoint"
    >

        <l-map
                :style="mapHeight"
                ref="mainMap"
                :zoom="currentZoom"
                :center="mapCentre"
                @click="mapClick"
        >
            <l-tile-layer :url="$store.state.currentMap.tileUrl"></l-tile-layer>
            <l-marker
                    v-if="$store.state.addingLayer.layerType==='marker'"
                    :lat-lng="marker"
                    :icon="mapIcon"
            >

            </l-marker>
            <l-polyline
                    v-if="$store.state.addingLayer.layerType==='polyline'"
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
            </l-polygon>

            <l-polygon
                    v-for="layer in $store.getters.polygons"
                    :key="layer._id"
                    :lat-lngs="layer.data.points"
                    :color="layer.data.colour"
                    :fillColor="layer.data.colour"
                    @click="selectLayer(layer)"
                    :weight="3"
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

</template>
<script>

  import {LMap, LTileLayer, LMarker, LPolyline, LPolygon, LTooltip, LPopup} from 'vue2-leaflet'

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
    },
    props: [],
    data() {
      return {
        tooltipOptions: {
          permanent: true,
          direction: 'center'
        },
      }
    },
    mounted() {
      this.loadLayers()
    },
    computed: {
      mapHeight() {
        let windowHeight = window.innerHeight
        return `height: ${windowHeight}px`
      },
      mapCentre() {
        if (localStorage.getItem('mapCentre')) {
          let coords = JSON.parse(localStorage.getItem('mapCentre'))
          return L.latLng(coords.lat, coords.lng)
        }
      },
      currentZoom() {
        if (localStorage.getItem('mapZoom')) {
          return JSON.parse(localStorage.getItem('mapZoom'))
        }
      }
    },
    methods: {
      selectLayer(layer) {
        this.$store.dispatch('setActiveLayer', layer._id)
      },
      undoPoint(event) {
        this.$store.dispatch('undoPointToLayer', event.latlng)
      },
      mapClick(event) {
        switch (this.$store.state.addingLayer.active) {
          case true:
            this.$store.dispatch('addPointToLayer', event.latlng)
            break
        }
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

      }
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

    .crosshair-cursor-enabled {
        cursor: crosshair;
    }

</style>