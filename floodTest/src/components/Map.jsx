import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const MapComponent = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const leafletMap = L.map("map").setView([6.1, 80.55], 10);
    setMap(leafletMap);

    // Satellite tiles
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 18,
    }).addTo(leafletMap);

    // Fit bounds for Nilwala River region
    leafletMap.fitBounds([
      [6.25, 80.40],
      [5.90, 80.60],
    ]);

    return () => {
      leafletMap.remove();
    };
  }, []);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/get-all-data");

        const locationMap = new Map(); // Prevent duplicates — keep latest

        res.data.forEach((item) => {
          const key = item.location_area;
          if (!locationMap.has(key)) {
            locationMap.set(key, item);
          }
        });

        const maxRadius = 1000;

        locationMap.forEach((point) => {
          const latLngs = {
            Matara: [5.9451, 80.5420],
            Akuressa: [6.1000, 80.4810],
            Thihagoda: [5.9833, 80.5833],
            Pasgoda: [6.0380, 80.5580],
            Kamburupitiya: [5.9500, 80.5333],
            Kotapola: [6.1961, 80.5481],
            Pitabeddara: [6.0867, 80.5483],
            Malimbada: [6.0000, 80.5000],
            Athuraliya: [6.0500, 80.5000],
            Devinuwara: [5.9333, 80.5833],
          };

          const coords = latLngs[point.location_area];
          if (!coords) return; // Skip unknown areas

          const percentage = point.true_proba * 100;

          // Color logic
          let color = "#28a745"; // green
          if (percentage > 45) color = "#e74c3c"; // red
          else if (percentage >= 35) color = "#FFFF00"; // Yellow

          // Add circle
          const circle = L.circle(coords, {
            fillColor: color,
            fillOpacity: 0.6,
            radius: (percentage / 100) * maxRadius,
            color: null,
            weight: 0,
          }).addTo(map);

          // Add label
          L.marker(coords, {
            icon: L.divIcon({
              className: "custom-label",
              html: `<div style="font-size: 14px; font-weight: bold; color: black;">${point.location_area} (${percentage.toFixed(1)}%)</div>`,
              iconSize: [80, 20],
            }),
          }).addTo(map);

          // Add popup
          circle.bindPopup(
            `<div style="padding: 5px; font-size: 14px; font-weight: bold;">
              ${point.location_area}<br/>
              Flood Probability: ${percentage.toFixed(1)}%
            </div>`
          );
        });
      } catch (err) {
        console.error("Error loading map data", err);
      }
    };

    if (map) {
      fetchMapData();
    }
  }, [map]);

  return <div id="map" className="w-full h-[80vh] max-w-5xl rounded-lg shadow-lg"></div>;
};

export default MapComponent;
