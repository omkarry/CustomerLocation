using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerLocation.Service.DTOs
{
    public class CustomerAddressDto
    {
        public int Id { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public int? ZipCode { get; set; }
        public int CustomerId { get; set; }
    }
}
