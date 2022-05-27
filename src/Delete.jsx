import React from "react";

const Delete = ({ id }) => {
  const deleteButton = (id) => {
    getDeleteData(id);
  };

  const getDeleteData = async (id) => {
    const response = await fetch(`http://localhost:3800/posts/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    // console.log(data, response.status);
  };

  return (
    <>
      <button onClick={() => deleteButton(id)}>Delete</button>
    </>
  );
};

export default Delete;
