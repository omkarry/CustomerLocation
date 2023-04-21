using CustomerLocation.Data.Models;
using CustomerLocation.Service.DTOs;
namespace CustomerLocation.Service.Mapper
{

    public class CustomerMapper
    {
        public CustomerDto Map(Customer entity)
        {
            CustomerAddressDto customerAddressDto = null;
            if (entity.CustomerAddress != null)
            {
                customerAddressDto = new CustomerAddressDto
                {
                    Id = entity.CustomerAddress.Id,
                    City = entity.CustomerAddress.City,
                    State = entity.CustomerAddress.State,
                    ZipCode = entity.CustomerAddress.ZipCode
                };
            }
            return new CustomerDto
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                Phone = entity.Phone,
                CustomerAddress = customerAddressDto    
            };
        }
    }
}
