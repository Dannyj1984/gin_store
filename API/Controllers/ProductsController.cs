using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    
    public class ProductsController : BaseApiController
    {
        //dependency injection to get StoreContext
        private readonly StoreContext _context; //_ indicates private field
        public ProductsController(StoreContext context)
        {
            _context = context;
            
        }

        //endpoint
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpGet("{id}")] 
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if(product == null) {
                return NotFound();
            }

            return product;
        }
    }
}