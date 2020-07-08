using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantRoulette_Capstone.Data_Access
{
    public class SessionsRepository
    {
        string ConnectionString;
        public SessionsRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("EastBarley");
        }
    }
}
