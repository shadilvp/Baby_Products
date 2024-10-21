import React, { useContext } from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../Hooks/Context'

const EditProducts = () => {
  const {id} = useParams();
  const {product} = useContext(ProductContext);

  const products = product.find((items)=> items.id.toString() === id.toString())
  return (
    <div>
      <div className="flex">
        <Sidebar/>
          <div className="flex-1">
            <Navbar />
              <div>
                
              </div>
          </div>
      </div>
    </div>
  )
}

export default EditProducts
