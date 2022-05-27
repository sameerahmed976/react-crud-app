import React from "react";

const Form = ({ handleSubmitPost, handleFormData, formData }) => {
  return (
    <>
      <article className="form">
        <form onSubmit={handleSubmitPost}>
          <div className="name">
            <label htmlFor="name">
              Name:
              <input
                type="text"
                value={formData.name || ""}
                id="name"
                name="name"
                onChange={handleFormData}
              />
            </label>
          </div>
          <div className="email">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                value={formData.email || ""}
                id="email"
                name="email"
                onChange={handleFormData}
              />
            </label>
          </div>
          <div className="phone">
            <label htmlFor="phone">
              Phone:
              <input
                type="text"
                value={formData.phone || ""}
                id="phone"
                name="phone"
                onChange={handleFormData}
              />
            </label>
          </div>
          <button type="submit">Add Data</button>
        </form>
      </article>
    </>
  );
};

export default Form;
