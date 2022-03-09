import React, { useState, useEffect } from "react";
import "./clinic.css";

const Clinic = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [doctorData, setDoctorData] = useState([]);
  const [secondData, setSecondData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    setError(false);
    return fetch(`https://ipankaj-apollo-dbs.herokuapp.com/clinic`)
      .then((res) => res.json())
      .then((res) => {
        setData(Object.values(res)[1]);
        setDoctorData(Object.values(res)[1][0].doctors);
        setSecondData(Object.values(res)[1][1].doctors);
        // console.log(Object.values(res)[1][1].doctors);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  };

  let arrImg = [
    "https://ahmedabad.apollohospitals.com/wp-content/uploads/2018/04/DSC00485.jpg",
    "https://bangalore.apollohospitals.com/wp-content/uploads/2021/08/Bannerghatta-Road-Banglore.jpg",
  ];

  let count = 0;

  const handleClick = (e) => {
    e.preventDefault();
    setShowTable(!showTable);
    if (showTable) {
      setDoctorData(secondData);
    } else {
      setDoctorData(doctorData);
    }
  };

  return loading ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Loading
      <progress className="progress is-small is-primary" max="100">
        15%
      </progress>
    </div>
  ) : error ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Something went wrong
    </div>
  ) : (
    <>
      <h1 className="heading2" style={{ marginTop: "1rem" }}>
        Clinic
      </h1>
      <div className=" container section_container">
        {data.map((item) => (
          <article key={item._id} className="clinic_detail">
            <div
              style={{
                backgroundImage: `url(${arrImg[count++]})`,
                marginBottom: "1rem",
              }}
              className="clinic_img"
            >
              {/* <img src={arrImg[0]} alt="doctor" /> */}
            </div>
            <div>
              <h2>{item.name}</h2>
              <div className="aptn_doctor">
                <h3>{item.address}</h3>
                <div
                  className="btn btn-primary extra-btn"
                  style={{ marginTop: "1rem" }}
                  onClick={handleClick}
                >
                  Explore More
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {showTable && (
        <div className="container">
          <h1
            className="heading2"
            style={{ marginBottom: "2rem", textDecoration: "underline" }}
          >
            Doctors details{" "}
          </h1>
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Fees</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {doctorData.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img src={item.image} className="td_img" alt=".." />
                    </td>
                    <td>{item.full_name}</td>
                    <td>{item.speciality}</td>
                    <td>{item.experience}</td>
                    <td> ₹{item.cost_per_appointment}</td>
                    <td>
                      <button>View more</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Clinic;
