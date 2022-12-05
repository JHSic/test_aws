import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../css/TemporalWorkReqeustSession.css'

function TemporalWorkReqeustSession() {
  //임시근로 요청 목록
    const [temporalData, setTemporalData] = useState([]);

    const getTemporalData = async() => {
      await axios.get("http://localhost:8080/overtime")
      .then((res) => {
        setTemporalData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error({error: err});
      })
    }

    //결근 요청 목록
    const [absenceData, setAbsenceData] = useState([]);

    const getAbsenceData = async () => {
      await axios.get("http://localhost:8080/absence")
      .then((res) => {
        setAbsenceData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log({error:err})
      })
    }

    useEffect(() => {
      getTemporalData();
      getAbsenceData();
    }, [])

    //임시근로 목록 체크
    const [overTimeCheck, setOverTimeCheck] = useState([]);

    const overTimeChecked = (e, index, value) => {
      let checked = e.target.checked;

      if(checked){
        setOverTimeCheck([...overTimeCheck, value])
        console.log("check")
      }
      else if(!checked && overTimeCheck.includes(value)){
        setOverTimeCheck(overTimeCheck.filter((el) => el !== value))
      }
      console.log(overTimeCheck);
    }

    //결근 목록 체크
    const [absenceCheck, setAbsenceCheck] = useState([]);

    const absenceChecked = (e, index, value) => {
      let checked = e.target.checked;

      if(checked){
        setAbsenceCheck([...absenceCheck, value])
        console.log("check")
      }
      else if(!checked && absenceCheck.includes(value)){
        setAbsenceCheck(absenceCheck.filter((el) => el !== value))
      }
      // console.log(absenceCheck);
    }
    
      // 임시근로 승인
      const temApprovalClicked = async() => {
        await axios.post("http://localhost:8080/overtime/admit",overTimeCheck)
        .then((res) => {
          setTemporalData(res.data);
          
          alert("승인되었습니다.");
        })
        .catch((err) => {
          
          console.log({error:err})
        })
      }
    
      // 임시근로 거부
      const temRefuseClicked = async() => {
        await axios.post("http://localhost:8080/overtime/refuse",overTimeCheck)
        .then((res) => {
          setTemporalData(res.data);
          alert("거부되었습니다.");
        })
        .catch((err) => {
          console.log({error:err})
        })
      }

      //결근 승인
      const absApprovalClicked = async() => {
        await axios.post("http://localhost:8080/absence/admit", absenceCheck)
        .then((res) => {
          alert("성공적으로 승인되었습니다.");
          setAbsenceCheck([]);
          getAbsenceData();
        })
        .catch((err) => {
          alert("요청에 오류가 있습니다.")
          console.log({error:err})
        })
      }
  
      //결근 거부
      const absRefuseClicked = async() => {
        await axios.post("http://localhost:8080/absence/refuse", absenceCheck)
        .then((res) => {
          alert("거부되었습니다.");
          setAbsenceCheck([]);
          getAbsenceData();
        })
        .catch((err) => {
          alert("요청에 오류가 있습니다.")
          console.log({error:err})
        })
      }

      function temporalList () {
        return(
          
          temporalData.map((data, id) => (
            <div className="temporalworker_element" key={id}>
              <input
                type='checkbox'
                value={data.overtime_index}
                onChange = {(e) => overTimeChecked(e, id, e.target.value)}
              />
              <div className="element_item">{data.name}</div>
              <div className="element_item">{data.user_id}</div>
              <div className="element_item">{data.work_start}</div>
              <div className="element_item">{data.work_end}</div>
              <div className="element_item">{data.work_type_name}</div>
            </div>
            
          ) )
        )
      }

      function absenceList () {
        return(
          <>
            {
            absenceData.map((data, id) => (
            <div className="temporalworker_element" key={id}>
              <input
                type="checkbox"
                value={data.absence_index}
                onChange={(e) => absenceChecked(e, id, e.target.value)}
              />
              <div className="element_item">{data.name}</div>
              <div className="element_item">{data.user_id}</div>
              <div className="element_item">{data.work_start}</div>
              <div className="element_item">{data.work_end}</div>
              <div className="element_item">{data.work_type_name}</div>
            </div>
          ))
        }
          </>
        );
      }

    
    
  return (
    <div className='TemporalWorkReqeustSession'>
      <div className='TemporalWorkReqeustMain'>
      <div className='temporalworker_temporal'>
        <div className='temporalworker_element_title'>
          임시 근로
        </div>
        <div className='temporalworker_contents'>
            {temporalList()}
          <div className='temporal_button'>
            <button className='temporal_btn' onClick={() => temApprovalClicked()}>승인</button>
            <button className='temporal_btn' onClick={() => temRefuseClicked()}>거부</button>
          </div>
        </div>
        
      </div>
      <div className='temporalworker_absence'>
        <div className='temporalworker_element_title'>
            결근
        </div>
        <div className='temporalworker_contents'>
            {absenceList()}
          <div className='temporal_button'>
            <button className='temporal_btn' onClick={absApprovalClicked}>승인</button>
            <button className='temporal_btn' onClick={absRefuseClicked}>거부</button>
          </div>
          {console.log(absenceCheck)}
        </div>
      </div>
      </div>
    </div>
  )
}

export default TemporalWorkReqeustSession