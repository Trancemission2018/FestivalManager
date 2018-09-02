<template>

    <div grid-list-md>
        <v-layout row wrap align-center
                  v-for="(layer, id) in $store.getters.layersBySection()"
                  class="pa-1"
                  :class="{'teal' : layer._id === $store.state.currentMap.activeLayerId}"
                  :key="id._id"
                  @click="selectLayer(layer)"
        >

            <v-flex xs-10
                    class="aLink"
            >
                <div
                >
                    {{ layer.data.layerName }}
                </div>
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
      return {
          name: ''
      }
    },
    created() {

    },
    methods: {
      deleteLayer(layer) {
        if (confirm(`Are you sure you wish to delete ${layer.data.layerName}?`)) {
          this.$store.dispatch('deleteLayer', layer).then(response => {

          })
        }
      },
      selectLayer(layer) {
        layer.data.draggable = true
        this.$store.dispatch('setActiveLayer', layer._id)
      },

    }
  }
</script>

<style scoped>

    .aLink {
        cursor: pointer;
    }

</style>