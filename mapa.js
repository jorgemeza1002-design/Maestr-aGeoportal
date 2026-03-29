window.onload = init;

function init() {
  const osm = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  const wms = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'https://geoserver.idesinde.com:8443/geoserver/Meza/wms',
      params: {
        'LAYERS': 'Meza:Meza',
        'TILED': true,
        'FORMAT': 'image/png',
        'TRANSPARENT': true
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    })
  });

  const map = new ol.Map({
    target: 'js-map',
    layers: [osm, wms],
    view: new ol.View({
      center: ol.proj.fromLonLat([-78.5, -0.2]),
      zoom: 10
    }),
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine()
    ])
  });

  map.on('pointermove', function(evt) {
    const coord = ol.proj.toLonLat(evt.coordinate);
    const box = document.getElementById('coordBox');
    if (box) {
      box.textContent =
        'Lat: ' + coord[1].toFixed(6) +
        ' | Long: ' + coord[0].toFixed(6);
    }
  });

  setTimeout(function () {
    map.updateSize();
  }, 400);
}
