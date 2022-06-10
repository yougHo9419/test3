import { AppProps } from 'next/app';
import Head from 'next/head';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../components/styles/styles.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#005EBB',  // or #2962FF
      contrastText: '#fff'
    },
    action: {
    },
    divider: '#cacdd0',
  },
  typography: {
    fontFamily: "'Roboto', 'Noto Sans KR', sans-serif"
  }
});

const NextBOSS = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>재난 상황관리 시스템</title>
    </Head>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default NextBOSS;