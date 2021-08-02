using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HostelWebAPI.Models
{
    public class HostelBooking
    {
        public int Id { get; set; }

        public int RollNo { get; set; }

        public string StudentName { get; set; }

        public string Floor { get; set; }

        public string Room { get; set; }

        public string Facility { get; set; }
    }
}
