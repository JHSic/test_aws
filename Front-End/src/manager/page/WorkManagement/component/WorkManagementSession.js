import React, { useEffect, useState } from "react";
import "../css/WorkManagementSession.css";
import axios from "axios";

function WorkManagementSession() {
  const [editDate, setEditDate] = useState({}); //날짜 선정
  const [newData, setNewData] = useState({
    //근무종류 및 시급 새로 추가
    work_type_name: "",
    change_date: "",
    wage: "",
  });
  const colums = ["근무종류", "변경일자", "시급"]; // 항목데이터
  const [typeData, setTypeData] = useState([]); //등록된 시급목록 받아오기

  //현재 시급 목록 받아와서 뿌리기
  const getTypeData = async () => {
    await axios
      .get("http://localhost:8080/wage")
      .then((res) => {
        setTypeData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.error({ error: err });
      });
  };

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

  //근로종류 받아오기 (select)
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

  useEffect(() => {
    getTypeData();
    getWorkType();
  }, []);

  
  //등록된 시급 데이터 삭제
  const workTypeDelete = async () => {
    await axios
      .post("http://localhost:8080/wage/delete", checkData)
      .then((res) => {
        console.log(checkData);
        alert("삭제");
        getTypeData();
      })
      .catch((err) => {
        console.error({ error: err });
        alert("삭제 실패");
      });
  };

  console.log(checkData);

  const plusWageTemporalData = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  //새 시급 데이터 넣기
  const plusClicked = async () => {
    await axios
      .post("http://localhost:8080/wage", newData)
      .then((res) => {
        alert("추가되었습니다.");
        setNewData({
          work_type_name: "",
          change_date: "",
          wage: "",
        });
      })
      .catch((err) => {
        alert("데이터 전송에 실패했습니다.");
        console.log(err);
      });
  };

  useEffect(() => {
    setNewData({
      ...newData,
      change_date: editDate,
    });
  }, [editDate]);

  // console.log(newData);

  function workTypeTable() {
    return (
      <table>
        <thead>
          <tr>
            <th className="workTypetbody"></th>
            {colums.map((col, idx) => (
              <th className="table_header" key={idx}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="test" className="workTypetbody">
          {typeData.map((types, id) => (
            <tr key={id}>
              <td>
                <input
                  className="types-list"
                  value={types.wage_index}
                  type="checkbox"
                  onChange={(e) => singleChecked(e, id, e.target.value)}
                />
              </td>
              <td className="worktype_items">{types.work_type_name}</td>
              <td className="worktype_items">{types.change_date}</td>
              <td className="worktype_items">{types.hour_wage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="WorkManagementSession">
      <div className="WorkManagementMain">
        <div className="WorkMngMain-title">근로 항목 및 시급 관리</div>
        <div className="workTypeList">
          <div className="workTypeTable">{workTypeTable()}</div>
          <button
            className="workTypeDelete_btn"
            onClick={() => workTypeDelete()}
          >
            삭제
          </button>
        </div>
        {/* 근로 종류 및 시급 새로 추가 */}
        <div className="workTypePlus">
          <input
            className="amount_won"
            type="text"
            name="work_type_name"
            onChange={plusWageTemporalData}
            required
          ></input>
          <input
            className="temporary-date"
            name="change_date"
            type="date"
            required
            onChange={plusWageTemporalData}
          />
          <input
            className="amount"
            type="text"
            placeholder="0"
            value={newData.wage || ""}
            name="wage"
            onChange={plusWageTemporalData}
            required
          />
          {console.log(newData)}
          <div className="amuont_won">원</div>
          <button className="workplus_btn" onClick={() => plusClicked()}>
            근로 추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkManagementSession;
