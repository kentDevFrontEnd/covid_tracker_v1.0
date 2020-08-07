import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./map.css";
import { showDataOnMap } from "./Utill";

function Map({ countries, center, zoom, casesType }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> Designer: <a hreft="https://github.com/kentDevFrontEnd">KentBui</a>'
        />
        {/* loop through countries and draw circle on the screen */}
        {/* {countries.map((country, index) => (
          <Circle
            key={index}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            radius={country.cases / 2}
            fill={"red"}
            fillColor={"#f03"}
            fillOpacity={0.5}
          ></Circle>
        ))} */}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
