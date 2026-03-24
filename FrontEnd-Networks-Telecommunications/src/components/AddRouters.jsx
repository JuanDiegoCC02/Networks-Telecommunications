import React from 'react'

function AddRouters() {
  return (
    <div>
        <div>
          <h2>Add New Routers Connection</h2>
        </div>

        <div>
          <div>
            <h4> Routers Connection </h4>
          </div>

          <div>
            <label htmlFor=""> Name </label>
            <input type="text" />
          </div>

          <div>
            <label htmlFor=""> IP Address </label>
            <input type="text" />
          </div>

          <div>
            <label htmlFor=""> MAC Address </label>
            <input type="text" />
          </div>

          <div>
            <label htmlFor=""> Brand </label>
            <input type="text" />
          </div>

          <div>
            <label htmlFor=""> Model </label>
            <input type="text" />
          </div>

          <div>
            <select name="" id="">
              <option value="">Select Location</option>
              <option value="San José">San José</option>
              <option value="Cartago">Cartago</option>
              <option value="Heredia">Heredia</option>
              <option value="Alajuela">Alajuela</option>
              <option value="Limón">Limón</option>
              <option value="Puntarenas">Puntarenas</option>
              <option value="Guanacaste">Guanacaste</option>
            </select>
          </div>

          <div>
            <select name="" id="">
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

        <div>
          <button>Add Router</button>
        </div>

    </div>
  )
}

export default AddRouters