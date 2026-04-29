import React, { useEffect, useState } from 'react';
import { deleteUsers, getUsers, updateUsers } from '../services/usersApi';
import "../styles/AdminUsersBody.css";

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
  const [editGroup, setEditGroup] = useState("");

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
      setEditBirthDate(user.birth_date || "");
      setEditPhoneNumber(user.phone_number || "");
      setEditGroup(user.role || (user.groups && user.groups[0]) || "Standard User");
    }
  };

  async function handleUpdate(id) {
    const obj = {
      username: editUsername,
      first_name: editFirstName,
      last_name: editLastName,
      email: editEmail,
      birth_date: editBirthDate,
      phone_number: editPhoneNumber,
      group: editGroup 
    };
    await updateUsers(obj, id); 
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
    <main className="usersManagementMain">
      <header className="usersManagementHeader">
        <div className="headerText">
          <h2 className="mainTitle">User Registry Engine</h2>
          <p className="subTitle">Monitoring and administrative synchronization of network accounts</p>
        </div>
        <div className="systemStatus">
          <span className="statusLabel">Database Connection:</span>
          <span className="statusPulse"></span>
          <span className="statusText">Active</span>
        </div>
      </header>

      <section className="registryTableContainer">
        <table className="registryTable">
          <thead>
            <tr>
              <th>System Handle</th>
              <th>Full Identity</th>
              <th>Network Email</th>
              <th>Birth Date</th> 
              <th>Access Level</th> 
              <th>Control Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <tr className={`registryRow ${userID === user.id ? "isEditing" : ""}`}>
                  <td>
                    <div className="userHandleWrapper">
                      <div className="userIcon">ID</div>
                      <span className="userHandle">@{user.username}</span>
                    </div>
                  </td>
                  <td className="identityCell">{user.first_name} {user.last_name}</td>
                  <td className="emailCell">{user.email}</td>
                  <td className="birthDateCell">{user.birth_date || "N/A"}</td>
                  <td className="roleCell">
                    <span className="roleBadge">
                      {user.group || (user.groups && user.groups[0]) || "Standard"}
                    </span>
                  </td>
                  <td className="actionCell">
                    <button className="actionBtn editBtn" onClick={() => handleEdit(user)}>
                      {userID === user.id ? "Abort" : "Edit"}
                    </button>
                    <button className="actionBtn deleteBtn" onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Inline Configuration Panel */}
                {userID === user.id && (
                  <tr className="expansionRow">
                    <td colSpan="6"> {/* Aumentado colSpan a 6 */}
                      <div className="configPanel">
                        <h4 className="configPanelTitle">Modify Identity Parameters</h4>
                        <div className="configGrid">
                          <div className="inputField">
                            <label>System Username</label>
                            <input value={editUsername} onChange={(e) => setEditUsername(e.target.value)} />
                          </div>
                          <div className="inputField">
                            <label>Given Name</label>
                            <input value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} />
                          </div>
                          <div className="inputField">
                            <label>Family Name</label>
                            <input value={editLastName} onChange={(e) => setEditLastName(e.target.value)} />
                          </div>
                          <div className="inputField">
                            <label>Primary Email</label>
                            <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                          </div>
                          <div className="inputField">
                            <label>Birth Date</label>
                            <input type="date" value={editBirthDate} onChange={(e) => setEditBirthDate(e.target.value)} />
                          </div>
                          <div className="inputField">
                            <label>System Group</label>
                            <select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                              <option value="Standard">Standard User</option>
                              <option value="Administrator">Administrator</option>
                              <option value="User">User</option>
                            </select>
                          </div>
                        </div>
                        <div className="configActions">
                          <button className="commitBtn" onClick={() => handleUpdate(user.id)}>
                            Commit Synchronization
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
      </section>
    </main>
  );
}

export default AdminUsersBody;