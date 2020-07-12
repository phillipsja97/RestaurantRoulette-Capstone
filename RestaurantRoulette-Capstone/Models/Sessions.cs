﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantRoulette_Capstone.Models
{
    public class Sessions
    {
        public int ID { get; set; }
        public int UserId { get; set; }
        public bool isOwner { get; set; }
        public bool isSwiped { get; set; }
        public int QueryId { get; set; }
    }

    public class SessionsWithUser
    {
        public int SessionId { get; set; }
        public int UserId { get; set; }
        public bool isSwiped { get; set; }
        public int OwnerId { get; set; }
        public bool isSessionComplete { get; set; }
    }
}