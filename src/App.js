import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import TableBox from "./components/TableBox";
import { sortData } from "./components/Utill";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [countryCode, setCountryCode] = useState("wordwide");
  const [loading, setLoading] = useState(false);
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(2);
  const [casesType, setCasesType] = useState("cases");
  // https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    const getDataCountries = async () => {
      setLoading(true);
      const res = await Axios.get("https://disease.sh/v3/covid-19/countries");

      const tempCountries = res.data.map((item) => ({
        name: item.country,
        value: item.countryInfo.iso2,
      }));
      setCountries(tempCountries);
      // setTableData(res.data);
      setLoading(false);
      setMapCountries(res.data);

      const sortedData = sortData(res.data);
      setTableData(sortedData);
    };
    getDataCountries();
  }, []);

  const onCountryChange = async (e) => {
    const value = e.target.value;
    setCountryCode(value);
  };

  useEffect(() => {
    const getCountryInfo = async () => {
      const url =
        countryCode === "wordwide"
          ? `https://disease.sh/v3/covid-19/all`
          : `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;

      await Axios.get(url)
        .then((res) => res.data)
        .then((data) => {
          setCountryInfo(data);
          if (data.countryInfo) {
            const newCenter = {
              lat: data.countryInfo.lat,
              lng: data.countryInfo.long,
            };
            setMapCenter(newCenter);
            setMapZoom(5);
          }
        });
    };
    getCountryInfo();
    //https://disease.sh/v3/covid-19/all
    //https://disease.sh/v3/covid-19/countries/[country_code]
  }, [countryCode]);

  return (
    <div className="app">
      <div className="app__left">
        {/* header */}
        <header className="app__header">
          <h1>Covid 19 tracker</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={countryCode}
              onChange={onCountryChange}
            >
              {/* loop through all the countries and show the dropdown options*/}
              <MenuItem value="wordwide">Wordwide</MenuItem>
              {countries.map((country, index) => {
                return (
                  <MenuItem key={index} value={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </header>
        {/* title and select input country */}

        <div className="app__stats">
          {/* infobox title = "coronavirus cases" */}
          <InfoBox
            isRed={true}
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            isRed={true}
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            isRed={false}
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/* infobox */}
        {/* infobox */}
        {/* map */}
        <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <TableBox countries={tableData} />
          {/* table */}
          {/* graph */}
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
