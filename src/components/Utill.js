import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
const casesType = {
  cases: {
    color: "red",
    fillColor: "#f03",
    fillOpacity: "0.5",
    divider: 2.5,
  },
  deaths: {
    color: "red",
    fillColor: "red",
    fillOpacity: "0.4",
    divider: 0.08,
  },
  recovered: {
    color: "red",
    fillColor: "lightgreen",
    fillOpacity: "0.6",
    divider: 0.8,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

// config number
export const configNum = (num) => {
  return num ? `+ ${numeral(num).format("0.0a")}` : `+ 0`;
};

// draw circles on them map with interactive tooltip

export const showDataOnMap = (data, type = "cases") => {
  return data.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      radius={country[type] / casesType[type].divider}
      fill={casesType[type].color}
      fillColor={casesType[type].fillColor}
      fillOpacity={casesType[type].fillOpacity}
    >
      <Popup>
        <div>
          <div
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
              width: "80px",
              height: "50px",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div>{country.country}</div>
          <div>Cases: {numeral(country.cases).format("0,0")}</div>
          <div>Deaths: {numeral(country.deaths).format("0,0")}</div>
          <div>Recovered: {numeral(country.recovered).format("0,0")}</div>
        </div>
      </Popup>
    </Circle>
  ));
};
