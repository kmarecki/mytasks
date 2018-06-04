using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace mytasks.Models {

    public class MyTasksDbContext: DbContext {

        public MyTasksDbContext(DbContextOptions<MyTasksDbContext> options)
            : base(options) { }

        public DbSet<Project> Projects { get; set;}
        public DbSet<Task> Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Project>()
                .Property(p => p.Created)
                .HasDefaultValue(DateTime.UtcNow);
            modelBuilder.Entity<Task>()
                .Property(p => p.Created)
                .HasDefaultValue(DateTime.UtcNow);
        }
    }
}