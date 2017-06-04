using System;
using System.Collections.Generic;
using mytasks.Models;
using Microsoft.AspNetCore.Mvc;

namespace mytasks.Controllers.Api {
    [Route("api/[controller]")]
    public class TasksController : Controller {

        [HttpGet]
        public IActionResult Index () {
            var tasks = new Task[] {
                new Task {
                    TaskName = "Task1"
                },
                new Task {
                    TaskName = "Task2"
                }
            };
            return new JsonResult (tasks);
        }
    }
}