import React from 'react'
import { Row, Col, Form, Input, Button, message } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../global'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const loading=useSelector((state)=>state.itemShop.Loading)  
    console.log("loading",loading)
    const handleFinish=(values)=>{
        console.log(values)
        dispatch({type:"showLoading"})  
        axios.post(`${API}/user/login`,values)
        .then((res)=>{
            message.success("Login Success")
            console.log(res)
            localStorage.setItem("user-data",JSON.stringify(res.data))
            navigate("/home")
        })
        .catch(err=>{
            console.log("err",err)
            dispatch({type:"hideLoading"})
            message.error("Login Failed")
        }) 
        .finally(() => {
            dispatch({ type: "hideLoading" });
          });
    }
    

    return (
        <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
            <Col xs={24} sm={20} lg={8} >
                <Form onFinish={handleFinish}>
                    <h1 className='text-center'>Big Basket</h1>
                    <h4>Login</h4>
                  
                    {loading ? (
                     <div className="spinner-border" role="status">
                     <span className="visually-hidden">Loading...</span>
                   </div> ):(
                  
                  <div>
                     <Form.Item name="userId" label="user Id" >
                     <Input id="username" placeholder='jack@gmail.com'/>
                 </Form.Item>
           
                 <Form.Item name="password" label="password" >
                     <Input id="password" placeholder='Jack@123'/>
                 </Form.Item>
 
                 <Button htmlType='submit' type="primary">Login</Button>   
                 <p>1 jeya@123 ps</p>
                 </div> )
                   }

                
                </Form>

            </Col>
        </Row>
    )
}

// export default function Login() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const loading = useSelector((state) => state.itemShop.itemSlice);
  
//     const handleFinish = async (values) => {
//       console.log(values);
//       dispatch({ type: "showLoading" });
  
//       try {
//         const res = await axios.post(`${API}/user/login`, values);
//         message.success("Login Success");
//         console.log(res);
//         localStorage.setItem("user-data", JSON.stringify(res.data));
//         navigate("/home");
//       } catch (err) {
//         console.log("err", err);
//         message.error("Login Failed");
//       } finally {
//         dispatch({ type: "hideLoading" });
//       }
//     };
  
//     return (
//       <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
//         <Col xs={24} sm={20} lg={8}>
//           <Form onFinish={handleFinish}>
//             <h1 className="text-center">Big Basket</h1>
//             <h4>Login</h4>
//             {loading ? (
//               <div className="spinner-border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             ) : (
//               <div>
//                 <Form.Item name="userId" label="user Id">
//                   <Input id="username" placeholder="jack@gmail.com" />
//                 </Form.Item>
  
//                 <Form.Item name="password" label="password">
//                   <Input id="password" placeholder="Jack@123" />
//                 </Form.Item>
  
//                 <Button htmlType="submit" type="primary">
//                   Login
//                 </Button>
//               </div>
//             )}
//           </Form>
//         </Col>
//       </Row>
//     );
//   }
  
