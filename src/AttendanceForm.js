// AttendanceForm.js
import React from "react";
import { Page, Grid } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFormik } from "formik";

const AttendanceForm = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  touched,
  isSubmitting,
}) => {
  return (
    <SiteWrapper>
      <Page.Card title="Employee Attendance" />
      <Grid.Col md={6} lg={6} className="align-self-center">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            {touched.id && errors.id && <p className="red">{errors.id}</p>}
            <Label for="id">Employee ID</Label>
            <Input
              type="text"
              name="id"
              value={values.id}
              onChange={handleChange}
              id="id"
              placeholder="Employee ID"
            />
          </FormGroup>

          <FormGroup>
            {touched.name && errors.name && <p className="red">{errors.name}</p>}
            <Label for="name">Employee Name</Label>
            <Input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="Employee Name"
            />
          </FormGroup>

          <FormGroup>
            {touched.status && errors.status && (
              <p className="red">{errors.status}</p>
            )}
            <Label for="status">Status</Label>
            <Input
              type="select"
              name="status"
              id="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </Input>
          </FormGroup>

          <FormGroup>
            {touched.date && errors.date && <p className="red">{errors.date}</p>}
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              id="date"
              placeholder="dd/mm/yyyy"
              value={values.date}
              onChange={handleChange}
            />
          </FormGroup>

          <Button color="primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </Grid.Col>
    </SiteWrapper>
  );
};

const FormikApp = withFormik({
  // initial values for the form
  mapPropsToValues() {
    return {
      id: "",
      name: "",
      status: "",
      date: "", // yyyy-mm-dd from input[type=date]
    };
  },

  // basic validation (optional but helpful)
  validate(values) {
    const errors = {};
    if (!values.id) errors.id = "Employee id is required";
    if (!values.name) errors.name = "Employee name is required";
    if (!values.status) errors.status = "Status is required";
    if (!values.date) errors.date = "Date is required";
    return errors;
  },

  // submit handler
  handleSubmit: async (values, { props, resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);

      // convert id to string (backend expects string id in your examples)
      const idStr =
        values.id !== undefined && values.id !== null
          ? String(values.id)
          : "";

      // ensure name/status exist
      const name = values.name || "";
      const status = values.status || "";

      // convert yyyy-mm-dd to RFC-1123 (e.g. "Fri, 18 Sep 2025 00:00:00 GMT")
      let dateRFC = "";
      if (values.date) {
        // keep date at midnight UTC to avoid timezone shifts
        const iso = values.date + "T00:00:00Z";
        const d = new Date(iso);
        if (isNaN(d.getTime())) {
          throw new Error("Invalid date");
        }
        dateRFC = d.toUTCString(); // RFC1123-like
      }

      const payload = {
        id: idStr,
        name,
        status,
        date: dateRFC,
      };

      console.log("Submitting payload:", payload);

      const res = await fetch(
        "http://192.168.8.93:8082/api/v1/attendance/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const text = await res.text();
      let body;
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }

      if (!res.ok) {
        // try to show backend error message
        const arrayError =
           Array.isArray(body) && body.length > 0 && body[0] && body[0].error;

        const msg =
           (body && (body.error || arrayError || body.message)) ||
          `HTTP ${res.status}`;
	      
      }

      // success
      alert("Attendance created successfully");
      resetForm();

      // optional: if parent passes onSuccess, call it to refresh list
      if (props.onSuccess) {
        try {
          props.onSuccess();
        } catch (e) {
          console.warn("onSuccess callback failed:", e);
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting attendance: " + (err.message || err));
    } finally {
      setSubmitting(false);
    }
  },

  displayName: "AttendanceForm",
})(AttendanceForm);

export default FormikApp;
