using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext //Derive from DBContext class
    {
        public StoreContext(DbContextOptions options) : base(options) //DbContext is base class
        {

        }

        //products will be the name of the sql table
        public DbSet<Product> Products {get; set;}

        public DbSet<Basket> Baskets { get; set; }
    }
}