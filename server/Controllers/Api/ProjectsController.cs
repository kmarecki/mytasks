using System;
using System.Collections.Generic;
using System.Linq;
using mytasks.Models;
using Microsoft.AspNetCore.Mvc;

namespace mytasks.Controllers.Api {
    [Route("api/[controller]")]
    public class ProjectsController : Controller {

        private readonly MyTasksContext context;

        public ProjectsController(MyTasksContext context) {
            this.context = context;
        }

        [HttpGet]
        public IActionResult Index() {
            var result = new {
                Data = context.Projects
            };
            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id) {
            var result = new {
                Data = context.Projects
                    .First(p => p.ProjectId == id)
            };
            return new JsonResult(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Project project) {
            context.Projects.Add(project);
            context.SaveChanges();
            return Get(project.ProjectId);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Project project) {
            context.Projects.Update(project);
            context.SaveChanges();
            return Get(project.ProjectId);

        }

    }
}