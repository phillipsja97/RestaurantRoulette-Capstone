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
        UserSessionsRepository _userSessionsRepository;

        public YelpController(YelpRepository repository, AcceptableRestaurantsRepository acceptableRestaurantsRepository, SessionsRepository sessionsRepository, UserSessionsRepository userSessionsRepository)
        {
            _repository = repository;
            _acceptableRestaurantsRepository = acceptableRestaurantsRepository;
            _sessionsRepository = sessionsRepository;
            _userSessionsRepository = userSessionsRepository;
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
            if (query.Count == 0)
            {
                return Ok("No matching restaurants.");
            }
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

        [HttpGet("allRestaurantsByCoords/{coordinates}")]
        public IActionResult GetAllRestaurantsByCoordinates(string coordinates, string categories)
        {
            var result = _repository.GetAllResturantsByCoordinates(coordinates, categories);
            if (result == null)
            {
                return NotFound("Restaurants not found");
            }
            return Ok(result);
        }

        [HttpGet("allRestaurants/next20/{city}")]
        public IActionResult GetNext20Restaurants(string city, string categories, int offSet)
        {
            var result = _repository.GetNext20Resturants(city, categories, offSet);
            if (result == null)
            {
                return NotFound("Restaurants not found");
            }
            return Ok(result);
        }

        [HttpGet("allRestaurants/next20byCoords/{city}")]
        public IActionResult GetNext20RestaurantsByCoords(string city, string categories, int offSet)
        {
            var result = _repository.GetNext20ResturantsByCoordinates(city, categories, offSet);
            if (result == null)
            {
                return NotFound("Restaurants not found");
            }
            return Ok(result);
        }

        [HttpGet("{winningId}")]
        public IActionResult GetTheWinningRestaurant(string winningId)
        {
            var result = _repository.GetWinningRestaurant(winningId);
            if (result == null)
            {
                return NotFound("Restaurants are not found");
            }
            return Ok(result);
        }
    }
}