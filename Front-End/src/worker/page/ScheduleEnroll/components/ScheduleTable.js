import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/ScheduleTable.css'

function ScheduleTable({isClassSchedule, setPostData}) {
    const [checkValue, setCheckValue] = useState([])   
    const [classTableData, setClassTableData] = useState([])   
    const [workTableData, setWorkTableData] = useState([])   

    useEffect(()=>{
        getClassTableData()
        getWorkTableData()
    }, [])

    useEffect(() => {
        setPostData(checkValue);
    }, [checkValue])

    useEffect(()=>{
        setTable()
    }, [classTableData,workTableData])
    
    const setTable = () => {
        isClassSchedule ?
            settingClassTable()
        :
            settingWorkTable()
    }

    const settingClassTable = () => {
        settingTable(workTableData)
        settingTable(classTableData)
    }

    const settingWorkTable = () => {
        settingTable(classTableData)
        settingTable(workTableData)
    }
        
    const getClassTableData = async() => {
        await axios.get(`http://localhost:8080/enrollment/${sessionStorage.user_id}`)
        .then((res) => {
            setClassTableData(res.data)
        })
        .catch((err) => {
          console.error("error: " + {error: err} )
        })
    }
    
    const getWorkTableData = async() => {
        await axios.get(`http://localhost:8080/work/${sessionStorage.user_id}`)
        .then((res) => {
            setWorkTableData(res.data)
        })
        .catch((err) => {
          console.error("error: " + {error: err} )
        })
    }

    const date = ['일', '월', '화', '수', '목', '금', '토']

    const settingTable = (scheduleList) => {
        let target = '';
        let inputTarget = '';
        let id = '';
        for(let j=0; ; j++){
            if(scheduleList[j] == null) break;

            id = scheduleList[j].time + scheduleList[j].day;

            target = document.getElementById(id);
            inputTarget = document.getElementById(id+"in");
            console.log("setting  " + id)

            target.click();

            console.log("안터짐")
            if(isClassSchedule){
                if(scheduleList[j].type === "class"){
                    target.style.background='#828282';
                }
                else{
                    target.style.background='#E0D1FF';
                    inputTarget.disabled = true;
                }
            }
            else{
                if(scheduleList[j].type === "class"){
                    target.style.background='#828282';
                    inputTarget.disabled = true;
                }
                else{
                    target.style.background='#E0D1FF';
                }
            }
            
        }
        const newArr = [...scheduleList];
        setCheckValue(newArr)
    }


    const onClickHandler = (e, value, t, d) =>{

        let checked = e.target.checked
        let type = isClassSchedule ? "class" : "work"
        const newValue = { type:type, id:value, day:d, time:t };
        if(value === undefined) return

        if(value){
            changeBoxColor(value, checked)
        }

        if(checked){
            let newArr = [...checkValue, newValue];
            setCheckValue(newArr);
        }
        else{
            setCheckValue(checkValue.filter((arr)=> arr.id !== value ))
        }
        setPostData(checkValue)
    }


    const changeBoxColor = (value, check) => {
        if(check){
            let targetTag = document.getElementById(value)
            if(isClassSchedule){
                targetTag.style.background='#828282';
            }
            else{
                targetTag.style.background='#E0D1FF';
            }
        }
        else{
            let targetTag = document.getElementById(value)
            targetTag.style.background='';
        }

    }


    // 시간 테이블 생성
    const startTime = 9;
    const endTime = 20;
    const setCheckBoxTable = () => {
        const timeTable = []
        for(let i=startTime; i<=endTime; i+=0.5){
            let temp = []
            for(let j=0; j<date.length; j++){
                let time = i;
                let day = date[j];

                if(i%1 !== 0){
                    if(i<10){
                        let timeSet = i-0.5
                        time = "0"+timeSet+':30'
                    }
                    else{
                        time = i-0.5+':30'
                    }
                    console.log(time)
                    if(j===0){
                        temp.push(
                            <span key={i+date[j]+3} className={`schedule-timeTable-contant`} ></span>
                        )
                    }
                    temp.push(
                        <label 
                            key={i+date[j]+1} 
                            className={`schedule-checkBox-Table-contant`} 
                            id={time+date[j]}
                        >
                            <span>
                                <input 
                                    className='scadule-check' 
                                    type="checkbox"
                                    id={time+date[j]+"in"}
                                    value={time+date[j]}
                                    onClick={(e)=>
                                        onClickHandler(e, e.target.value, time, day)
                                    }
                                >
                                </input>
                            </span>
                        </label>

                    )
                }
                else{
                    if(i<10){
                        time = "0"+i+':00'
                    }
                    else{
                        time = i+':00'
                    }

                    console.log(time)
                    if(j===0){
                        temp.push(
                            <span key={i+':00'+date[j]+3}  className={`schedule-timeTable-contant`} >{i}</span>
                        )
                    }
                    temp.push(
                        <label 
                            key={i+date[j]+1} 
                            className={`schedule-checkBox-Table-contant`}  
                            id={time+date[j]}
                        >
                            <span>
                                <input 
                                    className='scadule-check' 
                                    id={time+date[j]+"in"}
                                    type="checkbox"
                                    value={time+date[j]}
                                    onClick={(e)=>
                                        onClickHandler(e, e.target.value, time, day)
                                    }
                                >
                                </input>
                            </span>
                        </label>

                    )
                }
            }

            timeTable.push(
                <div 
                    className={`schedule-checkBox-Table-contants`} 
                    key={i+'t'} 
                >
                    {temp}
                </div>
            )
        }
        
        return(
            timeTable
        )
    }

  return (
    <div className='schedule-container'>
      <div className='schedule-week-line-container'>
          {    
            date.map((days, index) => (
              <span className='schedule-week-line' key ={index+'w'}>{days}</span>
            ))
          }
      </div>

      <div className='schedule-table-container'>
        <div className='schedule-checkBox-Table-container'>
            {
                setCheckBoxTable()
            }
        </div>

      </div>
    </div>
  )
}

export default ScheduleTable