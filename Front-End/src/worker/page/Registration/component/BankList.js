import { useEffect, useState } from 'react';
import '../css/Registration.css'
import axios from "axios"

const BankList = ({selectBanks, setSelectedBanks, bank_name}) => {
    const [banks, setBanks] = useState([]);
    const [value, setValue] = useState()

    const handleSelected = (e) => {
      setSelectedBanks(e.target.value);
    }

  useEffect(() => {
    if (banks === []) return;
      axios.get("http://localhost:8080/bank")
      .then((res) => {
        setBanks(res.data);
      })
      .catch((err) => {
        throw err;
      })
   }, []);

   useEffect(()=>{
    checkValue()
  },[banks])

   const checkValue = () => {
    banks.map((bank) => {
      if(bank.bank_name === bank_name){
        setValue(bank.bank_index)
      }
    })
   }


   const bankList = banks.map((bank) => (
    <option
       key = {bank.bank_index}
       value = {bank.bank_index}
     > 
    {bank.bank_name}
    </option>))

    return (
    <select className='registration-bank-list' required onChange={handleSelected} value={value}>
            <option value='' >--선택--</option>
            {bankList}
    </select>
    );
}

export default BankList;