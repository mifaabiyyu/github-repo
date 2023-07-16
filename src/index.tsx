import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
interface EnvData {
  domain: string;
  clientId: string;
  redirect: any;
}

const Env: EnvData = {
  domain: `https://github.com/login/oauth`,
  clientId: "175c52448a3da99d3933",
  redirect: window.location.origin as string,
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Auth0Provider
        domain={Env.domain}
        clientId={Env.clientId}
        authorizationParams={{
          redirect_uri: "http://127.0.0.1:3000/home",
        }}>
        <Layout>
          <App />
          <Footer />
        </Layout>
      </Auth0Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
