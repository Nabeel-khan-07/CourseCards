import React, { useState,useEffect } from 'react'
import Nav from './Components/Nav'
import Filter from './Components/Filter'
import {apiUrl,filterData} from './Components/Data'
import Cards from './Components/Cards'
import {toast} from 'react-toastify'
import Spinner from './Components/Spinner'

const App = () => {
  const[courses,setCourses]=useState([])
  const[loading,setLoading]=useState(true)
  const[category,setCategory]=useState(filterData[0].title)

 
  
   const fetchData=async()=>{
    try{
      const res = await fetch(apiUrl)
      const output = await res.json()
      setCourses(output.data)
    }
    catch(error){
      toast.error('Something went wrong')
    }
    setLoading(false)
  } 
  useEffect(()=>{
    fetchData()
  },[])
  
  return (
    <div className='min-h-screen flex flex-col bg-gray-600'>
      <div>
      <Nav></Nav>
      </div>
    
      <div>
      <Filter filterData={filterData} category={category} setCategory={setCategory}></Filter>
      </div>

      <div className='w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]'>
        {
          loading?<Spinner></Spinner>:<Cards courses={courses} category={category}></Cards>
        }

      </div>
    </div>
  )
}

export default App
