import Navigation from '@/components/header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'


function MyApp({Component, pageProps}: AppProps) {
  return (<>
            <Navigation></Navigation>
            <Component {...pageProps} />
      </>)
}

export default MyApp
