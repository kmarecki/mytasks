using System;
using System.Collections.Generic;
using mytasks.Models;
using Microsoft.AspNetCore.Mvc;
using mytasks.Repositories;

namespace mytasks.Controllers.Api {
    public class TasksController : ApiController<MyTasksDbContext, Task> {
        public TasksController(ITasksRepository repo) : base(repo) {
        }
    }
}