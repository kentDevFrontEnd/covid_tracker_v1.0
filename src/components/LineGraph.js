import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const buidData = (data, typeOfData = "cases") => {
  let chartData = [];
  let lastPoint;
  for (let key in data[typeOfData]) {
    if (lastPoint) {
      let newData = {
        x: key,
        y: data[typeOfData][key] - lastPoint,
      };
      chartData.push(newData);
    }
    lastPoint = data[typeOfData][key];
  }
  return chartData;
};

const setChartData = (data, typeOfData = "cases") => {
  let labels = [];
  let newDataSet = [];
  if (data && data.length > 0) {
    labels = [...data.map((item) => item.x)];
    newDataSet = [...data.map((item) => item.y)];
  }
  return { labels, newDataSet };
};

const borderColor = {
  cases: "#f03",
  deaths: "red",
  recovered: "lightgreen",
};

function LineGraph({ casesType, ...props }) {
  const [originData, setOriginData] = useState({});
  const [data, setData] = useState({});
  useEffect(() => {
    const url =
      "https://cors-anywhere.herokuapp.com/https://disease.sh/v3/covid-19/historical/all?lastdays=10";
    const getData = async () => {
      const res = await Axios.get(url);
      // when you need data about death or recovered you can add another params for func buildData
      setOriginData(res.data);
      const buidedData = buidData(res.data);
      setData(buidedData);
    };
    getData();
  }, []);

  const builedData = buidData(originData, casesType);
  const { labels, newDataSet } = setChartData(builedData);

  return (
    <div className={props.className}>
      <h2>Wordwide cases</h2>
      {data?.length > 0 && (
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: `${casesType} of the World`,
                backgroundColor: "rgba(204,255,105,0.2",
                borderColor: `${borderColor[casesType]}`,
                data: newDataSet,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
