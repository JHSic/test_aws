import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/TemporaryWorkSession.css'
import WorkList from './WorkList'

function TemporaryWorkSession(){
    const [selectDate, setSelectDate] = useState()
    const [checkData, setCheckData] = useState([])
    const postData = []

    const selectDateHandler = (e) => {
        setSelectDate(e.target.value)
    }

    const requistAsenseHandler = () => {
        if(!selectDate){
            alert('날짜를 선택하세요')
        }
        else if(checkData.length === 0){
            alert('하나 이상 선택하세요')
        }
        else{
            checkData.map((p) => {
                let data = {
                    day: p.day,
                    end_time: selectDate + " " + p.end_time,
                    id: p.id,
                    start_time:  selectDate + " " + p.start_time,
                    type: p.type,
                    work_index: p.work_index,
                    work_type_name : p.work_type_name
                }
                postData.push(data)
            })
            requistAsense()
        }
    }

    // 결근 신청
    const requistAsense = async() => {
        await axios.get(`http://localhost:8080/absence/${sessionStorage.user_id}`, postData)
        .then((res) => {
            alert('요청되었습니다.')
        })
        .catch((err) => {
          console.error("error: " + {error: err} )
          alert('요청 실패')
        })
    }
    
    return(
        <div className='worker-temporary-session-container'>

            <div className='worker-temporary-session-select-date'>
                <input type='date' onChange={selectDateHandler}></input>
                {
                    selectDate ? 
                        '' 
                    :
                    <span>결근 신청 날짜 선택</span>
                }
            </div>

            <div className='worker-temporary-session-select-list'>
                <WorkList
                    selectDate={selectDate}
                    setCheckData={setCheckData}
                    checkData={checkData}
                />
            </div>

            <form className='worker-temporary-session-requist-button-box'>
                <button className='worker-temporary-sub-requist-button' onClick={requistAsenseHandler}>결근 요청</button>
            </form>

            <div className='worker-temporary-session-select-button'>
                <Link to='/SelectTempraryWork'>
                    <button>모집 근로 조회</button>
                </Link>
            </div>
        </div>
    )
}

export default TemporaryWorkSession;