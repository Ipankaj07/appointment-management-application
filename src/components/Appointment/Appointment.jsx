import React, { useState, useEffect } from "react";
import "./appointment.css";
import { useParams } from "react-router-dom";

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

  /* all about form submit */

  /* PATCH this form data to doctor user arrays */
  const patchFormData = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://ipankaj-apollo-dbs.herokuapp.com/doctor/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users: formData }),
      }
    );
    const data = await res.json();
    console.log(data);
  };

  const [formData, setFormData] = useState([
    {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
    },
  ]);
  const { name, email, phone, date, time } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    patchFormData();
    console.log(formData);
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
                <img src={data.image} alt="doctor" />
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

        <div className="form_container">
          <article className="app_articl">
            <form onSubmit={onSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    value={name}
                    onChange={onChange}
                    className="input"
                    type="text"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    value={email}
                    onChange={onChange}
                    className="input"
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Address</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Address" />
                </div>
              </div>
              <div className="field">
                <label className="label">Time</label>
                <div className="control">
                  <input
                    value={time}
                    onChange={onChange}
                    className="input"
                    type="text"
                    placeholder="Time"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Date</label>
                <div className="control">
                  <input
                    value={date}
                    onChange={onChange}
                    className="input"
                    type="text"
                    placeholder="Date"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone</label>
                <div className="control">
                  <input
                    value={phone}
                    onChange={onChange}
                    className="input"
                    type="text"
                    placeholder="Phone"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Age</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Age" />
                </div>
              </div>
              <div className="field">
                <label className="label">
                  <input type="checkbox" />
                  <span style={{ marginLeft: "0.5rem" }}>
                    I agree to the Terms and Conditions
                  </span>
                </label>
              </div>
              <div className="field">
                <div className="control">
                  <button className=" btn btn-primary button is-link">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </article>
        </div>
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
