using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mytasks.Models {
    public class Project {
        
        [Key]
        public int ProjectId { get; set; }

        public string ProjectName { get; set; }

        public string Description { get; set; }

        public DateTime Created { get; set; }

        public List<Task> Posts { get; set;}
    }
}