import React, {useState} from 'react'
import '../css/WorkComfirmSession.css'

function WorkComfirmSession() {
    // 항목데이터
  const colums = ["이름", "학번", "근무종류", "기간"];
  //임시 데이터
  const workerList =[
    {
        workerName : '이민형',
        workerNum : 20180802,
        workerType : '운반',
        workerTime : '2022. 02. 26 - 2022. 06. 24'
    },
    {
        workerName : '황인준',
        workerNum : 20190323,
        workerType : '식사확인',
        workerTime : '2022. 02. 26 - 2022. 06. 24'
    },
    {
        workerName : "이제노",
        workerNum : 20190423,
        workerType : "식기세척",
        workerTime : '2022. 02. 26 - 2022. 06. 24'
    },
    {
        workerName : "이동혁",
        workerNum : 20190606,
        workerType : "식사확인",
        workerTime : '2022. 02. 26 - 2022. 06. 24'
    },
    {
        workerName : "나재민",
        workerNum : 20190813,
        workerType : "식기세척",
        workerTime : '2022. 02. 26 - 2022. 06. 24'
    },
    {
        workerName : '종천러',
        workerNum : 20201122,
        workerType : "식기세척",
        workerTime : '2022. 02. 26 - 2022. 06. 24'
    },
    {
        workerName : '박지성',
        workerNum : 20210205,
        workerType : '운반',
        workerTime : '2022. 02. 26 - 2022. 06. 24'
    }
  ];

  const [workStart, setWorkStart] = useState(new Date());
  const [workEnd, setWorkEnd] = useState(new Date());

  function workerComfirmTable() {
    return (
      <table className='comfirmList'>
        <thead>
          <tr>
            <input type="checkbox"/>
            {colums.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {workerList.map(({workerName, workerNum, workerType, workerTime}) => (
            <tr key={workerNum}>
              <input type="checkbox"/>
              <td className='table_workerList'>{workerName}</td>
              <td className='table_workerList'>{workerNum}</td>
              <td className='grade_workerList'>{workerType}</td>
              <td className='major_workerListtime'>{workerTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  const workComfirmDelete = () => {
    alert("삭제되었습니다.");
  }

  const workComfirmPlus = () => {
    alert("추가되었습니다.");
  }

  const totalTime = 12;
  const totalAmount = 109920;

  return (
    <div className='WorkComfirmSession'>
        <div className='WorkComfirmMain'>
            <div className='workerSearch'>
                <input className='search_worker' type='text' placeholder='입력'></input>
                <button className='search_btn'>조회</button>
            </div>
            <div className='workerComfirmList'>
                <div className='comfirmList'>
                    {workerComfirmTable()}
                </div>
                <button className='comfirmDelete_btn' onClick={() => workComfirmDelete}>삭제</button>
            </div>
            <div className='workerComfirmTotal'>
                <div className='workerTotal'>총 근로 시간 {totalTime} 시간</div>
                <div className='workerTotal'>총 근로장학금액     {totalAmount} 원</div>
            </div>
        </div>
    </div>
  )
}

export default WorkComfirmSession