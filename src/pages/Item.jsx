import { Card, Spin } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/ItemSlice'
const {Meta} = Card

export default function Item({item,index}) {
    
  const [Loading,setLoading]=useState(true)
    const dispatch=useDispatch()
    // const {cartItems,Loading}=useSelector((state)=>state.itemShop.item)
    const handleCart=(item)=>{
    //   dispatch({type:"addToCart",payload:item})
       setLoading(true)
      console.log("add to cart")
      dispatch(addToCart(item))
      // .then(()=>setLoading(true))
    }
    
    return (
    <div key={index}>
      {!Loading ?  <Spin className="spinner-border" role="status" />  :
      
        <Card  style={{width: 250,marginTop:"50px"}} hoverable cover={<img style={{height:"250px",width:"100%",objectFit:"contain"}} src={item.image} alt={item.name}/>}>
            
            <Meta title={item.name} description={item.description}/>
            <h4>Price: {item.price}</h4>
            <button className='btn btn-primary' onClick={()=>handleCart(item)}>Add to Cart</button>
        </Card>

      
      }
                
    </div>
  )
}
