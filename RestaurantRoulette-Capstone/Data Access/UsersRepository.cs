using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantRoulette_Capstone.Data_Access
{
    public class UsersRepository
    {
        string ConnectionString;
        public UsersRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("EastBarley");
        }
    }
}
