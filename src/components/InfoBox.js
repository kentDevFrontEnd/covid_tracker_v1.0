import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";
import { configNum } from "./Utill";

function InfoBox({ title, cases, total, ...props }) {
  return (
    <Card
      className={`infoBox ${props.active && "infoBox--selected"} ${
        props.isRed && "infoBox--red"
      }`}
      onClick={props.onClick}
    >
      <CardContent>
        {/* title */}
        <Typography
          variant="h4"
          component="p"
          color="textSecondary"
          className="infoBox__title"
        >
          {title}
        </Typography>
        {/* number cases */}
        <Typography variant="h4" component="p" className="infoBox__cases">
          {configNum(cases)}
        </Typography>

        {/* number total  */}
        <Typography
          variant="h5"
          component="p"
          className="infoBox__total"
          color="textSecondary"
        >
          {configNum(total)} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
