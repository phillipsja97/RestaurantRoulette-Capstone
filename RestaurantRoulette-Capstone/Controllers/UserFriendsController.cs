using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantRoulette_Capstone.Data_Access;

namespace RestaurantRoulette_Capstone.Controllers
{
    [Route("api/userFriends")]
    [ApiController]
    public class UserFriendsController : ControllerBase
    {
        UserFriendsRepository _repository;
        UsersRepository _UsersRepository;

        public UserFriendsController(UserFriendsRepository repository, UsersRepository UsersRepository)
        {
            _repository = repository;
            _UsersRepository = UsersRepository;
        }

        [HttpGet("getFriends/{uid}")]
        public IActionResult GetAllFriends(string uid)
        {
            var userId = _UsersRepository.GetUserByFirebaseUID(uid);
            var friends = _repository.GetAllFriends(userId.ID);
            var noFriends = !friends.Any();
            if (noFriends)
            {
                NotFound("No friends found.");
            }
            return Ok(friends);
        }

        [HttpPost("addFriend/{userId1}/{userId2}")]
        public IActionResult AddAFriend(int userId1, int userId2)
        {
            var addedFriend = _repository.AddAFriend(userId1, userId2);
            if (addedFriend == null)
            {
                BadRequest("User could not be added to your friends list");
            }
            return Ok(addedFriend);
        }
    }
}