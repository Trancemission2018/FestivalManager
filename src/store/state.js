export default {

  currentMap: {
    position: {
      lat: 0,
      long: 0
    },
    tileUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', // This has the fields innit!!!!!!!
    tileUrlOSM: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', // This has the fields innit!!!!!!!
    tileUrlSat: 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    tileLayers: [
      'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      ''
    ],
    activeTile: 0,
    zoom: 5,
    lines: [],
    layers: [],
    activeLayerId: '',
  },
  mappedLayers: [],
  glasto: {
    lat: 51.15271479940974,
    lng: -2.6097464561462402
  },
  addingLayer: { // TODO - This is default - move to config.
    active: false,
    section: 0,
    layerType: null,
    layerName: '',
    points: [],
    iconUrl: 'https://image.flaticon.com/icons/svg/1051/1051093.svg',
    markerPoint: {
      lat: 51.15271479940974,
      lng: -2.6097464561462402
    },
    colour: '#000000',
    strokeWidth: 3,
    draggable: false
  },
  editingLayer: {
    active: false
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
        },
        {
          type: 'polygon',
          name: 'Car Park',
        },
        {
          type: 'marker',
          name: 'Entrance / Exit',
        }
      ]
    },
    {
      name: 'Camping',
      layerColour: '#03A9F4',
      component: 'camping',
      layerTypes: [
        {
          type: 'polygon',
          name: 'Public/Pre Booked Camping',
        },
        {
          type: 'polygon',
          name: 'Staff Camping',
        },
      ]
    },
    {
      name: 'Infrastructure',
      component: 'infrastructure'
    },
    {
      name: 'Stages'
    },
    {
      name: 'Production'
    },
  ],
  activeSection: 0,
  sectionTypes: [
     {
      value: 'car_park',
      text: 'Car Park'
    },
    {
      value: 'pedestrian_route',
      text: 'Pedestrian Route'
    },
    {
      value: 'public_camping',
      text: 'Public Camping'
    },
    {
      value: 'crew_camping',
      text: 'Crew Camping'
    },

    {
      value: 'stage',
      text: 'Stage'
    },
    {
      value: 'po_public',
      text: 'No Public Access'
    },
    {
      value: 'out_of_bounds',
      text: 'Out Of Bounds'
    },
  ],
  mapIcons: [
    {
      name: 'Stage',
      url: '/static/icons/stage.svg'
    },
    {
      name: 'Campsite',
      url: '/static/icons/camping.svg'
    },
    {
      name: 'Car',
      url: '/static/icons/car-entrance.svg'
    },
    {
      name: 'Pint',
      url: '/static/icons/pint.svg'
    },
    {
      name: 'Blank',
      url: '/static/icons/blank.png'
    },
  ],
  colourPresets: []
}
