using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using mytasks.Models;

namespace mytasks.Repositories {

    public interface IRepository<TContext, TEntity>  {
         void SaveChanges();

       TEntity GetById(int id);

        TEntity Get(TEntity entity);

        IEnumerable<TEntity> GetAll();

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

        public abstract TEntity GetById(int id);

        public abstract TEntity Get(TEntity entity);

        public abstract IEnumerable<TEntity> GetAll();

        public abstract void Add(TEntity entity);

        public abstract void Update(TEntity entity);

        public abstract void Remove(TEntity entity);
    }
}