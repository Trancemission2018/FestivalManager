<template>
    <div fluid>
        <v-layout>
            <v-flex xs8 class="text-xs-center">
                <main-map/>
            </v-flex>
            <v-flex class="pa-2">
                <v-tabs
                        v-model="activeTab"
                        color="white"
                        dark
                        slider-color="blue"
                >
                    <v-tab
                            v-for="section in $store.state.sections"
                            :key="section.name"
                            ripple
                    >
                        {{ section.name }}
                    </v-tab>
                    <v-tab-item
                            v-for="section in $store.state.sections"
                            :key="section.name"
                    >
                        <v-card flat>
                            <component :is="section.component" :section="section"></component>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <v-btn @click="saveAll">Save All</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
  import Security from './views/Security'
  import Traffic from './views/Traffic'
  import MainMap from "./widgets/MainMap"

  export default {
    name: 'example',
    components: {
      MainMap,
      Security,
      Traffic,
    },
    data: () => ({
      activeTab: null,
    }),
    watch: {
      activeTab() {
        this.$store.dispatch('setActiveSection', this.activeTab)
      }
    },
    methods: {
      saveAll() {
        this.$refs.mainMap.mapObject.eachLayer(layer => {
          console.log('Please save this layer', layer)
        })
      }
    }
  }
</script>
