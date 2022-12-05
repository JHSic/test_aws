import React, {useState, useEffect} from 'react'
import '../css/WokerMainSession.css'
import Calender from './Calender';
import axios from 'axios';
import dayjs from "dayjs";

const WorkerMainPage = () => {
  const [attend, setAttend] = useState();
  const [day, setDay] = useState(dayjs);
  const [selectYear, setSelectYear] = useState(day.get("year"))
  const [selectMonth, setSelectMonth] = useState(day.get("month")+1)
  const [totalTime, setTotalTime] = useState(0)
  const [totalSalary, setTotalSalary] = useState(0);
  const [totalWorkData, serTotalWorkData] = useState(
    {
      totalTime:20,
      totalSalary:30000.
    }
  )

  useEffect(()=>{
    isAttend()
  },[])

  // 각 일 별 시간 임금
  const getTotalWorkData = async() => {
      await axios.post("http://localhost:8080/users/update", day)
      .then((res) => {
          serTotalWorkData(res.data[0])
      })
      .catch((err) => {
        console.error({error:err})
      })
  }

  // 출 퇴근 여부
  const isAttend = async() => {
    await axios.get(`http://localhost:8080/users/commute/${sessionStorage.getItem('user_id')}`)
    .then((res) => {
      if(res.data[0].work_state === 1){
        attendData()
      }
      setAttend(res.data[0].work_state)
    })
    .catch((err) => {
      console.error({error:err})
    })
  }

  const [attendTime, setAttendTime] = useState();
  const attendData = async() => {
    await axios.get(`http://localhost:8080/commute/${sessionStorage.getItem('user_id')}`)
    .then((res) => {
      setAttendTime(res.data[0].commute_time)
    })
    .catch((err) => {
      console.error({error:err})
    })
  }

  const addDay = () => {
    if(selectMonth+1 > 12){
      setDay(day.set('y', selectYear+1))
      setSelectYear(selectYear+1)

      setDay(day.set('M', 1))
      setSelectMonth(1)
    }
    else{
      setDay(day.set('M', selectMonth+1))
      setSelectMonth(selectMonth+1)
    }
  } 

  const subDay = () => {
    if(selectMonth-1 < 1){
      setDay(day.set('y', selectYear-1))
      setSelectYear(selectYear-1)
      
      setDay(day.set('M', 12))
      setSelectMonth(12)
    }
    else{
      setDay(day.set('M', selectMonth-1))
      setSelectMonth(selectMonth-1)
    }
  } 
  
  return (
    <div className='worker-session-container'>

      <div className='display-attend'>
          {
            attend===1 ?
            "출근"
             : 
            "퇴근 중"
          }
      </div>

      <div className='display-month-year'>
        <button onClick={subDay} className='display-month-left-allow'><img src='/img/Shedule_Left_Arrow.png'></img></button>
        {selectYear}년 {selectMonth}월
        <button onClick={addDay} className='display-month-ringt-allow'><img src='/img/Shedule_Right_Arrow.png'></img></button>
      </div>

      <div className='worker-session-schedule-table'>
        <Calender 
          day={day}
          selectMonth={selectMonth}
        />
      </div>

      <div className='worker-session-statistics'>

        <span className='worker-session-statistics-time'>
          <span>월 근로시간 </span>
          <span>
            {totalWorkData.totalTime}시간
          </span>
        </span>

        <span className='worker-session-statistics-salary'>
          <span>월 근로장학 금액</span>
          <span>
            {totalWorkData.totalSalary}원
          </span> 
        </span>

      </div>

    </div>
  );
}

export default WorkerMainPage