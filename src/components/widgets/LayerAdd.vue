<template>
    <div>
        <v-layout>
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
    methods: {},
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