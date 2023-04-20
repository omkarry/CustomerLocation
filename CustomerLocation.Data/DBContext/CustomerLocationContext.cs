using CustomerLocation.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomerLocation.Data.DBContext
{
    public class CustomerLocationContext : DbContext
    {
        public CustomerLocationContext(DbContextOptions option) : base(option) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasOne<CustomerAddress>(s => s.CustomerAddress)
                .WithOne(c => c.Customer)
                .HasForeignKey<CustomerAddress>(ad => ad.CustomerId);
        }

        public DbSet<Customer> Customer { get; set; }
        public DbSet<CustomerAddress> customerAddresses { get; set; }
    }
}
