import { useRef,useState,useEffect } from 'react';
import Classes from "./login.module.scss";
import Link from 'next/link';
import { useRouter } from 'next/router'
import axiosInstance from '../api';
import { useDispatch } from 'react-redux'
import {offline, online} from '../../stores/User'

export default function Login() { 
const router = useRouter();
const dispatch = useDispatch()

    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleLogin(e){
        e.preventDefault();
        const postData = {
            username: emailRef.current.value,
            password: passwordRef.current.value
          };
          
          axiosInstance({method:"POST",url:"/api/Auth/Login",data:postData})
          .then((res) => {
            window.localStorage.setItem("token", res.data.data.token);
            window.localStorage.setItem("refresh",res.data.data.refreshToken);
            dispatch(online())
            router.push("/")
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
            dispatch(offline())
            alert("email: user // şifre: 123456")
          })
     }
     
    return (
            <div className={Classes.container}>
                <form className={Classes.card}>
                    <h2>Giriş yap<hr/></h2>
                        <label>Email</label>
                        <input type="email" ref={emailRef} placeholder='user'/>
                        <label>Şifre</label>
                        <input type="password" ref={passwordRef} placeholder='123456'/>
                     
                    <section className={Classes.submit}>
                    <button type="submit" onClick={handleLogin}>
                        Giriş
                    </button>
                    <button type="submit" disabled>
                        Çıkış yap 
                    </button>
                      
              </section>
              <label >Hesabınız yok mu? <Link href='/Giris/Kayit'>üye olmak için tıklayın</Link></label>
                    </form>
                </div>  
    )
}
