import Logo from '../images/mainLogo.png';
import Image from 'next/image';
import Classes from './styles/Navbar.module.scss';
import SearchBar from './SearchBar';
import {FaFacebookF} from 'react-icons/fa';
import {AiFillYoutube} from 'react-icons/ai';
import {BsInstagram,BsTwitter} from 'react-icons/bs';
import {FiUser} from 'react-icons/fi';
import {BsCart4} from 'react-icons/bs';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  
  return (
      <nav className={Classes.container}>
        <div className={Classes.aboutDukkan}>
             <section className={Classes.social}>
             <a href='https://www.facebook.com/berk.dundar' target="_blank" rel='noreferrer'><FaFacebookF size={25}/></a> 
             <a href='https://twitter.com/berkndundar' target="_blank" rel='noreferrer'><BsTwitter size={25}/></a>
             <a href='https://www.instagram.com/berkdundar0/' target="_blank" rel='noreferrer'><BsInstagram size={25}/></a> 
             <a href='https://www.youtube.com/channel/UCIBBA4rBYRu5g7rbNPSUKmw' target="_blank" rel='noreferrer'><AiFillYoutube size={25}/></a>
             </section>
             <section className={Classes.help}>
               <a>Yardım</a>
               <a href='https://berk-portfolio.vercel.app/' target="_blank" rel='noreferrer'>Blog</a>
             </section>
        </div>
        <div className={Classes.mainNav}>
        <section className={Classes.logo}>
          <Image alt='dükkanım logo' src={Logo} width={200} height={200} onClick={() => router.push("/")}/>
        </section>

          <SearchBar/>
          <section className={Classes.userItems}>
          <label onClick={() => router.push("/Giris")}>
            <FiUser size={25}/>
            <p>
              Giriş Yap 
              <small style={{fontSize:"13px", color:"grey"}}> &nbsp;&nbsp;veya üye ol</small>
            </p>
            </label>
          <label>
            <BsCart4 size={25}/>
            <p>
              Sepetim
            </p>
            </label>
            </section>
          </div>
          <div className={Classes.categories}>
            <label onClick={() => {router.push("/Katagori/BeyazEsya")}}>Beyaz Eşya</label>
            <label>Ayakkabı</label>
            <label>Televizyonlar &amp; Ses Sistemleri </label>
            <label>Ev Eşyaları</label>
            <label>Kişisel Bakım</label>
            <label>Mutfak Gereçleri</label>
            </div>
            <div className={Classes.location}>
              {typeof window !== "undefined" && window.location.pathname != "/" && <p><span onClick={()=>router.push("/")}>Anasayfa</span><strong>{window.location.pathname.replaceAll("/"," > ")}</strong></p>}
            </div>
      </nav>
  )
}
