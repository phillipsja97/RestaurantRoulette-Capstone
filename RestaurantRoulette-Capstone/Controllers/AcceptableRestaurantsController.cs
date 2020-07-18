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
    [Route("api/acceptableRestaurants")]
    [ApiController]
    public class AcceptableRestaurantsController : ControllerBase
    {
        AcceptableRestaurantsRepository _repository;

        public AcceptableRestaurantsController(AcceptableRestaurantsRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("restaurantsToAdd")]
        public IActionResult AcceptableRestaurantsToAdd(List<AcceptableRestaurants> restaurantIds)
        {
            var restaurants = new List<AcceptableRestaurants>();
            foreach (var item in restaurantIds)
            {
                var id = _repository.AcceptableRestaurantsToAdd(item);
                restaurants.Add(id);
            }
            var noUsers = !restaurants.Any();
            if (noUsers)
            {
                return BadRequest("There was an issue in adding your restaurants to your acceptable restaurants list.");
            }
            return Ok(restaurants);
        }

        [HttpGet("getRestaurants/{userId}/{sessionId}")]
        public IActionResult GetAllRestaurants(int userId, int sessionId)
        {
            var restaurants = _repository.GetAllAcceptableRestaurantsByUserAndSessionId(userId, sessionId);
            if (restaurants == null)
            {
                return NotFound("not found");
            }
            return Ok(restaurants);
        }


    }
}