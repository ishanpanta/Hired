import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, ButtonGroup, Grid } from "@mui/material";
import RadioButtonsGroup from "../../../components/RadioButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import CenteredTabs from "../../../components/TabsForm";
import DropDown from "../../../components/DropDown";
import { yearPickerClasses } from "@mui/x-date-pickers";
import { Link, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import callAPI from "../../../utils/callAPI";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import InputSlider from "../../../components/Slider";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Companylayout from "../../../components/Companylayout";
import CustomButton from "../../../components/Buttons";

const validationschema = Yup.object({
  //   location: Yup.string().required('Required'),
  //   description: Yup.string().required('Required'),
  //   responsibilities: Yup.string().required('Required'),
  //   benefits: Yup.string().required('Required'),
  //   vacancy: Yup.string().required('Required'),
  //   skills: Yup.string().required('Required'),
  //   experience: Yup.string().required('Required'),
  //   hours: Yup.string().required('Required'),
  // // //required stuffs
});

function EditJobPost() {
  const location = useLocation();
  const { job } = location.state;
  console.log("edit page");
  console.log(job);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const [deadlineDatePicker, setDeadlineDatePicker] = React.useState(
    job.deadline
  );
  const [jobStartDatePicker, setJobStartDatePicker] = React.useState(
    job.job_start_date
  );

  const [jobTypeDropDown, setJobTypeDropDown] = React.useState(
    capitalize(job.job_type)
  );
  const [jobLevelDropDown, setJobLevelDropDown] = React.useState(
    capitalize(job.job_level)
  );
  const [educationRequiredDropDown, setEducationRequiredDropDown] =
    React.useState(capitalize(job.education_required));

  const [remoteOnsiteRadio, setRemoteOnsiteRadio] = React.useState(
    capitalize(job.remote_onsite)
  );

  const [minimumSalary, setMinimumSalary] = React.useState(
    job.min_salary / 1000
  );
  const [maximumSalary, setMaximumSalary] = React.useState(
    job.max_salary / 1000
  );

  const [changeLocation, setChangeLocation] = React.useState(false);

  console.log(job.min_salary / 1000);
  console.log(minimumSalary);

  const getMinimumSalary = (data) => {
    setMinimumSalary(data);
  };

  const getMaximumSalary = (data) => {
    setMaximumSalary(data);
  };

  const job_type_options = ["Permanent", "Temporary", "Contract", "Internship"];

  const job_level_options = ["Senior", "Midlevel", "Junior", "Internship"];

  const education_required = ["Bachlors", "Masters", "Phd"];

  const radio_options = ["Remote", "Onsite"];

  const onSubmit = async (values, actions) => {
    console.log("Form data", values);

    const job_post_information = {
      job: values.position,
      description: values.description,
      job_location: values.location,
      job_level: jobLevelDropDown,
      job_type: jobTypeDropDown,
      job_responsibilities: values.responsibilities,
      skills: values.skills,
      minimum_years_of_experience: values.experience,
      education_required: educationRequiredDropDown,
      no_of_vacancy: values.vacancy,
      work_hours: values.hours,
      min_salary: minimumSalary * 1000,
      max_salary: maximumSalary * 1000,
      job_benefits: values.benefits,
      job_start_date: jobStartDatePicker,
      deadline: deadlineDatePicker,
      remote_onsite: remoteOnsiteRadio,
      posted_date: job.posted_date,
      status_of_jobs: job.status_of_jobs,
    };

    console.log("values", job_post_information);

    let response_obj = await callAPI({
      endpoint: `/jobPost/update/${job.id}`,
      method: "PUT",
      data: job_post_information,
    });

    if (response_obj.data.msg == "success") {
      console.log("success");
      setChangeLocation(true);
    }
  };

  return (
    <Companylayout>
      <br />
      <Formik
        initialValues={{
          position: job.job,
          location: job.job_location,
          description: job.description,
          responsibilities: job.job_responsibilities,
          benefits: job.job_benefits,
          vacancy: job.no_of_vacancy,
          skills: job.skills,
          experience: job.minimum_years_of_experience,
          hours: job.work_hours,
          experince: job.minimum_years_of_experience,
          vancancy: job.no_of_vacancy,
        }}
        validationSchema={validationschema}
        onSubmit={onSubmit}
      >
        <Form>
          <br />
          {changeLocation && <Navigate to="/CompanyHome" />}
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item>
              <Grid container className="title_reminder">
                Post a job
              </Grid>
              <Grid container className="post_job_sub">
                Fill up the following fields to post a job vacancy.
              </Grid>
              <br />
              <Grid container>
                <div>
                  <Grid item htmlFor="lookingfor" className="post_questions">
                    What type of employee are you looking for?
                  </Grid>
                  <Grid container justifyContent="center">
                    <Select
                      className="field_position_add"
                      value={jobTypeDropDown}
                      onChange={(e) => {
                        setJobTypeDropDown(e.target.value);
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {job_type_options &&
                        job_type_options.map((i) => (
                          <MenuItem value={i}>{i}</MenuItem>
                        ))}
                    </Select>
                  </Grid>
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid htmlFor="lookingfor" className="post_questions">
                    Job level
                  </Grid>
                  <Grid container justifyContent="center">
                    <Select
                      className="field_position_add"
                      value={jobLevelDropDown}
                      onChange={(e) => {
                        setJobLevelDropDown(e.target.value);
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {job_level_options &&
                        job_level_options.map((i) => (
                          <MenuItem value={i}>{i}</MenuItem>
                        ))}
                    </Select>
                  </Grid>
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid htmlFor="lookingfor" className="post_questions">
                    Job level
                  </Grid>
                  <Grid container justifyContent="center">
                    <Select
                      className="field_position_add"
                      value={educationRequiredDropDown}
                      onChange={(e) => {
                        setEducationRequiredDropDown(e.target.value);
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {education_required &&
                        education_required.map((i) => (
                          <MenuItem value={i}>{i}</MenuItem>
                        ))}
                    </Select>
                  </Grid>
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid htmlFor="position" className="post_questions">
                    Job Position{" "}
                  </Grid>

                  <Field
                    className="field_position_add"
                    type="text"
                    id="position"
                    name="position"
                    placeholder="e.g. Graphic Designer or ML engineer"
                  />

                  <ErrorMessage name="position" />
                </div>
              </Grid>
              <Grid container>
                <div>
                  <Grid htmlFor="location" className="post_questions">
                    Job Location{" "}
                  </Grid>

                  <Field
                    className="field_position_add"
                    type="text"
                    id="location"
                    name="location"
                    placeholder="e.g. Dhulikhel"
                  />

                  <ErrorMessage name="location" />
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid htmlFor="skills" className="post_questions">
                    Skills
                  </Grid>

                  <h7>Specify all the skills required for job</h7>
                  <br />
                  <Field
                    className="field_position_add"
                    type="text"
                    id="skills"
                    name="skills"
                    placeholder="e.g. css, html, fastapi, ml"
                    multiline={true}
                  />
                  <ErrorMessage name="skills" />
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid htmlFor="description" className="post_questions">
                    Description
                  </Grid>

                  <h7>Describe about the job</h7>
                  <br />
                  <Field
                    className="field_position_add3"
                    type="text"
                    id="description"
                    name="description"
                    placeholder="e.g. its the best job ever."
                    multiline={true}
                  />
                  <ErrorMessage name="description" />
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid htmlFor="responsibilities" className="post_questions">
                    Job responsibilities
                  </Grid>

                  <Field
                    className="field_position_add3"
                    type="text"
                    id="responsibilities"
                    name="responsibilities"
                    placeholder="e.g. Should develop good models, Create APIs"
                  />

                  <ErrorMessage name="responsibilities" />
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid htmlFor="benefits" className="post_questions">
                    Job Benefits
                  </Grid>

                  <Field
                    className="field_position_add3"
                    type="text"
                    id="benefits"
                    name="benefits"
                    placeholder="e.g Insurance, Handsome bonus"
                  />

                  <ErrorMessage name="benefits" />
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid htmlFor="vacancy" className="post_questions">
                    Number of vancancies
                  </Grid>

                  <Field
                    className="field_position_add"
                    type="text"
                    id="vacancy"
                    name="vacancy"
                    placeholder="e.g. 10"
                  />

                  <ErrorMessage name="vacancy" />
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid htmlFor="hours" className="post_questions">
                    Work Hours
                  </Grid>

                  <Field
                    className="field_position_add"
                    type="text"
                    id="hours"
                    name="hours"
                    placeholder="e.g. 9 pm to 5 am"
                  />

                  <ErrorMessage name="hours" />
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid htmlFor="experience" className="post_questions">
                    Minimun years of experience
                  </Grid>

                  <Field
                    className="field_position_add"
                    type="text"
                    id="experience"
                    name="experience"
                    placeholder="2"
                  />

                  <ErrorMessage name="experience" />
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid htmlFor="type" className="post_questions">
                    Job Type
                  </Grid>
                  <Grid container justifyContent="center">
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      row
                      value={remoteOnsiteRadio}
                      onClick={(e) => {
                        setRemoteOnsiteRadio(e.target.value);
                      }}
                    >
                      {/* {job_type_options&&job_type_options.map((i)=>( <MenuItem value={i}>{i}</MenuItem>))} */}
                      {radio_options.map((i) => (
                        <FormControlLabel
                          value={i}
                          control={<Radio />}
                          label={i}
                        />
                      ))}
                    </RadioGroup>
                  </Grid>
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid className="post_questions" htmlFor="salary">
                    Expected Salary
                  </Grid>
                  <Grid container justifyContent="center">
                    <h7>Use slider to select minimum salary (in thousands)</h7>
                  </Grid>
                  <br />
                  <Grid container justifyContent="center">
                    <InputSlider
                      onChange={getMinimumSalary}
                      sliderValue={job.min_salary}
                      type="minimum"
                    />
                  </Grid>

                  <Grid container justifyContent="center">
                    <h7>Use slider to select maximum salary (in thousands)</h7>
                  </Grid>
                  <br />
                  <Grid container justifyContent="center">
                    <InputSlider
                      onChange={getMaximumSalary}
                      sliderValue={job.max_salary}
                      type="maximum"
                    />
                  </Grid>
                </div>
              </Grid>

              <Grid container>
                <div>
                  <Grid className="post_questions" htmlFor="startdate">
                    Job start date
                  </Grid>
                </div>
                <Grid container justifyContent="center" />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="MM/DD/YYYY"
                    value={jobStartDatePicker}
                    onChange={(newValue) => {
                      setJobStartDatePicker(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid container>
                <div>
                  <Grid className="post_questions" htmlFor="deadline">
                    Deadline
                  </Grid>
                </div>
                <Grid container justifyContent="center" />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="MM/DD/YYYY"
                    value={deadlineDatePicker}
                    onChange={(newValue) => {
                      setDeadlineDatePicker(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <br />

              <Grid container justifyContent="center">
                {/* <Link to= '/Formtwo'> */}
                <CustomButton
                  name="Update"
                  type="submit"
                  variant="contained"
                  addStyles={"accept-button"}
                ></CustomButton>
                {/* </Link> */}
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Companylayout>
  );
}

export default EditJobPost;
