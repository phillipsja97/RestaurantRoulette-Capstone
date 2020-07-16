using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantRoulette_Capstone.Models
{
    public class QueryParameter
    {
        public int ID { get; set; }
        public int SessionId { get; set; }
        public string QueryName { get; set; }
        public string QueryCity { get; set; }
    }
}
