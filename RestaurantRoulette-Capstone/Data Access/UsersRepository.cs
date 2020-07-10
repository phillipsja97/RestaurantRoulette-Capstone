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
    public class UsersRepository
    {
        string ConnectionString;
        public UsersRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("RestaurantRoulette");
        }

        public Users GetUserById(int UserId)
        {
            var sql = @"select *
                        from Users
                        where Users.ID = @UserId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { UserId = UserId };
                var user = db.QueryFirstOrDefault<Users>(sql, parameter);
                return user;
            }
        }

        public Users GetUserByFirebaseUID(string firebaseUID)
        {
            var sql = @"select *
                         from Users
                            where Users.FirebaseUID = @firebaseUID";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { firebaseUID = firebaseUID };
                var user = db.QueryFirstOrDefault<Users>(sql, parameter);
                return user;
            }
        }
    }
}
