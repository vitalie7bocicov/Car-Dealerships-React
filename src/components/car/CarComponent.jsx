import { Field, Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCarApi,
  getCarApi,
  updateCarApi,
} from "../../api/TodoApiService";

export default function CarComponent() {
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [dealershipId, setDealershipId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function onSubmit(values) {
    if (parseInt(id) === -1) {
      const car = {
        brand: values.brand,
        model: values.model,
        year: values.year,
        dealershipId: values.dealershipId,
      };
      createCarApi(car)
        .then((response) => {
          navigate("/cars");
        })
        .catch((error) => setErrorMessage(error));
    } else {
      const car = {
        brand: values.brand,
        model: values.model,
        year: values.year,
        dealershipId: values.dealershipId,
      };
      updateCarApi(id, car)
        .then((response) => {
          navigate("/cars");
        })
        .catch((error) => setErrorMessage(error));
    }
  }

  function validate(values) {
    let errors = {};
    if (!values.model || values.model.length < 2)
      errors.model = "The model should be longer (min 3)!";

    if (!values.brand) errors.brand = "The brand should not be empty!";

    if (!values.year) errors.year = "The year should not be empty!";

    if (!values.dealershipId)
      errors.dealershipId = "The dealership Id should not be empty!";
    return errors;
  }

  useEffect(
    () => () => {
      if (parseInt(id) !== -1) {
        setIsLoading(true);
        getCarApi(id)
          .then((response) => {
            setBrand(response.data[0].brand);
            setModel(response.data[0].model);
            setYear(response.data[0].year);
            setDealershipId(response.data[0].dealershipId);
          })
          .catch((error) => {
            setErrorMessage(error);
          })
          .finally(() => setIsLoading(false));
      }
    },
    [id]
  );

  return (
    <div>
      {errorMessage && (
        <div className="text-center alert alert-danger container">
          An error occurred with status code {errorMessage.response.status}
        </div>
      )}
      {isLoading && ( // Render the loading spinner when isLoading is true
        <div className="container d-flex justify-content-center align-items-center text-light">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      {!errorMessage && !isLoading && (
        <div className="container col-sm-10 col-md-6 col-lg-4">
          <h1 className="dealership-component text-center">
            {parseInt(id) !== -1 && <p> Update car with the id: {id}</p>}
            {parseInt(id) === -1 && <p> Create a new car:</p>}
          </h1>
          <div>
            <Formik
              initialValues={{ brand, model, year, dealershipId }}
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
                  <ErrorMessage
                    name="dealershipId"
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
