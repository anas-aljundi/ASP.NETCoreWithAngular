using System.Linq;
using API.Dtos;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dist => dist.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).PhotoUrl);
                })
                .ForMember(dist => dist.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dist => dist.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).PhotoUrl);
                })
                .ForMember(dist => dist.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
        }
    }
}