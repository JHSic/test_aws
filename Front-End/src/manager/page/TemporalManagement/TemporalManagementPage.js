import React from 'react'
import '../TemporalManagement/css/TemporalManagementPage.css'
import TopHeader from '../../../etc/Manager_Components/TopHeader'
import SideMenu from '../../../etc/Manager_Components/SideMenu'
import Header from '../../../etc/Manager_Components/Header'
import TemporalManagementSession from '../TemporalManagement/component/TemporalManagementSession'

function TemporalManagementPage() {
  return (
    <div className='TemporalManagementPage'>
      {/* 최상위 상단 */}
      <header>
          <TopHeader/>
      </header>
      <div className='temporalmanagement_session'>
        {/* 사이드 메뉴 */}
        <div className='SideMenu'>
          <SideMenu/>
        </div>
        <div className='TemporalManagementSession'>
          {/* 상단 */}
          <Header/>
          {/* 관리자 메인 영역 */}
          <TemporalManagementSession/>
        </div>
      </div>
    </div>
  )
}

export default TemporalManagementPage