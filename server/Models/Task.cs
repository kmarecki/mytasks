using System.ComponentModel.DataAnnotations;

namespace mytasks.Models {
    public class Task {

        [Key]
        public int TaskId { get; set; }
        public string TaskName { get; set; }
    }
}