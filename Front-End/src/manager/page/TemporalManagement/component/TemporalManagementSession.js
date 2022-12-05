import "../css/TemporalManagementSession.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function TemporalManagementSession() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const daylist = ["일", "월", "화", "수", "목", "금", "토"];
  const day = daylist[today.getDay()];

  //근로종류 받아오기
  const [workType, setWorkType] = useState([]);
  const getWorkType = async () => {
    await axios
      .get("http://localhost:8080/workType")
      .then((res) => {
        setWorkType(res.data);
      })
      .catch((err) => {
        console.error({ error: err });
      });
  };

  //추가 근로 모집 데이터 불러오기
  const [temporalData, setTemporalData] = useState([]);

  const getRecruit = async () => {
    await axios
      .get("http://localhost:8080/recruit")
      .then((res) => {
        setTemporalData(res.data);
      })
      .catch((err) => {
        console.error({ error: err });
      });
  };

  useEffect(() => {
    getWorkType();
    getRecruit();
  }, []);

  //삭제할 데이터
  const [checkData, setCheckData] = useState([]);

  //삭제할 데이터 담김
  const singleChecked = (e, index, value) => {
    let checked = e.target.checked;

    if (checked) {
      setCheckData([...checkData, value]);
      console.log("check");
    } else if (!checked && checkData.includes(value)) {
      setCheckData(checkData.filter((el) => el !== value));
    }
  };
  console.log(checkData);
  //삭제
  const DeleteClicked = async () => {
    await axios
      .post("http://localhost:8080/recruit/delete", checkData)
      .then((res) => {
        console.log(checkData);
        alert("삭제");
        getRecruit();
      })
      .catch((err) => {
        console.error({ error: err });
        console.log(checkData);
        alert("삭제 실패");
      });
  };

  //새로운 모집 데이터 등록
  const [recruitData, setRecruitData] = useState({
    work_type_index: "",
    work_start: "",
    work_end: "",
    recruit_worker: "",
  });

  const onChangeRecruit = (e) => {
    setRecruitData({
      ...recruitData,
      [e.target.name]: e.target.value,
      work_start: recDate + " " + start,
      work_end: recDate + " " + end,
    });
  };

  const TemporalEnrollClicked = async () => {
    await axios
      .post("http://localhost:8080/recruit", recruitData)
      .then((res) => {
        alert("임시 근로 모집글이 등록되었습니다.");
        setRecruitData({
          work_type_index: "",
          work_start: "",
          work_end: "",
          recruit_worker: "",
        });
        getRecruit();
      })
      .catch((err) => {
        alert("데이터 전송에 실패했습니다.");
        console.log(err);
      });
  };


  function TemporalList() {
    return (
      <div>
        {temporalData.map((data, id) => (
          <div className="recruit_list_element" key={id}>
            <input
              key={id}
              type="checkbox"
              value={data.recruit_index}
              onChange={(e) => singleChecked(e, id, e.target.value)}
            />
            <div className="recruit_elements">{data.work_start}</div>
            <div className="recruit_elements">{data.work_end}</div>
            <div className="recruit_elements">{data.work_type_name}</div>
            <div className="recruit_elements">{data.recruit_worker}</div>
            <div className="recruit_elements">{data.applyment_worker}</div>
          </div>
        ))}
      </div>
    );
  }

  const [recDate, setRecDate] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  return (
    <div className="TemporalManagementSession">
      <div className="TemporalManagementMain">
        <div className="TemporalMngMain-title">임시 근로 모집 목록</div>
        <div className="currentTime">
          {year}년 {month}월 {date}일 {day}요일
        </div>
        <div className="TemporalListMain">
          <div className="TemporalList">{TemporalList()}</div>
          <div className="temporalDelete">
            <button className="delete_btn" onClick={DeleteClicked}>
              삭제
            </button>
          </div>
        </div>
        <div className="TemporalTimeSet">
          <input
            className="temporary-date"
            name="work_start"
            type="date"
            required
            onChange={(e) => {
              setRecDate(e.target.value);
              console.log(e.target.value);
            }}
          />
          <div className="temporal_time">
            <div className="start_time">
              <input
                className="temporal_select"
                name="work_start"
                form="H:mm"
                type="time"
                step="1800"
                required
                onChange={(e) => {
                  setStart(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <input
                className="temporal_select"
                name="work_end"
                form="H:mm"
                type="time"
                step="1800"
                required
                onChange={(e) => {
                  setEnd(e.target.value);
                  {
                    console.log(e.target.value);
                  }
                }}
              />
            </div>
            <select
              className="temporal_select"
              onChange={onChangeRecruit}
              name="work_type_index"
            >
              {workType.map((type) => (
                <option key={type.work_type_index} value={type.work_type_index}>
                  {type.work_type_name}
                </option>
              ))}
            </select>
            <select
              className="temporal_select"
              onChange={onChangeRecruit}
              name="recruit_worker"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <div className="temporal_enroll">
              <button
                className="temporal_enroll_btn"
                onClick={TemporalEnrollClicked}
              >
                모집 추가
                {/* {console.log(recruitData)}/ */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemporalManagementSession;
