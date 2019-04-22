using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(8, MinimumLength= 4, ErrorMessage="You must enter password more than 4 chars and less than 9 chars")]
        public string Password { get; set; }
    }
}