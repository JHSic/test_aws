import React from 'react'
import '../Main/css/ManagerMainPage.css';
import TopHeader from '../../../etc/Manager_Components/TopHeader';
import Header from '../../../etc/Manager_Components/Header';
import SideMenu from '../../../etc/Manager_Components/SideMenu';
import ManagerSession from '../../../manager/page/Main/components/ManagerMainSession'

function ManagerMainPage() {
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
          <ManagerSession/>
        </div>
      </div>
    </div>
  )
}

export default ManagerMainPage