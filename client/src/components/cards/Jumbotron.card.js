import React from "react";

const Jumbotron = ({ title, subTitle }) => {
  return (
    <div class="container-fluid bg-primary">
      <div className="row">
        <div class="col text-center p-5 bg-light">
          <h1>{title}</h1>
          <p className="lead"> {subTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
