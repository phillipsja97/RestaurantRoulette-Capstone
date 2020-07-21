using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantRoulette_Capstone.Models
{
    public class Users
    {
        public int ID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string FirebaseUID { get; set; }
        
    }

    public class NewUser
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string FirebaseUID { get; set; }
    }

    public class UserIdOnly
    {
        public int Id { get; set; }
    }

    public class GoogleAuthNewUser
    {
        public string FullName { get; set; }
        public string FirebaseUID { get; set; }
    }
}
