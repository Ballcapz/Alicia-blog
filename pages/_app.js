import '@styles/globals.css'
import Header from '@components/Header';

function Application({ Component, pageProps }) {
  return (
    <>
      <Header title={"Trinity Oaks Farm"} />
      <Component {...pageProps} />
    </>
  )
}

export default Application
