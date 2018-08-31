<template>
    <v-toolbar dense class="mt-2">
        <v-btn
                small
                v-for="(layerType, idx) in section.layerTypes"
                :key="idx"
                @click="addLayer(layerType.type)">
            Add {{layerType.name }}
        </v-btn>
    </v-toolbar>
</template>
<script>
  export default {
    name: 'section-add-buttons',
    props: {
      section: {}
    }
  }
</script>
