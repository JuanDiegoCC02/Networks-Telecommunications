// HOOKS Get Users
async function GetUsers() {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/usersGet/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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


// HOOKS Post Users
async function PostUsers(obj) {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/users/", {
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
    console.error("Error PostUsuarios:", error);
    throw error;
  }
}


// HOOKS Update Users
async function UpdateUsers(obj, id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users-update/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
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


//HOOKS Delete Users 
async function DeleteUsers(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
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
    console.error("Error deleting User:", error);
    throw error;
  }
}

export{
    GetUsers,
    PostUsers,
    UpdateUsers,
    DeleteUsers
}