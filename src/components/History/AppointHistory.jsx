import React, { useState, useEffect } from "react";
import "./history.css";

function AppointHistory() {
  const [appointments, setAppointments] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(
        "https://ipankaj-apollo-dbs.herokuapp.com/doctor"
      );
      const data = await res.json();
      // console.log(data.doctors);
      setAppointments(data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  const userDetail = async (id) => {
    console.log(id);
    try {
      const res = await fetch(
        `https://ipankaj-apollo-dbs.herokuapp.com/doctor/${id}`
      );
      const data = await res.json();
      console.log(data.doctor.users);
      setUserData(data.doctor.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
    // console.log(e);
    userDetail(e);
    setShowTable(true);
  };

  return (
    <>
      <h2
        className="heading2"
        style={{ margin: "1rem", textDecoration: "underline" }}
      >
        Appoint-History
      </h2>
      <div className="appoint-history container">
        {appointments.map((appointment) => (
          <article className="appoint-history-card" key={appointment._id}>
            <div
              onClick={() => {
                handleClick(appointment._id);
              }}
            >
              <img
                src={appointment.image}
                style={{ width: "100px", borderRadius: "50%" }}
                alt=""
              />
              <h3 className="appoint-title">{appointment.full_name}</h3>
              <div className="appoint-history-card-body">
                <p className="appoint-history-card-body-text">
                  {appointment.availability[0]}
                </p>
                <p className="appoint-body-text">
                  {appointment.availability[1]}
                </p>
                <p className="appoint-history-card-body-text">
                  {appointment.phone}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* show table of users */}
      {showTable && (
        <div className="container">
          <h1
            className="heading2"
            style={{ marginBottom: "2rem", textDecoration: "underline" }}
          >
            User's details{" "}
          </h1>
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.time}</td>
                    <td>{user.date}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default AppointHistory;
