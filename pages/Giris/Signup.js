import { useRef, useState } from 'react';
import { SignupEmail, useAuth} from '../../firebase/initFirebase'
import Link from 'next/link';
import Classes from './login.module.scss'

function Signup() {
const [loading, setLoading] = useState(false);
const currentUser = useAuth();

const emailRef = useRef();
const passwordRef = useRef();

async function handleSignupEmail(){
    setLoading(true);
    try{
await SignupEmail(emailRef.current.value, passwordRef.current.value)
    } catch {
        alert("Email adresinizi doğru girdiğinizden emin olun ve en az 6 karakterlik bir şifre girin ! ");
        setLoading(false);
    }
 }

    return (
            <div className={Classes.container}>
                <form className={Classes.card}>
                    <h2>Kayıt ol<hr/></h2>
                        <label>Email</label>
                        <input type="email" ref={emailRef} placeholder='Email adresiniz'/>
                        <label>Şifre</label>
                        <input type="password" ref={passwordRef} placeholder='şifreniz'/>
                    <section className={Classes.submit}>
                    <button type="submit" disabled={loading || currentUser} onClick={handleSignupEmail}>
                        Kayıt ol
                    </button>
              </section>
              <label>Hesabınız var mı ?<Link href='/authentication'> Giriş yapmak için tıklayın</Link></label>
                    </form>
                </div> 
    )
}

export default Signup
