import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Store from '../Store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={Store}>
    <Navbar/>
  <Component {...pageProps}/>
   <Footer/>
  </Provider>
  )
}
export default MyApp
