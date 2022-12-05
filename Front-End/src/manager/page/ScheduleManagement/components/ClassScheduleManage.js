import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ClassScheduleManage.css";
import DatePicker, { registerLocale } from "react-datepicker"; // 한국어적용
import ko from "date-fns/locale/ko"; // 한국어적용
import "react-datepicker/dist/react-datepicker.css";

function ClassScheduleManage() {
  registerLocale("ko", ko);
  // const [classStartDate, setClassStartDate] = useState(new Date()); //선택한 날짜값
  const [classEndDate, setClassEndDate] = useState(new Date());
  const [temporal, setTemporal] = useState({}); //저장되있는 수정기간 값

  const getTemporal = async () => {
    await axios
      .get("http://localhost:8080/temporal")
      .then((res) => {
        setTemporal(res.data[0]);
      })
      .catch((err) => {
        console.error({ error: err });
      });
  };

  useEffect(() => {
    getTemporal();
  }, []);

  const ModificationClicked = async () => {
    await axios
      .post("http://localhost:8080/temporal/class", temporal)
      .then((res) => {
        console.log(res);
        alert("수정되었습니다.");
      })
      .catch((err) => {
        alert("데이터 전송에 실패했습니다.");
        console.log(err);
      });
  };

  return (
    <div className="ClassScheduleManage">
      <div className="periodcontents">
        <div className="periodTitle">수정 가능 기간</div>
        <div className="periodResult">
          {temporal.edit_start} ~ {temporal.edit_end}
        </div>
      </div>
      <div className="Modificationperiod">
        <div className="periodDate">
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
        <div className="periodMark">~</div>
        <div className="periodDate">
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
      <div className="modificationBtn">
        <button
          className="mofification_btn"
          onClick={() => ModificationClicked()}
        >
          변경
        </button>
      </div>
    </div>
  );
}

export default ClassScheduleManage;
