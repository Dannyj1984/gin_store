using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto : LoginDto
    {
        public string Email { get; set; }
        public string  FirstName { get; set; }
        public string Surname { get; set; }
    }
}