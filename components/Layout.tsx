import { ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Header from './common/Header';
 
interface Props { 
  children?: ReactNode; 
} 
 
const Layout = ({ children }: Props): JSX.Element => (
  <> 
    <CssBaseline /> 
    <Header onSit={undefined} onPast={undefined} layer={undefined} open={undefined} yhonPast={undefined}  /> 
    {children} 
  </> 
);  
 
export default Layout; 