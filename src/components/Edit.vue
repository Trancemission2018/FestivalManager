<template>
    <div fluid>
        <v-layout>
            <v-flex xs8 class="tex-xs-center">
                <main-map/>
            </v-flex>
            <v-flex xs4 class="pa-2">
                <v-tabs
                        v-model="activeTab"
                        light
                        slider-color="teal"
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
                            <component :is="section.component" :section="section"></component>
                    </v-tab-item>
                </v-tabs>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
  import Security from './views/Security'
  import Traffic from './views/Traffic'
  import Camping from './views/Camping.vue'
  import MainMap from "./widgets/MainMap"

  export default {
    name: 'example',
    components: {
      MainMap,
      Security,
      Traffic,
      Camping
    },
    data: () => ({
      activeTab: null,
    }),
    watch: {
      activeTab() {
        // Staic mapping - it works :/
        let sectionName = ''
        switch (this.activeTab) {
          case 0:
            sectionName = 'Security'
            break;

        }
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

<style>
    .aLink {
        cursor: pointer;
    }
</style>
