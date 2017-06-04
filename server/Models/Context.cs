using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace mytasks.Models {

    public class MyTasksContext: DbContext {

        public MyTasksContext(DbContextOptions<MyTasksContext> options)
            : base(options) { }

        public DbSet<Project> Projects { get; set;}
        public DbSet<Task> Posts { get; set; }

    }
}