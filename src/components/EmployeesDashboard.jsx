import React, { useEffect, useState } from 'react'
import styles from './Emp.module.css'
export const EmployeesDashboard = () => {
    const [inputValue,setInputValue]=useState("")
    const [inputValue2,setInputValue2]=useState("")
    const [inputValue3,setInputValue3]=useState("")
    const [inputValue4,setInputValue4]=useState("")
    const [inputValue5,setInputValue5]=useState("")
    const [emp,setEmp]=useState([])
    // console.log(todos.length)
    useEffect(()=>{
        getEmp()
    },[])
    const getEmp=()=>{
        fetch(`http://localhost:8000/employees`)
        .then((res)=>res.json())
        .then((res)=>{setEmp(res)})
    }
    const handleAdd =()=>{
        // console.log(inputValue);
        const payload={
            title:inputValue,
            gender:inputValue2,
            dept:inputValue3,
            role:inputValue4,
            salary:inputValue5,
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
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        /></div>
          <div><input placeholder='GENDER'
        value={inputValue2}
        onChange={(e)=>setInputValue2(e.target.value)}
        /></div>
        <div> <input placeholder='DEPARTMENT'
        value={inputValue3}
        onChange={(e)=>setInputValue3(e.target.value)}
        /></div>
         <div><input placeholder='ROLE'
        value={inputValue4}
        onChange={(e)=>setInputValue4(e.target.value)}
        /></div>
         <div><input placeholder='SALARY'
        value={inputValue5}
        onChange={(e)=>setInputValue5(e.target.value)}
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
            <div  >{el.title}</div>
            <div  >{el.gender}</div>
            <div  >{el.dept}</div>
            <div  >{el.role}</div>
            <div  >{el.salary}</div>
            </div>
            })
           }</div>
    </div>
  )
}
