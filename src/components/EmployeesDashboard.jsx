import React, { useEffect, useState } from 'react'
import styles from './Emp.module.css'
export const EmployeesDashboard = () => {
    const [inputValue,setInputValue]=useState({})
    const [emp,setEmp]=useState([])
    const handleData = (e) => {
		const {name,value } = e.currentTarget;
		setInputValue({
            ...inputValue,
            [name]:value
		});
        // console.log(inputValue)
	};
    useEffect(()=>{
        getEmp()
    },[])
    const getEmp=()=>{
        fetch(`http://localhost:8000/employees`)
        .then((res)=>res.json())
        .then((res)=>{setEmp(res)})
    }
    const handleAdd =()=>{
        const payload={
            name:inputValue.names,
            gender:inputValue.gender,
            department:inputValue.department,
            role:inputValue.role,
            salary:inputValue.salary,
            status:false
        };
        const payloadjson=JSON.stringify(payload)
        fetch(`http://localhost:8000/employees`,{
        method:"POST",
        body:payloadjson,
        headers:{
            "content-type":"application/json"
        }
        })
        .then((res)=>res.json())
        .then((json)=>{
            getEmp()
        })
    }
    const handleSortAsc = () => {
		// console.log("before", product);
		emp.sort((a, b) => {
			return a.salary - b.salary;
		});
        setEmp([...emp])
	};
	const handleSortDes = () => {
		emp.sort((a, b) => {
			return b.salary - a.salary;
		});
		// console.log(product);
		setEmp([...emp])
	}
  return  (
    <div className={styles.div3}>
        <div><input placeholder='NAME'
        name="names"
        value={inputValue.names}
        onChange={handleData}
        /></div>
          <div><input placeholder='GENDER'
          name="gender"
        value={inputValue.gender}
        onChange={handleData}
        /></div>
        <div> <input placeholder='DEPARTMENT'
          name="department"
        value={inputValue.department}
        onChange={handleData}
        /></div>
         <div><input placeholder='ROLE'
           name="role"
        value={inputValue.role}
        onChange={handleData}
        /></div>
         <div><input placeholder='SALARY'
           name="salary"
        value={inputValue.salary}
        onChange={handleData}
        /></div>
        <button onClick={handleAdd}>ADD EMPLOYEE</button>
        <div>
        <button >Show All Departments</button>
        <button >Show Marketing</button>
        <button >Show HR</button>
        <button >Show IT</button>
         <button >Show Finance</button></div>
      <div>
          <button onClick={handleSortAsc}>Sort By Salary Ascending</button>
          <button onClick={handleSortDes}>Sort By Salary Descending</button>
      </div>
        <div className={styles.div0}>{
            emp.map((el)=>{
             return  <div className={styles.div1}  key={el.id}>
            <div  >{el.name}</div>
            <div  >{el.gender}</div>
            <div  >{el.department}</div>
            <div  >{el.role}</div>
            <div  >{el.salary}</div>
            </div>
            })
           }</div>
    </div>
  )
}
