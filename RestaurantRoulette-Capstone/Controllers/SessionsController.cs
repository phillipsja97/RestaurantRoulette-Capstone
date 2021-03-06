﻿using System;
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
        public IActionResult GetSessionsByUserId(string uid)
        {
            var userId = _UsersRepository.GetUserByFirebaseUID(uid);
            var sessions = _repository.GetSessionsByUserId(userId.ID);
            var noSessions = !sessions.Any();
            if (noSessions)
            {
                NotFound("You have no session history");
            }
            return Ok(sessions);
        }

        [HttpGet("needsSwipedSessions/{uid}")]
        public IActionResult GetNeedsSwipedSessionsByUserId(string uid)
        {
            var userId = _UsersRepository.GetUserByFirebaseUID(uid);
            if (userId == null)
            {
                return Ok("No swiped sessions for that user yet.");
            }
            var needSwipedSessions = _repository.GetNeedsSwipedSessionsByUserId(userId.ID);
            var noNeedSwipedSessions = !needSwipedSessions.Any();
            if (noNeedSwipedSessions)
            {
                NotFound("You don't have any open sessions");
            }
            return Ok(needSwipedSessions);
        }

        [HttpGet("users/{sessionId}")]
        public IActionResult GetAllUsersOnASession(int sessionId)
        {
            var users = _repository.GetAllUsersOnASession(sessionId);
            var noUsers = !users.Any();
            if (noUsers)
            {
                NotFound("No users");
            }
            return Ok(users);
        }

        [HttpGet("singleSession/{sessionId}")]
        public IActionResult GetASession(int sessionId)
        {
            var singleSession = _repository.GetASession(sessionId);
            if (singleSession == null)
            {
                NotFound("No session to be found");
            }
            return Ok(singleSession);
        }

        [HttpPost("createSession/newSession")]
        public IActionResult CreateASession(Sessions sessionToStart)
        {
            var createdSession = _repository.CreateASession(sessionToStart);
            if (createdSession == null)
            {
                return NotFound("There was an error creating your session");
            }
            else
            {
                return Created("", createdSession);
            }
        }

        [HttpGet("completedSessions/{uid}")]
        public IActionResult GetCompletedSessionsByUserId(string uid)
        {
            var userId = _UsersRepository.GetUserByFirebaseUID(uid);
            if (userId == null)
            {
                return Ok("No swiped sessions for that user yet.");
            }
            var completedSessions = _repository.GetCompletedSessionsByUserId(userId.ID);
            var noCompletedSession = !completedSessions.Any();
            if (noCompletedSession)
            {
                NotFound("You don't have any open sessions");
            }
            return Ok(completedSessions);
        }
    }
}