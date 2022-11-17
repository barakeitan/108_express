function initMap() {
  var locs=[];
    $.get('/pages/map-location', function(data, status) {
      // locs = [{lat:data.location[0].lat, lng:data[.locatiosn0].lng}, {lat:data[1].lat, lng:data[1].lng}]
      console.log("data is:", data);
      console.log("data.locations is : ", data.locations)
      for (let index = 0; index < data.locations.length; index++) {
        const element = data.locations[index];
        locs.push({lat:element.lat, lng:element.lng});
      }
      console.log("locs[0] : ", locs[0])
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