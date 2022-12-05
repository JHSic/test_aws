import React from 'react'
import '../css/WorkerBottomMenu.css'
import { NavLink } from "react-router-dom";

function BottomMenu() {
  return (
    <div className='bottom-manu'>

      <div className='request-worker-link'>
        <NavLink to='/TemporaryWork'>
          <img src='/img/RequestWorker_ICON.png' alt='근로요청' />
          <span className='bottom-manu-title' >임시근로 요청</span>
        </NavLink>
      </div>

      <div className='schedule-table-link'>
        <NavLink to='/workerSchedule'>
          <img src='/img/ScheduleTable_ICON.png' alt='시간표' />
          <span className='bottom-manu-title'>근로 시간표</span>
        </NavLink>
      </div>

      <div className='worker-main-link'>
        <NavLink className='worker-main-link' to='/main'>
          <img src='/img/USER_ICON.png' alt='메인페이지' />
          <span className='bottom-manu-title'>메인</span>
        </NavLink>
      </div>

      <div className='schedule-register-link'>
        <NavLink to='/scheduleEnroll'>
          <img src='/img/ScheduleRegister_ICON.png' alt='시간표등록' />
          <span className='bottom-manu-title'> 시간표 등록</span>
        </NavLink>
      </div>

      <div className='user-info-link'>
        <NavLink to='/info'>
          <img src='/img/USER_ICON.png' alt='정보조회' />
          <span className='bottom-manu-title'>정보조회</span>
        </NavLink>
      </div>

    </div>
  )
}

export default BottomMenu