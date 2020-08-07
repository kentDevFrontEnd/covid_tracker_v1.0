import React from "react";
import numeral from "numeral";
import "./Table.css";

function TableBox({ countries }) {
  return (
    <table className="table">
      <tbody>
        {countries.map((country, index) => (
          <tr key={index}>
            <td>{country.country}</td>
            <td>{numeral(country.cases).format("0,0")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableBox;
