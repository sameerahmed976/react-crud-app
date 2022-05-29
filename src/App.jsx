import React, { useEffect, useState } from "react";
import Form from "./Form";
import "./App.css";
const url = " http://localhost:3800/posts";
const App = () => {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userid, setUserId] = useState("");

  useEffect(() => {
    getData();
  }, [url]);

  const deleteButton = (id) => {
    // console.log(id);
    fetch(`http://localhost:3800/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        return console.log(data);
      });
    getData();
  };

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return setData(data);
      });
  };

  const editButton = (id) => {
    const people = {
      name: data[id - 1].name,
      email: data[id - 1].email,
      phone: data[id - 1].phone,
      id: data[id - 1].id,
    };

    setName(people.name);
    setEmail(people.email);
    setPhone(people.phone);
    setUserId(people.id);
    console.log(people);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // const people = {
    //   name: data[id - 1].name,
    //   email: data[id - 1].email,
    //   phone: data[id - 1].phone,
    //   id: data[id - 1].userid,
    // };

    // setName(name);
    // setEmail(email);
    // setPhone(phone);

    // setName(people.name);
    // setEmail(people.email);
    // setPhone(people.phone);
    // setUserId(people.id);
    // console.log(name, email, phone, userid);

    const people = { name, email, phone };

    fetch(`http://localhost:3800/posts/${userid}`, {
      method: "PATCH",
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
    setUserId("");
  };

  return (
    <>
      <section className="columns-2">
        <article>
          <Form getData={getData} />
        </article>

        <article>
          <form onSubmit={handleEdit} className="flex  form-2">
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
            <button className="btn form-btn">Update user</button>
          </form>
        </article>
        <section className="table">
          <article>
            <table>
              <tbody>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>

                {data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td> {item.id} </td>
                      <td> {item.name} </td>
                      <td> {item.email} </td>
                      <td> {item.phone} </td>
                      <td>
                        <button
                          onClick={() => deleteButton(item.id)}
                          className="btn-btn"
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => editButton(item.id)}
                          className="btn-btn"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </article>
        </section>
      </section>
    </>
  );
};

export default App;
