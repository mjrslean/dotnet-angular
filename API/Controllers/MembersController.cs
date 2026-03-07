using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {
            return await context.Users.AsAsyncEnumerable().ToListAsync();
            
        }

         [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetMember(string id)
        {
           var  member = await context.Users.FindAsync(id);

           if(member == null) return NotFound();

           return member;
        }
    }
}
