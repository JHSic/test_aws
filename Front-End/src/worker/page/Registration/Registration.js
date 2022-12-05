import './css/Registration.css'
import React, { useState , useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router';
import axios from "axios"
import DepartmentList from './component/DepartmentList';
import BankList from './component/BankList';
import WorkTypeList from './component/WorkTypeList';

// 은행 종류를 선택으로 하면 은행이 변경될 때 데이터 업로드 필요
function Registration() {
  const [selectDepartments, setSelectDepartments] = useState([]);
  const [selectBanks, setSelectedBanks] = useState([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);

  const [user, setUser] = useState({
    user_id: "",
    password: "",
    name: "",
    grade: "",
    phone: "",
    account: "",
    birth: "",
    work_type_index: "",
    bank_index: "",
    department_index: ""
  });

  const onChangeUser = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value,
    });
    console.log(user);
  };

  useEffect(() => {
    setUser({
      ...user,
      department_index: selectDepartments,
    });
  }, [selectDepartments])

  useEffect(() => {
    setUser({
      ...user,
      work_type_index: selectedWorkTypes,
    });
  }, [selectedWorkTypes])

  useEffect(() => {
    setUser({
      ...user,
      bank_index: selectBanks,
    });
  }, [selectBanks])

  const postUser = async () => {
    const response = await axios.post('http://localhost:8080/users/register', user);
    console.log(response.data);
  }

  const navigate = useNavigate();

  const backSpace = () =>{
    navigate('/')
  }

  return (
    
    <div className='registration-userInfo'>

      <div className='cancel-registration-button'>
        <button onClick={() => backSpace()} >로그인</button>
      </div>

      <div className='registration-login-logo'>
        <img className="registration-main-icon" alt="main-icon" src="/img/ICON.jpg" />
      </div>
      
      <div className='registration-userInfo-banner'>
        <span>도망못가</span>
        <span>-- 회원정보 --</span>
      </div>

      <form className='registration-userInfo-main-conmainer'>
        <div className='registration-userInfo-main'>

          <span className='registration-name'>
            이름 <input id = "id" name = "name" className='registration-name-input' onChange={onChangeUser} required />
          </span>

          <span className='registration-student-code'>
            학번 
            <input 
              id = "user_id" 
              name = "user_id" 
              className='student-code-input' 
              pattern='[0-9]{8}' 
              title="8글자의 숫자를 입력하세요"
              onChange={onChangeUser} 
              required 
            />
          </span>

          <span className='registration-pw'>
            비밀번호 <input id = "password" minLength={5} name = "password" type='password' className='registration-pw-input' onChange={onChangeUser} required />
          </span>

          <span className='registration-select-grade'>
            학년
            <select className='registration-grade-list' id = "grade" name = "grade" onChange={onChangeUser} required >
              <option value="" >--선택--</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </span>

          <span className='registration-select-department'>
            학과
              <DepartmentList id = "department_index" name = "department_index"
              selectDepartments={selectDepartments}
              setSelectDepartments={setSelectDepartments}
              />
          </span>

          <span className='registration-phone'>
            전화번호 
            <input 
              id = "phone"
              type='tel' 
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" 
              title='010-****-****, 054-***-****'
              name = "phone" 
              className='phone' 
              onChange={onChangeUser} 
              required 
            />
          </span>

          <span className='registration-birth'>
            생년월일 <input id = "birth" type='date' name = "birth" className='registration-birth-input' onChange={onChangeUser} required />
          </span>
        

          <span className='registration-account'>
            지급 계좌
              <BankList id = "bank_index" name = "bank_index"
              selectBanks={selectBanks}
              setSelectedBanks={setSelectedBanks}
              
              />
            
            <input id = "account" name = "account" className='registration-account-input' onChange={onChangeUser} required />
          </span>

          <span className='registration-work-type'>
            근무 종류
            <WorkTypeList id = "work_type_index" name = "work_type_index"
            selectedWorkTypes={selectedWorkTypes}
            setSelectedWorkTypes={setSelectedWorkTypes}
            />
          </span>

        </div>
        <button className='registration-sign-up-button' type='submit' onClick={postUser}>가입 요청</button>
      </form>
    </div>
  )
}

export default Registration