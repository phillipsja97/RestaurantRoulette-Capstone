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
    public class UserSessionsRepository
    {
        string ConnectionString;
        public UserSessionsRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("RestaurantRoulette");
        }

        public UserSessions AddUsersToASession(UserSessions usersToAdd)
        {
            var sql = @"insert into UserSessions (SessionId, UserId, isSwiped)
                            output inserted.*
                                values (@sessionId, @userId, 0)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    sessionId = usersToAdd.SessionId,
                    userId = usersToAdd.UserId,
                };

                var newUsers = db.QueryFirstOrDefault<UserSessions>(sql, parameters);
                return newUsers;
            }
        }

        public UserSessions UpdateSwipeStatus(UserSessions statusToUpdate)
        {
            var sql = @"update UserSessions
                          set isSwiped = 1
                             output inserted.*
                                where SessionId = @sessionId
                                    and userId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new
                {
                    sessionId = statusToUpdate.SessionId,
                    userId = statusToUpdate.UserId,
                };
                var updatedStatus = db.QueryFirstOrDefault<UserSessions>(sql, parameter);
                return updatedStatus;
            }
        }

        public IEnumerable<SwipeStatus> GetAllUsersSwipeStatus(int sessionId)
        {
            var sql = @"select UserSessions.UserId, UserSessions.isSwiped, Users.FullName
                            from UserSessions
	                            join Users	
		                            on UserSessions.UserId = Users.Id
                                        where SessionId = @sessionId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new
                {
                    sessionId = sessionId,
                };
                var status = db.Query<SwipeStatus>(sql, parameter);
                return status;
            }
        }
    }
}
