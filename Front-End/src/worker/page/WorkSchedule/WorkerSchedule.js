import React, { useState } from 'react'

import BottomMenu from '../../../etc/Worker_Components/BottomMenu'
import './css/WorkerSchedule.css'
import ScheduleTable from './components/ScheduleTable';
import WorkerScheduleHeader from './components/WorkerScheduleHeader';

function WorkerSchedule()  {

  const [isClassSchedule, setisClassSchedule] = useState(true);
  const [workerSchedule, setWorkerSchedule] = useState([
    {
      type:'class',
      id:'11:00월',
      day:'월',
      time:'11:00',
    },
    {
      type:'class',
      id:'11:30월',
      day:'월',
      time:'11:30'
    },
    {
      type:'class',
      id:'12:00월',
      day:'월',
      time:'12:00'
    },
    {
      type:'work',
      id:'13:00목',
      day:'목',
      time:'13:00'
    },
    {
      type:'work',
      id:'13:30목',
      day:'목',
      time:'13:30'
    }
  ])


    return (
        <div className='worker-schedule-conteiner'>
    
          <div className='worker-schedule-header'>
            <WorkerScheduleHeader/>
          </div>
          
          <div className='worker-schedule-main' onClick={(e)=> e.preventDefault()}>
            <ScheduleTable 
              isClassSchedule={isClassSchedule}
              workerSchedule={workerSchedule}
            />
          </div>
    
          <div className='worker-schedule-bottomMenu'>
            <BottomMenu />
          </div>
    
        </div>
    )
}
export default WorkerSchedule;