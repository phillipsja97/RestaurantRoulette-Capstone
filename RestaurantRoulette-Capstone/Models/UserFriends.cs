using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantRoulette_Capstone.Models
{
    public class UserFriends
    {
        public int UserId1 { get; set; }
        public int UserId2 { get; set; }
    }

    public class FriendsList
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string FirebaseUID { get; set; }
    }
}
