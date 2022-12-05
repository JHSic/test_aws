import React from 'react'
import BottomMenu from '../../../etc/Worker_Components/BottomMenu';
import Header from '../../../etc/Worker_Components/Header';
import TemporaryWorkSession from './component/TemporaryWorkSession';
import './css/TemporaryWork.css'

function TemporaryWork(){

    return(
        <div className='worker-temporary-main-container'>

            <div className='worker-temporary-main-header'>
                <Header />
            </div>
            
            <div className='worker-temporary-main-session'>
                <TemporaryWorkSession />
            </div>

            <div className='worker-temporary-main-bottomMenu'>
                <BottomMenu />
            </div>

        </div>
    )
}

export default TemporaryWork;