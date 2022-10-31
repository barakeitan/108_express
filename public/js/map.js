function initMap() {
    var test = {lat: 31.969956418658118, lng: 34.77279792642369}
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: test
    });
    var marker = new google.maps.Marker({
      position: test,
      map: map
    });
  }