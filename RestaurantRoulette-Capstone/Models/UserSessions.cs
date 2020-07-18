using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantRoulette_Capstone.Models
{
    public class UserSessions
    {
        public int Id { get; set; }
        public int SessionId { get; set; }
        public int UserId { get; set; }
        public bool isSwiped { get; set; }

    }

    public class UserStatusUpdate
    {
        public int SessionId { get; set; }
        public int UserId { get; set; }
    }

    public class SwipeStatus
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public bool isSwiped { get; set; }
    }
}
