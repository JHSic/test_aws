import { useEffect, useState } from 'react';
import '../css/Registration.css'
import axios from "axios"

const DepartmentList = ({selectDepartments, setSelectDepartments, userMajor}) => {
    const [departments, setDepartments] = useState([]);
    const [value, setValue] = useState()

    const handleSelected = (e) => {
      setSelectDepartments(e.target.value);
    }

  useEffect(() => {
    if (departments === []) return;

    axios.get("http://localhost:8080/department")
    .then((res) => {
      setDepartments(res.data);
    })
    .catch((err) => {
      throw err;
    })

   }, []);

  useEffect(()=>{
    checkValue()
  },[departments])

   const checkValue = () => {
    if(departments === null){
      return checkValue()
    }
    departments.map((workType) => {
      if(workType.department_name === userMajor){
        setValue(workType.department_index)
      }
    })
   }
   

   const departmentLists = departments.map((workType) => (
    <option
       key = {workType.department_index}
       value = {workType.department_index}
     > 
    {workType.department_name}
    </option>
    ))

    return (
        <select className='registration-work-type-list' required onChange={handleSelected} value={value}>
          <option value='' >--선택--</option>
            {departmentLists}
          </select>
    )
}

export default DepartmentList;