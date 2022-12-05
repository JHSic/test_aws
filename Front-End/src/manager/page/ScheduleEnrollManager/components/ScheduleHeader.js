import React from 'react'

const ScheduleHeader = ({toggleClass, toggleWork, isClassSchedule}) => {

  return (
    <div className='worker-scheduleHeaderheader-container'>
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