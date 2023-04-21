using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomerLocation.Data.Models
{
    public class CustomerAddress
    {
        public int Id { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public int? ZipCode{ get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}
