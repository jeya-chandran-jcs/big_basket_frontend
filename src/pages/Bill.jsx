import React, { useEffect,  useState } from 'react'
import { API } from '../global'
import { Button, message } from 'antd'
import axios from 'axios'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import { useSearchParams } from 'react-router-dom'

export default function Bill() {
    const [billData,setbillData]=useState([])
    let [pramas]=useSearchParams()
    const [selectedBills,setSelectedBills]=useState(null)
    const componentRef=React.useRef(null)
    
    const getAllBills=()=>{
        axios.get(`${API}/bill/get-one-bill?billId=${pramas.get("billId")}`)
        .then((res)=>{
            setbillData([res.data])
        })
        .catch((err)=>{
            message.error("something went wrong in get  bills")
        })
    }
    
    useEffect(()=>{
        getAllBills()
    },[])

    const handlePrint=useReactToPrint({
        content:()=>componentRef.current
    })

    const reactToPrintContent=React.useCallback(()=>{
        return componentRef.current
    },[componentRef.current])

  return (
        <div>    
            <h1>Bill Details</h1>
            <table className="table table-bordered" ref={componentRef}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ph no</th>
                        <th>Price</th>
                        <th>subTotal</th>
                    </tr>
                </thead>
                <tbody>
    {billData.map((item,index) => (
        <tr key={index}>
            <td>{item.customerName}</td>
            <td>{item.customerPhone}</td>
            <td>
                {item.cartItems.map((cartItem) => (
                    <div key={cartItem._id}>
                        {cartItem.name} (Rs: {cartItem.price})
                    </div>
                ))}
            </td>
            <td>Rs: {item.subTotal}</td>
        </tr>
    ))}
</tbody>


            </table>
            <Button type="primary" onClick={handlePrint}> print bill</Button>

            <ReactToPrint
            content={reactToPrintContent}
            documentTitle="AwesomeFileName"
            // onAfterPrint={handleAfterPrint}
            // onBeforeGetConetnt={handleOnBeforeGetContent}
            // onBeforePrint={handleBeforePrint}
            removeAfterPrint
            // trigger={reactToPrintTrigger}
            />
        </div> 
  )
}
