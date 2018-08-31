export default {

  currentMap: {
    position: {
      lat: 0,
      long: 0
    },
    tileUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', // This has the fields innit!!!!!!!
    tileUrlOSM: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', // This has the fields innit!!!!!!!
    tileUrlSat: 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    zoom: 5,
    lines: [],
    layers: [],
    activeLayerId: '',
  },
  glasto: {
    lat: 51.15271479940974,
    lng: -2.6097464561462402
  },
  addingLayer: { // TODO - This is default - move to config.
    active: false,
    section: 2,
    layerType: null,
    layerName: '',
    points: [],
    iconUrl: 'https://image.flaticon.com/icons/svg/1051/1051093.svg',
    markerPoint: {
      lat: 51.15271479940974,
      lng: -2.6097464561462402
    },
    colour: '#000000',
    draggable: false
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
  activeSection: 0,
  mapIcons: [
    {
      name: 'Stage',
      url: 'https://image.flaticon.com/icons/svg/1051/1051093.svg'
    },
    {
      name: 'Campsite',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Legenda_pole_namiotowe.svg/1000px-Legenda_pole_namiotowe.svg.png'
    }
  ]
}
