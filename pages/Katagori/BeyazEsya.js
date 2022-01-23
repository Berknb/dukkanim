import { useEffect,useState } from "react";
import axios from "axios";
import Classes from './List.module.scss'
import ReactPaginate from 'react-paginate';
import Image from "next/image";
import {BsCart4} from 'react-icons/bs'
import {MdOutlineFeaturedPlayList} from 'react-icons/md'
import {AiFillHeart} from 'react-icons/ai'
import Popup from "../../components/Popup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function BeyazEsya() {
  const [results,setResults] = useState([]);
  const [popup,setPopup] = useState(false);
  const [page,setPage] = useState(1050);
  const [loading,setLoading] = useState(true);

  const notifySuccess = () => toast.success("Ürün sepetinize eklendi!");
  const notifyError = () => toast.error("Önce giriş yapmalısınız!");
  const notifyFav = () => toast.success("Ürün favorilere eklendi!");


  const config = {
    headers: { Authorization: "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMjA1Mzk2Zi0xMjNlLTQ0YmUtOGIwZS01NGYyYmU4NGEyZTYiLCJ1c2VyaWQiOiIxMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZ3VpZCI6IkEzQTctQ0QzQS1GRUI2LTE1QTMiLCJleHAiOjE2NDI5NzUyOTIsImlzcyI6Imh0dHBzOi8vd3d3LmFraWxsaXRpY2FyZXQuY29tLyIsImF1ZCI6Imh0dHBzOi8vd3d3LmFraWxsaXRpY2FyZXQuY29tLyJ9.xv6G7dC6h8OZv_te0nV4BZC_UgushOJ7QaYfk0gaqfo", GUID: "A3A7-CD3A-FEB6-15A3" }
};
const items = async () => {
  try{
    const { data } = await axios.get('https://api.akilliticaretim.com/api/Product/ListProducts/0',config);
    setResults(data.data)
    console.log("başarılı")
    setLoading(false)
  }catch(err){
    console.log(err)
  }
}

useEffect(() => {
  items();
},[])

//---------------------------------Paginate-------------------------------------------------------
const [pageNumber,setPageNumber] = useState(0)
    const resultsPerPage = 4
    const pagesVisited = pageNumber * resultsPerPage
    const pageCount = Math.ceil(results.length / resultsPerPage)
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }
    const displayResults = results.slice(pagesVisited,pagesVisited + resultsPerPage).map(item => {
        return (
                  <li key={item.key} className={Classes.listItems}>
                      <Image alt={item.name} width={150} height={200} src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
                    
                        <p>{item.name}</p>
                        <p><strong>{item.price}&nbsp;{item.currency}</strong></p>
                        <div className={Classes.cartItems}>
                          <label onClick={() => {setPage(item.id),setPopup(true)}}><MdOutlineFeaturedPlayList size={30}/></label>
                          <label onClick={() => notifyFav()}><AiFillHeart size={30}/></label>
                          <label onClick={() => notifySuccess()}><BsCart4 size={30}/></label>
                        </div>
                        <Popup trigger={popup} setTrigger={setPopup}>
                          <div className={Classes.popup}>
                            <section className={Classes.img}>
                              <Image alt={item.name} width={150} height={200} src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
                            </section>
                            <p>{results.find((e) => e.id == page).name}</p>
                            <section className={Classes.cartItems} style={{width:"30%"}}>
                            <label onClick={() => notifyFav()}><BsCart4 size={30}/></label>
                            <label onClick={() => notifySuccess()}><AiFillHeart size={30}/></label>
                            </section>
                          </div>
                        </Popup>   
                  </li> 
                  
        )
    })
    if(loading === true){
      return <p style={{paddingLeft:"50%"}}>Yükleniyor...</p>
    }

  return (
    <div className={Classes.main}>
      <section className={Classes.category}>
        <p><strong>Beyaz Eşya</strong> katagorisi içeriğindeki ürünler listeleniyor;</p>
        </section>
      <ul className={Classes.list}>
        {displayResults}
      </ul>
      <div className={Classes.paginateMain}>
        <ReactPaginate
            previousLabel={"Önceki sayfa"}
            nextLabel={"Sonraki sayfa"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={Classes.paginationBttns}
            previousLinkClassName={Classes.previousBttn}
            nextLinkClassName={Classes.nextBttn}
            disabledClassName={Classes.paginationDisabled}
            activeClassName={Classes.paginationActive}
            />
            </div>
            <ToastContainer autoClose={1700} position="bottom-right" closeOnClick pauseOnHover={false}/>
    </div>
  )
}
