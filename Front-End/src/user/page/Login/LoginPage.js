import React, {useState} from 'react'
import { NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './css/LoginPage.css'
import adminInfo from "../../../config/adminInfo";

function LoginPage() {
  
  const [loginInfo, setLoginInfo] = useState({
    user_id : "",
    password : ""
  })
  
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    

    if (JSON.stringify(adminInfo) === JSON.stringify(loginInfo)) {
      sessionStorage.setItem("user_id", "admin");
      navigate('/managermain');
      return;
    }

    await axios.post('http://localhost:8080/users/login', loginInfo)
    .then((res) => {
      console.log(res);

      if(loginInfo.user_id === 'admin'){
        isAdmin()
        console.log("관리자 로그인")
      }
      else{
        res.data ?  loginSuccess() : loginFail();
      }

    })
    .catch((err) => {
      console.error({error: err});
      navigate('/');
    })
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      login();
    }
  }

  const onChangeInfo = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name] : e.target.value
    });
    
  }
  
  const isAdmin = () => {
    sessionStorage.setItem('user_id', 'admin');
    navigate('/managermain');
  }

  const loginSuccess = () => {
    sessionStorage.setItem('user_id', loginInfo.user_id);
    navigate(`/main`);
  }

  const loginFail = () => {
    alert("로그인에 실패했습니다.");
    reset();
  }

  const reset = () => {
    setLoginInfo({
      user_id: "",
      password: ""
    })
  }

  return (
      <div className='login'>

        <div className='login-logo'>
          <img className="main-icon" alt="main-icon" src="img/ICON.jpg" />
        </div>

        <div className='login-banner'>
          <span>도망못가</span>
          <span>당신의 출퇴근 관리를 하나로.</span>
        </div>

        <div className='login-form-box'>
          <form className='login-form'>
              <div className='login'>
                <input placeholder='ID' onChange={onChangeInfo} className='id' name = "user_id" value={loginInfo.user_id} required></input>
                <input placeholder='PW' onChange={onChangeInfo} type='password' name = "password" className='passwd' value={loginInfo.password} required></input>
              </div>
                <button onClick={login} onKeyPress={onKeyPress} className='login-button'>Login</button>
                
            </form>
        </div>

        <div>
          <NavLink to='/Registration' className='login-sign-up'>회원가입</NavLink>
        </div>

      </div>
  )
}

export default LoginPage;