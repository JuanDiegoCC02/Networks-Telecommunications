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

//  Get Routers
async function getRouters() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/routers/", {
      method: "GET",
      headers: getHeaders(), // use the headers with token
    });

    if (!response.ok) {
      throw new Error("Error fetching router");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching router", error);
    throw error;
  }
}


//  Post Routers
async function postRouters(obj) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/routers/", {
      method: "POST",
      headers: getHeaders(), // use the headers with token
      body: JSON.stringify(obj),
    });

    const data = await response.json();

   if (!response.ok) {
  console.log("ERROR BACKEND:", data); 
  throw data;
}

    return data;
  } catch (error) {
    console.error("Error post router:", error);
    throw error;
  }
}


//  Update Routers
async function updateRouters(obj, id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/routers/${id}/`, {
      method: "PATCH",
      headers: getHeaders(), // use the headers with token
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Error updating router");
    }

    return await response.json();
  } catch (error) {
    console.error("Error update router:", error);
    throw error;
  }
}

// Patch Routers
async function patchRouters(obj, id) {
  try {
    // CAMBIO: Quité "-update" de la URL
    const response = await fetch(`http://127.0.0.1:8000/api/routers/${id}/`, {
      method: 'PATCH',
      headers: getHeaders(), // use the headers with token
      body: JSON.stringify(obj)
    });

    if (!response.ok) {
        throw new Error("Error request to server");
    }

    return await response.json();
  } catch (error) {
    console.error('Error patch router:', error);
    throw error;
  }
}

// Delete Routers
async function deleteRouters(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/routers/${id}/`, {
      method: "DELETE",
      headers: getHeaders(), // use the headers with token
    });

    if (!response.ok) {
      throw new Error(`Error deleting router with id ${id}`);
    }

    return { message: `Router with id ${id} deleted successfully` };
  } catch (error) {
    console.error("Error deleting router:", error);
    throw error;
  }
}

export{
    getRouters,
    postRouters,
    updateRouters,
    patchRouters,
    deleteRouters
}