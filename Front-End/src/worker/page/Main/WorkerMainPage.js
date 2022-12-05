import React from 'react'
import './css/WorkerMainPage.css'
import Header from '../../../etc/Worker_Components/Header'
import BottomMenu from '../../../etc/Worker_Components/BottomMenu'
import WorkerMainSession from './components/WorkerMainSession'


function WorkerMainPage() {
  return (
    <div className='worker-main-container'>

      <div className='worker-main-header'>
        <Header />
      </div>
      
      <div className='WorkerMainSession'>
        <WorkerMainSession />
      </div>

      <div className='BottomMenu'>
        <BottomMenu />
      </div>

    </div>
  )
}

export default WorkerMainPage