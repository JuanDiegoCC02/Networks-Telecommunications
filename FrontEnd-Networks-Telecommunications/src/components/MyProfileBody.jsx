import React, { useEffect, useState } from 'react';
import { getUsers, updateUsers } from '../services/usersApi';

function MyProfileBody() {
  // helper function to read cookies directly from the browser
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // get the Id from your login cookie
  const userId = Number(getCookie('id'));
  
  const [myUser, setMyUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  //  states for the editing form
  const [editUsername, setEditUsername] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editBirthDate, setEditBirthDate] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');

  useEffect(() => {
    async function requestUser() {
      // logic: only proceed if userId exists in cookies
      if (!userId) {
        console.warn("User ID not found in cookies. Make sure you are logged in.");
        return;
      }

      try {
        const data_users = await getUsers(`api/usersGet/`);
        
        // find the specific user that matches the Id from the cookie
        const info_user = data_users.find(u => u.id === userId);
        
        if (info_user) {
          setMyUser(info_user);
          console.log("Profile loaded for user:", info_user.username);
        }
      } catch (error) {
        console.error("Error fetching user data from API:", error);
      }
    }
    requestUser();
  }, [reload, userId]);

  const handleEditClick = () => {
    if (myUser) {
      setOpenEdit(true);
      setEditUsername(myUser.username || '');
      setEditFirstName(myUser.first_name || '');
      setEditLastName(myUser.last_name || '');
      setEditEmail(myUser.email || '');
      setEditBirthDate(myUser.birth_date || '');
      setEditPhoneNumber(myUser.phone_number || '');
    }
  };

  async function Edit(id) {
    const updatedUser = {
      username: editUsername,
      first_name: editFirstName,
      last_name: editLastName,
      email: editEmail,
      birth_date: editBirthDate,
      phone_number: editPhoneNumber,
    };
    
    try {
      await updateUsers(updatedUser, id);
      setReload(!reload); 
      setOpenEdit(false);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  }

  return (
    <div>
      <ul className='UlPerfil'>
        {myUser ? (
          <li key={myUser.id} className='LiPerfil'>
            <div>
              <h2>{myUser.username}</h2>
              <div>
                <p>Name: {myUser.first_name} {myUser.last_name}</p>
                <p>Email: {myUser.email}</p>
                <p>Birth Date: {myUser.birth_date}</p>
                <p>Phone Number: {myUser.phone_number}</p>
              </div>
            </div>
          </li>
        ) : (
          <p>Loading profile information...</p>
        )}
      </ul>

      <button className='' onClick={handleEditClick}> 
        Edit Profile 
      </button>

      {openEdit && (
        <div className='EditProfile'>
          <h2>Edit Profile</h2>
          
          <div>
            <label>Username:</label>
            <input type="text" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} />
          </div>
          <div>
            <label>First Name:</label>
            <input type="text" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
          </div>
          <div>
            <label>Birth Date:</label>
            <input type="date" value={editBirthDate} onChange={(e) => setEditBirthDate(e.target.value)} />
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="tel" value={editPhoneNumber} onChange={(e) => setEditPhoneNumber(e.target.value)} />
          </div>
          
          <button onClick={() => Edit(myUser.id)}>Save Changes</button>
          <button onClick={() => setOpenEdit(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default MyProfileBody;