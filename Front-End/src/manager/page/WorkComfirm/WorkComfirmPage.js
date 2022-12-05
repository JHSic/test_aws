import React from 'react'
import '../WorkComfirm/css/WorkComfirmPage.css'
import TopHeader from '../../../etc/Manager_Components/TopHeader'
import SideMenu from '../../../etc/Manager_Components/SideMenu'
import Header from '../../../etc/Manager_Components/Header'
import WorkComfirmSession from './component/WorkComfirmSession'

function WorkComfirmPage() {
  return (
    <div className='WorkComfirmPage'>
      {/* 최상위 상단 */}
      <header>
          <TopHeader/>
      </header>
      <div className='managermain_session'>
        {/* 사이드 메뉴 */}
        <div className='SideMenu'>
          <SideMenu/>
        </div>
        <div className='WorkComfirmSession'>
          {/* 상단 */}
          <Header/>
          {/* 관리자 메인 영역 */}
          <WorkComfirmSession/>
        </div>
      </div>
    </div>
  )
}

export default WorkComfirmPage