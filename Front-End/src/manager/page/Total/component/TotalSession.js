import React, {useState} from 'react'
import '../css/TotalSession.css'

function TotalSession() {
  const month = [1, 2, 3, 4, 5, 6, 7 ,8 ,9 , 10, 11, 12];
  const today = new Date();
  const todayYear = today.getFullYear();
  const [yearArr, setYearArr] = useState([]);

  //수정해야해
    for(let i = todayYear; i >= todayYear-10; i--){
      for(let j = 0; j < 10; j++){
        yearArr[j] = i;
      }
    }

  const colums = ['이름', '학번', '근무종류', '기간', '시급', '총 장학금액'];
  const worklistData = [
    {
      name : '이마크',
      num : 20180802,
      workPeriod: '2022. 02. 26 - 2022. 06. 24',
      workWage : 11450,
      workType : '운반',
      totalAmount : 274880
    },
    {
      name : '종천러',
      num : 20201122,
      workPeriod: '2022. 02. 26 - 2022. 06. 24',
      workWage : 9160,
      workType : '식기세척',
      totalAmount : 274880
    },
    {
      name : '박지성',
      num : 20210205,
      workPeriod: '2022. 02. 26 - 2022. 06. 24',
      workWage : 9160,
      workType : '식기세척',
      totalAmount : 274880
    },
    {
      name : '황인준',
      num : 20190323,
      workPeriod: '2022. 02. 26 - 2022. 06. 24',
      workWage : 9160,
      workType : '식기세척',
      totalAmount : 274880
    },
    {
      name : '이제노',
      num : 20190423,
      workPeriod: '2022. 02. 26 - 2022. 06. 24',
      workWage : 9160,
      workType : '식기세척',
      totalAmount : 274880
    },
    {
      name : '이해찬',
      num : 20190606,
      workPeriod: '2022. 02. 26 - 2022. 06. 24',
      workWage : 9160,
      workType : '식기세척',
      totalAmount : 274880
    },
    {
      name : '나재민',
      num : 20190813,
      workPeriod: '2022. 02. 26 - 2022. 06. 24',
      workWage : 9160,
      workType : '식기세척',
      totalAmount : 274880
    }
  ];

  const TotalCheck = () => {
    console.log("조회")
  }

  function totalWorker() {
    return(
      <table className='totalTable'>
        <thead>
          <tr>
            {colums.map((col) => (
              <th className='workerlistTable_header' key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
              {worklistData.map(({name, num, workType, workPeriod, workWage, totalAmount}) => (
                <tr key={num}>
                  <td className='totallist_items'>{name}</td>
                  <td className='totallist_items'>{num}</td>
                  <td className='totallist_items'>{workType}</td>
                  <td className='totallist_items'>{workPeriod}</td>
                  <td className='totallist_items'>{workWage}</td>
                  <td className='totallist_items'>{totalAmount}</td>
                </tr>
              ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className='TotalSession'>
      <div className='TotalMain'>
        <div className='TotalSearchBar'>
          <select className='totalSelect'>
            {/* <option>2022</option> */}
            {yearArr.map((year) => {
              return(
                <option>{year}</option>
              )
            })}
          </select>
          <select className='totalSelect'>
            {month.map((mon) => {
              return(
                <option>{mon}</option>
              )
            })}
          </select>
          <button className='totalSearch_btn' onClick={() => TotalCheck()}>조회</button>
        </div>
        <div className='TotalWorkerList'>
          {totalWorker()}
        </div>
      </div>
    </div>
  )
}

export default TotalSession