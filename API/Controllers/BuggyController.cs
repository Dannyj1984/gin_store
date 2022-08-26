using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {

        [HttpGet("not-found")]
        public ActionResult GetNotFound() 
        {
            return NotFound(); //sends 404 back to client
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest() 
        {
            return BadRequest(new ProblemDetails{Title = "This is a bad request"}); 
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised() 
        {
            return Unauthorized(); //sends 401 back to client
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError() 
        {
            ModelState.AddModelError("Problem1", "This is the first error");
            ModelState.AddModelError("Problem2", "This is the second error");
            return ValidationProblem(); //gives array of errors in model state
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError() 
        {
            throw new Exception("This is a server error");
        }
        
    }
}