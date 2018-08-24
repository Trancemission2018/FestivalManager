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
    section: 0,
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
  sections: [
    {
      name: 'Security',
      component: 'security',
      layerColour: '#000000',
      layerTypes: [
        {
          type: 'polyline',
          name: 'Fence',
          colour: '#000000'
        },
        {
          type: 'polygon',
          name: 'Zone',
          colour: '#000000'
        },
        {
          type: 'marker',
          name: 'Checkpoint',
          colour: '#000000'
        }
      ]
    },
    {
      name: 'Traffic',
      component: 'traffic',
      layerColour: '#FFEE58',
      layerTypes: [
        {
          type: 'polyline',
          name: 'Route',
          colour: '#000000'
        },
        {
          type: 'polygon',
          name: 'Car Park',
          colour: '#000000'
        },
        {
          type: 'marker',
          name: 'Entrance / Exit',
          colour: '#000000'
        }
      ]
    },
    {
      name: 'Water',
      layerColour: '#03A9F4'
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
  activeSection: 0
}
