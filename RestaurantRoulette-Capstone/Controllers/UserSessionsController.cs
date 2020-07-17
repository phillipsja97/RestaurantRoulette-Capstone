using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantRoulette_Capstone.Data_Access;
using RestaurantRoulette_Capstone.Models;

namespace RestaurantRoulette_Capstone.Controllers
{
    [Route("api/userSessions")]
    [ApiController]
    public class UserSessionsController : ControllerBase
    {
        UserSessionsRepository _repository;

        public UserSessionsController(UserSessionsRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("usersToAdd")]
        public IActionResult AddUsersToASession(List<UserSessions> usersToAdd)
        {
            var users = new List<UserSessions>();
            foreach (var item in usersToAdd)
            {
            var user = _repository.AddUsersToASession(item);
            users.Add(user);
            }
            var noUsers = !users.Any();
            if (noUsers)
            {
                return BadRequest("There was an issue in adding your friends to the session");
            }
            return Ok(users);
        }
    }
}