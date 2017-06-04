using System;
using System.Collections.Generic;
using mytasks.Models;
using Microsoft.AspNetCore.Mvc;

namespace mytasks.Controllers.Api {
    [Route("api/[controller]")]
    public class ProjectsController : Controller {

        [HttpGet]
        public IActionResult Index() {
            var tasks = new {
                Data = new Project[] {
                new Project {
                    ProjectName = "Project1"
                },
                new Project {
                    ProjectName = "Project2"
                },
                 new Project {
                    ProjectName = "Project3"
                }
            }};
            return new JsonResult(tasks);
        }
    }
}