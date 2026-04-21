import { Cookies } from 'react-cookie';
const cookies = new Cookies();

// Función auxiliar privada para no repetir código
const getHeaders = () => {
  const token = cookies.get('access_token');
  return {
    "Content-Type": "application/json",
    // Si hay token, lo agregamos; si no, enviamos solo el content-type
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
};

//  Get Cameras
async function getCameras() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/cameras/", {
      method: "GET",
      headers: getHeaders(), // <--- Usa los headers con Token
    });

    if (!response.ok) {
      throw new Error("Error fetching camera");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching camera", error);
    throw error;
  }
}

//  Post Cameras
async function postCameras(obj) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/cameras/", {
      method: "POST",
      headers: getHeaders(), // <--- Usa los headers con Token
      body: JSON.stringify(obj),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { response: { data } };
    }

    return data;
  } catch (error) {
    console.error("Error post camera:", error);
    throw error;
  }
}

// patch cameras (Este es el que usas en tu visualizador)
async function patchCameras(obj, id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/cameras/${id}/`, {
      method: 'PATCH',
      headers: getHeaders(), // <--- Usa los headers con Token
      body: JSON.stringify(obj)
    });

    if (!response.ok) {
        throw new Error("Error en la petición al servidor");
    }

    return await response.json();
  } catch (error) {
    console.error('Error patch camera:', error);
    throw error;
  }
}

// Delete Cameras 
async function deleteCameras(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/cameras/${id}/`, {
      method: "DELETE",
      headers: getHeaders(), // <--- Usa los headers con Token
    });

    if (!response.ok) {
      throw new Error(`Error deleting camera with id ${id}`);
    }

    return { message: `Camera with id ${id} deleted successfully` };
  } catch (error) {
    console.error("Error deleting Camera:", error);
    throw error;
  }
}

export {
    getCameras,
    postCameras,
    patchCameras,
    deleteCameras
};