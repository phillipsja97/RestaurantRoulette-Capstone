﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using RestaurantRoulette_Capstone.Models;
using RestSharp;
using RestSharp.Authenticators;

namespace RestaurantRoulette_Capstone.Data_Access
{
    public class YelpRepository
    {
        private string _key;

        public YelpRepository(IConfiguration config)
        {
            _key = config.GetValue<string>("yelpKey");
        }
        public AllRestaurantData GetAllResturants(string City, string cityParams)
        {
            var client = new RestClient("https://api.yelp.com/v3/businesses/search");
            client.AddDefaultHeaders(new Dictionary<string, string> { { "Authorization", $"Bearer {_key}" } });

            var request = new RestRequest($"?location={City}&categories={cityParams}");
            var response = client.Get<AllRestaurantData>(request);
            if (!response.IsSuccessful)
            {
                return null;
            }
            return response.Data;
        }
    }
}