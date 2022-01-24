import { useRef, useState } from 'react';
import Link from 'next/link';
import Classes from './login.module.scss'

function Kayit() {
const emailRef = useRef();
const passwordRef = useRef();

    return (
            <div className={Classes.container}>
                <form className={Classes.card}>
                    <h2>Kayıt ol<hr/></h2>
                        <label>Email</label>
                        <input type="email" ref={emailRef} placeholder='Email adresiniz'/>
                        <label>Şifre</label>
                        <input type="password" ref={passwordRef} placeholder='şifreniz'/>
                    <section className={Classes.submit}>
                    <button type="submit" disabled>
                        Kayıt ol
                    </button>
              </section>
              <label>Hesabınız var mı ?<Link href='/Giris'> Giriş yapmak için tıklayın</Link></label>
                    </form>
                </div> 
    )
}

export default Kayit
