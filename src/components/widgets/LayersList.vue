<template>

    <div grid-list-md>
        <v-layout row wrap align-center
                  v-for="(layer, id) in $store.state.currentMap.layers"
                  :class="{'teal' : layer._id === $store.state.currentMap.activeLayerId}"
                  :key="id._id"
                  @click=""
        >
            <v-flex xs1>
                <v-icon>directions_car</v-icon>
            </v-flex>
            <v-flex xs-10>
                {{ layer.data.layerName }}
            </v-flex>
            <v-flex xs1>
                <v-icon @click="deleteLayer(layer) ">delete</v-icon>
            </v-flex>
        </v-layout>
    </div>

</template>

<script>
  import DialogConfirm from "./DialogConfirm"
  export default {
    name: "layers-list",
    components: {DialogConfirm},
    props: [],
    data() {
      return {}
    },
    created() {

    },
    methods: {
      deleteLayer(layer) {
        if(confirm(`Are you sure you wish to delete ${layer.data.layerName}?`)){
          this.$store.dispatch('deleteLayer', layer).then(response => {

          })
        }
      }
    }
  }
</script>

<style scoped>

</style>