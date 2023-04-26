import React, { useState, useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import './App.css';
import Header from "./Layouts/Header/Header";
import Main from "./Layouts/Main/Main";
import axios from "axios";

export const AppContext = React.createContext<any>({});

export const baseUrl = "http://localhost:5026/api";

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  customerAddress: {
    id: number;
    city: string;
    state: string;
    zipCode: string;
  }
};

function App() {
  const [profile, setProfile] = useState({
    name: "Johnson",
  });
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   axios.interceptors.request.use(
  //     (config) => {
  //       setLoading(true);
  //       return config;
  //     },
  //     (error) => {
  //       setLoading(false);
  //       return Promise.reject(error);
  //     }
  //   );

  //   axios.interceptors.response.use(
  //     (response) => {
  //       setLoading(false);
  //       return response;
  //     },
  //     (error) => {
  //       setLoading(false);
  //       return Promise.reject(error);
  //     }
  //   );
  // }, []);

  return (
    <AppContext.Provider value={{ profile, loading, setLoading }}>
      <BrowserRouter>
        <div className="container-fluid w-100">
          <div className="row">
            <Header />
          </div>
          <div className="row">

            <div className="container">
              <Main />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>

  );
}

export default App;
