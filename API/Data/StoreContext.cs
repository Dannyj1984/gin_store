using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User> //Derive from DBContext class
    {
        public StoreContext(DbContextOptions options) : base(options) //DbContext is base class
        {

        }

        //products will be the name of the sql table
        public DbSet<Product> Products {get; set;}

        public DbSet<Basket> Baskets { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //Add data to db on migration
            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole{Name="Member", NormalizedName= "MEMBER"},
                    new IdentityRole{Name="Admin", NormalizedName= "ADMIN"}
                );
        }
    }
}