import React, { useEffect, useState } from 'react';
import { getMyStats, getUsers, updateUsers } from '../services/usersApi';
import '../styles/MyProfileBody.css';

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
  const [totalCameras, setTotalCameras] = useState(0)
  const [totalRouters, setTotalRouters] = useState(0)

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

        const stats = await getMyStats()

        setTotalCameras(stats.total_cameras)
        setTotalRouters(stats.total_routers)
        
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
    <div className='FullContainerProfile'>
      <ul className='UlProfile'>
        {myUser ? (
          <li key={myUser.id} className='LiProfile'>
            <div className='FullContarinerInfoProfile'>
              <h2 className='TitleUsernameProfile'>{myUser.username}</h2>
              <div className='ContarinerInfoProfile'>
                <p className='FullNameProfile'>Name: {myUser.first_name} {myUser.last_name}</p>
                <p className='EmailProfile'>Email: {myUser.email}</p>
                <p className='BirthDateProfile'>Birth Date: {myUser.birth_date}</p>
                <p className='PhoneNumberProfile'>Phone Number: {myUser.phone_number}</p>

                 <div className='ProfileStatCard'>
                <span className='ProfileStatLabel'> Cameras </span>
                <span className='ProfileStatValue'>{totalCameras}</span>
              </div>

              <div className='ProfileStatCard'>
                <span className='ProfileStatLabel'> Routers </span>
                <span className='ProfileStatValue'>{totalRouters}</span>
              </div>
              </div>
            </div>
          </li>
        ) : (
          <p className='LoadProfileInfo'>Loading profile information...</p>
        )}
      </ul>

      <button className='EditProfileButton' onClick={handleEditClick}> 
        Edit Profile 
      </button>

      {/* show modal only if openedit is true */}
      {openEdit && (
        <div className='ModalOverlay'>
          <div className='FullContainerEditProfile'>
            <h2 className='TitleEditProfile'>Edit Profile</h2>
            
            {/* grid layout for form inputs */}
            <div className='ModalGridInputs'>
              <div className='ContainerSecondEditProfile'>
                <label className='labelEditProfile'>Username:</label>
                <input className='inputEditProfile' type="text" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} />
              </div>
              <div className='ContainerSecondEditProfile'>
                <label className='labelEditProfile'>First Name:</label>
                <input className='inputEditProfile' type="text" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
              </div>
              <div className='ContainerSecondEditProfile'>
                <label className='labelEditProfile'>Last Name:</label>
                <input className='inputEditProfile'  type="text" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
              </div>
              <div className='ContainerSecondEditProfile'>
                <label className='labelEditProfile'>Email:</label>
                <input className='inputEditProfile' type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              </div>
              <div className='ContainerSecondEditProfile'>
                <label className='labelEditProfile'>Birth Date:</label>
                <input className='inputEditProfile' type="date" value={editBirthDate} onChange={(e) => setEditBirthDate(e.target.value)} />
              </div>
              <div className='ContainerSecondEditProfile'>
                <label className='labelEditProfile'>Phone Number:</label>
                <input className='inputEditProfile'  type="tel" value={editPhoneNumber} onChange={(e) => setEditPhoneNumber(e.target.value)} />
              </div>
            </div>
            
            {/* bottom action buttons */}
            <div className='ModalActions'>
              <button className='SaveChangesButton' onClick={() => Edit(myUser.id)}>Save Changes</button>
              <button className='CancelButton' onClick={() => setOpenEdit(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfileBody;