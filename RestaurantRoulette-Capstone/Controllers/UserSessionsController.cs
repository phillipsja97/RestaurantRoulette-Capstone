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

        [HttpPut("updateSwipeStatus")]
        public IActionResult UpdateSwipeStatus(UserSessions statusToUpdate)
        {
            var user = _repository.UpdateSwipeStatus(statusToUpdate);
            if (user == null)
            {
                return BadRequest("User's swipe status cannot be updated. Please try again.");
            }
            return Ok(user);

        }

        [HttpGet("getAllUsersSwipeStatus/{sessionId}")]
        public IActionResult GetAllUsersSwipeStatus(int sessionId)
        {
            var users = _repository.GetAllUsersSwipeStatus(sessionId);
            var noUsers = !users.Any();
            if (noUsers)
            {
                return NotFound("No swipe status available");
            }
            return Ok(users);
        }

        [HttpPut("updateAllUsersSwipeStatus/{sessionId}")]
        public IActionResult UpdateAllUsersSwipeStatus(int sessionId)
        {
            var users = _repository.GetAllUsersSwipeStatus(sessionId);
            var updatedUsers = new List<SwipeStatus>();
            foreach (var item in users)
            {
                var updatedUser = _repository.ResetAllUsersToNotSwiped(item.UserId, sessionId);
                updatedUsers.Add(updatedUser);
            }
            var noUsers = !updatedUsers.Any();
            if (noUsers)
            {
                return BadRequest("Could not update users");
            }
            return Ok(updatedUsers);
        }
    }
}