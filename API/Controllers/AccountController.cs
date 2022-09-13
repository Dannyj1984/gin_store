using System;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            var userBasket = await RetrieveBasket(loginDto.Username);

            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            //if there is an anonymous basket, and a basket exists on the server for the logged in user
            //Remove the basket on the server and replace the anonymous basket buyerId with the logged in users username
            //Delete the buyId in the cookies.
            if (anonBasket != null)
            {
                if(userBasket != null) 
                    _context.Baskets.Remove(userBasket);
                    anonBasket.BuyerId = user.UserName;
                    Response.Cookies.Delete("buyerId");
                    await _context.SaveChangesAsync();
                
            }

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBasket?.MapBasketToDto()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User{UserName = registerDto.Username, Email = registerDto.Email};

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded)
            {
                foreach(var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201); //would normally return the location of the resource created, but ok to just return sucess code
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name); //Get name claim from token

            var userBasket = await RetrieveBasket(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = userBasket?.MapBasketToDto()
            };
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {

            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await _context.Baskets
                .Include(i => i.Items) // tell to return basket items
                .ThenInclude(p => p.Product) //tell to return basket details
                .FirstOrDefaultAsync(x => x.BuyerId.ToLower() == buyerId.ToLower());
        }


        //If the user logging in already has a basket on the server,
        //combine that basket with the anonymous basket
        private Basket MergeBaskets(Basket anonBasket, Basket userBasket)
        {
            foreach (var item in anonBasket.Items)
            {
                userBasket.AddItem(item.Product, item.Quantity);
            }
            return userBasket;
        }
    }
}