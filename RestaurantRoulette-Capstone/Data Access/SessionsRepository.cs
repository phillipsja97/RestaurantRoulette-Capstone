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

        public List<OpenSession> GetNeedsSwipedSessionsByUserId(int userId)
        {
            var sql = @"select UserSessions.sessionId, UserSessions.UserId, UserSessions.isSwiped, Sessions.OwnerId, 
                        Sessions.isSessionComplete, Users.fullName, Users.FirebaseUID
                            from UserSessions
                                join Sessions
                                    on Sessions.ID = UserSessions.sessionId
                                        join Users
                                            on UserSessions.UserId = Users.ID
                                                where UserSessions.UserId = @userId
                                                  and Sessions.isSessionComplete = 0";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { userId = userId };
                var needSwipedSessions = db.Query<OpenSession>(sql, parameter).ToList();
                return needSwipedSessions;
            }
        }

        public List<Users> GetAllUsersOnASession(int sessionId)
        {
            var sql = @"select *
	                        from UserSessions
		                        join Sessions
			                        on Sessions.ID = UserSessions.sessionId
				                        join Users
					                        on UserSessions.UserId = Users.ID
						                        where Sessions.Id = 2";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { sessionId = sessionId };
                var users = db.Query<Users>(sql, parameter).ToList();
                return users;
            }
        }
    }
}
