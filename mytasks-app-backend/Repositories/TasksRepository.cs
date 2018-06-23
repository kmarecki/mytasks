using System;
using System.Collections.Generic;
using System.Linq;
using mytasks.Models;

namespace mytasks.Repositories {

    public interface ITasksRepository : IRepository<MyTasksDbContext, Task> {
         IEnumerable<dynamic> GetAllFromView();
    }
    
    public class TasksRepository : Repository<MyTasksDbContext, Task>, ITasksRepository
     {
        public TasksRepository(MyTasksDbContext context) :
            base(context) { }

        public override void Add(Task entity) {
            entity.Created = DateTime.UtcNow;
            entity.State = TaskState.New;
            _context.Add(entity);
        }

        public override Task GetById(int id) {
            return _context.Tasks.FirstOrDefault(p => p.TaskId == id);
        }

        public override Task Get(Task entity) {
            return GetById(entity.TaskId);
        }

        public override IEnumerable<Task> GetAll() {
            return _context.Tasks;
        }

        public IEnumerable<dynamic> GetAllFromView() {
            return _context.Tasks.Join(
                _context.Projects,
                t => t.ProjectId,
                p => p.ProjectId,
                (t, p) => new {
                    TaskId = t.TaskId,
                    TaskName = t.TaskName,
                    State = t.State,
                    Created = t.Created,
                    PlannedHours = t.PlannedHours,
                    ActualHours = t.ActualHours,
                    ProjectName = p.ProjectName
                }
            );
        }

        public override void Remove(Task entity) {
            _context.Tasks.Remove(entity);
        }

        public override void Update(Task entity) {
            _context.Update(entity);
        }


    }
}