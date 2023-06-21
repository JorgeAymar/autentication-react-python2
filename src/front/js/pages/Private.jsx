// ./pages/Private.jsx

import React from "react";
import { Link } from "react-router-dom";
import Logout from '../component/Logout.jsx';

function Private() {
  const imageUrl = "https://s1.ppllstatics.com/elnortedecastilla/www/multimedia/202111/17/media/MM-fotos-animales-divertidos/Chee%20Kee%20Teo_Time%20for%20school-0.jpg";

  return (
    <div className="container mt-5">
      <h1 className="text-center">Página privada</h1>
      <p className="text-center">Estas en la página privada.</p>
      <div className="d-flex justify-content-center">
        <img
          src={imageUrl}
          alt="Imagen divertida"
          className="img-fluid rounded"
          style={{ width: "500px", height: "300px", objectFit: "cover" }}
        />
      </div>
      <p className="text-center mt-3">
        ¡Bienvenido a la zona Privada, Disfruta de esta divertida imagen!
      </p>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/" className="btn btn-primary" onClick={Logout}>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Private;