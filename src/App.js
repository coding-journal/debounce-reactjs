import "./App.css"
import React, { useState, useEffect } from 'react'
import useDebounce from './useDebounce.js';
import axios from "axios";



function App() {
  // State and setter for search term
  const [datas, setDatas] = useState([])
  const [filteredDatas, setFilteredDatas] = useState([])
  const [hitCounter, setHitCounter] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');


  const debouncedSearchTerm = useDebounce(searchTerm, 1000)


  useEffect(() => {
    setSearchTerm(debouncedSearchTerm)
    searchData()
    setHitCounter(hitCounter + 1)
  }, [debouncedSearchTerm])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // Get the datas of peoples
    try {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/users")
      setDatas(data)
      setFilteredDatas(data)
    } catch (error) {
      console.log(error);
    }
  }

  const renderData = () => {
    return filteredDatas.map((data, key) => {
      return (
        <div className="user-card" key={key}>
          <p>{data.name}</p>
        </div>
      )
    })
  }

  const searchData = () => {
    const searchedDatas = datas.filter((data) => {
      return data.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    setFilteredDatas(searchedDatas)
  }


  return (
    <div className="container">
      <p>Hit the API {hitCounter}</p>
      <input
        className="search"
        placeholder="Input Query..."
        onChange={e => setSearchTerm(e.target.value)}
      />
      <h5 htmlFor="">{debouncedSearchTerm}</h5>

      {renderData()}

    </div>
  );
}



export default App;

// Without Debounce

// import "./App.css"
// import React, { useState, useEffect } from 'react'
// import axios from "axios";



// function App() {
//   // State and setter for search term
//   const [datas, setDatas] = useState([])
//   const [filteredDatas, setFilteredDatas] = useState([])
//   const [hitCounter, setHitCounter] = useState(0)
//   const [searchTerm, setSearchTerm] = useState('');




//   useEffect(() => {
//     searchData()
//     setHitCounter(hitCounter + 1)
//   }, [searchTerm])

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     // Get the datas of peoples
//     try {
//       const { data } = await axios.get("https://jsonplaceholder.typicode.com/users")
//       setDatas(data)
//       setFilteredDatas(data)
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const renderData = () => {
//     return filteredDatas.map((data, key) => {
//       return (
//         <div className="user-card" key={key}>
//           <p>{data.name}</p>
//         </div>
//       )
//     })
//   }

//   const searchData = () => {
//     const searchedDatas = datas.filter((data) => {
//       return data.name.toLowerCase().includes(searchTerm.toLowerCase())
//     })

//     setFilteredDatas(searchedDatas)
//   }


//   return (
//     <div className="container">
//       <p>Hit the API {hitCounter}</p>
//       <input
//         className="search"
//         placeholder="Input Query..."
//         onChange={e => setSearchTerm(e.target.value)}
//       />
//       <h5 htmlFor="">{searchTerm}</h5>

//       {renderData()}

//     </div>
//   );
// }



// export default App;
