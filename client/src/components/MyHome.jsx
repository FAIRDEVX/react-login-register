import React, { useEffect } from "react";

function MyHome() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3333/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          //   alert('Authen success')
        } else {
          alert("Authen failed");
          localStorage.removeItem("token");
          window.location = "/MyLogin";
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <div className="home-container">
      <h1>Employee Infomation</h1>
      <div className="infomation">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:{" "}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter country"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Position:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter position"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="wage" className="form-label">
              Wage:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter wage"
            />
          </div>
          <button className="btn btn-success">Add Employee</button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button className="btn btn-primary">Show Employees</button>
      </div>
    </div>
  );
}

export default MyHome;
