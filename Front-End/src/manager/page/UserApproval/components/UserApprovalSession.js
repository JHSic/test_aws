import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../css/UserApprovalSession.css'

function UserApprovalSession() {

  // 항목데이터
  const colums = ["이름", "학번", "학년", "학과", "전화번호", "생년월일", "근무종류"];

   const [userData, setUserData] = useState([]);

   const getUserData = async () => {
    await axios.get("http://localhost:8080/users/userLists/wating")
    .then((res) => {
      setUserData(res.data);
      console.log(res.data);
    })
    .catch((err)=> {
      console.error({error:err});
    })
   }

   useEffect(() => {
    getUserData()
   }, []);


  //승인
  const approval = async () => {
    
    await axios.post("http://localhost:8080/users/register/response/admit", checkData)
    .then((res) => {
      alert("성공적으로 승인되었습니다.");
      setCheckData([]);
      getUserData();
    })
    .catch((err) => {
      alert("요청에 오류가 있습니다.");
      console.error({error:err})
    })
  }

  //거절
  const refuse = async () => {
    await axios.post("http://localhost:8080/users/register/response/refuse", checkData)
    .then((res) => {
      alert("성공적으로 거절했습니다.")
      setCheckData([]);
      getUserData();
    })
    .catch((err) => {
      alert("요청에 오류가 있습니다.")
      console.error({error:err})
    })
  }


  //보낼 데이터 담김, 선택한 학번
  const [checkData, setCheckData] = useState([]);

  const singleChecked = (e, index, value) => {
    let checked = e.target.checked;

    if(checked){
      setCheckData([...checkData, value])
      console.log("check")
    }
    else if(!checked && checkData.includes(value)){
      setCheckData(checkData.filter((el) => el !== value))
    }
    // console.log(checkData);
  }
  function approvalTable() {
    return (
      <table>
        <thead>
          <tr>
          <th></th>
          {colums.map((col, idx) => (
               <th className='table_header' key={idx}>{col}</th>
             ))}
          </tr>
        </thead>
        <tbody id='test'>
        {userData.map((user, id) => (
          <tr key={id}>
            <td>
              <input
              className='user-list'
              value={user.user_id}
              type='checkbox'
                onChange={(e) => singleChecked(e, id, e.target.value)}
              />
            </td>
            <td className='table_items'>{user.name}</td>
            <td className='table_items'>{user.user_id}</td>
            <td className='grade_items'>{user.grade}</td>
            <td className='major_items'>{user.major}</td>
            <td className='table_items'>{user.phone}</td>
            <td className='table_items'>{user.birth}</td>
            <td className='table_items'>{user.work_type_name}</td>
          </tr>
        ))}
        {console.log(checkData)}
        </tbody>
      </table>
    );
  }

  return (
    <div className='UserApprovalSession'>
      <div className='UserApprovalMain'>
        <div className='userApprovalTable'>
        <div className='UserApprovalMain-title'>회원가입 승인</div>
          {approvalTable()}
        </div>
        <div className='approvalBtn'>
          <button className='approval_btn' onClick={approval}>등록</button>
          <button className='approval_btn' onClick={refuse}>거부</button>
        </div>
        </div>
    </div>
  )
}

export default UserApprovalSession