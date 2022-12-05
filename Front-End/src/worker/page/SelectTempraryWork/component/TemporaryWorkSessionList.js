import React, { useState } from 'react'
import '../css/TemporaryWorkSessionList.css'

const TemporaryWorkSessionList = ({reqeustList, checkDataHandler}) => {
    return(
        <ul className='temporary-work-session-list-container'>
            {
                reqeustList.map((requist, index) => (
                    <div key={index} onClick={checkDataHandler}>
                        <label className='temporary-work-session-list'>
                            <input type='checkbox' value={index}></input>
                            <li>
                                <span>{requist.work_start}</span>
                                <span>~</span>
                                <span>{requist.work_end}</span>
                                <span>{requist.work_type_name}</span>
                            </li>
                        </label>
                    </div>
                ))
            }
        </ul>
    )
}

export default TemporaryWorkSessionList