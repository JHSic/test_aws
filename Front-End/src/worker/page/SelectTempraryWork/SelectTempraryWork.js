import React from 'react'
import BottomMenu from '../../../etc/Worker_Components/BottomMenu';
import Header from '../../../etc/Worker_Components/Header';
import SelectTempraryWorkSession from './component/SelectTempraryWorkSession';
import './css/SelectTempraryWork.css'

function SelectTempraryWork(){

    return(
        <div className='worker-select-temporary-main-container'>

            <div className='worker-select-temporary-main-header'>
                <Header />
            </div>
            
            <div className='worker-select-temporary-main-session'>
                <SelectTempraryWorkSession />
            </div>

            <div className='worker-select-temporary-main-bottomMenu'>
                <BottomMenu />
            </div>

        </div>
    )
}

export default SelectTempraryWork;