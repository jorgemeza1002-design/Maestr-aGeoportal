window.onload = init;

function init() {
  const target = document.getElementById('js-map');
  if (!target || typeof ol === 'undefined') return;

  const map = new ol.Map({
    target: 'js-map',
    view: new ol.View({
      center: ol.proj.transform([-78.5, -0.25], 'EPSG:4326', 'EPSG:3857'),
      zoom: 8
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine()
    ])
  });

  const geoserver = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'https://geoserver.idesinde.com:8443/geoserver/ows?',
      params: {
        LAYERS: 'Meza:Meza',
        FORMAT: 'image/png',
        TRANSPARENT: true
      },
      attributions: '<a href="https://geoserver.idesinde.com:8443/geoserver/web/" target="_blank" rel="noopener noreferrer">GeoServer IDESINDE</a>',
      crossOrigin: 'anonymous'
    })
  });

  map.addLayer(geoserver);

  map.on('pointermove', function(evt) {
    const coord = ol.proj.toLonLat(evt.coordinate);
    const box = document.getElementById('coordBox');
    if (box) {
      box.textContent =
        'Lat: ' + coord[1].toFixed(6) +
        ' | Long: ' + coord[0].toFixed(6);
    }
  });

  setTimeout(() => {
    map.updateSize();
  }, 400);
}
