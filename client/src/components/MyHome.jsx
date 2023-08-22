import React, { useEffect, useState } from "react";
import axios from "axios";

function MyHome() {
  const [employeeList, setEmployeeList] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const getEmployees = () => {
    axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployee = () => {
    axios
      .post("http://localhost:3001/create", {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      })
      .then(() => {
        setEmployeeList([
          ...employeeList,
          {
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
      });
  };

  const updateEmployeeWage = (id) => {
    axios.put("http://localhost:3001/update", { wage: newWage , id: id }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            age: val.age,
            country: val.country,
            position: val.position,
            wage: newWage
          } : val;
        })
      )
    })
  }

  const deleteEmployeeWage = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      )
    })
  }

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
              onChange={(event) => {
                setName(event.target.value);
              }}
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
              onChange={(event) => {
                setAge(event.target.value);
              }}
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
              onChange={(event) => {
                setCountry(event.target.value);
              }}
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
              onChange={(event) => {
                setPosition(event.target.value);
              }}
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
              onChange={(event) => {
                setWage(event.target.value);
              }}
            />
          </div>
          <button className="btn btn-success" onClick={addEmployee}>
            เพิ่มพนักงาน
          </button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button className="btn btn-primary" onClick={getEmployees}>
          แสดงพนักงาน
        </button>
        <br /> <br />
        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Age: {val.age} year old</p>
                <p className="card-text">Country: {val.country}</p>
                <p className="card-text">Position: {val.position}</p>
                <p className="card-text">Wage: {val.wage} ฿</p>
                <div className="d-flex">
                  <input 
                    type="number" 
                    style={{width:"300px"}}
                    placeholder="10000..." 
                    className="form-control"
                    onChange={(event) => {
                      setNewWage(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateEmployeeWage(val.id)}}>อัปเดต</button>
                  <button className="btn btn-danger" onClick={() => {deleteEmployeeWage(val.id)}}>ลบข้อมูล</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyHome;
