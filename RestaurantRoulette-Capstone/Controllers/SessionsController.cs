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
    [Route("api/sessions")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        SessionsRepository _repository;

        public SessionsController(SessionsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("openSessions/{userId}")]
        public List<SessionsWithUser> GetSessionsByUserId(int userId)
        {
            var openSessions = _repository.GetSessionsByUserId(userId);
            var noSessions = !openSessions.Any();
            if (noSessions)
            {
                NotFound("You have no open Sessions");
            }
            return openSessions;
        }
    }
}