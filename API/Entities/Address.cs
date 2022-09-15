using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Address
    {
        [Required]
        public string Fullname { get; set; }
        [Required]
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string County { get; set; }
        public string Country { get; set; }
        [Required]
        public string PostCode { get; set; }
    }
}