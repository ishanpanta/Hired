import React from "react";
import { Grid } from "@mui/material";
import Image from "./Image";
import Button from "./Buttons";
import "./featureBox.css";
import Profile from "../assets/Solid_black.png";

function Featured_box({
  company,
  description,
  jobName,
  timeElapsed,
  onClicked,
  location,

}) {
  return (
    <Grid container direction="column" className="featureBox_root" onClick={onClicked}>
      <Grid item>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          className="company_name"
        >
          <Grid item className="profileContainer">
            <Image src={Profile} addStyles="profile" />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <a className="companyname">{company}</a>
              </Grid>
              <Grid item className="description">
                <a>{description}</a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="featureBoxBottom">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          className="Post_name"
          alignItems="flex-start"
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <a className="jobname">{jobName}</a>
              </Grid>
              <Grid item>
                <a className="joblocation">{location}</a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid>
                <a className="posttime">Posted: {timeElapsed}</a>
              </Grid>
              <Grid item className="buttonBox">
                <Button name="Save" addStyles="button_a"></Button>
              </Grid>
              <Grid item>
                <Button name="Apply" addStyles="button_a"></Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Featured_box;
