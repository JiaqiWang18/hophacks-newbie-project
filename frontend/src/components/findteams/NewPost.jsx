import { Grid, TextField, Typography, Box, Button } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { withAuthCheck } from "../../util/auth";
import "../../stylesheets/find_teams.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const NewPost = () => {
  let history = useHistory();

  return (
    <div
      style={{
        backgroundImage: `url("${process.env.PUBLIC_URL}/images/cover.png")`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div class="container">
        <Formik
          initialValues={{
            project_description: "",
            num_people_wanted: "",
            role_needed: "",
            contact_email: "",
            other_info: "",
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            axios
              .post("/api/recruit/", values)
              .then((res) => {
                setSubmitting(false);
                resetForm();
                history.push("/find-teams");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          validate={(values) => {
            const errors = {};
            if (
              values.project_description &&
              values.project_description.length < 5
            ) {
              errors.project_description =
                "needs to be longer than 5 characters";
            }
            if (
              values.num_people_wanted &&
              (values.num_people_wanted < 1 || values.num_people_wanted > 4)
            ) {
              errors.num_people_wanted = "needs to be between 1 and 4";
            }
            if (values.role_needed && values.role_needed.length < 3) {
              errors.role_needed = "needs to be longer than 3 characters";
            }
            return errors;
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form className="find-teams-form" onSubmit={handleSubmit}>
              <Box marginTop={2}>
                <Typography variant="h4" align="center">
                  Find Teammates
                </Typography>
              </Box>

              <Grid container >
                <Grid item xs={12}>
                  <Box m={3}>
                    <TextField
                      id="project_description-input"
                      name="project_description"
                      label="Project description"
                      type="text"
                      style={{ width: "100%" }}
                      multiline
                      fullWidth
                      required
                      value={values.project_description}
                      onChange={handleChange}
                      error={errors.project_description ? true : false}
                      helperText={errors.project_description}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box m={3}>
                    <TextField
                      id="num_people_wanted-input"
                      name="num_people_wanted"
                      label="Number of people"
                      type="number"
                      style={{ width: "100%" }}
                      required
                      value={values.num_people_wanted}
                      onChange={handleChange}
                      error={errors.num_people_wanted ? true : false}
                      helperText={errors.num_people_wanted}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box m={3}>
                    <TextField
                      id="role_needed-input"
                      name="role_needed"
                      label="Types of roles"
                      type="text"
                      style={{ width: "100%" }}
                      required
                      value={values.role_needed}
                      onChange={handleChange}
                      error={errors.role_needed ? true : false}
                      helperText={errors.role_needed}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box m={3}>
                    <TextField
                      id="contact_email-input"
                      name="contact_email"
                      label="Contact Email"
                      type="email"
                      style={{ width: "100%" }}
                      required
                      value={values.contact_email}
                      onChange={handleChange}
                      error={errors.contact_email ? true : false}
                      helperText={errors.contact_email}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box marginTop={6} marginLeft={3}>
                    <Typography style={{ fontSize: '50%', color: 'red'}}>
                      *** After Submission, your first name and phone number will also be shown. 
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box m={3}>
                    <TextField
                      id="other_info-input"
                      name="other_info"
                      label="Additional Info"
                      type="text"
                      style={{ width: "100%" }}
                      multiline
                      value={values.other_info}
                      onChange={handleChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box marginLeft={3} marginBottom={3}>
                    <Button 
                      variant="contained" 
                      size="large" 
                      disabled={isSubmitting}>
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withAuthCheck(NewPost);
