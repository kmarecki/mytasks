using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace mytasks.Models {
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<MyTasksDbContext> {
        public MyTasksDbContext CreateDbContext (string[] args) {
            IConfigurationRoot configuration = new ConfigurationBuilder ()
                .SetBasePath (Directory.GetCurrentDirectory ())
                .AddJsonFile ("appsettings.json")
                .Build ();
            var builder = new DbContextOptionsBuilder<MyTasksDbContext> ();
            var connectionString = configuration.GetConnectionString ("Sqlite");
            builder.UseSqlite (connectionString);
            return new MyTasksDbContext (builder.Options);
        }
    }
}