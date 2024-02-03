import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../global'
import Item from './Item'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [itemData,setitemData]=useState([])

  const dispatch=useDispatch()
  const cartItems=useSelector(state=>state.itemShop.cartItems)
  const navigate=useNavigate()
 
  useEffect(()=>{
  axios.get(`${API}/item/get-item`)
  .then(res=>{
    dispatch({type:"hideLoading"})
    setitemData(res.data)
  })
  .catch(err=>{
    dispatch({type:"hideLoading"})
    console.log("error in getting",err)
  })
 },[])

  useEffect(()=>{
   localStorage.setItem("cartItems",JSON.stringify(cartItems))
  },[cartItems])

  return (
    <div style={{
      display:"flex",
    flexWrap:"wrap",
    justifyContent:"center",
    gap:"20px",
    alignItems:"flex-start",
   marginTop:"20px"
    }}  >

      <div >
        <button type='button' className='btn btn-primary position-relative' onClick={()=>navigate("/cart")}>cart
        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger '>
          { cartItems.length }</span>
        </button>
      </div >

      {itemData.map((item,index)=>
        <Item item={item} key={index}/>
      )}
   
      </div>
  )
}
