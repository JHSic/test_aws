import axios from 'axios';
import React, { useEffect, useState } from 'react'

function UserNameList() {
    const [userList, setUserList] = useState([]);
    const [classSchedule, setClassSchedule] = useState([]);

    //근로자 이름 목록 가져오기
    const getUserName = async() => {
        await axios.get("http://localhost:8080/users/workList")
        .then((res) => {
            setUserList(res.data);
        })
        .catch((err) => {
            console.error({error:err});
        })
    }

    useEffect(() => {
        getUserName()
    }, [])

    //근로자별 수업 시간표 가져오기
    const onChangeUser = async(value) => {
        await axios
        .get(`http://localhost:8080/work/${value}`)
        .then((res) => {
            setClassSchedule(res.data);
            console.log(res.data);
        })
        .catch((err) => {
            console.error({error : err});
        });
    }

    console.log(classSchedule);

  return (
    <select
        className='selectWorker'
        onChange={onChangeUser}>
        {userList.map((user) => (
            <option
                key={user.user_id}
                value={user.user_id}
                // onChange={(e) => {
                //     onChangeUser(e.target.value)
                // console.log(e.target.value)}}
                onChange={(e) => onChangeUser(e.target.value)}
            >
            {user.name}
            </option>
        ))}
    </select>
  )
}

export default UserNameList