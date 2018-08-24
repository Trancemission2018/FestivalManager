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
                            v-for="tab in $store.state.mapTabs"
                            :key="tab.name"
                            ripple
                    >
                        {{ tab.name }}
                    </v-tab>
                    <v-tab-item
                            v-for="tab in $store.state.mapTabs"
                            :key="tab.name"
                    >
                        <v-card flat>
                            <component :is="tab.component"></component>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
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
        console.log('tab is now', this.activeTab)

      }
    }
  }
</script>
