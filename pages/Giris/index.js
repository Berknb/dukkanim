import { logout, login ,auth } from '../../firebase/initFirebase';
import { useRef, useState } from 'react';
import Classes from "./login.module.scss";
import Link from 'next/link';
import { useRouter } from 'next/router'
import axios from 'axios';

export default function Login() { 
const [loading, setLoading] = useState(false);
const router = useRouter();

    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleLogin(){
        const config = {
            headers: { GUID: "A3A7-CD3A-FEB6-15A3", Auth: {Username:"user",Password:"123456"} }
        };
        axios.post('https://api.akilliticaretim.com/api/Auth/Login',config)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
     }
    async function handleLogout(){
        setLoading(true)
        try{
            await logout();
        }catch{
        }
setLoading(false)
    }
 
    return (
        
            <div className={Classes.container}>
                <form className={Classes.card}>
                    <h2>Giriş yap<hr/></h2>
                        <label>Email</label>
                        <input type="email" ref={emailRef} placeholder='user@gmail.com'/>
                        <label>Şifre</label>
                        <input type="password" ref={passwordRef} placeholder='123456'/>
                     
                    <section className={Classes.submit}>
                    <button type="submit" disabled={loading || auth.currentUser != null} onClick={handleLogin}>
                        Giriş
                    </button>
                    <button type="submit" disabled={auth.currentUser == null} onClick={handleLogout}>
                        Çıkış yap 
                    </button>
                      
              </section>
              <label >Hesabınız yok mu? <Link href='/authentication/Signup'>üye olmak için tıklayın</Link></label>
                    </form>
                </div>
               
            
      
        
    )
}
