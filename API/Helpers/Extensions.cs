using Microsoft.AspNetCore.Http;

namespace API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string meesage)
        {
            response.Headers.Add("Application-Error", meesage);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}