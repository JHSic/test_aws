import React, { useEffect, useState } from 'react'
import '../css/ScheduleEnrollPageMain.css'
import BottomMenu from '../../../../etc/Worker_Components/BottomMenu'
import WorkScheduleEnrollSession from './WorkScheduleEnrollSession'
import ScheduleHeader from './ScheduleHeader'
import EducationScheduleEnrollSession from './EducationScheduleEnrollSession'
import AccessSchedulePage from './AccessSchedulePage'
import dayjs from 'dayjs'
import axios from 'axios'

function ScheduleEnrollPageMain() {
  const [isClassSchedule, setisClassSchedule] = useState(true);
  const [currentTime, setCurrentTime] = useState(dayjs(new Date()));

  const [classModifiTimeData, setClassModifiTimeData] = useState({})
  const [workModifiTimeData, setWorkModifiTimeData] = useState({})

  const startClassModifiTime = classModifiTimeData ? dayjs(new Date(classModifiTimeData.edit_start)) : ''
  const endClassModifiTime = classModifiTimeData ? dayjs(new Date(classModifiTimeData.edit_end)) : ''

  const startWorkModifiTime = workModifiTimeData ? dayjs(new Date(workModifiTimeData.edit_start)) : ''
  const endWorkModifiTime = workModifiTimeData ? dayjs(new Date(workModifiTimeData.edit_end)) : ''

  const classPermission = startWorkModifiTime ? startClassModifiTime <= currentTime && currentTime < endClassModifiTime.add(1,'day') : ''
  const workPermission = startClassModifiTime ? startWorkModifiTime <= currentTime && currentTime < endWorkModifiTime.add(1,'day') : ''


  const getModifiTimeData = async() => {
    await axios.get("http://localhost:8080/temporal/")
    .then((res) => {
      setClassModifiTimeData(res.data[0])
      setWorkModifiTimeData(res.data[1])
    })
    .catch((err) => {
      console.error("error: " + {error: err} )
    })
  }

  useEffect(() => {
    getModifiTimeData()
  }, [])

  const toggleClass = () => {
    setisClassSchedule(true)
  }

  const toggleWork = () => {
    setisClassSchedule(false)
  }


  return (
    <div className='schedule-enroll-conteiner'>

      <div className='worker-schedule-enroll-header'>
        {
          isClassSchedule ? 
            <ScheduleHeader
              isClassSchedule ={isClassSchedule}
              toggleClass={toggleClass}
              toggleWork={toggleWork}
              startModifiTime={startClassModifiTime.format('YYYY.MM.DD')}
              endModifiTime={endClassModifiTime.format('YYYY.MM.DD')}
            />
          :
            <ScheduleHeader
              isClassSchedule ={isClassSchedule}
              toggleClass={toggleClass}
              toggleWork={toggleWork}
              startModifiTime={startWorkModifiTime.format('YYYY.MM.DD')}
              endModifiTime={endWorkModifiTime.format('YYYY.MM.DD')}
            />
        }
      </div>
      
      <div className='user-info-page'>
        <div className='worker-schedule-enroll-main' >
        {
          isClassSchedule ? 
            classPermission ? 
              <EducationScheduleEnrollSession 
                isClassSchedule={isClassSchedule}
              /> 
              :
              <AccessSchedulePage/>
          :
            workPermission ? 
              <WorkScheduleEnrollSession
                isClassSchedule={isClassSchedule}
              />
              :
              <AccessSchedulePage/>  
 
        }
          </div>
    </div>

      <div className='worker-schedule-enrollBottomMenu'>
        <BottomMenu />
      </div>

    </div>
  )
}

export default ScheduleEnrollPageMain