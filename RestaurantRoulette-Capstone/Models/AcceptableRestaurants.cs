using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantRoulette_Capstone.Models
{
    public class AcceptableRestaurants
    {
        public int SessionId { get; set; }
        public int UserId { get; set; }
        public string RestaurantId { get; set; }
    }
}
