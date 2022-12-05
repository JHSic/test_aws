import React from 'react'
import '../WorkerList/css/WorkerListPage.css'
import TopHeader from '../../../etc/Manager_Components/TopHeader';
import Header from '../../../etc/Manager_Components/Header';
import SideMenu from '../../../etc/Manager_Components/SideMenu';
import WorkerListSession from './component/WorkerListSession';

function WorkerListPage() {
  return (
    <div className='WorkerListPage'>
      {/* 최상위 상단 */}
      <header>
          <TopHeader/>
      </header>
      <div className='workerlist_session'>
        {/* 사이드 메뉴 */}
        <div className='SideMenu'>
          <SideMenu/>
        </div>
        <div className='WorkerListSession'>
          {/* 상단 */}
          <Header/>
          {/* 관리자 메인 영역 */}
          <WorkerListSession/>
        </div>
      </div>
    </div>
  )
}

export default WorkerListPage