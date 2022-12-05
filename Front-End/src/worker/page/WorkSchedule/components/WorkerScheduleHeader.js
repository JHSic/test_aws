import React from 'react'
import { useNavigate } from 'react-router';
import '../css/WorkerScheduleHeader.css'
function WorkerScheduleHeader() {
    // 뒤로가기 동작 제거
    const navigate = useNavigate();
    function location_replace(){
      sessionStorage.removeItem('user_id');
      navigate(`/`);
    }

  return (
      <div className='worker-schedule-header-session'>

        <button className='worker-schedule-header-session-logout-button' onClick={location_replace}>로그아웃</button>

        <img className="worker-schedule-header-sessionmain-icon" alt="main-icon" src="/img/ICON.jpg" />

        <div className="worker-schedule-header-session-title">
          <span>
            수업 및 근로 시간표
          </span>
        </div>
      </div>
  )
}

export default WorkerScheduleHeader