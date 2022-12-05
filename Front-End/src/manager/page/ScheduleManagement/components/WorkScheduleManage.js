import React, {useEffect, useState} from 'react'
import '../css/ClassScheduleManage.css'
import DatePicker ,{ registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function WorkScheduleManage() {
  registerLocale("ko", ko);
  const [temporal, setTemporal] = useState({})
  
  const getTemporal = async () => {
    await axios.get("http://localhost:8080/temporal")
    .then((res) => {
      setTemporal(res.data[1]);
    }
    )
    .catch((err) => {
      console.error({error:err})
    })
  }

  useEffect(() => {
    getTemporal()
  }, [])

  const ModificationClicked = async() => {
    await axios
      .post("http://localhost:8080/temporal/work", temporal)
      .then((res) => {
        console.log(res);
        alert("수정되었습니다.");
      })
      .catch((err) => {
        alert("데이터 전송에 실패했습니다.");
        console.log(err);
      });
  }

  return (
    <div className='WorkScheduleManage'>
      <div className='periodcontents'>
        <div className='periodTitle'>수정 가능 기간</div>
        <div className='periodResult'>
        {temporal.edit_start} ~ {temporal.edit_end}
        </div>
      </div>
      <div className='Modificationperiod'>
        <div className='periodDate'>
        <input
            className="temporary-date"
            type="date"
            data-date-format="YYYY-MM-DD"
            value={temporal.edit_start || ""}
            required
            onChange={(e) => {
              setTemporal({
                ...temporal,
                edit_start: e.target.value,
              });
            }}
          />
        </div>
        <div className='periodMark'>~</div>
        <div className='periodDate'>
        <input
            className="temporary-date"
            type="date"
            data-date-format="YYYY-MM-DD"
            value={temporal.edit_end || ""}
            required
            onChange={(e) => {
              setTemporal({
                ...temporal,
                edit_end: e.target.value,
              });
            }}
          />
          {console.log(temporal)}
        </div>
      </div>
      <div className='modificationBtn'>
        <button className='mofification_btn'
        onClick={() => ModificationClicked()}>변경</button>
      </div>
    </div>
  )
}

export default WorkScheduleManage