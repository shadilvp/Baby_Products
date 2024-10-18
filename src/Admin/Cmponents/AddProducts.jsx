import React from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'

const AddProducts = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">
        <Navbar />
        <div>
            Content
        </div>
      </div>
    </div>
  )
}

export default AddProducts
