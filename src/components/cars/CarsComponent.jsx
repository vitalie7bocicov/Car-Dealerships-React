import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCarApi, getCarsApi } from "../../api/TodoApiService";
import "./CarComponent.css";
export default function CarsComponent() {
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const url = "";
  function refreshCars() {
    setIsLoading(true);
    getCarsApi()
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => setErrorMessage(error))
      .finally(() => setIsLoading(false));
  }
  useEffect(() => {
    refreshCars();
  }, []);

  function updateCar(id) {
    navigate(`/cars/${id}`);
  }
  function deleteCar(id) {
    deleteCarApi(id)
      .then((response) => refreshCars())
      .catch((error) => setErrorMessage(error));
  }
  function addCar() {
    navigate("/cars/-1");
  }
  return (
    <div>
      {errorMessage && (
        <div className="text-center alert alert-danger container">
          An error occurred with status code{" "}
          {errorMessage.response ? errorMessage.response.status : "500"}
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
        <div className="container">
          <div className="todo-component container d-flex flex-wrap pb-5">
            <button
              className="mb-2 col-12 btn btn-success"
              onClick={() => addCar()}
            >
              Add new car
            </button>
          </div>

          <div className=" d-flex flex-wrap justify-content-center pb-5">
            {cars.map((car) => (
              <div className="card text-white bg-dark mx-2 my-2" key={car.id}>
                <img className="card-img-top" src={car.photo} alt={car.brand} />
                <div className="card-body d-flex flex-column justify-content-end">
                  <h3 className="card-title align-self-start">
                    {car.brand} {car.model}
                  </h3>
                  <div className="row">
                    <div className="col-6">
                      <p className="card-text">ID:</p>
                      <p className="card-text">DEALERSHIP:</p>
                      <p className="card-text">PRICE:</p>
                      <p className="card-text">YEAR:</p>
                    </div>
                    <div className="col-6">
                      <p className="card-text">{car.id}</p>
                      <p className="card-text">{car.dealershipId}</p>
                      <p className="card-text">${car.price}</p>
                      <p className="card-text">{car.year}</p>
                    </div>
                  </div>
                  <div className="mt-3 d-flex justify-content-around">
                    <a
                      className="btn btn-primary mr-2 text"
                      href={url}
                      onClick={() => updateCar(car.id)}
                    >
                      UPDATE
                    </a>
                    <a
                      className="btn btn-danger"
                      href={url}
                      onClick={() => deleteCar(car.id)}
                    >
                      DELETE
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
