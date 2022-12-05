import "../css/ScheduleEnrollManagerSession.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ScheduleHeader from "./ScheduleHeader";
import WorkScheduleEnrollSession from "./WorkScheduleEnrollSession";
import EducationScheduleEnrollSession from "./EducationScheduleEnrollSession";
import "../css/ScheduleEnrollManagerSession.css";

function ScheduleEnrollManagerSession() {
  const [isClassSchedule, setisClassSchedule] = useState(true);
  const [userList, setUserList] = useState([]); //근로자 이름 목록 받아오기
  const [userData, setUserData] = useState(); //선택된 근로자의 아이디값 받기

  const toggleClass = () => {
    setisClassSchedule(true);
  };

  const toggleWork = () => {
    setisClassSchedule(false);
  };

  //근로자 이름 목록 받아오기
  const getUserName = async () => {
    await axios
      .get("http://localhost:8080/users/workList")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.error({ error: err });
      });
  };

  useEffect(() => {
    getUserName();
  }, []);

  //선택한 근로자의 아이디값 가져오기
  const setUserDataHandler = (e) => {
    setUserData(e.target.value);
  };

  return (
    <div className="ScheduleEnrollManagerSession">
      <div className="ScheduleEnrollManagerMain">
        <div className="ScehduleEnrollMain-title">시간표 등록 / 수정</div>
        <div className="main">
          <div className="scheduleSearch">
            <select className="selectWorker"
              onChange={setUserDataHandler}>
              {userList.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="scheduleAll">
            <div className="worker-schedule-enroll-header">
              {isClassSchedule ? (
                <ScheduleHeader
                  isClassSchedule={isClassSchedule}
                  toggleClass={toggleClass}
                  toggleWork={toggleWork}
                />
              ) : (
                <ScheduleHeader
                  isClassSchedule={isClassSchedule}
                  toggleClass={toggleClass}
                  toggleWork={toggleWork}
                />
              )}
            </div>
            <div className="user-info-page">
              <div className="worker-schedule-enroll-main">
                {isClassSchedule ? (
                  <EducationScheduleEnrollSession
                    isClassSchedule={isClassSchedule}
                    userData={userData}
                  />
                ) : (
                  <WorkScheduleEnrollSession
                    isClassSchedule={isClassSchedule}
                    userData={userData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleEnrollManagerSession;
