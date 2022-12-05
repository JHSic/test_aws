import React from 'react'
import '../Total/css/TotalPage.css'
import TopHeader from '../../../etc/Manager_Components/TopHeader'
import SideMenu from '../../../etc/Manager_Components/SideMenu'
import Header from '../../../etc/Manager_Components/Header'
import TotalSession from './component/TotalSession'

function TotalPage() {
  return (
    <div className='TotalPage'>
      {/* 최상위 상단 */}
      <header>
          <TopHeader/>
      </header>
      <div className='total_session'>
        {/* 사이드 메뉴 */}
        <div className='SideMenu'>
          <SideMenu/>
        </div>
        <div className='TotalSession'>
          {/* 상단 */}
          <Header/>
          {/* 관리자 메인 영역 */}
          <TotalSession/>
        </div>
      </div>
    </div>
  )
}

export default TotalPage