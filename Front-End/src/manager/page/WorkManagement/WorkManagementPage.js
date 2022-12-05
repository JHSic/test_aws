import React from 'react'
import '../WorkManagement/css/WorkManagementPage.css'
import TopHeader from '../../../etc/Manager_Components/TopHeader'
import SideMenu from '../../../etc/Manager_Components/SideMenu'
import Header from '../../../etc/Manager_Components/Header'
import WorkManagementSession from './component/WorkManagementSession'

function WorkManagementPage() {
  return (
    <div className='WorkManagementPage'>
      {/* 최상위 상단 */}
      <header>
          <TopHeader/>
      </header>
      <div className='workmanagement_session'>
        {/* 사이드 메뉴 */}
        <div className='SideMenu'>
          <SideMenu/>
        </div>
        <div className='WorkManagementSession'>
          {/* 상단 */}
          <Header/>
          {/* 관리자 메인 영역 */}
          <WorkManagementSession/>
        </div>
      </div>
    </div>
  )
}

export default WorkManagementPage