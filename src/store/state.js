export default {

  currentMap: {
    position: {
      lat: 0,
      long: 0
    },
    tileUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', // This has the fields innit!!!!!!!
    tileUrlOSM: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', // This has the fields innit!!!!!!!
    currentSat: 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
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
  mapTabs: [
    {
      name: 'Security',
      component: 'security'
    },
    {
      name: 'Traffic',
      component: 'traffic'
    },
    {
      name: 'Water'
    },
    {
      name: 'Electricity'
    },
    {
      name: 'Stages'
    },
    {
      name: 'Production'
    },
  ],
}
