using System;
using System.Collections.Generic;
using System.Linq;
using mytasks.Models;
using Microsoft.AspNetCore.Mvc;
using mytasks.Repositories;

namespace mytasks.Controllers.Api {

    public class ProjectsController : ApiController<MyTasksDbContext, Project> {
        public ProjectsController(IProjectsRepository repo) : base(repo) {
        }
    }
}