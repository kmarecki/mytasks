using System;
using System.Collections.Generic;
using System.Linq;
using mytasks.Models;
using Microsoft.AspNetCore.Mvc;

namespace mytasks.Controllers.Api {
    [Route("api/[controller]")]
    public class ProjectsController : Controller {

        private readonly MyTasksContext _context;

        public ProjectsController(MyTasksContext context) {
            this._context = context;
        }

        [HttpGet]
        public IActionResult Index() {
            var result = new {
                Data = _context.Projects
            };
            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id) {
            var project = _context.Projects
                .First(p => p.ProjectId == id);
            if (project != null) {
                var result = new {
                    Data = _context.Projects
                        .First(p => p.ProjectId == id)
                };
                return new JsonResult(result);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult Post([FromBody]Project project) {
            _context.Projects.Add(project);
            _context.SaveChanges();
            return Get(project.ProjectId);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Project project) {
            _context.Projects.Update(project);
            _context.SaveChanges();
            return Get(project.ProjectId);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            var project = _context.Projects
                .First(p => p.ProjectId == id);
            if (project != null) {
                _context.Projects.Remove(project);
                _context.SaveChanges();
                return new NoContentResult();
            }
            return NotFound();
        }
    }
}