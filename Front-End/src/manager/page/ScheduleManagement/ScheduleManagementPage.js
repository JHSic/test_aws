import React from 'react'
import '../ScheduleManagement/css/ScheduleManagementPage.css'
import TopHeader from '../../../etc/Manager_Components/TopHeader';
import Header from '../../../etc/Manager_Components/Header';
import SideMenu from '../../../etc/Manager_Components/SideMenu';
import ScheduleManagementSession from '../../../manager/page/ScheduleManagement/components/ScheduleManagementSession'

function ScheduleManagementPage() {
  return (
    <div className='ScheduleManagementPage'>
      {/* 최상위 상단 */}
      <header>
        <TopHeader/>
      </header>
      <div className='schedulemanagement_session'>
        {/* 사이드 메뉴 */}
        <div className='SideMenu'>
          <SideMenu/>
        </div>
        <div className='ScheduleManagementSession'>
          {/* 상단 */}
          <Header/>
          {/* 시간표 수정기간 설정 영역 */}
         <ScheduleManagementSession/>
        </div>
      </div>
      
    </div>
  )
}

export default ScheduleManagementPage