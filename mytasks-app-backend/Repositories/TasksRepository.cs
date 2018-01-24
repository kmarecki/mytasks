using System;
using System.Collections.Generic;
using System.Linq;
using mytasks.Models;

namespace mytasks.Repositories {

    public interface ITasksRepository : IRepository<MyTasksContext, Task> {
    
    }
    
    public class TasksRepository : Repository<MyTasksContext, Task>, ITasksRepository
     {
        public TasksRepository(MyTasksContext context) :
            base(context) { }

        public override void Add(Task entity) {
            _context.Add(entity);
        }

        public override Task Find(int id) {
            return _context.Tasks.FirstOrDefault(p => p.TaskId == id);
        }

        public override Task Find(Task entity) {
            return Find(entity.TaskId);
        }

        public override IEnumerable<Task> FindAll() {
            return _context.Tasks;
        }

        public override void Remove(Task entity) {
            _context.Tasks.Remove(entity);
        }

        public override void Update(Task entity) {
            _context.Update(entity);
        }


    }
}