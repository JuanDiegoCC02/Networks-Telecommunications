import React from 'react'

function AddCamera() {


  return (
    <div>

      <div><h3>Add New Camera Connection</h3></div>

      <div>

        <div>
         <h4>Camera Connection</h4>
        </div>

        <div>
          <label htmlFor=""> Camera Name </label>
          <input type="text" />
        </div>        
        <div>
          <label htmlFor=""> IP Access Camera </label>
          <input type="text" />
        </div>     
        <div>
          <label htmlFor=""> Camera Location </label>
          <input type="text" />
        </div>    
           <div>
          <label htmlFor=""> Camera Description </label>
          <input type="text" />
        </div>        
        <div>
          <label htmlFor=""> Camera Status </label>
          <select name="" id="">
            <option value="">select status</option>
            <option value="on">ON</option>
            <option value="off">OFF</option>
          </select>
        </div>

        <div>
          <button>Add Camera</button>
        </div>

      </div>

    </div>
  )
}

export default AddCamera