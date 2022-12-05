import '../css/UserInfoSession.css'
import React, { useState , useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router';
import DepartmentList from '../../Registration/component/DepartmentList';
import BankList from '../../Registration/component/BankList';
import WorkTypeList from '../../Registration/component/WorkTypeList';
import axios from 'axios';

function UserInfoSession() {
  const [selectDepartments, setSelectDepartments] = useState([]);
  const [selectBanks, setSelectedBanks] = useState([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  
  const navigate = useNavigate();

  const [user, setUser] = useState(
    {
      user_id: '',
      password: null,
      name: '',
      grade: '',
      phone: '',
      account: '',
      birth: '',
      work_type_name: '',
      bank_name: '',
      major:''
  });


  const getDefault = async () => {
    await axios.get(`http://localhost:8080/users/userList/${sessionStorage.getItem('user_id')}`)
    
    .then((res) => {
      setUser(
        {
          user_id: res.data[0].user_id,
          password: null,
          name: res.data[0].name,
          grade: res.data[0].grade,
          phone: res.data[0].phone,
          account: res.data[0].account,
          birth: res.data[0].birth,
          work_type_name: res.data[0].work_type_name,
          bank_name: res.data[0].bank_name,
          major: res.data[0].major
        }
      );
      console.log(res.data[0])
    })
    .catch((err) => {
      console.error({error:err})
    })
  }

  useEffect(() => {
    getDefault()
  }, [])

  const update = async() => {
    await axios.post("http://localhost:8080/users/update", user)
    .then((res) => {
      alert('정보 수정에 성공했습니다.')
      navigate(`/${sessionStorage.getItem('user_id')}/main`);
    })
    .catch((err) => {
    
      console.error({error:err})
      alert('정보 수정에 실패했습니다.')
    })
  }

  const onChangeUser = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value,
    });
    console.log(user);
  };

  const backSpace = () =>{
    navigate(-1)
  }

  return (
    <div className='userInfo'>
      <div className='login-logo'>
        <img className="main-icon" alt="main-icon" src="/img/ICON.jpg" />
      </div>
      
      <div className='userInfo-banner'>
        <span>도망못가</span>
        <span>-- 회원정보 --</span>
      </div>

      <form className='userInfo-main-container'>
        <div className='userInfo-main'>
          <span className='name'>
            이름 <input className='name-input' onChange={onChangeUser} name = "name"  placeholder= {user.name} disabled/>
          </span>
          <span className='student-code'>
            학번 <input className='student-code-input' onChange={onChangeUser} placeholder = {user.user_id} name = "user_id" disabled/>
          </span>

          <span className='pw'>
            비밀번호 
            <input 
              type='password' 
              className='pw-input' 
              name = "password"
              minLength={5}
              onChange={onChangeUser} 
            />
          </span>

          <span className='select-grade'>
            학년
            <select id='grade' className='grade-list' onChange={onChangeUser} name = "grade" value={user.grade}>
              <option value='' >--선택--</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select >
          </span>
          <span className='select-department'>
            학과
            <DepartmentList id = "department_index" name = "major" 
              userMajor={user.major}
              selectDepartments={selectDepartments}
              setSelectDepartments={setSelectDepartments}
              />
          </span>
          <span className='phone'>
            전화번호 
            <input 
              id = "phone"
              type='tel' 
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" 
              title='010-****-****, 054-***-****'
              name = "phone" 
              className='phone' 
              onChange={onChangeUser} 
              placeholder = {user.phone}
              required 
            />
          </span>
          <span className='birth'>
            생년월일 <input className='birth-input' type='date' onChange={onChangeUser} name = "birth" value = {user.birth} disabled/>
          </span>
        
          <span className='account'>
            지급 계좌 
            <BankList id = "bank_index" name = "bank_name"
              bank_name={user.bank_name}
              selectBanks={selectBanks}
              setSelectedBanks={setSelectedBanks}
            />
            <input className='account-input' name = "account" onChange={onChangeUser} placeholder={user.account}/>
          </span>
          <span className='work-type'>
            근무 종류
            <WorkTypeList id = "work_type_index" name = "work_type_name"
              selectedWorkTypes={selectedWorkTypes}
              setSelectedWorkTypes={setSelectedWorkTypes}
              work_type_name={user.work_type_name}
            />
          </span>
        </div>

        <div>
          <button className='userinfo-sign-up-button' type = "submit" onClick={() => update()}>수정</button>
          <button className='userinfo-cancel-button'  onClick={() => backSpace()} >취소</button>
        </div>
      </form>
    </div>
  )
}
export default UserInfoSession