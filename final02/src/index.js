import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import design
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/spacelab/bootstrap.min.css"
import "bootstrap";
import { RecoilRoot } from 'recoil';
import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


//axios customize
//- 환경설정(.env)에 정의된 값을 읽어온다
//- process.env.항목이름
import axios from 'axios';
axios.defaults.baseURL=process.env.REACT_APP_BASE_URL;//기본요청 URL
axios.defaults.timeout=2000;//타임아웃(ms)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
{/* <React.StrictMode> */}
      {/* RecoilRoot를 설정하면 해당 범위에서만 Recoil 이용 가능 */}
      <RecoilRoot>
         {/* HashRouter를 설정하면 해당 범위에서만 Route 이용 가능 */}
         <BrowserRouter>
            <App /> 
         </BrowserRouter>
      </RecoilRoot>
{/* </React.StrictMode> */}
</>); 


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();