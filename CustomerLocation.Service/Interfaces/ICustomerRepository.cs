using CustomerLocation.Data.Models;
using CustomerLocation.Service.DTOs;

namespace CustomerLocation.Service.Interfaces
{
    public interface ICustomerLocationRepository
    {
        public List<CustomerDto> GetCustomers();
        public CustomerDto GetCustomer(int customerId);
        public void AddCustomer(CustomerDto customer);
        public CustomerDto UpdateCustomer(CustomerDto customerDto);
        public bool DeleteCustomer(int customerId);
        public bool IsEmailExist(string email);
        public bool IsPhoneExist(string phone);
    }
}
