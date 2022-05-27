import { useState, useEffect } from "react";
import "./App.css";
import Delete from "./Delete";
import Form from "./Form";

function App() {
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleFormData = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (
      formData.name !== "" &&
      formData.email !== "" &&
      formData.phone !== ""
    ) {
      getDataPost();
      formData.name = "";
      formData.email = "";
      formData.phone = "";
    } else {
      alert("enter valid details");
    }
  };

  const getDataPost = async () => {
    const response = await fetch("http://localhost:3800/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // const data = await response.json();
    // console.log(data, response.status);
  };
  const getDataPatch = async (id, item) => {
    const response = await fetch(`http://localhost:3800/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    console.log(data, response.status);
  };

  const getData = async () => {
    const response = await fetch("http://localhost:3800/posts");
    const data = await response.json();
    console.log(data);
    setData(data);
    setName(data[0].name);
    setEmail(data[0].email);
    setPhone(data[0].phone);
    setUserId(data[0].id);
  };

  const handleSubmitPatch = (e) => {
    e.preventDefault();
    const item = { name, email, phone, userId };
    console.log(item);
    getDataPatch(userId, item);
  };

  const updateButton = (id) => {
    // console.log(data[id - 1]);
    setName(data[id - 1].name);
    setEmail(data[id - 1].email);
    setPhone(data[id - 1].phone);
    setUserId(data[id - 1].id);
  };

  useEffect(() => {
    getData();
  }, [userId]);

  return (
    <>
      <section>
        <Form
          handleSubmitPost={handleSubmitPost}
          handleFormData={handleFormData}
          formData={formData}
        />
        <div>
          <form onSubmit={handleSubmitPatch}>
            <div className="name">
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  value={name}
                  id="name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="email">
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  value={email}
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="phone">
              <label htmlFor="phone">
                Phone:
                <input
                  type="text"
                  value={phone}
                  id="phone"
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </div>
            <button type="submit">Add Update Data</button>
          </form>
        </div>

        <article>
          <table>
            <tbody>
              <tr>
                <th>s.no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>

              {data.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.phone}</td>
                    <td>
                      <Delete id={e.id} />
                    </td>
                    <td>
                      <button onClick={() => updateButton(e.id)}>Update</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </article>
      </section>
    </>
  );
}

export default App;
