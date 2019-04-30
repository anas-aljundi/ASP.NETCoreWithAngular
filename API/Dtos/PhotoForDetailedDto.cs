using System;

namespace API.Dtos
{
    public class PhotoForDetailedDto
    {
        public int PhotoId { get; set; }
        public string PhotoUrl { get; set; }
        public string Desciption { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
    }
}