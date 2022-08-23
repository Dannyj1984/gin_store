using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    //designate as a controller class
    [ApiController]
    //route to api/Products
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
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
            return await _context.Products.FindAsync(id);
        }
    }
}