//  Get Cameras
async function getCameras() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/camerasGet/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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


//  Update Cameras
async function updateCameras(obj, id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/cameras-update/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Error updating camera");
    }

    return await response.json();
  } catch (error) {
    console.error("Error update camera:", error);
    throw error;
  }
}


// Delete Cameras 
async function deleteCameras(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/cameras/${id}/`, {
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
    console.error("Error deleting Camera:", error);
    throw error;
  }
}

export{
    getCameras,
    postCameras,
    updateCameras,
    deleteCameras
}