using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantRoulette_Capstone.Data_Access;

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

        // need to set up a create session, and then add query params.
    }
}