import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapBox.css";

const MapboxComponent = (props) => {
  console.log("props", props);
  mapboxgl.accessToken =
    "pk.eyJ1IjoicnVkYXBvZmF2aWNoIiwiYSI6ImNscm9obXd4bjBhNzgybGw5YWJ5eGIwOHMifQ.KO_0iX3S893DciUuqgDjSw";
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  const [lng] = useState(props.lng);
  const [lat] = useState(props.lat);
  const [zoom] = useState(13);

  // Initialize map when component mounts
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add our navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // const marker = new mapboxgl.Marker().setLngLat([props.lng, props.lat]).addTo(map);

    const marker = new mapboxgl.Marker({ color: "#FF0000" })
      .setLngLat([lng, lat])
      .addTo(map.current);

    // Map onload event
    map.current.on("load", () => {
      // Nifty code to force map to fit inside container when it loads
      map.current.resize();
    });

    // Clean up on unmount
    return () => map.current.remove();
  }, [lat, lng, zoom]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapboxComponent;
