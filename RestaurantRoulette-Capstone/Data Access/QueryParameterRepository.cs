﻿using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RestaurantRoulette_Capstone.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace RestaurantRoulette_Capstone.Data_Access
{
    public class QueryParameterRepository
    {
        string ConnectionString;
        public QueryParameterRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("RestaurantRoulette");
        }

        public IEnumerable<QueryParameter> GetAllQueryParamsOnSessionId(int sessionId)
        {
            var sql = @"select *
	                    from QueryParameter	
		                    where QueryParameter.SessionId = @sessionId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { sessionId = sessionId };
                var sessionParams = db.Query<QueryParameter>(sql, parameter);
                return sessionParams;
            }
        }

        public IEnumerable<QueryParameter> AddQueryToCurrentSession(QueryParameter queryToAdd)
        {
            var sql = @"insert into QueryParameter (SessionId, QueryCity, QueryName)
                            output inserted.*
                                values (@sessionId, @QueryCity, @QueryName)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new
                {
                    sessionId = queryToAdd.SessionId,
                    QueryCity = queryToAdd.QueryCity,
                    QueryName = queryToAdd.QueryName,
                };
                var queryParams = db.Query<QueryParameter>(sql, parameter);
                return queryParams;
            }
        }

        public IEnumerable<QueryParameter> UpdateQueryNameOnSessionId(int sessionId, QueryParameter updatedQuery)
        {
            var sql = @"update QueryParameter
                        set QueryName = @queryName
                            OUTPUT INSERTED.*
                                where SessionId = @sessionId";
            
            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new
                {
                    QueryName = updatedQuery.QueryName,
                    sessionId = sessionId,
                };
                var queryParams = db.Query<QueryParameter>(sql, parameter);
                return queryParams;
            }
        }
    }
}
