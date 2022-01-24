import Classes from './styles/SearchBar.module.scss'
import {BsSearch} from 'react-icons/bs'
import { useState,useEffect } from 'react';
import axiosInstance from '../pages/api';

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


const items = async () => {
  try{
    const { data } = await axiosInstance.get('/api/Product/ListProducts/0');
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
              {filtered.length > 0 ? search.length > 2 && <ul>
                {filtered.map((item) => {
                    return (
                    <li key={item.key}>
                         <p>{item.name}</p>
                    </li>
                    )
                })}
            </ul>:<ul><li>Eşleşen ürün yok </li></ul>}
              </section> 
      </div>
  )
}
