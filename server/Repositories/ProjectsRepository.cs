using System;
using System.Collections.Generic;
using System.Linq;
using mytasks.Models;

namespace mytasks.Repositories {

    public interface IProjectsRepository : IRepository<MyTasksContext, Project> {
    }
    public class ProjectsRepository : Repository<MyTasksContext, Project>, IProjectsRepository {

        ProjectsRepository(MyTasksContext context) :
            base(context) {}

        public override void Add(Project entity) {
            _context.Add(entity);
        }

        public override Project Find(int id) {
            return _context.Projects.FirstOrDefault(p => p.ProjectId == id);
        }

        public override Project Find(Project entity) {
            return Find(entity.ProjectId);
        }

        public override IEnumerable<Project> FindAll() {
            return _context.Projects;
        }

        public override void Remove(Project entity) {
            _context.Projects.Remove(entity);
        }

        public override void Update(Project entity) {
            _context.Update(entity);
        }

        
    }
}