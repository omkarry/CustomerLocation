using CustomerLocation.Data.Models;
using CustomerLocation.Service.DTOs;

namespace CustomerLocation.Service.Interfaces
{
    public interface ICustomerLocationRepository
    {
        public List<CustomerDto> GetCustomers();
        public CustomerDto GetCustomer(int customerId);
        public void AddCustomer(CustomerDto customer);
    }
}
