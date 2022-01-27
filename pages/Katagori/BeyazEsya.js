import { useEffect,useState } from "react";
import axiosInstance from "../api";
import Classes from './List.module.scss'
import ReactPaginate from 'react-paginate';
import Image from "next/image";
import {BsCart4} from 'react-icons/bs'
import {MdOutlineFeaturedPlayList} from 'react-icons/md'
import {AiFillHeart} from 'react-icons/ai'
import Popup from "../../components/Popup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'
import { useSelector } from "react-redux";


export default function BeyazEsya() {
  const [results,setResults] = useState([]);
  const [filtered,setFiltered] = useState([]);
  const [popup,setPopup] = useState(false);
  const [page,setPage] = useState(1050);
  const [loading,setLoading] = useState(true);
  const [order,setOrder] = useState("Tüm markalar");
  const currentUser = useSelector((state) => state.currentUser.value)

// -------------------------------Alerts--------------------------------------------
  const notifySuccess = () => toast.success("Ürün sepetinize eklendi!");
  const notifyError = () => toast.error("Önce giriş yapmalısınız!");
  const notifyFav = () => toast.success("Ürün favorilere eklendi!");

// -------------------------------OrderBy--------------------------------------------
  const orderOnchange = (order) => {
    if(order === "Tüm markalar"){
      setFiltered(results)
    }else{
      const flData = results.filter(item => (
        item.name.toLowerCase().startsWith(order)
        ))
        setFiltered(flData);
    }
  };

  const options = [
    { value:"Tüm markalar",
      text: 'Tümü',
    },
    { value:"vestel",
      text: 'Vestel',
    },
    { value:"simfer",
      text: 'Simfer',
    },
    { value:"arzum", 
      text: 'Arzum',
    },
    { value:"hitachi",
      text: 'Hitachi',
    },
    { value:"electrolux",
      text: 'Electrolux',
    },
    { value:"dyson",
      text: 'Dyson',
    },
    { value:"fakir",
      text: 'Fakir',
    },
    { value:"hotpoint",
      text: 'Hotpoint',
    },
  ];

// -------------------------------Fetch data--------------------------------------------
const items = async () => {
  
  try{
    const { data } = await axiosInstance.get('/api/Product/ListProducts/0');
    setResults(data.data)
    setFiltered(data.data)
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
    const pageCount = Math.ceil(filtered.length / resultsPerPage)
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }
    const displayResults = filtered.slice(pagesVisited,pagesVisited + resultsPerPage).map(item => {
        return (
                  <li key={item.key} className={Classes.listItems}>
                      <Image alt={item.name} width={150} height={200} src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
                    
                        <p>{item.name}</p>
                        <p><strong>{item.price}&nbsp;{item.currency}</strong><br/>
                        <small><strong>taksitli fiyatı: </strong>{3 + "x" + Math.round(item.price/3) + " TL"}</small></p>
                        <div className={Classes.cartItems}>
                          <label onClick={() => {setPage(item.id),setPopup(true)}}><MdOutlineFeaturedPlayList size={30}/></label>
                          <label onClick={() => {currentUser == true ? notifyFav():notifyError()}}><AiFillHeart size={30}/></label>
                          <label onClick={() => {currentUser == true ? notifySuccess():notifyError()}}><BsCart4 size={30}/></label>
                        </div>
                        <Popup trigger={popup} setTrigger={setPopup}>
                          <div className={Classes.popup}>
                            <section className={Classes.img}>
                              <Image alt={item.name} width={150} height={200} src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"/>
                            </section>
                            <p>{results.find((e) => e.id == page).name}</p>
                            <section className={Classes.cartItems} style={{width:"30%"}}>
                            <label onClick={() => {currentUser == true ? notifyFav():notifyError()}}><BsCart4 size={30}/></label>
                            <label onClick={() => {currentUser == true ? notifySuccess():notifyError()}}><AiFillHeart size={30}/></label>
                            </section>
                          </div>
                        </Popup>   
                  </li> 
                  
        )
    })
    if(loading === true){
      return <p style={{display:"flex",justifyContent:"center"}}>Yükleniyor...</p>
    }
 
  return (
    <div className={Classes.main}>
      <section className={Classes.category}>
        <p><strong>Beyaz Eşya</strong> katagorisi içeriğindeki ürünler listeleniyor;</p>
        </section>
        <section className={Classes.dropdown}>
        <Select value={order} options={options} placeholder={order} onChange={(e) => {
            setOrder(e.value);
            orderOnchange(e.value);
          }}
          getOptionLabel={e => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {e.icon}
              <p style={{ marginLeft: 5,fontSize:"13px" }}>{e.text}</p>
            </div>
          )}
           > 
              </Select>

        </section>
      <ul className={Classes.list}>
        {displayResults}
      </ul>
      {Math.ceil(filtered.length / resultsPerPage) > 1 && <div className={Classes.paginateMain}>
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
            </div>}
            <ToastContainer autoClose={1700} position="bottom-right" closeOnClick pauseOnHover={false}/>
    </div>
  )
}
