using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    // all properties available from identyUser class,<> override to use int as primary key
    public class User : IdentityUser<int> 
    {
        //Create 1-1 relationship between User and UserAddress
        public UserAddress Address { get; set; }
    }
}