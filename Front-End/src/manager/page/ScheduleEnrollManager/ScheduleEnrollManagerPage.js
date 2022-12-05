import './css/ScheduleEnrollManagerPage.css'
import React from 'react'
import TopHeader from '../../../etc/Manager_Components/TopHeader'
import SideMenu from '../../../etc/Manager_Components/SideMenu'
import Header from '../../../etc/Manager_Components/Header'
import ScheduleEnrollManagerSession from './components/ScheduleEnrollManagerSession'

function ScheduleEnrollManagerPage() {
    return (
        <div className='ManagerMainPage'>
          {/* 최상위 상단 */}
          <header>
              <TopHeader/>
          </header>
          <div className='managermain_session'>
            {/* 사이드 메뉴 */}
            <div className='SideMenu'>
              <SideMenu/>
            </div>
            <div className='ManagerMainSession'>
              {/* 상단 */}
              <Header/>
              {/* 관리자 메인 영역 */}
              <ScheduleEnrollManagerSession/>
            </div>
          </div>
        </div>
      )
}

export default ScheduleEnrollManagerPage