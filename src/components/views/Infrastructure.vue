<template>
    <v-container fluid class="mt-2">

        <v-flex>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline mb-2 mt-0">Water</div>

                    </div>
                </v-card-title>
                <v-card-content>
                    <div class="p-2">
                        <v-layout row wrap fluid>
                            <v-flex xs2
                                    v-for="(sensor, idx) in sensors"
                                    :key="idx"
                                    @click="selectSensor(sensor)"
                                    class="text-xs-center"
                            >

                                <v-progress-circular
                                        :value="sensor.percent"
                                        :size="45"
                                        :color="sensor.color"
                                >
                                    <strong>
                                        {{ sensor.value }}
                                    </strong>
                                </v-progress-circular>
                                <br/>
                                <div class=" mt-1"
                                     :class="sensor.cssClass"
                                >

                                    {{ sensor.name }}
                                </div>
                            </v-flex>
                            <v-flex xs6>
                                <table width="100%" class="sensor-table">
                                    <thead>
                                    <tr>
                                        <td><strong>Location</strong></td>
                                        <td><strong>Value</strong></td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Bushy Ground</td>
                                        <td>34</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </v-flex>
                        </v-layout>
                    </div>
                </v-card-content>

                <v-card-actions>
                    <v-btn flat color="blue">Share</v-btn>
                    <v-btn flat color="blue">Explore</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-container>

</template>

<script>
  export default {
    name: "Infrastructure",
    data() {
      return {
        sensors: [
          {
            name: 'Min Pressure (psi)',
            value: 28,
            percent: 20,
            color: 'orange',
            cssClass: 'orange--text'
          },
          {
            name: 'Avg Pressure (psi)',
            value: 63,
            percent: 40,
            color: 'green',
            cssClass: 'green--text'
          },

          {
            name: 'Max Pressure (psi)',
            value: 78,
            percent: 60,
            color: 'red',
            cssClass: 'red--text'
          },
        ]
      }
    },
    methods: {
      selectSensor(sensor){
        console.log(sensor)
      }
    }
  }
</script>

<style scoped>

    .water-panel {
        border: #2196F3 solid 2px;
        border-radius: 15px;
    }

    .sensor-table {
        border: grey solid 1px;
        padding: 2px;

    }
    .top-border {
        border-top: solid #dd0000 2px;
        border-radius: 15px
    }

</style>