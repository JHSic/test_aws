import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import '../css/WorkList.css'

const WorkList = ({selectDate, setCheckData, checkData}) => {
    const [workData, setWorkData] = useState([])

    useEffect(() => {
        getWorkTableData()
    }, [])

    // 근로 데이터 받아오기
    const getWorkTableData = async() => {
        await axios.get(`http://localhost:8080/work/List/${sessionStorage.user_id}`)
        .then((res) => {
            setWorkData(res.data)
        })
        .catch((err) => {
          console.error("error: " + {error: err} )
        })
    }

    // 모집 신청 데이터 핸들러
    const checkDataHandler = (e) => {
        let checkState = e.target.checked
        let index = e.target.value

        if(checkState){
            setCheckData([...checkData, workData[index]])
        }
        else if(!checkState && checkData.includes(workData[index])){
            setCheckData(checkData.filter(el => el !== workData[index]))
        }
    }

    const checkDay = (day) => {
        dayjs.locale('ko')
        let selectDay = dayjs(selectDate).format('dddd')[0];
        let isDay =  selectDay === day
        return isDay;
    }

    return(
        <ul>
            {
                selectDate ?
                    workData.map((value, index) => (
                        checkDay(value.day) ?
                            <ul  key={index}>
                                <label className='worker-temporary-session-work-list'>
                                    <input type='checkbox' value={index} onClick={checkDataHandler}></input>
                                    <li>
                                        <span>{selectDate}</span>
                                        <span>{value.day}요일</span>
                                        <span>{value.start_time}</span>
                                        <span>~</span>
                                        <span>{value.end_time}</span>
                                        <span>{value.work_type_name}</span>
                                    </li>
                                </label>
                            </ul>
                        :
                            ''
                    ))
                :
                    ''
            }
        </ul>
    )
}

export default WorkList