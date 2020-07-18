using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantRoulette_Capstone.Models;
using RestaurantRoulette_Capstone.Data_Access;
using RestSharp;
using RestSharp.Authenticators;

namespace RestaurantRoulette_Capstone.Controllers
{
    [Route("api/yelp")]
    [ApiController]
    public class YelpController : ControllerBase
    {
        YelpRepository _repository;

        public YelpController(YelpRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("allRestaurants/{city}")]
        public IActionResult GetAllRestaurants(string city, string categories)
        {
            var result = _repository.GetAllResturants(city, categories);
            if (result == null)
            {
                return NotFound("Restaurants not found");
            }
            return Ok(result);
        }
    }
}