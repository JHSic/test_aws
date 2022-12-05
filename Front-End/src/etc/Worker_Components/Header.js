import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router';
import '../css/WorkerHeader.css'
function Header() {
    // 뒤로가기 동작 제거

    function location_replace(){
      const link_url = "/";
      sessionStorage.removeItem('user_id')
      window.location.replace(link_url);
    }

  return (
    <div className='worker-header-container'>
      <div className='worker-header'>

        <button className='logout-button' id='location_replace' onClick={location_replace}>로그아웃</button>

        <img className="main-icon" alt="main-icon" src="/img/ICON.jpg" />

      </div>
    </div>
  )
}

export default Header