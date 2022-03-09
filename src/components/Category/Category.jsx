import React, { useState, useEffect } from "react";
import "./category.css";
// import axios from "axios";
import { Link } from "react-router-dom";

const MidSection = ({ caterogy }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => {
    getData(caterogy);
  }, [caterogy]);

  const getData = async (caterogy) => {
    setLoading(true);
    setError(false);
    return fetch(
      `https://ipankaj-apollo-dbs.herokuapp.com/doctor/speciality/${caterogy}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(Object.values(res)[1]);
        // console.log(Object.values(res)[1][1].speciality);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  };

  return loading ? (
    <div style={{ textAlign: "center" }}>
      <h5 className="heading5">Loading </h5>
      <progress max={"100"}>15%</progress>
    </div>
  ) : error ? (
    <div>
      <h5 className="heading5">Something Went Wrong</h5>
    </div>
  ) : (
    <>
      <h5 className="heading2">Section</h5>
      <h2 className="heading5">{caterogy}</h2>
      <div className=" container section_container">
        {data.map((item) => (
          <article key={item._id} className="doctor_detail">
            <div
              style={{
                backgroundImage: `url(${item.image})`,
              }}
              className="doctor_img"
            >
              {/* <img src={item.image} alt="doctor" /> */}
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
                <Link
                  to={`/appointment/${item._id}`}
                  className="btn btn-primary"
                >
                  BOOK APPOINTMENT
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default MidSection;
