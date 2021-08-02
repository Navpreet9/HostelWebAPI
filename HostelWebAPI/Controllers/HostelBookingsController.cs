using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HostelWebAPI.Data;
using HostelWebAPI.Models;

namespace HostelWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostelBookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HostelBookingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/HostelBookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HostelBooking>>> GetHostelBookings()
        {
            return await _context.HostelBookings.ToListAsync();
        }

        // GET: api/HostelBookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HostelBooking>> GetHostelBooking(int id)
        {
            var hostelBooking = await _context.HostelBookings.FindAsync(id);

            if (hostelBooking == null)
            {
                return NotFound();
            }

            return hostelBooking;
        }

        // PUT: api/HostelBookings/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHostelBooking(int id, HostelBooking hostelBooking)
        {
            if (id != hostelBooking.Id)
            {
                return BadRequest();
            }

            _context.Entry(hostelBooking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HostelBookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HostelBookings
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<HostelBooking>> PostHostelBooking(HostelBooking hostelBooking)
        {
            _context.HostelBookings.Add(hostelBooking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHostelBooking", new { id = hostelBooking.Id }, hostelBooking);
        }

        // DELETE: api/HostelBookings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HostelBooking>> DeleteHostelBooking(int id)
        {
            var hostelBooking = await _context.HostelBookings.FindAsync(id);
            if (hostelBooking == null)
            {
                return NotFound();
            }

            _context.HostelBookings.Remove(hostelBooking);
            await _context.SaveChangesAsync();

            return hostelBooking;
        }

        private bool HostelBookingExists(int id)
        {
            return _context.HostelBookings.Any(e => e.Id == id);
        }
    }
}
