import {customer} from "../App";
import React, {useState} from 'react';
import Form from "../Components/form";

const AddCustomer: React.FC = () => {
  const [newCustomer, setNewCustomer] = useState<customer>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    customerAddress: {
      id: 0,
      city: '',
      state: '',
      zipCode: 0
    }
  });
  return (
    <div className="container border p-3">
      <Form selectedCust={newCustomer} title="Add Customer" submitType="Add Customer"/>
    </div>
  );
}

export default AddCustomer;