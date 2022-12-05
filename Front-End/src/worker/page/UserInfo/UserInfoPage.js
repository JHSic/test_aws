import React, {useState} from 'react'
import './css/UserInfoPage.css'
import UserInfoSession from './components/UserInfoSession'
import AccessRestrictions from './components/Access_Restrictions';

function UserInfoPage() {

  const [permission, setPermission] = useState(true);

  return (
    <div className='user-info-page'>
      {
        permission ? <AccessRestrictions className='modal' permission={setPermission} /> : <UserInfoSession />
      }
    </div>
  )
}

export default UserInfoPage