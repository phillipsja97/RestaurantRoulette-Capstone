using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using RestaurantRoulette_Capstone.Models;
using System;
using System.Collections.Generic;
using System.Linq;

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
				                        join Users
					                        on UserSessions.UserId = Users.ID
						                        where UserSessions.sessionId = @sessionId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { sessionId = sessionId };
                var users = db.Query<Users>(sql, parameter).ToList();
                return users;
            }
        }

        public IEnumerable<UserIdOnly> GetAllUserIdsOnASession(int sessionId)
        {
            var sql = @"select Users.Id
	                        from UserSessions
				                        join Users
					                        on UserSessions.UserId = Users.Id
						                        where UserSessions.sessionId = @sessionId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { sessionId = sessionId };
                var users = db.Query<UserIdOnly>(sql, parameter);
                return users;
            }
        }

        public IEnumerable<Sessions> GetASession(int sessionId)
        {
            var sql = @"select *
	                       from Sessions
							    where Sessions.Id = @sessionId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { sessionId = sessionId };
                var session = db.Query<Sessions>(sql, parameter);
                return session;
            }
        }

        public IEnumerable<Sessions> CreateASession(Sessions sessionToCreate)
        {
            var sql = @"insert into Sessions (OwnerId, isSessionComplete)
                        output inserted.*
                            values (@ownerId, @isSessionComplete)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new
                {
                    ownerId = sessionToCreate.OwnerId,
                    isSessionComplete = sessionToCreate.isSessionComplete,
                };
                var createdSession = db.Query<Sessions>(sql, parameter);
                return createdSession;
            }
        }

        public SessionIdOnly CompleteASession(int sessionId)
        {
            var sql = @"update Sessions
                            set isSessionComplete = 1
                                where Id = @sessionId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new
                {
                    sessionId = sessionId,
                };
                var updateSession = db.QueryFirstOrDefault<SessionIdOnly>(sql, parameter);
                return updateSession;
            }
        }

        public IEnumerable<ClosedSession> GetCompletedSessionsByUserId(int userId)
        {
            var sql = @"select UserSessions.sessionId, UserSessions.UserId, UserSessions.isSwiped, Sessions.OwnerId, 
                            Sessions.isSessionComplete, Users.fullName, Users.FirebaseUID
                                from UserSessions
                                    join Sessions
                                        on Sessions.ID = UserSessions.sessionId
                                            join Users
                                                on UserSessions.UserId = Users.ID
                                                    where UserSessions.UserId = @userId
                                                        and Sessions.isSessionComplete = 1";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { userId = userId };
                var completedSessions = db.Query<ClosedSession>(sql, parameter);
                return completedSessions;
            }
        }
    }
}
