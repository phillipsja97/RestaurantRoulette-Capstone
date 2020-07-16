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
    public class UserFriendsRepository
    {
        string ConnectionString;
        public UserFriendsRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("RestaurantRoulette");
        }

        public IEnumerable<FriendsList> GetAllFriends(int userId)
        {
            var sql = @"select UserFriends.UserId2 as UserId, Users.FullName, Users.FirebaseUID
	                        from UserFriends
		                        join Users
			                        on UserFriends.UserId2 = Users.Id
				                        where UserFriends.UserId1 = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { userId = userId };
                var friends = db.Query<FriendsList>(sql, parameter);
                return friends;
            }
        }
    }
}
