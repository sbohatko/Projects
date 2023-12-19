/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1Ijoic2JvZ2F0a28iLCJhIjoiY2tzd2FwZG5pMXk0ZTJ5bjF1aWJ3ZGd4NCJ9.hK8MWfD9mrcbI9RGvHohBA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/sbogatko/ckswb43cn6x9617qhixi2gqpt',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();
locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  //Add Marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //Add popup
  new mapboxgl.Popup({ offset: 30 })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>День ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  //Extends map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});

