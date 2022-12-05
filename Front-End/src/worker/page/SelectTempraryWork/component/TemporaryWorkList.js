import React from 'react'
import '../css/TemporaryWorkList.css'

const TemporaryWorkList = ({requestAbsencetDataList, requestOvertimetDataList}) => {
    return(
        <ul>
            <div id="temporary-work-list-form" className='temporary-work-list'>
                <li>
                    <span>이름</span>
                    <span>시작 날짜</span>
                    <span>끝 날짜</span>
                    <span>근로 종류</span>
                    <span>요청 종류</span>
                </li>
            </div>
            {
                requestAbsencetDataList.map((request, index) => (
                    <div key={index} className='temporary-work-list'>
                        <li>
                            <span>{request.name}</span>
                            <span>{request.work_start}</span>
                            <span>{request.work_end}</span>
                            <span>{request.work_type_name}</span>
                            <span>{request.type}</span>
                        </li>
                    </div>
                ))
            }
            {
                requestOvertimetDataList.map((request, index) => (
                    <div key={index} className='temporary-work-list'>
                        <li>
                            <span>{request.name}</span>
                            <span>{request.work_start}</span>
                            <span>{request.work_end}</span>
                            <span>{request.work_type_name}</span>
                            <span>{request.type}</span>
                        </li>
                    </div>
                ))
            }
        </ul>
    )
}

export default TemporaryWorkList