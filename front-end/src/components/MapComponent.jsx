import React, { useEffect } from "react";

const MapComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCGl1FE1i5YxcEhAtgjDm2NFeQHQjYgp3c&callback=initMap&v=weekly`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: { lat: 38.035501, lng: -78.503512 }, // Set initial location
        mapTypeControl: false,
      });

      const geocoder = new google.maps.Geocoder();
      const marker = new google.maps.Marker({
        map,
        draggable: true, // Enable dragging
        position: { lat: 38.035501, lng: -78.503512 }, // Start marker position
      });

      // Reverse geocode when clicking on the map
      map.addListener("click", (e) => {
        geocode({ location: e.latLng }, map, marker, geocoder);
      });

      // Handle marker dragend event to update location
      marker.addListener("dragend", (e) => {
        const position = marker.getPosition(); // Get the new marker position
        geocode({ location: position }, map, marker, geocoder); // Reverse geocode the new position
      });
    };

    const geocode = (request, map, marker, geocoder) => {
      geocoder.geocode(request).then((result) => {
        const { results } = result;
        if (results.length > 0) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          marker.setPosition(location);
          marker.setMap(map);
        } else {
          alert("No results found");
        }
      }).catch((e) => alert("Geocode was not successful: " + e));
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default MapComponent;
