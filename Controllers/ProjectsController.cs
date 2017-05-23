using System;
using System.Collections.Generic;
using mytasks.Models;
using Microsoft.AspNetCore.Mvc;

namespace mytasks.Controllers {

    public class ProjectsController : Controller {

        [HttpGet]
        public IActionResult Index () {
            var tasks = new Project[] {
                new Project {
                    ProjectName = "Project1"
                },
                new Project {
                    ProjectName = "Project2"
                }
            };
            return new JsonResult (tasks);
        }
    }
}