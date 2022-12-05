import React, {useEffect, useState} from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import '../css/Calender.css'

const Calender = ({day, selectMonth}) => {
    
    const date = ['일', '월', '화', '수', '목', '금', '토']

    const startDate = dayjs(`${String(day.get('y'))}-${String(day.get('month')+1)}-1`, "YYYY-MM-DD");
    const startDay = startDate.get('day');
    const endDay = startDate.daysInMonth();

    const dayNum = [];
    const dayCell = [];
    const weekCell = [];

    const [calenderData, setCalenderData] = useState([
        {
            d:'2022-11-01', 
            charge:27480,
            time:3
        }, 
        {
            d:'2022-11-06',
            charge:27480,
            time:3
        }
    ]);

    useEffect(()=>{
    },[selectMonth])

    const postCalendaData = async() => {
        await axios.post("http://localhost:8080/users/update", day)
        .then((res) => {
            setCalenderData(res.data[0])
        })
        .catch((err) => {
          console.error({error:err})
        })
    }

    // 해당 달의 총 일자 매핑
    const setCellArr = () => {
        for(let i=1; i<=endDay; i++){
            dayNum[i] = i;
        }
    }

    // 해당 날짜의 일급과 시간 매핑
    function setDaycell(){
        let checkDate = dayjs(`${String(day.get('y'))}-${String(day.get('month')+1)}`, "YYYY-MM")

        setCellArr();

        let count = 0; 
        let cellSize = 1;
        let workCount = 0;
        let len = calenderData.length;
        for(let i=0; i<6; i++){ // 주 
            for(let j=0; j<7; j++){ // 일
                // 42개의 달력 칸중에서 일자가 없는 칸
                if((count < startDay-1)||(endDay+startDay-2 < count)){
                    dayCell.push(
                        <span className={`cell-day-none`} key={count}></span>
                    )
                }
                else{
                    // 일한 날인 경우
                    let dataDate = dayjs(`${calenderData[workCount].d}`, "YYYY-MM")

                    if(checkDate === dataDate){
                        if((workCount < len)&&(dataDate.get('d') === cellSize)){
                            dayCell.push(
                                <span className={`cell-day-work`} key={count}>
                                    {dayNum[cellSize]}
                                    <span className='day-work-time'>{calenderData[workCount].time}시간</span>
                                    <span className='day-work-charge'>{calenderData[workCount].charge}원</span>
                                </span>
                            )
                            workCount++;
                        }
                    }
                    // 일한 날이 아닌 경우
                    else{
                        dayCell.push(
                            <span className={`cell-day`} key={count}>
                                {dayNum[cellSize]}
                            </span>
                        )
                    }
                    cellSize++;
                }
                count ++; 
            }
        }

        return(
            dayCell
        )

    }

    // 주 단위 색 표시를 위해서 주 단위로 다른 클래스 이름을 갖을 수 있게 매핑
    const setWeekCell = () => {

        setDaycell()

        for(let i=1, p=0; i<=6; i++){
            let temp = [];
            for(let j=0; j<7; j++, p++){
                temp.push(
                    dayCell[p]
                )
            }
            weekCell.push(
                <span className={`cell-week-${i}`} key={p}>
                    {temp}
                </span>
            )
        }

        return(
            weekCell
        )
    }
    
    return (
        <div className='calender-container'>
            {/* 상단 요일 찍어주는 부분 */}
            <div className='week-line'>
            {
                date.map((days, index) => (
                    <span className='week-line-content' key ={index}>{days}</span>
                ))
            }
            </div>
            {/* 내부 테이블 출력 부분 */}
            <div className='cell-content'>
                {setWeekCell()}
            </div>
        </div>
    );
};

export default Calender;