import React, {useState} from 'react'
import axios from 'axios'
import '../css/EducationScheduleEnrollSession.css'
import ScheduleTable from './ScheduleTable'

function EducationScheduleEnrollSession({isClassSchedule}) {
  const [postData, setPostData] = useState([])
  
  const postScheduleData = async() => {
    await axios.post(`http://localhost:8080/enrollment/postEnroll/${sessionStorage.user_id}`, postData)
    .then((res) => {
      alert("수정 완료");
    })
    .catch((err) => {
      console.error("error: " + {error: err} )
    })
  }

  return (
    <div className='schedule-table-box'>

      <div className='schedule-table'>
        <ScheduleTable 
          isClassSchedule={isClassSchedule}
          setPostData={setPostData}
        />
      </div>

      <button className='schedule-table-sendButton' onClick={postScheduleData}>
        수정
      </button>
  </div>
  )
}

export default EducationScheduleEnrollSession