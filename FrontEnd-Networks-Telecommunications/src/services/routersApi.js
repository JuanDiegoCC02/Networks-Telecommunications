//  Get Cameras
async function getRouters() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/routers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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


//  Post Cameras
async function postRouters(obj) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/routers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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


//  Update Cameras
async function updateRouters(obj, id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/routers/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
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

// patch cameras
async function patchRouters(obj, id) {
  try {
    // CAMBIO: Quité "-update" de la URL
    const response = await fetch(`http://127.0.0.1:8000/api/routers/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
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

// Delete Cameras 
async function deleteRouters(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/routers/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting user with id ${id}`);
    }

    return { message: `User with id ${id} deleted successfully` };
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