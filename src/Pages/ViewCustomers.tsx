import { Customer, AppContext } from "../App";
import React, { useState } from 'react'
import TableData from "../Components/Table";
import axios from "axios";

const ViewCustomers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [customerList, setCustomerList] = useState<Customer[]>([]);

  const getCustomers = () => {
    axios.get("http://localhost:5026/api/Customers")
      .then(res => setCustomerList(res.data.result))
      .catch(err => console.log(err));
  }

  React.useEffect(() => {
    getCustomers();
  }, [])

  return (
    <div className="container-fluid w-100">
      <h1 className="text-center mb-4 bg-light">Customers</h1>
      <hr />
      <div className="row mx-5">
        <TableData
          customers={customerList}
          getCustomers={getCustomers}
        />
      </div>
    </div>
  );
}

export default ViewCustomers;