import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteDealershipApi,
  getDealershipsApi,
} from "../../api/TodoApiService";
export default function DealershipsComponent() {
  const [dealerships, setDealerships] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  function refreshDealerships() {
    getDealershipsApi()
      .then((response) => {
        setDealerships(response.data);
      })
      .catch((error) => setErrorMessage(error));
  }
  useEffect(() => {
    refreshDealerships();
  }, []);

  function updateDealership(id) {
    navigate(`/dealership/${id}`);
  }
  function deleteDealership(id) {
    deleteDealershipApi(id)
      .then((response) => refreshDealerships())
      .catch((error) => setErrorMessage(error));
  }
  function addDealership() {
    navigate("/dealership/-1");
  }
  return (
    <div>
      {errorMessage && (
        <div className="text-center alert alert-danger container">
          An error occurred with status code{" "}
          {errorMessage.response ? errorMessage.response.status : "500"}
        </div>
      )}
      {!errorMessage && (
        <div className="todo-component container d-flex flex-column justify-content-start">
          <div>
            <table className="table table-dark table-bordered border-primary">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">NAME</th>
                  <th scope="col">CITY</th>
                  <th scope="col">STREET</th>
                  <th scope="col">IS OPEN</th>
                  <th scope="col" className="text-center">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {dealerships.map((dealership) => (
                  <tr key={dealership.id}>
                    <th scope="row">{dealership.id}</th>
                    <td>
                      <Link
                        to={`/dealerships/${dealership.id}/cars`}
                        className="text-decoration-none text-uppercase"
                      >
                        {dealership.name}
                      </Link>
                    </td>
                    <td>{dealership.city}</td>
                    <td>{dealership.street}</td>
                    <td>{dealership.isOpen}</td>

                    <td className="d-flex flex-md-row flex-column justify-content-center ">
                      <button
                        className="btn btn-info me-md-2 me-0"
                        onClick={() => updateDealership(dealership.id)}
                      >
                        UPDATE
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteDealership(dealership.id)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-success" onClick={addDealership}>
            Add new dealership
          </button>
        </div>
      )}
    </div>
  );
}
