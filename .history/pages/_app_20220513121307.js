import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react'
import axios from 'axios';
// axios.defaults.baseURL = 'https://reilitics.herokuapp.com/api';
axios.defaults.baseURL = 'http://localhost:3000//api';




function MyApp({ Component, pageProps }) {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const item = localStorage.getItem('token')

      axios.defaults.headers.common['Authorization'] = `Bearer ${item}`;
    }
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
