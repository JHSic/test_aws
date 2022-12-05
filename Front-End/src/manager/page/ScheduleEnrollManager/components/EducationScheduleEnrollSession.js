import axios from 'axios'
import React, {useState} from 'react'
import ScheduleTable from './ScheduleTable'

function EducationScheduleEnrollSession({isClassSchedule, userData}) {
  const [postData, setPostData] = useState([])

  const postClassScheduleData = async() => {
    await axios.post(`http://localhost:8080/enrollment/postEnroll/${userData}`, postData)
    .then((res) => {
      console.log(res.data);
      alert("수정 완료")
    })
    .catch((err) => {
      console.error("error: " + {error: err})
    })
  }
  
  return (
    <div className='schedule-table-box'>

      <div className='schedule-table'>
        <ScheduleTable 
          isClassSchedule={isClassSchedule}
          userData={userData}
          setPostData={setPostData}
        />
      </div>
      <button className='scheduleEdit-btn' onClick={postClassScheduleData}>
        수정
      </button>
  </div>
  )
}

export default EducationScheduleEnrollSession