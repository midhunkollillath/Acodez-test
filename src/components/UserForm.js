import React from "react";
import { TextField, Button, Checkbox, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  dob: Yup.date()
    .required("Date of birth is required")
    .test('age', 'You must be at least 10 years old', (value) => {
      const age = calculateAge(value);
      return age >= 10;
    }),
  leaguesPlayed: Yup.array().min(1, "Select at least one league"),
  status: Yup.string().required("Status is required"),
  position: Yup.string().required("Position is required"),
  height: Yup.string().required("Height is required"),
});

const UserForm = ({ onSubmit, onCancel,user  }) => {
  return (
    <Formik
      initialValues={{
        name: user ? user.name : "",
        dob: user ? user.dob : "",
        leaguesPlayed: user ? user.leaguesPlayed : [],
        status: user ? user.status : "",
        height: user ? user.height : "",
        position: user ? user.position : "",
        createdAt :user ? user.createdAt : null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <h2>User Information Form</h2>

          <Grid container spacing={2}>
            {/* Left column */}
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                name="dob"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                error={touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Leagues Played</InputLabel>
                <Select
                  multiple
                  name="leaguesPlayed"
                  value={values.leaguesPlayed}
                  onChange={handleChange}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {["LaLiga", "League 1", "League 2"].map((league) => (
                    <MenuItem key={league} value={league}>
                      <Checkbox checked={values.leaguesPlayed.includes(league)} />
                      {league}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {touched.leaguesPlayed && errors.leaguesPlayed && (
                <div style={{ color: "red", marginTop: 4 }}>{errors.leaguesPlayed}</div>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Retired">Retired</MenuItem>
                </Select>
              </FormControl>
              {touched.status && errors.status && (
                <div style={{ color: "red", marginTop: 4 }}>{errors.status}</div>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Position</InputLabel>
                <Select
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                >
                  <MenuItem value="Forward">Forward</MenuItem>
                  <MenuItem value="Backward">Backward</MenuItem>
                  <MenuItem value="Midfielder">Midfielder</MenuItem>
                </Select>
              </FormControl>
              {touched.position && errors.position && (
                <div style={{ color: "red", marginTop: 4 }}>{errors.position}</div>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                name="height"
                label="Height"
                type="number"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                error={touched.height && !!errors.height}
                helperText={touched.height && errors.height}
                inputProps={{
                  min: 0, 
                  max: 300, 
                  step: 0.1, 
                }}
                onInput={(e) => {           
                  const value = e.target.value;
                  if (value < 0) {
                    e.target.value = 0;
                  } else if (value > 300) {
                    e.target.value = 300;
                  }
                }}
              />
            </Grid>
           
            <Grid item xs={12} style={{ textAlign: "right", marginTop: 16 }}>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                style={{ marginRight: 8 }}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
