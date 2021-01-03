import '@styles/globals.css'
import Header from '@components/Header';

function Application({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default Application
