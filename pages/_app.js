import {useState} from 'react';
import '@styles/globals.css'
import Header from '@components/Header';
import Search from '@components/Search';

function Application({ Component, pageProps }) {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <Header title={"Trinity Oaks Farm"} setShowSearch={setShowSearch} showSearch={showSearch} />
      {showSearch && (
        <Search setShowSearch={setShowSearch} />
      )}
      <Component {...pageProps} showSearch={showSearch} setShowSearch={setShowSearch} />
    </>
  )
}

export default Application
