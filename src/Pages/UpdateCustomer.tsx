import React from 'react';
import {useLocation} from 'react-router-dom'
import Form from "../Components/form";

const UpdateCustomer: React.FC = () => {
  const location = useLocation();
  return (
    <div className="container border p-3">
      <Form selectedCust={location.state.data} title="Update Customer" submitType="Update Customer"/>
    </div>
  );
}

export default UpdateCustomer;