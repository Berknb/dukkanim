import Classes from './styles/Footer.module.scss'
import {FaFacebookF} from 'react-icons/fa'
import {AiFillYoutube,AiOutlineArrowRight,AiOutlineCopyrightCircle} from 'react-icons/ai'
import {BsInstagram,BsTwitter} from 'react-icons/bs'
import Image from 'next/image'
import AkıllıTicaretLogo from '../images/AkıllıTicaretLogo.png'

export default function Footer() {
  return (
  <footer className={Classes.container}>
      <section className={Classes.headers}>
          <div>
              <h4>Kurumsal</h4>
              <ul>
                  <li>Hakkımızda</li>
                  <li>Kampanyalar</li>
                  <li>Banka Hesap Numaraları</li>
                  <li>Blog</li>
                  <li>Haberler</li>
              </ul>
          </div>
          <div>
              <h4>Müşteri hizmetleri</h4>
              <ul>
                  <li>Sipariş Sorgulama</li>
                  <li>Teslimat ve Kargo</li>
                  <li>İade ve Değişim</li>
                  <li>Üyelik Sözleşmesi</li>
                  <li>Gizlilik ve Güvenlik</li>
              </ul>
          </div>
          <div>
              <h4>Yardım</h4>
              <ul>
                  <li>İletişim Bilgileri</li>
                  <li>Sıkça Sorulan Sorular</li>
              </ul>
          </div>
          <div>
              <h4>İletişim</h4>
              <ul>
                  <li><strong>Adres:</strong> 1576 Sok. No: 1/43 Boran Plaza,<br/>Halkapınar,Konak/İzmir</li>
                  <li><strong>Telefon:</strong>08505555555</li>
              </ul>
          </div>
          <div>
              <h4>Bizi takip edin</h4>
              <ul>
                  <li><FaFacebookF size={20}/></li>
                  <li><BsTwitter size={20}/></li>
                  <li><BsInstagram size={20}/></li>
                  <li><AiFillYoutube size={20}/></li>
              </ul>
              <section className={Classes.email}>
              <p>E-bültene abone olun, fırsatları kaçırmayın</p>
              <div className={Classes.input}>
                  <input type="email" placeholder='E posta adresiniz'/>
                  <button><AiOutlineArrowRight size={20}/></button>
                  </div>
              </section>
          </div>
      </section>
      <section className={Classes.copyright}>
          <p>Copyright <AiOutlineCopyrightCircle/> {new Date().getFullYear()}</p>
          <section>
          <Image alt='Akıllı Ticaret.com' src={AkıllıTicaretLogo} width={314} height={70}/>
          </section>
      </section>
  </footer>
  )
}
