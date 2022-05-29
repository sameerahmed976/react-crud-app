import React from "react";
import { useState } from "react";

const Form = ({ getData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    if (name !== "" && email !== "" && phone !== "") {
      const people = { name, email, phone };
      fetch(`http://localhost:3800/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(people),
      })
        .then((response) => response.json())
        .then((data) => {
          return getData();
        });
      setName("");
      setEmail("");
      setPhone("");
    } else {
      alert("Please enter valid data");
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <>
      <form onSubmit={handleAdd} className="flex">
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="tel"
          placeholder="phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <button className="btn  form-btn">Add new User</button>
      </form>
    </>
  );
};

export default Form;
