using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet]

        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x => x.BuyerId == User.Identity.Name)
                .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket = await _context.Baskets
                .RetrieveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

                if (basket == null) return BadRequest(new ProblemDetails{Title = "Could not find your basket"});

                var items = new List<OrderItems>();

                foreach (var item in basket.Items)
                {
                    var productItem = await _context.Products.FindAsync(item.ProductId);
                    var itemOrdered = new ProductItemOrdered
                    {
                        ProductId = productItem.Id,
                        name = productItem.Name,
                        PictureUrl = productItem.PictureUrl
                    };

                    var orderItem = new OrderItems
                    {
                        ItemOrdered = itemOrdered,
                        Price = productItem.Price,
                        Quantity = item.Quantity
                    };
                    items.Add(orderItem);
                    productItem.QuantityInStock -= item.Quantity;
                }

                var subtotal = items.Sum(item => item.Price * item.Quantity);
                var deliveryFee = subtotal > 10000 ? 0 : 500;

                var order = new Order
                {
                    OrderItems = items,
                    BuyerId = User.Identity.Name,
                    shippingAddress = orderDto.shippingAddress,
                    Subtotal = subtotal,
                    DeliveryFee = deliveryFee
                };

                _context.Orders.Add(order);
                _context.Baskets.Remove(basket);

                if(orderDto.SaveAddress)
                {
                    var user = await _context.Users
                    .Include(a => a.Address)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
                    var address = new UserAddress
                    {
                        Fullname = orderDto.shippingAddress.Fullname,
                        Address1 = orderDto.shippingAddress.Address1,
                        Address2 = orderDto.shippingAddress.Address2,
                        City = orderDto.shippingAddress.City,
                        County = orderDto.shippingAddress.County,
                        Country = orderDto.shippingAddress.Country,
                        PostCode = orderDto.shippingAddress.PostCode,
                    };
                    user.Address = address;
                    //_context.Update(user); note required as entity framework knows of the change
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return CreatedAtRoute("GetOrder", new {id = order.Id}, order.Id);

                return BadRequest("Problem creating order");
        }
    }
}