<template>
    <div>
        <v-card>
            <v-list two-line>
                <template v-for="(icon, index) in $store.state.mapIcons">
                    <v-list-tile
                            :key="index"
                            avatar
                            @click="setIconUrl(icon.url)"
                    >
                        <v-list-tile-avatar>
                            <img :src="icon.url">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-html="icon.name"></v-list-tile-title>
                            <v-list-tile-sub-title v-html=""></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
            <v-layout class="pa-2">
                <v-flex xs8>
                    <v-text-field
                            label="Name"
                            v-model="layerName"
                    ></v-text-field>
                </v-flex>
                <v-flex xs4 class="pt-4 ml-4">
                    <input type="color" v-model="activeColour"/>
                </v-flex>
            </v-layout>

            <v-btn small @click="saveLayer()"> Save</v-btn>

            <v-btn small @click="cancelAddLayer()"> Cancel</v-btn>
        </v-card>


    </div>
</template>

<script>
  export default {
    name: "layer-add",
    components: {},
    props: [],
    data: () => ({
      layerName: '',
      activeColour: '#000000',
    }),
    mounted() {
      this.activeColour = this.$store.getters.activeTab.layerColour
    },
    methods: {
      setIconUrl(url) {
        this.$store.dispatch('setIconUrl', url)
      }
    },
    watch: {
      layerName(layerName) {
        this.$store.dispatch('setLayerName', layerName)
      },
      activeColour(colour) {
        this.$store.dispatch('setActiveColour', colour)
      }
    }
  }
</script>

<style scoped>

</style>