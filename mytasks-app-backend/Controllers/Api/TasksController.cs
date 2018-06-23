using System;
using System.Collections.Generic;
using mytasks.Models;
using Microsoft.AspNetCore.Mvc;
using mytasks.Repositories;

namespace mytasks.Controllers.Api {
    public class TasksController : ApiController<MyTasksDbContext, ITasksRepository, Task> {
        public TasksController(ITasksRepository repo) : base(repo) {
        }

        [Route("/backend/[controller]/view")]
        [HttpGet]
         public IActionResult IndexView() {
            var entities = _repo.GetAllFromView();
            var result = new {
                Data = entities
            };
            return new JsonResult(result);
        } 
    }
}