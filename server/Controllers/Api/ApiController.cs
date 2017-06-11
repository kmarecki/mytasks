using System;
using System.Collections.Generic;
using System.Linq;
using mytasks.Models;
using mytasks.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace mytasks.Controllers.Api {
    [Route("api/[controller]")]
    public abstract class ApiController<TContext, TEntity> : Controller
        where TContext : DbContext {

        private readonly IRepository<TContext, TEntity> _repo;

        public ApiController(IRepository<TContext, TEntity> repo) {
            this._repo = repo;
        }

        [HttpGet]
        public IActionResult Index() {
            var entities = _repo.FindAll();
            var result = new {
                Data = entities
            };
            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id) {
            var entity = _repo.Find(id);
            return GetResult(entity);
        }

        private IActionResult GetResult(TEntity entity) {
            if (entity != null) {
                var result = new {
                    Data = entity
                };
                return new JsonResult(result);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult Post([FromBody]TEntity entity) {
            _repo.Add(entity);
            _repo.SaveChanges();
            TEntity saved = _repo.Find(entity);
            return GetResult(saved);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]TEntity entity) {
            _repo.Update(entity);
            _repo.SaveChanges();
            TEntity saved = _repo.Find(entity);
            return GetResult(saved);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            var entity = _repo.Find(id);
            if (entity != null) {
                _repo.Remove(entity);
                _repo.SaveChanges();
                return new NoContentResult();
            }
            return NotFound();
        }
    }
}