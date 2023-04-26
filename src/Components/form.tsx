import { baseUrl, Customer, AppContext } from "../App";
import React, { useContext } from 'react';
import axios from "axios";
import { useState } from 'react';
import Loader from './Loader'
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  submitType: string;
  selectedCust: Customer;
}

const Form: React.FC<Props> = ({ title, submitType, selectedCust }) => {
  const { loading } = useContext(AppContext);
  const [disable, setFieldDisable] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    customerAddress: {
      id: 0,
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const [emailAlertMessage, setEmailAlertMessage] = useState("");
  const [phoneAlertMessage, setPhoneAlertMessage] = useState("");
  const [emailAlert, setEmailAlert] = useState(false);
  const [phoneAlert, setPhoneAlert] = useState(false);


  const navigate = useNavigate();

  React.useEffect(() => {
    if (submitType == 'Update Customer') {
      setFieldDisable(true);
      setCustomer(selectedCust);
    }
    else{
      setFieldDisable(false);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'city' || name === 'state' || name === 'zipCode') {
      setCustomer({
        ...customer,
        customerAddress: {
          ...customer.customerAddress,
          [name]: value
        }
      })
    } else {
      setCustomer({
        ...customer,
        [name]: value
      })
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target
    setCustomer({
      ...customer,
      [name]: value
    });
    if (validateEmail(value)){
      axios
      .get(`${baseUrl}/Customer/IsEmailExist/${value}`)
      .then(res => {
        if (res.data.result) {
          setEmailAlert(true);
          setEmailAlertMessage(res.data.message);
        }
        else {
          setEmailAlert(false);
        }
      })
      .catch(err => {
        console.log(err)
      });
    }
    else {
      setEmailAlert(false);
    }
  }
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target
    setCustomer({
      ...customer,
      [name]: value
    });
    if (validatePhone(value)) {
      axios
        .get(`${baseUrl}/Customer/IsPhoneExist/${value}`)
        .then(res => {
          if (res.data.result) {
            setPhoneAlert(true);
            setPhoneAlertMessage(res.data.message);
          }
          else {
            setPhoneAlert(false);
          }
        })
        .catch(err => {
          console.log(err)
        });
    }
    else {
      setPhoneAlert(false);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitType == 'Update Customer') {
      axios
        .put(`${baseUrl}/Customer`, customer)
        .then(res => {
          navigate('/ViewCustomer')
        })
        .catch(err => {
          console.log(err)
        });
    }
    else {
      axios
        .post(`${baseUrl}/Customer`, customer)
        .then(res => {
          navigate('/ViewCustomer')
        })
        .catch(err => {
          console.log(err)
        });
    }
  }

  function validateName(name: string) {
    var re = /^[a-zA-Z ]+$/;
    return re.test(name);
  }

  function validateEmail(email: string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validatePhone(phone: string) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit} autoComplete="off">
      {loading &&
        <Loader />
      }
      <div className="form-header h2 text-center bg-light">
        {title}
      </div>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            id='firstName'
            aria-label="First name"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
            required />
          {customer.firstName == "" ? <p className="text-danger font-weight-bold">* Please enter the first name</p> : null}
          {!validateName(customer.firstName) && customer.firstName !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid first name</p> : null}
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            id='lastName'
            aria-label="Last name"
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
            required />
          {customer.lastName == "" ? <p className="text-danger font-weight-bold">* Please enter the Last name</p> : null}
          {!validateName(customer.lastName) && customer.lastName !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid Last name</p> : null}
        </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter Email"
          name="email"
          value={customer.email}
          disabled={disable}
          onChange={handleEmailChange}
          required />
        {customer.email == "" ? <p className="text-danger font-weight-bold">* Please enter the Email</p> : null}
        {!validateEmail(customer.email) && customer.email !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid Email address</p> : null}
        {emailAlert && customer.email != "" ? <p className="text-danger font-weight-bold">{emailAlertMessage}</p> : null}
      </div>
      <div className="col-md-6">
        <label htmlFor="phoneNumber" className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          id="phoneNumber"
          placeholder="Enter phone number"
          name="phone"
          value={customer.phone}
          disabled={disable}
          onChange={handlePhoneChange}
        />
        {customer.phone == "" ? <p className="text-danger font-weight-bold">* Please enter the Phone number</p> : null}
        {!validatePhone(customer.phone) && customer.phone !== "" ? <p className="text-danger font-weight-bold">Please enter a valid Phone number</p> : null}
        {phoneAlert && customer.phone != "" ? <p className="text-danger font-weight-bold">{phoneAlertMessage}</p> : null}
      </div>
      <div className="col-md-6">
        <label htmlFor="inputCity" className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          id="inputCity"
          placeholder="Enter city name"
          name="city"
          value={customer.customerAddress.city}
          onChange={handleChange}
        />
        {!validateName(customer.customerAddress.city) && customer.customerAddress.city !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid city name</p> : null}

      </div>
      <div className="col-md-4">
        <label htmlFor="inputState" className="form-label">State</label>
        <input
          type="text"
          className="form-control"
          id="inputCity"
          placeholder="Enter State name"
          name="state"
          value={customer.customerAddress.state}
          onChange={handleChange}
        />
        {!validateName(customer.customerAddress.state) && customer.customerAddress.state !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid state name</p> : null}

      </div>
      <div className="col-md-2">
        <label htmlFor="inputZip" className="form-label">Zip</label>
        <input
          type="text"
          className="form-control"
          id="inputZip"
          placeholder="Enter zip code"
          name="zipCode"
          value={customer.customerAddress.zipCode}
          onChange={handleChange}
        />
      </div>

      <div className="col-12">
        <input
          type="submit"
          className="btn btn-primary"
          value={submitType}
          disabled={!validateName(customer.firstName) ||
            !validateName(customer.lastName) ||
            !validateEmail(customer.email) ||
            !validatePhone(customer.phone) ||
            (!validateName(customer.customerAddress.city) && customer.customerAddress.city != "") ||
            (!validateName(customer.customerAddress.state) && customer.customerAddress.state != "") ||
            emailAlert ||
            phoneAlert
          }
        />
      </div>
    </form>
  );
}

export default Form;