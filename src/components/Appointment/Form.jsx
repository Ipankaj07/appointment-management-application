import React, { useState } from "react";

const UserForm = ({ ID }) => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    address: "",
    age: "",
  };

  // console.log(ID);

  const [formData, setFormData] = useState(initialState);
  const { name, email, address, phone, date, time, age } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchFormData();
    // console.log(formData);
    setFormData(initialState);
  };

  async function patchFormData(e) {
    // e.preventDefault();
    const res = await fetch(
      `https://ipankaj-apollo-dbs.herokuapp.com/doctor/${ID}`,
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
  }

  return (
    <div className="form_container">
      <article className="app_articl">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                name="name"
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
                name="email"
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
              <input
                name="address"
                value={address}
                onChange={onChange}
                className="input"
                type="text"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Time</label>
            <div className="control">
              <input
                name="time"
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
                name="date"
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
                name="phone"
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
              <input
                name="age"
                value={age}
                onChange={onChange}
                className="input"
                type="text"
                placeholder="Age"
              />
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
              <input
                type="submit"
                className=" btn btn-primary button is-link"
              />
            </div>
          </div>
        </form>
      </article>
    </div>
  );
};

export default UserForm;
