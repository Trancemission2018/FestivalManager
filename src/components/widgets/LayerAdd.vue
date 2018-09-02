<template>
    <div>
        <v-container
                v-if="$store.state.addingLayer.layerType==='marker'"
                v-bind="{ [`grid-list-${size}`]: true }"
                fluid>
            <v-layout row wrap>
                <v-flex
                        v-for="(icon,idx) in $store.state.mapIcons"
                        :key="idx"
                        xs2
                        @click="setIconUrl(icon.url)"
                >
                    <v-card flat tile>
                        <img
                                :src="icon.url"
                                height="50px"
                        />
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-layout row wrap>
            <v-flex xs3>

                <v-chip
                        v-for="(colour, idx) in $store.state.colourPresets"
                        :key="idx"
                        small
                        :color="colour"
                        text-color="white"
                        @click="selectColor(colour)"
                >{{ colour }}
                </v-chip>
            </v-flex>
        </v-layout>
        <v-card>
            <v-layout class="pa-2 text-xs-center" align-center>
                <v-flex xs5>
                    <v-text-field
                            label="Name"
                            v-model="layerName"
                    ></v-text-field>
                </v-flex>
                <v-flex xs2 class="p-4">
                    <input type="color" v-model="activeColour"/>
                </v-flex>
                <v-flex
                        xs4 class="m-4"
                        @click="addPresetColour"

                >
                    <v-btn small>Save Preset</v-btn>
                </v-flex>
                <v-flex xs3 class="m-4">
                    <input type="number" v-model="strokeWidth"/>
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
      strokeWidth: 3,
      size: 'sm',
      items: [
        {text: 'Extra small (2px)', value: 'xs'},
        {text: 'Small (4px)', value: 'sm'},
        {text: 'Medium (8px)', value: 'md'},
        {text: 'Large (16px)', value: 'lg'},
        {text: 'Extra large (24px)', value: 'xl'}
      ]

    }),
    mounted() {
      this.activeColour = this.$store.getters.activeTab.layerColour
      let savedPresets = JSON.parse(localStorage.getItem(('presetColours')))
      if (savedPresets) {
        this.$store.dispatch('setPresetColours', savedPresets)
      }
    },
    methods: {
      setIconUrl(url) {
        this.$store.dispatch('setIconUrl', url)
      },
      selectColor(colour) {
        this.activeColour = colour
      },
      addPresetColour() {
        this.$store.dispatch('addPresetColour', this.activeColour).then(() => {
          localStorage.setItem('presetColours', JSON.stringify(this.$store.state.colourPresets))
        })
      },
    },
    watch: {
      layerName(layerName) {
        this.$store.dispatch('setLayerName', layerName)
      },
      activeColour(colour) {
        this.$store.dispatch('setActiveColour', colour)
      },
      strokeWidth(strokeWidth) {
        console.log('Dispatching')
        this.$store.dispatch('setStrokeWidth', parseInt(strokeWidth))
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>