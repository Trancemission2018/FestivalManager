<template>
    <div>
        <v-card
                color="grey lighten-4"
                flat
                tile
        >
            <v-toolbar dense class="mt-2">
                <v-btn small class="active" @click="addLayer(1)">
                    Add Route
                </v-btn>
                <v-btn small  @click="addLayer(2)">
                    Add Car Park
                </v-btn>
                <v-btn small @click="addLayer(3)">
                    Add Entrance / Exit
                </v-btn>
            </v-toolbar>
            <v-content class="pa-2 text-xs-left">
                <layers-list
                        v-if="!$store.state.addingLayer.active"
                        section="traffic"
                />
                <layer-add v-if="$store.state.addingLayer.active"/>
            </v-content>
        </v-card>

    </div>

</template>

<script>
  import LayersList from "../widgets/LayersList"
  import LayerAdd from "../widgets/LayerAdd"

  export default {
    name: "",
    components: {LayerAdd, LayersList},
    props: [],
    mounted() {
    },
    methods: {},
  }
</script>

<style scoped>

</style>