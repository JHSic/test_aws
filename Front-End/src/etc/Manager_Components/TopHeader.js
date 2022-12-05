import React, {NavLink} from 'react'
import { useNavigate } from 'react-router';
import '../../etc/css/TopHeader.css'

function TopHeader() {
  const navigate = useNavigate();
  
  function location_replace(){
    navigate(`/`);
  }

  return (
    <div className='TopHeader'>
        <div className='logout_btn' onClick={location_replace}>
          로그아웃
        </div>
    </div>
  )
}

export default TopHeader