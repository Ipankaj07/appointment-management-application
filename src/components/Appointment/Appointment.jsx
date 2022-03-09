import React, { useState, useEffect } from "react";
import "./appointment.css";
import { useParams } from "react-router-dom";
import UserForm from "./Form";
import { v4 as uuidv4 } from "uuid";

const Appointment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  const { id } = useParams();
  //   console.log(id);

  useEffect(() => {
    getDetails(id);
  }, [id]);

  const getDetails = async (id) => {
    setLoading(true);
    setError(false);
    return fetch(`https://ipankaj-apollo-dbs.herokuapp.com/doctor/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(Object.values(res)[1]);
        console.log(Object.values(res)[1]);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
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
      <h1
        className="heading2"
        style={{ marginBottom: "0.5rem", textDecoration: "underline" }}
      >
        User's Appointment
      </h1>
      <div className="container appointment_container">
        <div className="doctor_container">
          {
            <article key={data._id} className="apo_doctor_detail">
              <div className="doctor_img">
                <img src={data.image} className="image-fit" alt="doctor" />
              </div>
              <div className="apo_doctor_second">
                <h2>{data.full_name}</h2>
                <div className="spec_doctor">
                  <h3>({data.speciality})</h3>
                  <h3>Experience:{data.experience}</h3>
                </div>
                <div className="aptn_doctor">
                  <p>{data.availability[0]}</p>
                  <p>{data.availability[1]}</p>
                  <h5> Cost : ₹ {data.cost_per_appointment}</h5>
                </div>
              </div>
            </article>
          }
        </div>

        {/* send _id */}
        <UserForm key={uuidv4()} ID={id} />
      </div>
    </>
  );
};

export default Appointment;

/* 
<article key={item._id} className="doctor_detail">
              <div className="doctor_img">
                <img src={item.image} alt="doctor" />
              </div>
              <div>
                <h3>{item.full_name}</h3>
                <div className="spec_doctor">
                  <h4>({item.speciality})</h4>
                  <h4>Experience:{item.experience}</h4>
                </div>
                <div className="aptn_doctor">
                  <p>{item.availability[0]}</p>
                  <p>{item.availability[1]}</p>
                  <h5> Cost : ₹ {item.cost_per_appointment}</h5>
                </div>
              </div>
            </article>

*/
