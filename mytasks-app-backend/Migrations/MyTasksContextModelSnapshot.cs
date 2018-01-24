using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using mytasks.Models;

namespace mytasks.Migrations
{
    [DbContext(typeof(MyTasksContext))]
    partial class MyTasksContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2");

            modelBuilder.Entity("mytasks.Models.Project", b =>
                {
                    b.Property<int>("ProjectId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("ProjectName");

                    b.HasKey("ProjectId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("mytasks.Models.Task", b =>
                {
                    b.Property<int>("TaskId")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("ActualHours");

                    b.Property<DateTime?>("Closed");

                    b.Property<DateTime>("Created");

                    b.Property<string>("Description");

                    b.Property<decimal>("PlannedHours");

                    b.Property<string>("TaskName");

                    b.HasKey("TaskId");

                    b.ToTable("Tasks");
                });
        }
    }
}
