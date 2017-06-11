using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using mytasks.Models;

namespace mytasks.Repositories {

    public interface IRepository<TContext, TEntity>  {
         void SaveChanges();

       TEntity Find(int id);

        TEntity Find(TEntity entity);

        IEnumerable<TEntity> FindAll();

        void Add(TEntity entity);

        void Update(TEntity entity);

        void Remove(TEntity entity);
    }

    public abstract class Repository<TContext, TEntity> : IRepository<TContext, TEntity> 
        where TContext: DbContext {

        protected readonly TContext _context;

        public Repository(TContext context) {
            this._context = context;
        }

        public void SaveChanges() {
            this._context.SaveChanges();
        }

        public abstract TEntity Find(int id);

        public abstract TEntity Find(TEntity entity);

        public abstract IEnumerable<TEntity> FindAll();

        public abstract void Add(TEntity entity);

        public abstract void Update(TEntity entity);

        public abstract void Remove(TEntity entity);
    }
}