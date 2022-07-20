import React from "react";



function Cards({ titulo,texto }) {
  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="card-body text-light">
        <h4 className="card-title">{titulo}</h4>
        <p className="card-text ">{texto}</p>
        </div>
    </div>
    
  );
}



export default Cards;
