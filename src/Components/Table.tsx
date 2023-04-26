import React, {useContext} from 'react';
import { AppContext, baseUrl, Customer } from '../App';
import { FaSort } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import ModalDetails from './Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader'

interface Props {
  customers: Customer[];
  getCustomers: Function;
}

const TableData: React.FC<Props> = ({ customers, getCustomers }) => {
  const { loading } = useContext(AppContext);

  const [sortedField, setSortedField] = React.useState<keyof Customer | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  let sortedCustomers: Customer[] = [...customers];
  if (sortedField !== null) {
    sortedCustomers.sort((a, b) => {
      const sortValue = sortDirection === 'asc' ? 1 : -1;

      if (a[sortedField!] < b[sortedField!]) {
        return -1 * sortValue;
      }
      if (a[sortedField!] > b[sortedField!]) {
        return 1 * sortValue;
      }
      return 0;
    });
  }

  const toggleSortDirection = (field: keyof Customer) => {
    if (sortedField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortedField(field as keyof Customer);
      setSortDirection('asc');
    }
  };

  const [showModalDetails, setShowModalDetails] = React.useState(false);
  const [selectedCust, setSelectedCust] = React.useState<Customer | null>(null);

  const closeModalDetails = () => setShowModalDetails(false);

  const navigate = useNavigate();

  const openModalDetails = (data: Customer) => {
    setSelectedCust(data);
    setShowModalDetails(true);
  };

  const openUpdateModal = (data: Customer) => {
    setSelectedCust(data);
    navigate('/UpdateCustomer', { state: { data } });
  };


  const handleDeleteCustomer = (id: number) => {
    axios.delete(`${baseUrl}/Customer/${id}`)
      .then(res => {
        getCustomers();
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      {loading &&
        <Loader />
      }
      <Table responsive bordered>
        <thead>
          <tr className='bg-light'>
            <th>Id
            </th>

            <th>First Name
              <button type="button"
                className='btn no-border'
                onClick={() => toggleSortDirection('firstName')}><FaSort /></button>
            </th>
            <th>Last Name
              <button type="button"
                className='btn no-border'
                onClick={() => toggleSortDirection('lastName')}><FaSort /></button>
            </th>
            <th>City
            </th>
            <th>Zipcode
            </th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            sortedCustomers.map((data, index) => {
              return (
                <tr key={data.id} className='bg-light my-1'>
                  <td onClick={() => openModalDetails(data)}>{index + 1}</td>
                  <td onClick={() => openModalDetails(data)}>{data.firstName}</td>
                  <td onClick={() => openModalDetails(data)}>{data.lastName}</td>
                  <td onClick={() => openModalDetails(data)}>{data.customerAddress.city}</td>
                  <td onClick={() => openModalDetails(data)}>{data.customerAddress.zipCode}</td>
                  <td><button
                    className="btn btn-warning"
                    onClick={() => openUpdateModal(data)}
                  >
                    Update
                  </button></td>
                  <td><button
                    className="btn btn-danger"
                    disabled={data.customerAddress.city || data.customerAddress.state || data.customerAddress.zipCode ? true : false}
                    onClick={() => handleDeleteCustomer(data.id)} >
                    Delete
                  </button></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <ModalDetails show={showModalDetails} closeModal={closeModalDetails} selectedCust={selectedCust} />
    </>
  );
};

export default TableData;