import { baseUrl, customer, AppContext } from "../App";
import React, {useContext} from 'react';
import axios from "axios";
import { useState } from 'react';
import Loader from './Loader'
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  submitType: string;
  selectedCust: customer | null;
}

const Form: React.FC<Props> = ({ title, submitType, selectedCust }) => {
  const { loading } = useContext(AppContext);

  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [customerAddressId, setCustomerAddressId] = useState(0);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState(0);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (selectedCust !== null) {
      setId(selectedCust.id);
      setFirstName(selectedCust.firstName);
      setLastName(selectedCust.lastName);
      setEmail(selectedCust.email);
      setPhone(selectedCust.phone);
      setCustomerAddressId(selectedCust.customerAddress.id);
      setCity(selectedCust.customerAddress.city);
      setState(selectedCust.customerAddress.state);
      setZipCode(selectedCust.customerAddress.zipCode);
    }
  }, [selectedCust]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const customer = {
      id,
      firstName,
      lastName,
      email,
      phone,
      customerAddress: {
        customerAddressId,
        city,
        state,
        zipCode
      }
    };

    setLoader(true)

    if (submitType == 'Update Customer') {
      axios
        .put(`${baseUrl}/Customer`, customer)
        .then(res => {
          setLoader(false)
          navigate('/ViewCustomer')
        })
        .catch(err => {
          setLoader(false)
          console.log(err)
        });
    }
    else {
      axios
        .post(`${baseUrl}/Customer`, customer)
        .then(res => {
          setLoader(false)
          navigate('/ViewCustomer')
        })
        .catch(err => {
          setLoader(false)
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
    <form className="row g-3" onSubmit={handleSubmit}>
      {loading &&
        <Loader />
      }     <div className="form-header h2 text-center bg-light">
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
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required />
          {firstName == "" ? <p className="text-danger font-weight-bold">* Please enter the first name</p> : null}
          {!validateName(firstName) && firstName !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid first name</p> : null}
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
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required />
          {lastName == "" ? <p className="text-danger font-weight-bold">* Please enter the Last name</p> : null}
          {!validateName(lastName) && lastName !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid Last name</p> : null}
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
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
        {email == "" ? <p className="text-danger font-weight-bold">* Please enter the Email</p> : null}
        {!validateEmail(email) && email !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid Email address</p> : null}      </div>
      <div className="col-md-6">
        <label htmlFor="phoneNumber" className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          id="phoneNumber"
          placeholder="Enter phone number"
          name="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        {phone == "" ? <p className="text-danger font-weight-bold">* Please enter the Phone number</p> : null}
        {!validatePhone(phone) && phone !== "" ? <p className="text-danger font-weight-bold">Please enter a valid Phone number</p> : null}      </div>
      <div className="col-md-6">
        <label htmlFor="inputCity" className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          id="inputCity"
          placeholder="Enter city name"
          name="city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        {!validateName(city) && city !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid city name</p> : null}

      </div>
      <div className="col-md-4">
        <label htmlFor="inputState" className="form-label">State</label>
        <input
          type="text"
          className="form-control"
          id="inputCity"
          placeholder="Enter city name"
          name="state"
          value={state}
          onChange={e => setState(e.target.value)}
        />
        {!validateName(state) && state !== "" ? <p className="text-danger font-weight-bold">* Please enter a valid state name</p> : null}

      </div>
      <div className="col-md-2">
        <label htmlFor="inputZip" className="form-label">Zip</label>
        <input
          type="number"
          className="form-control"
          id="inputZip"
          placeholder="Enter zip code"
          name="zipCode"
          value={zipCode}
          onChange={e => setZipCode(e.target.valueAsNumber)}
        />
      </div>

      <div className="col-12">
        <input
          type="submit"
          className="btn btn-primary"
          value={submitType}
          disabled={!validateName(firstName) || 
            !validateName(lastName) || 
            !validateEmail(email) || 
            !validatePhone(phone) || 
            (!validateName(city) && city != "")  || 
            (!validateName(state) && state != "")
          }
        />
      </div>
    </form>
  );
}

export default Form;