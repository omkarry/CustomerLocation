import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Spinner } from 'react-bootstrap';

axios.interceptors.request.use(
  (config) => {
    React.createElement("div", );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);