import { Cookies } from 'react-cookie';
const cookies = new Cookies();

// funtion to get headers with token if exists
const getHeaders = () => {
  const token = cookies.get('access_token');
  console.log("Token recuperado de la cookie:", token);
  return {
    "Content-Type": "application/json",
    // if token exists, include the Authorization header
...(token ? { "Authorization": `Bearer ${token}` } : {})  };
};

//  Get Cameras
async function getCameras() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/cameras/", {
      method: "GET",
      headers: getHeaders(), // use the headers with token
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
      headers: getHeaders(), // use the headers with token
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

// Patch Cameras 
async function patchCameras(obj, id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/cameras/${id}/`, {
      method: 'PATCH',
      headers: getHeaders(), // use the headers with token
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
      headers: getHeaders(), //  use the headers with token
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