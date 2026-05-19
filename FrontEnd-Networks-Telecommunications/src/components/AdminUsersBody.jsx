  import React, { useEffect, useState } from 'react';
  import { deleteUsers, getUsers, updateUsers } from '../services/usersApi';
  import "../styles/AdminUsersBody.css";

  function AdminUsersBody() {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    // State editing
    const [userID, setUserID] = useState(null);
    const [formData, setFormData] = useState({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      birth_date: "",
      phone_number: "",
      group: ""
    });

    useEffect(() => {
      async function list() {
        setIsLoading(true);
        try {
          const data = await getUsers();
          setUsers(data);
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setIsLoading(false);
        }
      }
      list();
    }, [reload]);

    const handleEditToggle = (user) => {
      if (userID === user.id) {
        setUserID(null);
      } else {
        setUserID(user.id);
        setFormData({
          username: user.username || "",
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          birth_date: user.birth_date || "",
          phone_number: user.phone_number || "",
          group: user.group || (user.groups && user.groups[0]) || "Standard"
        });
      }
    };

    // manage form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleUpdate(e, id) {
      e.preventDefault(); 
      setIsLoading(true);
      try {
        await updateUsers(formData, id);
        setReload(!reload);
        setUserID(null);
      } catch (error) {
        alert("Synchronization Failed");
      } finally {
        setIsLoading(false);
      }
    }

    async function handleDelete(id) {
      if (window.confirm("CRITICAL ACTION: Are you sure you want to permanently delete this user?")) {
        setIsLoading(true);
        await deleteUsers(id);
        setReload(!reload);
        setIsLoading(false);
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
            <span className="statusLabel">System Status:</span>
            <span className={`statusPulse ${isLoading ? 'isProcessing' : 'isActive'}`}></span>
            <span className="statusText">{isLoading ? "Synchronizing..." : "Active"}</span>
          </div>
        </header>

        <section className="registryTableContainer">
          <table className="registryTable">
            <thead className="registryTableHead">
              <tr className="registryHeaderRow">
                <th className="registryTh">System Handle</th>
                <th className="registryTh">Full Identity</th>
                <th className="registryTh">Network Email</th>
                <th className="registryTh">Birth Date</th> 
                <th className="registryTh">Total Cameras</th> 
                <th className="registryTh">Total Routers</th>
                <th className="registryTh">Access Level</th> 
                <th className="registryTh">Control Actions</th>

              </tr>
            </thead>
            <tbody className="registryTableBody">
              {users.map((user) => (
                <React.Fragment key={user.id}>
                  <tr className={`registryRow ${userID === user.id ? "isEditing" : ""}`}>
                    <td className="registryTd">
                      <div className="userHandleWrapper">
                        <div className="userIcon">{user.first_name?.charAt(0) || "U"}</div>
                        <span className="userHandle">@{user.username}</span>
                      </div>
                    </td>
                    <td className="registryTd identityCell">{user.first_name} {user.last_name}</td>
                    <td className="registryTd emailCell">{user.email}</td>
                    <td className="registryTd birthDateCell">{user.birth_date || "—"}</td>
                    <td className="registryTd cameraCountCell">{user.total_cameras}</td>
                    <td className="registryTd routerCountCell">{user.total_routers}</td>
                    <td className="registryTd roleCell">
                      <span className={`roleBadge badge--${user.group?.toLowerCase() || 'standard'}`}>
                        {user.group || (user.groups && user.groups[0]) || "Standard"}
                      </span>
                    </td>
                    <td className="registryTd actionCell">
                      <button 
                        className={`actionBtn editBtn ${userID === user.id ? "btn--abort" : ""}`} 
                        onClick={() => handleEditToggle(user)}
                      >
                        {userID === user.id ? "Abort" : "Edit"}
                      </button>
                      <button className="actionBtn deleteBtn" onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>

                  {/* edit panel */}
                  {userID === user.id && (
                    <tr className="expansionRow">
                      <td colSpan="6" className="expansionTd">
                        <form className="configPanel" onSubmit={(e) => handleUpdate(e, user.id)}>
                          <div className="configPanelHeader">
                            <h4 className="configPanelTitle">Editing Identity Parameters: {user.username}</h4>
                          </div>
                          
                          <div className="configGrid">
                            <div className="configGridItem">
                              <label className="configLabel">System Username</label>
                              <input className="configInput" name="username" value={formData.username} onChange={handleInputChange} />
                            </div>
                            <div className="configGridItem">
                              <label className="configLabel">Given Name</label>
                              <input className="configInput" name="first_name" value={formData.first_name} onChange={handleInputChange} />
                            </div>
                            <div className="configGridItem">
                              <label className="configLabel">Family Name</label>
                              <input className="configInput" name="last_name" value={formData.last_name} onChange={handleInputChange} />
                            </div>
                            <div className="configGridItem">
                              <label className="configLabel">Primary Email Address</label>
                              <input className="configInput" type="email" name="email" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="configGridItem">
                              <label className="configLabel">Birth Date</label>
                              <input className="configInput" name="birth_date" type="date" value={formData.birth_date} onChange={handleInputChange} />
                            </div>
                            <div className="configGridItem">
                              <label className="configLabel">Access Privilege Group</label>
                              <select className="configSelect" name="group" value={formData.group} onChange={handleInputChange}>
                                <option value="User">Standard User</option>
                                <option value="Administrator">Administrator</option>
                                <option value="Technician">Support Technician</option>
                              </select>
                            </div>
                          </div>

                          <div className="configActions">
                            <button type="submit" className="commitBtn" disabled={isLoading}>
                              {isLoading ? "Updating Engine..." : "Commit Synchronization"}
                            </button>
                          </div>
                        </form>
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