using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantRoulette_Capstone.Data_Access;

namespace RestaurantRoulette_Capstone.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UsersRepository _repository;

        public UsersController(UsersRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("{userId}")]
       public IActionResult GetUserById(int userId)
        {
            var user = _repository.GetUserById(userId);
            if (user == null)
            {
                return NotFound("No User found with that Id");
            } else
            {
                return Ok(user);
            }
        }

        [HttpGet("uid/{firebaseUID}")]
        public IActionResult GetUserByFirebaseUID(string firebaseUID)
        {
            var user = _repository.GetUserByFirebaseUID(firebaseUID);
            if (user == null)
            {
                return NotFound("No user found with that UID");
            } else
            {
                return Ok(user);
            }
        }
    }
}