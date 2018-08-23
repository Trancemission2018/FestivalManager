export default {

  currentMap: {
    position: {
      lat: 0,
      long: 0
    },
    zoom: 5,
    lines: [],
    layers: [],
    activeLayerId: '',
  },
  addingLayer: {
    active: false,
    layerType: null,
    points: [],
    colour: '#000000'
  },
  layerTypes: [
    {
      id: 1,
      type: 'Line',
      component: 'polyline'
    },
    {
      id: 2,
      type: 'Area',
      component: 'polygon'
    },
    {
      id: 3,
      type: 'Marker',
      component: 'marker'
    },
  ],
}
