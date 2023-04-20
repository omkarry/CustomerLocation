using AutoMapper;
using CustomerLocation.Data.Models;
using CustomerLocation.Service.Interfaces;
using CustomerLocation.Data.DBContext;
using CustomerLocation.Service.DTOs;
using Microsoft.EntityFrameworkCore;
using CustomerLocation.Service.Mapper;

namespace CustomerLocation.Service.Services
{
    public class CustomerLocationService : ICustomerLocationRepository
    {
        private readonly CustomerLocationContext _customerLocationContext;
        private readonly IMapper _mapper;
        public CustomerLocationService(CustomerLocationContext customerLocationContext, IMapper mapper)
        {
            _customerLocationContext = customerLocationContext;
            _mapper = mapper;
        }
        public List<CustomerDto> GetCustomers()
        {
            var customers = _customerLocationContext.Customer.Include(c => c.CustomerAddress).ToList();
            return customers.Select(c => new CustomerMapper().Map(c)).ToList();

        }

        public CustomerDto GetCustomer(int customerId)
        {
            var customerbyId = _customerLocationContext.Customer.Include(c => c.CustomerAddress).ToList().Where(_ => _.Id == customerId).FirstOrDefault();
            if (customerbyId == null)
                return null;
            else
                return (new CustomerMapper().Map(customerbyId));
        }

        public void AddCustomer(CustomerDto customerDto)
        {
            var newCustomer = new Customer
            {
                FirstName = customerDto.FirstName,
                LastName = customerDto.LastName,
                Email = customerDto.Email,
                Phone = customerDto.Phone,
                CustomerAddress = new CustomerAddress
                {
                    City = customerDto.CustomerAddress.City,
                    State = customerDto.CustomerAddress.State,
                    ZipCode = customerDto.CustomerAddress.ZipCode
                }
            };
            _customerLocationContext.Customer.Add(newCustomer);
            _customerLocationContext.SaveChanges();
        }
    }
}
