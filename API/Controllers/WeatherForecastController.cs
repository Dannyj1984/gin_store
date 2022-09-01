using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
//anything in square brackets is an attribute
{
    [ApiController]
    [Route("[controller]")] //placeholder for name of controller minus 'controller'
    public class WeatherForecastController : ControllerBase
    {

        public WeatherForecastController()
        {

        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IActionResult> Get()
        {
            return null;
        }
    }
}


