// ./component/Logout.jsx

import React from 'react';
import Swal from 'sweetalert2';

const Logout = () => {
  const logout = () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    
    fetch('/api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      Swal.fire(
        'Has salido',
        'Tu sesión ha sido cerrada.',
        'success'
      ).then(() => {
        // Esto te llevará a la raíz del sitio.
        window.location.href = '/';
      });
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }

  return (
    <button onClick={logout}>Cerrar sesión</button>
  );
}

export default Logout;
