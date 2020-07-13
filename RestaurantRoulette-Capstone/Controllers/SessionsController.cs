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
        UsersRepository _UsersRepository;

        public SessionsController(SessionsRepository repository, UsersRepository UsersRepository)
        {
            _repository = repository;
            _UsersRepository = UsersRepository;
        }

        [HttpGet("{uid}")]
        public List<SessionsWithUser> GetSessionsByUserId(string uid)
        {
            var userId = _UsersRepository.GetUserByFirebaseUID(uid);
            var sessions = _repository.GetSessionsByUserId(userId.ID);
            var noSessions = !sessions.Any();
            if (noSessions)
            {
                NotFound("You have no session history");
            }
            return sessions;
        }

        [HttpGet("needsSwipedSessions/{uid}")]
        public List<OpenSession> GetNeedsSwipedSessionsByUserId(string uid)
        {
            var userId = _UsersRepository.GetUserByFirebaseUID(uid);
            var needSwipedSessions = _repository.GetNeedsSwipedSessionsByUserId(userId.ID);
            var noNeedSwipedSessions = !needSwipedSessions.Any();
            if (noNeedSwipedSessions)
            {
                NotFound("You don't have any open sessions");
            }
            return needSwipedSessions;
        }

        [HttpGet("users/{sessionId}")]
        public List<Users> GetAllUsersOnASession(int sessionId)
        {
            var users = _repository.GetAllUsersOnASession(sessionId);
            var noUsers = !users.Any();
            if (noUsers)
            {
                NotFound("No users");
            }
            return users;
        }
    }
}