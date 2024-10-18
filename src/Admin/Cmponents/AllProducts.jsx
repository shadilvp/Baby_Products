import React from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'

const AllProducts = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar/>
          <div className="flex-1">
            <Navbar />
              <div>
                Content
              </div>
          </div>
      </div>
    </div>
  )
}

export default AllProducts
