import '../css/Registration.css'
import React, { useState , useEffect} from 'react'
import axios from "axios"

const WorkTypeList = ({selectedWorkTypes, setSelectedWorkTypes, work_type_name}) => {

    const [workTypes, setWorkTypes] = useState([]);
    const [workTypevalue, setWorkTypevalue] = useState()

    const handleSelected = (e) => {
      setSelectedWorkTypes(e.target.value);
      console.log(e.target.value);
    }

  useEffect(() => {
    if (workTypes === []) return;
      axios.get("http://localhost:8080/workType")
      .then((res) => {
        setWorkTypes(res.data);
      })
      .catch((err) => {
        throw err;
      })
   }, []);

   const workTypeList = workTypes.map((workType) => (
    <option
       key = {workType.work_type_index}
       value = {workType.work_type_index}
     > 
    {workType.work_type_name}
    </option>))

    useEffect(()=>{
      checkValue()
    },[workTypes])

    const checkValue = () => {
      workTypes.map((workType) => {
        if(workType.work_type_name === work_type_name){
          setWorkTypevalue(workType.work_type_index)
        }
      })
    }

    return (
        <select className='registration-work-type-list' required onChange={handleSelected} value={workTypevalue}>
            <option value='' >--선택--</option>
            {workTypeList}
          </select>
    )
}

export default WorkTypeList;