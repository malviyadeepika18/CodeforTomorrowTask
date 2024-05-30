import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { getEmp, getPostData, deleteUsers } from "../redux/slices/emp";
import { Container, Button } from "react-bootstrap";
import Men from "../image/images.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Task() {
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);
  const [employeedata, setEmployeeData] = useState([]);
  const { geteEmpData, DeleteData } = useSelector((state) => ({
    geteEmpData: state && state.emp.empData,
    DeleteData: state && state.emp && state.emp.deletePostData,
  }));

  useEffect(() => {
    dispatch(getEmp());

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (geteEmpData) {
      setEmployeeData(geteEmpData);
      console.log("Fetcheddata", geteEmpData);
    }
  }, [geteEmpData]);

  //delete card---------------------------------------------------------
  const handleDelete = async (user) => {
    console.log(user.id, "deldata");

    //  alert(id)
    dispatch(deleteUsers(user.id));
  };

  const indexOfLastCard = currentPage * cardsPerPage;

  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = employeedata.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {showLoader && <div className="loader"></div>}
      {!showLoader && (
        <div className="container-fluid bg-color">
          <div className="container ">
            <div className="row ">
              {currentCards.map((user, index) => (
                <div
                  key={index}
                  className={`col-4 ${index >= 3 ? "mt-3" : ""}`}
                >
                  <div className="card fixed-height">
                    <div className="card-body ">
                      <i
                        className="fa fa-times-circle  close-btn"
                        aria-hidden="true"
                        onClick={() => handleDelete(user)}
                      ></i>
                      <h5 className="card-title card-text-container ">
                        {user.title}
                      </h5>

                      <p className="card-text card-text-container ">
                        {user.body}
                      </p>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Mon,21 Dec 2021 14:57 GMT
                      </h6>
                      <img
                        className="card-img-top"
                        src={Men}
                        alt="Card image cap"
                      ></img>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((prevPage) =>
                          prevPage === 1 ? prevPage : prevPage - 1
                        )
                      }
                    >
                      Previous
                    </button>
                  </li>
                  {[
                    ...Array(
                      Math.min(3, Math.ceil(employeedata.length / cardsPerPage))
                    ),
                  ].map((_, index) => (
                    <li key={index} className="page-item">
                      <button
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  {currentPage <
                    Math.ceil(employeedata.length / cardsPerPage) && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() =>
                          setCurrentPage((prevPage) =>
                            prevPage ===
                            Math.ceil(employeedata.length / cardsPerPage)
                              ? prevPage
                              : prevPage + 1
                          )
                        }
                      >
                        Next
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
