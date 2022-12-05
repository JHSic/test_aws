import React, {useState, useEffect} from 'react'
import TemporaryWorkSessionList from './TemporaryWorkSessionList';
import '../css/SelectTempraryWorkSession.css'
import axios from 'axios';
import TemporaryWorkList from './TemporaryWorkList';
function SelectTempraryWorkSession(){

    const [checkData, setCheckData] = useState([])
    const [reqeustList, setReqeustList] = useState([])
    const [isShowRequistData, setIsShowRequistData] = useState(true)

    useEffect(() => {
        getRecruitdata();
        getRequestData();
    }, [])

    const getRequestData = () => {
        getRequeAbsencetData()
        getRequeOvertimetData()
    }

    //모집 데이터 받아오기
    const getRecruitdata = async () => {
        await axios.get("http://localhost:8080/recruit")
        .then((res) => {
            setReqeustList(res.data);
        })
        .catch((err) => {
            console.error({error: err})
        })
    }

    // 모집 신청 데이터 핸들러
    const checkDataHandler = (e) => {
        let checkState = e.target.checked
        let index = e.target.value

        if(checkState){
            setCheckData([...checkData, reqeustList[index]])
        }
        else if(!checkState && checkData.includes(reqeustList[index])){
            setCheckData(checkData.filter(el => el !== reqeustList[index]))
        }
        console.log(checkData)
    }

    const recruitHandler = () => {
        if(checkData.length === 0){
            alert("아무것도 선택하지 않았습니다.")
        }
        else{
            reqRecruit()
        }
    }

    //추가 근로 모집 신청 
    const reqRecruit = async() => {
        await axios.post(`http://localhost:8080/overtime/request/${sessionStorage.getItem("user_id")}`, checkData)
        .then((res) => {
            alert("신청 완료")            
        })
        .catch((err) => {
            console.log({error:err})
            alert("추가 근로 신청 실패")
        })
    }

    // 받아온 요청 상태 데이터
    const [requestAbsencetDataList, setRequestAbsencetDataList] = useState([]);
    const [requestOvertimetDataList, setRequestOvertimetDataList] = useState([]);


    //  결근 요청 상태 데이터 받아오기
    const getRequeAbsencetData = async() => {
        await axios.get(`http://localhost:8080/absence/${sessionStorage.getItem('user_id')}`)
        .then((res) => {
            setRequestAbsencetDataList(res.data);
        })
        .catch((err) => {
            console.error({error: err});
        })
    }

    // 추가 근로 요청 상태 데이터 받아오기
    const getRequeOvertimetData = async() => {
        await axios.get(`http://localhost:8080/overtime/${sessionStorage.getItem('user_id')}`)
        .then((res) => {
            setRequestOvertimetDataList(res.data);
        })
        .catch((err) => {
            console.error({error: err});
        })
    }
    
    // 모집 근로 출력
    const checkRecruit = () => {
        setIsShowRequistData(true)
    }

    // 요청 상황 출력
    const checkRequist = () => {
        setIsShowRequistData(false)
    }

    return(
        <div className='worker-select-temporary-session-container'>
            <span className='worker-select-temporary-session-reaquist-list-title'>
            {
                isShowRequistData ? "추가 근로 모집" : "미처리 요청"
            }
            </span>
            <div className='worker-select-temporary-session-list-box'>
                <div className='worker-select-temporary-session-button-container' >
                    <button className='button1' onClick={checkRecruit} >모집 근로</button>
                    <button className='button2' onClick={checkRequist} >처리 상황</button>
                    {
                        isShowRequistData ? 
                            <button className='worker-select-temporary-session-reaquist-button' onClick={recruitHandler}>근로 신청</button>
                        :
                            ''
                    }
                </div>
                <div className='worker-select-temporary-session-reaquist-select-list'>
                {
                    isShowRequistData ? 
                        <TemporaryWorkSessionList
                            reqeustList={reqeustList}
                            checkDataHandler={checkDataHandler}
                        /> 
                        : 
                        <TemporaryWorkList
                            requestAbsencetDataList={requestAbsencetDataList}
                            requestOvertimetDataList={requestOvertimetDataList}
                        />
                }
                </div>
            </div>
        </div>
    )
}

export default SelectTempraryWorkSession;