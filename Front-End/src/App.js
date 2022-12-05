import './App.css';
import {Router, Routes, Route} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import LoginPage from '../src/user/page/Login/LoginPage';
import UserInfoPage from '../src/worker/page/UserInfo/UserInfoPage';
import WorkerMainPage from './worker/page/Main/WorkerMainPage';
import ScheuleEnrollPage from '../src/worker/page/ScheduleEnroll/ScheduleEnrollPage';
import ManagerMainPage from '../src/manager/page/Main/ManagerMainPage';
import WorkerListPage from './manager/page/WorkerList/WorkerListPage';
import UserApprovalPage from '../src/manager/page/UserApproval/UserApprovalPage';
import TemporalManagementPage from './manager/page/TemporalManagement/TemporalManagementPage';
import TemporalWorkReqeustPage from './manager/page/TemporalWorkReqeust/TemporalWorkReqeustPage';
import WorkManagementPage from './manager/page/WorkManagement/WorkManagementPage';
import WorkComfirmPage from './manager/page/WorkComfirm/WorkComfirmPage';
import ScheduleManagementPage from '../src/manager/page/ScheduleManagement/ScheduleManagementPage';
import TotalPage from './manager/page/Total/TotalPage';
import Registration from './worker/page/Registration/Registration';
import NotFoundPage from '../src/etc/NotFoundPage'
import WorkerSchedule from './worker/page/WorkSchedule/WorkerSchedule';
import ScheduleEnrollManagerPage from './manager/page/ScheduleEnrollManager/ScheduleEnrollManagerPage';
import TemporaryWork from './worker/page/TemporaryWork/TemporaryWork';
import SelectTempraryWork from './worker/page/SelectTempraryWork/SelectTempraryWork';


function App() {

  const preventRoute = 
  [
      {
          path:'/',
          element: <LoginPage />
      },
      {
          path:'/login',
          element: <LoginPage />
      },
      {
          path:'/Registration',
          element: <Registration />
      },
      {
          path:'*',
          element: <NotFoundPage />
      }
  ]

  const publicRoute = 
  [
      {
          path:'/',
          element: <LoginPage />
      },
      {
          path:'/login',
          element: <LoginPage />
      },
      {
          path:'/Registration',
          element: <Registration />
      },
      {
          path:'/info',
          element: <UserInfoPage />
      },
      {
          path:'/main',
          element: <WorkerMainPage />
      },
      {
          path:'/scheduleEnroll',
          element: <ScheuleEnrollPage />
      },
      {
          path:'/workerSchedule',
          element: <WorkerSchedule/>
      },
      {
          path:'/SelectTempraryWork',
          element: <SelectTempraryWork />
      },
      {
          path:'/TemporaryWork',
          element: <TemporaryWork />
      },
      {
          path:'/scheduleenrollmng',
          element: <ScheduleEnrollManagerPage />
      },
      {
          path:'/schedulemng',
          element: <ScheduleManagementPage />
      },
      {
          path:'/managermain',
          element: <ManagerMainPage />
      },
      {
          path:'/workerlist',
          element: <WorkerListPage />
      },
      {
          path:'/userapproval',
          element: <UserApprovalPage />
      },
      {
          path:'/temporalworkmng',
          element: <TemporalManagementPage />
      },
      {
          path:'/temporalworkrequest',
          element: <TemporalWorkReqeustPage />
      },
      {
          path:'/workmng',
          element: <WorkManagementPage />
      },
      {
          path:'/workcomfirm',
          element: <WorkComfirmPage />
      },
      {
          path:'/total',
          element: <TotalPage />
      }

  ]

  const preventPage = () => {

    if(sessionStorage.getItem('user_id') === null){
      return(
        preventRoute.map(route => {
          return(
            <Route 
              key={route.path}
              path={route.path}
              element={route.element}
          />
          )
        })
      )
    }
    else{
      return(
        publicRoute.map(route => {
          return(
            <Route 
              key={route.path}
              path={route.path}
              element={route.element}
          />
          )
        })
      )
    }
  }

  useEffect(()=>{

  },[Routes])

    return (
    <BrowserRouter>
    
      <Routes>
        {
          preventPage()
        }
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
