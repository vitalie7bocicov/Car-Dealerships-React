import { Field, Formik, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDealershipApi,
  getDealershipApi,
  updateDealershipApi,
} from "../../api/TodoApiService";

export default function DealershipsComponent() {
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [isOpen, setIsOpen] = useState("");

  const navigate = useNavigate();

  function onSubmit(values) {
    if (parseInt(id) === -1) {
      const dealership = {
        name: values.name,
        city: values.city,
        street: values.street,
        isOpen: values.isOpen,
      };
      createDealershipApi(dealership)
        .then((response) => {
          navigate("/dealerships");
        })
        .catch((error) => setErrorMessage(error));
    } else {
      const dealership = {
        name: values.name,
        city: values.city,
        street: values.street,
        isOpen: values.isOpen,
      };
      updateDealershipApi(id, dealership)
        .then((response) => {
          navigate("/dealerships");
        })
        .catch((error) => setErrorMessage(error));
    }
  }

  function validate(values) {
    let errors = {};
    if (!values.name || values.name.length < 5)
      errors.name = "The name should be longer (min 5)!";

    if (!values.city || values.city.length < 3)
      errors.city = "The city should not be empty!";

    if (!values.street || values.street.length < 5)
      errors.street = "The street should not be empty!";
    return errors;
  }

  useEffect(
    () => () => {
      if (parseInt(id) !== -1) {
        getDealershipApi(id)
          .then((response) => {
            setName(response.data[0].name);
            setCity(response.data[0].city);
            setStreet(response.data[0].street);
            setIsOpen(response.data[0].isOpen);
          })
          .catch((error) => {
            setErrorMessage(error);
          });
      }
    },
    [id]
  );

  return (
    <div>
      {errorMessage && (
        <div className="text-center alert alert-danger container">
          An error occurred with status code{" "}
          {errorMessage.response ? errorMessage.response.status : "500"}
        </div>
      )}
      {!errorMessage && (
        <div className="container col-sm-10 col-md-6 col-lg-4">
          <h1 className="dealership-component text-center">
            {parseInt(id) !== -1 && <p> Update dealership with the id: {id}</p>}
            {parseInt(id) === -1 && <p> Create a new dealership:</p>}
          </h1>
          <div>
            <Formik
              initialValues={{ name, city, street, isOpen }}
              enableReinitialize={true}
              onSubmit={onSubmit}
              validate={validate}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {(props) => (
                <Form>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-warning"
                  />

                  <ErrorMessage
                    name="city"
                    component="div"
                    className="alert alert-warning"
                  />

                  <ErrorMessage
                    name="street"
                    component="div"
                    className="alert alert-warning"
                  />
                  <div>
                    <fieldset className="form-group">
                      <label>NAME</label>
                      <Field className="form-control" type="text" name="name" />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>CITY</label>
                      <Field className="form-control" type="text" name="city" />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>STREET</label>
                      <Field
                        className="form-control"
                        type="text"
                        name="street"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <label>
                        <Field type="checkbox" name="isOpen" /> IS OPEN
                      </label>
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
