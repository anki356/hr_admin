import React,{ useEffect, useState } from "react";
import axios from 'axios'
const useGetHook=(url)=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
useEffect(()=>{
    setLoading(true)
    let token=localStorage.getItem('token')
    const headers={"Authorization":"Bearer "+token}
axios.get(url,{headers}).then((response)=>{
setData(response.data)
}).catch((err)=>{
    setError(err)
}).finally(()=>{
    setLoading(false)
})

},[url])
return {data,loading,error}
}
export default useGetHook