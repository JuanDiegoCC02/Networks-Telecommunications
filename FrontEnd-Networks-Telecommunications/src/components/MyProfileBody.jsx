import React, { useEffect, useState } from 'react';
import { getUsers, updateUsers } from '../services/usersApi';

function MyProfileBody() {
  // get the ID from cookies 
  const userId = Number(CookieStore.getItem('userID'));
  
  const [myUser, setMyUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // states for editing
  const [editUsername, setEditUsername] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editBirthDate, setEditBirthDate] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');

  useEffect(() => {
    async function requestUser() {
      if (!userId) return;
      try {
        const data_users = await getUsers(`api/usersGet/`);
        
        const info_user = data_users.find(u => u.id === userId);
        
        setMyUser(info_user);
        console.log("My User Info:", info_user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    requestUser();
  }, [reload, userId]);

  // function to populate form fields and open modal
  const handleEditClick = () => {
    if (myUser) {
      setOpenEdit(true);
      setEditUsername(myUser.username);
      setEditFirstName(myUser.first_name);
      setEditLastName(myUser.last_name);
      setEditEmail(myUser.email);
      setEditBirthDate(myUser.birth_date);
      setEditPhoneNumber(myUser.phone_number);
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
      console.error("Error updating user:", error);
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
          <p>Loading profile...</p>
        )}
      </ul>

      {/* bttn to show edit profile section */}
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