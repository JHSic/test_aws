import React, { useEffect } from 'react'
import './css/NotFoundPage.css'

function NotFoundPage() {

  useEffect(()=>{
    if(sessionStorage.getItem("user_id") === null){
      goBack()
      console.log("null")
    }
    else{
      if(sessionStorage.getItem("user_id") === 'admin'){
        goManagerrMain()
        console.log("null")
      }
      else{
        goWorkerMain()
      }
    }
    console.log("not found page")
  },[])

  
  const goBack = () => {
    const link_url = "/";
    sessionStorage.removeItem('user_id')
    window.location.replace(link_url);
  }

  const goWorkerMain = () => {
    const link_url = "/main";
    window.location.replace(link_url);
  } 

  const goManagerrMain = () => {
    const link_url = "/managermain";
    window.location.replace(link_url);
  } 

  
  return (
    <div className='NotFoundPage'>

    </div>
  )
}

export default NotFoundPage