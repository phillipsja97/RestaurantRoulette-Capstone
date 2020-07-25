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

        [HttpPost("newUser")]
        public IActionResult GetUserOrSignUpUser(NewUser userToSignUp)
        {
            var newUser = _repository.SignUpNewUser(userToSignUp);
            if (newUser == null)
            {
                return BadRequest("No User was created. Try again.");
            }
            return Created("New User Created", newUser);

        }

        [HttpPost("googleAuth/newOrReturningUser")]
        public IActionResult GoogleAuthSignUpUser(GoogleAuthNewUser userToSignUp)
        {
            var userCheck = _repository.GetUserByFirebaseUID(userToSignUp.FirebaseUID);
            if (userCheck == null)
            {
                var newUser = _repository.GoogleAuthSignUpUser(userToSignUp);
                if (newUser == null)
                {
                    return BadRequest("No User was created. Try again");
                }
                return Created("New User Created", newUser);
            }
            return Ok("User already exists");
        }

        [HttpPut("updateProfile/{userId}")]
        public IActionResult UpdateProfile(int userId, Users updatedProfile)
        {
            var updatedUser = _repository.UpdateUserProfile(userId, updatedProfile);
            if (updatedUser == null)
            {
                return BadRequest("Profile could not be updated");
            }
            return Ok(updatedUser);
        }

        [HttpGet("searchUsers/{input}")]
        public IActionResult SearchForUsers(string input)
        {
            var users = _repository.SearchForUsers(input);
            var noUsers = !users.Any();
            if (noUsers)
            {
                return NotFound("No users found.");
            }
            return Ok(users);
        }
    }
}