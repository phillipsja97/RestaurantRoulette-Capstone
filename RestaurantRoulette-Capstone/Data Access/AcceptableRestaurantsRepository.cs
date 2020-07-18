using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RestaurantRoulette_Capstone.Models;
using Dapper;
using Microsoft.Data.SqlClient;

namespace RestaurantRoulette_Capstone.Data_Access
{
    public class AcceptableRestaurantsRepository
    {
        string ConnectionString;
        public AcceptableRestaurantsRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("RestaurantRoulette");
        }

        public AcceptableRestaurants AcceptableRestaurantsToAdd(AcceptableRestaurants restaurantIds)
        {
       
        var sql = @"insert into AcceptableRestaurants (sessionId, UserId, RestaurantId)
                        output inserted.*
                              values (@SessionId, @userId, @restaurantId)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new {
                    sessionId = restaurantIds.SessionId,
                    userId = restaurantIds.UserId,
                    restaurantId = restaurantIds.RestaurantId,
                };
                var restaurants = db.QueryFirstOrDefault<AcceptableRestaurants>(sql, parameters);
                return restaurants;
            }
        }
        public IEnumerable<RestaurantIdAndUser> GetAllAcceptableRestaurantsByUserAndSessionId(int userId, int sessionId)
        {
            var sql = @"select UserId, RestaurantId
                            from AcceptableRestaurants
                                where UserId = @userId
                                    and SessionId = @sessionId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new
                {
                    userId = userId,
                    sessionId = sessionId,
                };
                var restaurants = db.Query<RestaurantIdAndUser>(sql, parameter);
                return restaurants;
            }
        }
    }
}
