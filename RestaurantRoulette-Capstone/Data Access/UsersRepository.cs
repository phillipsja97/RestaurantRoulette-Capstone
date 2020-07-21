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

        public Users GetUserByEmail(string email)
        {
            var sql = @"select *
                        from Users
                            where Users.Email = @email";
            
            using (var db = new SqlConnection(ConnectionString))
            {
                var parameter = new { email = email };
                var user = db.QueryFirstOrDefault<Users>(sql, parameter);
                return user;
            }
        }

        public IEnumerable<NewUser> SignUpNewUser(NewUser userToSignUp)
        {
            var sql = @"insert into Users (FullName, Email, PhoneNumber, FirebaseUID)
                          output inserted.*
                            values (@FullName, @Email, @PhoneNumber, @FirebaseUID)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    FullName = userToSignUp.FullName,
                    Email = userToSignUp.Email,
                    PhoneNumber = userToSignUp.PhoneNumber,
                    FirebaseUID = userToSignUp.FirebaseUID
                };
                var user = db.Query<NewUser>(sql, parameters);
                return user;
            }
        }

        public IEnumerable<Users> UpdateUser(Users user)
        {

            var sql = @"update Users
	                    set Users.FullName,
                            Users.Email = @Email,
                            Users.FirebaseUID = @FirebaseUID,
                            Users.PhoneNumber = @PhoneNumber
                                output inserted.*		                        
                                    where Users.Email = @Email";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    FullName = user.FullName,
                    Email = user.Email,
                    FirebaseUID = user.FirebaseUID,
                    PhoneNumber = user.PhoneNumber
                };
                var updatedUser = db.Query<Users>(sql, parameters);
                return updatedUser;

            }
        }

        public GoogleAuthNewUser GoogleAuthSignUpUser(GoogleAuthNewUser userToSignUp)
        {
            var sql = @"insert into Users (FullName, FirebaseUID)
                          output inserted.*
                            values (@FullName, @FirebaseUID)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    FullName = userToSignUp.FullName,
                    FirebaseUID = userToSignUp.FirebaseUID,
                };
                var newUser = db.QueryFirstOrDefault<GoogleAuthNewUser>(sql, parameters);
                return newUser;
            }
        }

        public Users UpdateUserProfile(int userId, Users userToUpdate)
        {
            var sql = @"update Users
                            set FullName = @FullName,
                                    Email = @Email,
	                                    PhoneNumber = @PhoneNumber,
                                            FirebaseUID = @FirebaseUID
                                                output inserted.*
                                                    where Id = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new
                {
                    FullName = userToUpdate.FullName,
                    Email = userToUpdate.Email,
                    PhoneNumber = userToUpdate.PhoneNumber,
                    UserId = userId,
                    FirebaseUID = userToUpdate.FirebaseUID,
                };
                var updatedUser = db.QueryFirstOrDefault<Users>(sql, parameters);
                return updatedUser;
            }
        }

    }
}
