import { Cookies } from 'react-cookie';
const cookies = new Cookies();

// funtion to get headers with token if exists
const getHeaders = () => {
  const token = cookies.get('access_token');
  console.log("Token recuperado de la cookie (Users):", token);
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
};

//  Get Users
async function getUsers() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/users/", {
      method: "GET",
      headers: getHeaders(), 
    });

    if (!response.ok) {
      throw new Error("Error fetching user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}

//  Post Users
 async function postUsers(obj) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/users/", {
            method: "POST",
            headers: getHeaders(), 
            body: JSON.stringify(obj),
        });

        const data = await response.json();

        if (!response.ok) {
            throw { response: { data } };
        }

        return data;
    } catch (error) {
        console.error("Error PostUsuarios:", error);
        throw error;
    }
}

//  Update Users
async function updateUsers(obj, id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Error updating user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error update user:", error);
    throw error;
  }
}

// Delete Users 
async function deleteUsers(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
      method: "DELETE",
      headers: getHeaders(), 
    });

    if (!response.ok) {
      throw new Error(`Error deleting user with id ${id}`);
    }

    return { message: `User with id ${id} deleted successfully` };
  } catch (error) {
    console.error("Error deleting User:", error);
    throw error;
  }
}

export{
    getUsers,
    postUsers,
    updateUsers,
    deleteUsers
}