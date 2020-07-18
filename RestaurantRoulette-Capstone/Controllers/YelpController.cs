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
        AcceptableRestaurantsRepository _acceptableRestaurantsRepository;
        SessionsRepository _sessionsRepository;

        public YelpController(YelpRepository repository, AcceptableRestaurantsRepository acceptableRestaurantsRepository, SessionsRepository sessionsRepository)
        {
            _repository = repository;
            _acceptableRestaurantsRepository = acceptableRestaurantsRepository;
            _sessionsRepository = sessionsRepository;
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

        [HttpGet("getWinner/{sessionId}")]
        public IActionResult GetTheWinner(int sessionId)
        {
            var users = _sessionsRepository.GetAllUserIdsOnASession(sessionId);
            var allRestaurantIds = new List<string>();
            foreach (var item in users)
            {
                var restaurants = _acceptableRestaurantsRepository.GetAllAcceptableRestaurantsByUserAndSessionId(item.Id, sessionId);

                foreach (var selection in restaurants)
                {
                    allRestaurantIds.Add(selection.RestaurantId);
                }
            }
            var query = allRestaurantIds.GroupBy(x => x).Where(g => g.Count() > 1).Select(y => y.Key).ToList();
            Random rnd = new Random();
            var winningIndex = rnd.Next(0, query.Count());
            var winningId = query[winningIndex];
            var winningRestaurant = _repository.GetWinningRestaurant(winningId);
            if (winningRestaurant == null)
            {
                return NotFound("There was an error getting your winning restaurant. Please try again.");
            }
            var completeSession = _sessionsRepository.CompleteASession(sessionId);
            return Ok(winningRestaurant);
        }
    }
}