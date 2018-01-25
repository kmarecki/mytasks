using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using mytasks.Models;
using mytasks.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace mytasks {
    public class Startup {

        public Startup (IHostingEnvironment env) {
            var builder = new ConfigurationBuilder ()
                .SetBasePath (env.ContentRootPath)
                .AddJsonFile ("appsettings.json", optional : true, reloadOnChange : true)
                .AddJsonFile ($"appsettings.{env.EnvironmentName}.json", optional : true)
                .AddEnvironmentVariables ();
            Configuration = builder.Build ();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices (IServiceCollection services) {
            services.AddCors (options => options.AddPolicy ("AllowLocalhost", p => p.WithOrigins ("http://localhost:4200")
                .AllowAnyMethod ()
                .AllowAnyHeader ()));

            services.AddMvc ();
            services.AddDbContext<MyTasksDbContext> (options =>
                options.UseSqlite (Configuration.GetConnectionString ("sqlite")));

            services.AddScoped<IProjectsRepository, ProjectsRepository> ();
            services.AddScoped<ITasksRepository, TasksRepository> ();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory) {
            loggerFactory.AddConsole ();

            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            app.UseCors ("AllowLocalhost");

            app.UseDefaultFiles ();
            app.UseStaticFiles ();
            app.UseMvc (routes => {
                routes.MapRoute (
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}