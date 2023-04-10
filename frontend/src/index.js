import React from 'react';
import { createRoot } from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './Store';
import App from './App';
import './css/bootstrap.css';
import './index.css';

import ReactDOM from 'react-dom';

// const root = (document.getElementById('root'));
// root.render(createRoot(
//   <React.StrictMode>
//     <StoreProvider>
//       <HelmetProvider>
//         <PayPalScriptProvider deferLoading={true}>
//           <App />
//         </PayPalScriptProvider>
//       </HelmetProvider>
//     </StoreProvider>
//   </React.StrictMode>)
// );

// ReactDOM.render(
// <React.StrictMode>
//   <StoreProvider>
//     <HelmetProvider>
//       <PayPalScriptProvider deferLoading={true}>
//         <App />
//       </PayPalScriptProvider>
//     </HelmetProvider>
//   </StoreProvider>
// </React.StrictMode>,
//   document.getElementById('root')
// );

// const rootElement = document.getElementById('root');
// const root = ReactDOM.createRoot(rootElement);
// root.render(
//   <React.StrictMode>
//     <StoreProvider>
//       <HelmetProvider>
//         <PayPalScriptProvider deferLoading={true}>
//           <App />
//         </PayPalScriptProvider>
//       </HelmetProvider>
//     </StoreProvider>
//   </React.StrictMode>
// );

// import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
