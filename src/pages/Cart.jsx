import React from 'react'
import {Button, Table,Modal,Form, Select, message} from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { PlusCircleOutlined,MinusCircleOutlined} from "@ant-design/icons"
import {useState,useEffect} from "react" 
import axios from 'axios'
import { API } from '../global'
import { useNavigate } from 'react-router-dom'
export default function Cart() {
    const dispatch=useDispatch()
    const [subTotal,setsubToal]=useState(0)
    const [billCharge,setbillCharge]=useState(false)
    const [quantity,setQuantity]=useState(1)
    const [productId,setproductId]=useState({})
    
    const navigate=useNavigate() 
    
    const cartItems=useSelector(state=>state.itemShop.cartItems)
    console.log(cartItems)

  const increaseQuantity=(itemId)=>{
    //   dispatch({type:"updateCart",payload:{...record,quantity:record.quantity+1}})
    //   setsubToal(subTotal + record.price )
    // setQuantity((prevItems) => prevItems.map(item) => item.id===itemId ? {...item,quantity:item.quantity+1} : item);
    setQuantity(quantity+1)
  }

  const decreaseQuantity=(record)=>{
    // if(record.quantity !==1 ){
    //     dispatch({type:"updateCart",payload:{...record,quantity:record.quantity -1}})
    // }
    // setsubToal(subTotal - record.price)
    if(quantity !==1 ){
        setQuantity(quantity-1)
    }
}
  
  useEffect(()=>{
    let temp=0
    cartItems.forEach((item)=>{
        temp=temp+item.price*1
    })
    setsubToal(temp)
  },[cartItems])
  
  const handleFinish = (values) => {
    const reqObject = {
        ...values,
        subTotal,
        cartItems: cartItems.map((item) => ({
            _id: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
        })),
        tax: Number((subTotal / 100) * 10),
        totalAmount: Number(subTotal + (subTotal / 100) * 10),
        userId: JSON.parse(localStorage.getItem("user-data"))._id,
    };
    // console.log(reqObject)
    axios.post(`${API}/bill/add-bill`,reqObject)
    .then((res)=>{
        console.log("add-bill res",res.data._id)
    message.success("bill created")
    navigate(`/bill?billId=${res.data._id}`)
  })
  .catch((err)=>{
    message.error("bill is not created")
})
}
    

  const columns=[
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title:"image",
        dataIndex:"image",
        render:(image)=>(<img src={image} alt="image" style={{width:"50px",height:"50px",objectFit:"contain"}}/>)
    },
    {
        title: "Price",
        dataIndex: "price"
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        render:(item)=>(
            <div>
                <button onClick={()=>increaseQuantity(item._id)}>+</button>
                <span>{quantity}</span>
                <button onClick={()=>decreaseQuantity(item._id)}>-</button>
            </div>
        )
        // render:(id,record = {quantity : 1})=>(
        //     <div>
        //         <PlusCircleOutlined className="mx-3" onClick={()=>increaseQuantity(record)} />
        //         {/* <b>{record.quantity}</b> */} <b>1</b>
               
        //         <MinusCircleOutlined className="mx-3" onClick={()=>decreaseQuantity(record)} />
                
        //     </div>
        // )
    }
]
    return (
    <div className='text-center'>
        <h1 className="text-center">Cart Items</h1>
        <Table  dataSource={cartItems} columns={columns} bordered pagination={false}/>
        
        <div className='d-flex justify-content-center flex-column'>
            <div>
                <h1>Sub Total: {subTotal}</h1>
            </div>
        </div>
       <Button type="primary" onClick={()=>setbillCharge(true)}>charge Bill</Button>

       <Modal title="Charge Bill" onCancel={()=>setbillCharge(false)} open={billCharge} footer={false}>
            <Form onFinish={handleFinish}>
                <Form.Item  name="customerName" label="Customer Name">
                    <input />
                </Form.Item>
                <Form.Item  name="customerPhone" label="Customer Ph no:">
                    <input />
                </Form.Item>
                <Form.Item  name="paymentMode" label="Payment Type">
                    <Select>
                        <Select.Option value="Cash">Cash</Select.Option>
                        <Select.Option value="Card">Card</Select.Option>
                        <Select.Option value="UPI">UPI</Select.Option>
                    </Select>
                </Form.Item>
                <div>
                    <h3>Total Amount:{subTotal}</h3>
                    <h3>tax:<b>RS : {((subTotal/100)*10).toFixed(2)}</b></h3>
                    <h3>Total:<b>RS : {(subTotal+ (subTotal/100)*10).toFixed(2)}</b></h3>
                </div>
                <div className="d-flex justify-content-end">
                    <Button htmlType='submit' type="primary">Generate Bill</Button>
                </div>
            </Form>
       </Modal>
        {/* <div>
           
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item)=>{
                        return(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div> */}
    </div>
      ) }

