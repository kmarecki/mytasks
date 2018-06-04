using System;
using System.ComponentModel.DataAnnotations;

namespace mytasks.Models {
    public class Task {

        [Key]
        public int TaskId { get; set; }
        public string TaskName { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Closed { get; set; }

        public string Description { get; set; }

        public decimal PlannedHours { get; set; }

        public decimal ActualHours { get; set; }

        public TaskState State { get; set; }

    }
}