import Classes from './styles/SearchBar.module.scss'
import {BsSearch} from 'react-icons/bs'
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function SearchBar() {
  const [results,setResults] = useState([]);
  const [filtered,setFiltered] = useState([]);
  const [search,setSearch] = useState("");

  function onSearch(e){
    setSearch(e.target.value)
    const flData = results.filter(item => (
    item.name.toLowerCase().startsWith(e.target.value.toLowerCase()) || item.name.toLowerCase().includes(e.target.value.toLowerCase(),3)
    ))
    console.log(e.target.value)
    setFiltered(flData)
    }

  const config = {
    headers: { Authorization: "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMjA1Mzk2Zi0xMjNlLTQ0YmUtOGIwZS01NGYyYmU4NGEyZTYiLCJ1c2VyaWQiOiIxMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZ3VpZCI6IkEzQTctQ0QzQS1GRUI2LTE1QTMiLCJleHAiOjE2NDI5NzUyOTIsImlzcyI6Imh0dHBzOi8vd3d3LmFraWxsaXRpY2FyZXQuY29tLyIsImF1ZCI6Imh0dHBzOi8vd3d3LmFraWxsaXRpY2FyZXQuY29tLyJ9.xv6G7dC6h8OZv_te0nV4BZC_UgushOJ7QaYfk0gaqfo", GUID: "A3A7-CD3A-FEB6-15A3" }
};

const items = async () => {
  try{
    const { data } = await axios.get('https://api.akilliticaretim.com/api/Product/ListProducts/0',config);
    setResults(data.data)
    console.log("başarılı")
  }catch(err){
    console.log(err)
  }
}

useEffect(() => {
  items();
},[])
  



  return (
    <div className={Classes.container}>
      <div className={Classes.main}>
          <input type="text" className={Classes.searchBar} placeholder='Ne aramıştınız ?' onChange={onSearch}/>
          <section className={Classes.searchBtn}>
              <BsSearch size={20}/>
              </section> 
              </div>
              <section className={Classes.searchResults}>
              {filtered.length > 0 && search.length > 2 && <ul>
                {filtered.map((item) => {
                    return (
                    <li key={item.key}>
                         <p>{item.name}</p>
                    </li>
                    )
                })}
            </ul>}
              </section> 
      </div>
  )
}
