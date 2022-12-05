import React from 'react'
import '../css/ScheduleHeader.css'
import { useNavigate } from 'react-router';

const ScheduleHeader = ({toggleClass, toggleWork, isClassSchedule, startModifiTime, endModifiTime}) => {
    // 뒤로가기 동작 제거
  const navigate = useNavigate();
  function location_replace(){
    sessionStorage.removeItem('user_id');
    navigate(`/`);
  }

  return (
    <div className='worker-scheduleHeaderheader-container'>

        <button className='scheduleHeaderheader-logout-button' onClick={location_replace}>로그아웃</button>
        
        <div className='scheduleHeaderheader-modifiable-box'>
          {
            isClassSchedule?
            <div className='modifiable-title'>수업 시간표 수정 기간</div>
            :
            <div className='modifiable-title'>근로 시간표 수정 기간</div>
          }
          <div className='modifiable-time'>
            { startModifiTime }
            ~
            { endModifiTime }

          </div>
        </div>
        <div className='scheduleHeaderheader-modify-button-box'>

          <button 
            className='class-button' 
            style ={{background : `${isClassSchedule ? "#E0D1FF" : "none"}`}}
            onClick={toggleClass}
          >
              수업 시간표 수정
          </button>

          <button 
            className='work-button' 
            style ={{background : `${isClassSchedule ? "none" : "#E0D1FF"}`}} 
            onClick={toggleWork}
          >
            근로 시간표 수정
          </button>

        </div>
    </div>
  )
}
export default ScheduleHeader