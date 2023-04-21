import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import AddCustomer from "../../Pages/AddCustomer";
import ViewCustomer from "../../Pages/ViewCustomers";
import UpdateCustomer from "../../Pages/UpdateCustomer";

function Main() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AddCustomer" element={<AddCustomer />} />
        <Route path="/ViewCustomer" element={<ViewCustomer />} />
        <Route path="/UpdateCustomer" element={<UpdateCustomer />} />
      </Routes>
    </>
  );
}

export default Main;