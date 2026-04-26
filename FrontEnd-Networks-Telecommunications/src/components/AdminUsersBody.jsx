import React, { useEffect, useState } from 'react';
import { deleteUsers, getUsers, updateUsers } from '../services/usersApi';

function AdminUsersBody() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

  const [userID, setUserID] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editBirthDate, setEditBirthDate] = useState("");
  const [editPhoneNumber, setEditPhoneNumber] = useState("");

  useEffect(() => {
    async function list() {
      const data = await getUsers();
      setUsers(data);
    }
    list();
  }, [reload]);

  const handleEdit = (user) => {
    if (userID === user.id) {
      setUserID(null);
    } else {
      setUserID(user.id);
      setEditUsername(user.username);
      setEditFirstName(user.first_name);
      setEditLastName(user.last_name);
      setEditEmail(user.email);
      setEditBirthDate(user.birth_date);
      setEditPhoneNumber(user.phone_number);
    }
  };

  async function handleUpdate(id) {
    const obj = {
      username: editUsername,
      first_name: editFirstName,
      last_name: editLastName,
      email: editEmail,
      birth_date: editBirthDate,
      phone_number: editPhoneNumber
    };
    await updateUsers(id, obj);
    setReload(!reload);
    setUserID(null);
  }

  async function handleDelete(id) {
    if (window.confirm("CRITICAL ACTION: Are you sure you want to permanently delete this user?")) {
      await deleteUsers(id);
      setReload(!reload);
    }
  }

  return (
    <div className="adminUsersContainer">
      <header className="adminUsersHeader">
        <h2 className="adminUsersTitle">User Management Engine</h2>
        <p className="adminUsersSubtitle">Administrative override and profile synchronization</p>
      </header>

      <div className="adminUsersTableWrapper">
        <table className="adminUsersTable">
          <thead>
            <tr>
              <th>System ID / User</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Contact Node</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <tr className={`userRow ${userID === user.id ? "rowEditing" : ""}`}>
                  <td>
                    <div className="userNameCell">
                      <span className="userStatusDot"></span>
                      <span className="userBadge">@{user.username}</span>
                    </div>
                  </td>
                  <td className="textPrimary">{user.first_name} {user.last_name}</td>
                  <td className="textSecondary">{user.email}</td>
                  <td className="textMono">{user.phone_number || "NO_DATA"}</td>
                  <td className="tableActions">
                    <button className="btnEdit" onClick={() => handleEdit(user)}>
                      {userID === user.id ? "Abort" : "Edit"}
                    </button>
                    <button className="btnDelete" onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Inline Expansion Form */}
                {userID === user.id && (
                  <tr className="editRowExpanded">
                    <td colSpan="5">
                      <div className="editUserForm">
                        <div className="editFormGrid">
                          <div className="fieldBox">
                            <label>Username Handle</label>
                            <input value={editUsername} onChange={(e) => setEditUsername(e.target.value)} placeholder="e.g. quantum_user" />
                          </div>
                          <div className="fieldBox">
                            <label>Given Name</label>
                            <input value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} placeholder="First Name" />
                          </div>
                          <div className="fieldBox">
                            <label>Family Name</label>
                            <input value={editLastName} onChange={(e) => setEditLastName(e.target.value)} placeholder="Last Name" />
                          </div>
                          <div className="fieldBox">
                            <label>Network Email</label>
                            <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="user@domain.com" />
                          </div>
                          <div className="fieldBox">
                            <label>Registry Date</label>
                            <input type="date" value={editBirthDate} onChange={(e) => setEditBirthDate(e.target.value)} />
                          </div>
                          <div className="fieldBox">
                            <label>Direct Line</label>
                            <input value={editPhoneNumber} onChange={(e) => setEditPhoneNumber(e.target.value)} placeholder="+1 000-0000" />
                          </div>
                        </div>
                        <div className="editFormActions">
                          <button className="btnSaveUpdate" onClick={() => handleUpdate(user.id)}>
                            Commit Changes
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsersBody;