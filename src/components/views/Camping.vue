<template>
    <div>
        <v-card
                color="grey lighten-4"
                flat
                tile
        >
            <section-add-buttons :section="section"/>
            <v-content class="pa-2 text-xs-left">
                <layers-list
                        v-if="!$store.state.addingLayer.active"
                        :section="section"
                />
                <layer-add v-if="$store.state.addingLayer.active"/>
            </v-content>
        </v-card>
    </div>
</template>

<script>
  import LayersList from "../widgets/LayersList"
  import LayerAdd from "../widgets/LayerAdd"
  import SectionAddButtons from "../widgets/SectionAddButtons"

  export default {
    name: "",
    components: {SectionAddButtons, LayerAdd, LayersList},
    props: ['section'],
    mounted() {
      console.log('Hello section', this.section)
    },
    methods: {},
  }
</script>