import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/access_restrictions.css'

function AccessRestrictions({permission}) {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [loginInfo, setLoginInfo] = useState({
    user_id: sessionStorage.getItem('user_id'),
    password: ''
  })
  

  const onChange=((e)=>{
    setLoginInfo({
      ...loginInfo,
      [e.target.name] : e.target.value
    });
  })
  
  const navigate = useNavigate();

  const login = async () => {
    
    await axios.post("http://localhost:8080/users/login", loginInfo)
    .then((res) => {
      res.data ? loginSuccess() : loginFail();
    })
    .catch((err) => {
      console.error({error:err});
      navigate('/');
    })
  }

  const resetPW = () => {
    setLoginInfo({
      ...loginInfo,
      password : ''
    })
  }

  const loginSuccess = () => {
    handleModal();
  }

  const loginFail = () => {
    alert("잘못된 비밀번호 입니다.");
    resetPW();
  }

  const handleModal = () => {
    permission(false);
    setIsOpen(false);
  }

  const comparePW = () => {
    login();
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter'){
      comparePW();
    }
  }
  const backSpace = () =>{
    navigate(-1)
  }

    return (
      <>
        {
          modalIsOpen ? 
            <div className='contents'>
              <div className='authority-main'>

                <div className='modal-pw-input' >
                  <input 
                    type='password' 
                    name = "password" 
                    placeholder='비밀번호'
                    autoFocus
                    value={loginInfo.password}
                    onChange={onChange} 
                    onKeyPress={onKeyPress} 
                  />
                </div>

                <div>
                  <button className='submit-button'  onClick={() => comparePW()} >확인</button>
                  <button className='cancel-button'  onClick={() => backSpace()} >취소</button>
                </div>

              </div>
          </div>

            : ''
        }
      </>


    );
}

export default AccessRestrictions;