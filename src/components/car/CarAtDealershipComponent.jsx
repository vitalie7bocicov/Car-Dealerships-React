import { Field, Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCarApi } from "../../api/TodoApiService";

export default function CarComponent() {
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  const dealershipId = id;

  const navigate = useNavigate();

  function onSubmit(values) {
    const car = {
      brand: values.brand,
      model: values.model,
      year: values.year,
      dealershipId: id,
    };
    createCarApi(car)
      .then((response) => {
        navigate(`/dealerships/${id}/cars`);
      })
      .catch((error) => setErrorMessage(error));
  }

  function validate(values) {
    let errors = {};
    if (!values.model || values.model.length < 2)
      errors.model = "The model should be longer (min 3)!";

    if (!values.brand) errors.city = "The city should not be empty!";

    if (!values.year) errors.street = "The street should not be empty!";

    return errors;
  }

  return (
    <div>
      {errorMessage && (
        <div className="text-center alert alert-danger container">
          An error occurred with status code {errorMessage.response.status}
        </div>
      )}
      {!errorMessage && (
        <div className="container col-sm-10 col-md-6 col-lg-4">
          <h1 className="dealership-component text-center">
            <p> Create a new car:</p>
          </h1>
          <div>
            <Formik
              initialValues={{ dealershipId }}
              enableReinitialize={true}
              onSubmit={onSubmit}
              validate={validate}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {(props) => (
                <Form>
                  <ErrorMessage
                    name="brand"
                    component="div"
                    className="alert alert-warning"
                  />

                  <ErrorMessage
                    name="model"
                    component="div"
                    className="alert alert-warning"
                  />

                  <ErrorMessage
                    name="year"
                    component="div"
                    className="alert alert-warning"
                  />
                  <div>
                    <fieldset className="form-group">
                      <label>BRAND</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="brand"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>MODEL</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="model"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>YEAR</label>
                      <Field className="form-control" type="text" name="year" />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>DEALERSHIP ID</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="dealershipId"
                        disabled
                      />
                    </fieldset>

                    <div className="d-flex justify-content-center">
                      <button className="btn btn-success m-5" type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}
