<template>

    <div
            v-on:keyup.esc="undoPoint"
    >

        <v-toolbar light>
            <v-toolbar-side-icon></v-toolbar-side-icon>

            <v-toolbar-title class="black--text">Festival Manager</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>apps</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>refresh</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>

        <l-map
                :style="mapHeight"
                ref="mainMap"
                :zoom="14"
                :center="glasto"
                @click="mapClick"
        >

            <l-tile-layer :url="$store.state.currentMap.tileUrl"></l-tile-layer>

            <l-polyline
                    v-if="$store.state.addingLayer.layerType==='polyline'"
                    :lat-lngs="$store.state.addingLayer.points"
                    :color="$store.state.addingLayer.colour"
            />

            <l-polygon
                    v-if="$store.state.addingLayer.layerType==='polygon'"
                    :lat-lngs="$store.state.addingLayer.points"
                    :color="$store.state.addingLayer.colour"
                    :fillColor="$store.state.addingLayer.colour"
            >
            </l-polygon>

            <l-marker
                    v-if="$store.state.addingLayer.layerType==='marker'"
                    :lat-lng="marker"
                    :draggable="true"
                    :icon="icon"
            >
            </l-marker>

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
                        :content="`<i class='fas fa-car fa-3x'></i><br />${layer.data.layerName}`"
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
                        v-if="layer.data.points.length > 2"
                        :content="layer.data.layerName"
                        :options="tooltipOptions"></l-tooltip>
            </l-polyline>

            <l-marker
                    v-for="layer in $store.getters.markers"
                    :key="layer._id"
                    :lat-lng="layer.data.markerPoint"
                    @click="selectLayer(layer)"
                    :draggable="layer.data.draggable"
                    :icon="icon"
            >
            </l-marker>

        </l-map>
    </div>

</template>
<script>

  import {LMap, LTileLayer, LMarker, LPolyline, LPolygon, LTooltip, LPopup, LIconDefault} from 'vue2-leaflet'

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
      }
    },
    mounted() {
      this.loadLayers().then(() => {
        this.$refs.mainMap.mapObject.eachLayer(layer => {
        })
      })
    },
    computed: {
      icon() {
        return L.icon({
          // iconUrl: 'https://pbs.twimg.com/profile_images/3349328829/638023434c36eaeba1387e9744a2876f.jpeg',
          iconUrl: 'https://image.flaticon.com/icons/svg/1051/1051093.svg',
          // iconUrl: '../../assets/logo.png',mapIcon
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
          // TODO move to db?
          let coords = JSON.parse(localStorage.getItem('mapCentre'))
          return L.latLng(coords.lat, coords.lng)
        }
      },
      currentZoom() {
        if (localStorage.getItem('mapZoom')) {
          return JSON.parse(localStorage.getItem('mapZoom'))
        }
      },
      iconTest() {
        return L.icon({
          iconUrl: 'https://avatars0.githubusercontent.com/u/3602272?s=88&v=4',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        })
      },
    },
    methods: {
      selectLayer(layer) {
        layer.data.draggable = true
        this.$store.dispatch('setActiveLayer', layer._id)
      },
      polygonCentre(coords) {
      },
      undoPoint(event) {
        this.$store.dispatch('undoPointToLayer', event.latlng)
      },
      mapClick(event) {
        switch (this.$store.state.addingLayer.layerType) {
          case 'marker':
            if (!this.addedMarker) {
              this.marker = event.latlng
            }else{
              this.addedMarker = true
            }
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
      getCentre(arr) {
        let twoTimesSignedArea = 0
        let cxTimes6SignedArea = 0
        let cyTimes6SignedArea = 0

        let length = arr.length

        let x = function (i) {
          return arr[i % length][0]
        }
        let y = function (i) {
          return arr[i % length][1]
        }

        for (let i = 0; i < arr.length; i++) {
          let twoSA = x(i) * y(i + 1) - x(i + 1) * y(i)
          twoTimesSignedArea += twoSA
          cxTimes6SignedArea += (x(i) + x(i + 1)) * twoSA
          cyTimes6SignedArea += (y(i) + y(i + 1)) * twoSA
        }
        let sixSignedArea = 3 * twoTimesSignedArea
        return [cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea]
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

    .crosshair-cursor-enabled {
        cursor: crosshair;
    }

</style>