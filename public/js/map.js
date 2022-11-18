function initMap() {
  var locs=[];
    $.get('/pages/map-location', function(data, status) {
      for (let index = 0; index < data.locations.length; index++) {
        const element = data.locations[index];
        locs.push({lat:element.lat, lng:element.lng});
      }
      
      var map = new google.maps.Map(document.getElementById('map'),{
        zoom: 10,
        center: locs[0],
      });
      
      locs.forEach(marker => {
        new google.maps.Marker({
          position: marker,
          map: map
        });
      });
    });
  }