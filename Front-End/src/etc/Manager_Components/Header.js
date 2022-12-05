import React from 'react'
import '../css/ManagerHeader.css'
function Header() {
  const today = new Date();
  const mon = today.getMonth() + 1;

  return (
    <div className='Header'>
      <div className='Month'>{mon}</div>
      <div className='month_header'>월 근로 확인</div>
    </div>
  )
}

export default Header