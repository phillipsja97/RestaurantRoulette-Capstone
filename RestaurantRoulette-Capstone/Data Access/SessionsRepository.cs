using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RestaurantRoulette_Capstone.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace RestaurantRoulette_Capstone.Data_Access
{
    public class SessionsRepository
    {
        string ConnectionString;
        public SessionsRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("RestaurantRoulette");
        }

        public List<SessionsWithUser> GetSessionsByUserId(int userId)
        {
            var sql = @"select Sessions.ID as SessionId, UserSessions.UserId, UserSessions.isSwiped, Sessions.OwnerId, Sessions.isSessionComplete
                            from UserSessions
	                            join Sessions
		                            on Sessions.ID = UserSessions.sessionId
			                            where UserSessions.userId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { userId = userId };
                var sessions = db.Query<SessionsWithUser>(sql, parameter).ToList();
                return sessions;
            }
        }
    }
}
