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
    [Route("api/queryParameter")]
    [ApiController]
    public class QueryParameterController : ControllerBase
    {
        QueryParameterRepository _repository;

        public QueryParameterController(QueryParameterRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("{sessionId}")]
        public IActionResult GetAllQueryParamsOnSessionId(int sessionId)
        {
            var sessionParams = _repository.GetAllQueryParamsOnSessionId(sessionId);
            var noParams = !sessionParams.Any();
            if (noParams)
            {
                return NotFound("No params for that session");
            }
            return Ok(sessionParams);
        }

        [HttpPost("addQueryParam")]
        public IActionResult AddQueryToCurrentSession(QueryParameter paramsToAdd)
        {
            var queryParams = _repository.AddQueryToCurrentSession(paramsToAdd);
            var noParams = !queryParams.Any();
            if (noParams)
            {
                return BadRequest("Could not add query parameters to the session");
            }
            return Created("", queryParams);
        }

        [HttpPut("updateQueryName/{sessionId}")]
        public IActionResult UpdateQueryNameOnSessionId(int sessionId, QueryParameter updatedQuery)
        {
            var queryParams = _repository.UpdateQueryNameOnSessionId(sessionId, updatedQuery);
            var noQuery = !queryParams.Any();
            if (noQuery)
            {
                return BadRequest("Could not update the query name");
            }
            return Ok(queryParams);
        }

        [HttpPut("updateOffsetNumber/{sessionId}")]
        public IActionResult UpdateOffsetNumber(int sessionId, QueryParameter updatedQuery)
        {
            var queryParams = _repository.UpdateOffsetNumber(sessionId, updatedQuery);
            if (queryParams == null)
            {
                return BadRequest("Could not update the query offset number");
            }
            return Ok(queryParams);
        }
    }
}