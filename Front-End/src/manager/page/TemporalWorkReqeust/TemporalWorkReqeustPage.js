import React from 'react'
import '../TemporalWorkReqeust/css/TemporalWorkReqeustPage.css'
import TopHeader from '../../../etc/Manager_Components/TopHeader';
import Header from '../../../etc/Manager_Components/Header';
import SideMenu from '../../../etc/Manager_Components/SideMenu';
import TemporalWorkReqeustSession from './component/TemporalWorkReqeustSession';

function TemporalWorkReqeustPage() {
  return (
    <div className='TemporalWorkReqeustPage'>
      {/* 최상위 상단 */}
      <header>
          <TopHeader/>
      </header>
      <div className='temporalwork_session'>
        {/* 사이드 메뉴 */}
        <div className='SideMenu'>
          <SideMenu/>
        </div>
        <div className='TemporalWorkReqeustSession'>
          {/* 상단 */}
          <Header/>
          {/* 관리자 메인 영역 */}
          <TemporalWorkReqeustSession/>
        </div>
      </div>
    </div>
  )
}

export default TemporalWorkReqeustPage