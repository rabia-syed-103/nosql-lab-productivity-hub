// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');


(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});
  // Users
  const u1 = await db.collection('users').insertOne({
    email: 'user1@gmail.com',
    name: 'User One',
    passwordHash: await bcrypt.hash('password123', 10)
  });
  const u2 = await db.collection('users').insertOne({
    email: 'user2@gmail.com',
    name: 'User Two',
    passwordHash: await bcrypt.hash('password1233',10)
  });
  const userId1 = u1.insertedId;
  const userId2 = u2.insertedId;

  //Projects
  const p1 = await db.collection('projects').insertOne({
    ownerId: userId1,
    name: 'Project One',
    archived: false,
    description: 'Description for project one',
    createdAt: new Date()
  });
  const p2 = await db.collection('projects').insertOne({
    ownerId: userId1,
    name: 'Project Two',
    archived: false,
    description: 'Description for project Two',
    createdAt: new Date()
  });
  const p3 = await db.collection('projects').insertOne({
    ownerId: userId2,
    name: 'Project Three',
    archived: false,
    description: 'Description for project three',
    createdAt: new Date()
  });
  const p4 = await db.collection('projects').insertOne({
    ownerId: userId2,
    name: 'Project Four',
    archived: false,
    description: 'Description for project four',
    createdAt: new Date()
  });

  // Tasks
  t1 = await db.collection('tasks').insertOne({
    ownerId: userId1,
    projectId: p1.insertedId,
    title: 'Task One',
    status: 'todo',
    priority: 3,  
    tags: ['writing', 'urgent'],
    subtasks: [
      { title: 'Outline sections', done: true },
      { title: 'Draft', done: false }
    ],
    createdAt: new Date()  });

  t2 = await db.collection('tasks').insertOne({
    ownerId: userId1,
    projectId: p1.insertedId,
    title: 'Task Two',
    status: 'todo',
    priority: 3,  
    tags: ['writing', 'urgent'],
    subtasks: [
      { title: 'Outline sections', done: true },
      { title: 'Draft', done: false }
    ],
    createdAt: new Date()  });
  t3 = await db.collection('tasks').insertOne({
    ownerId: userId1,
    projectId: p2.insertedId,
    title: 'Task Three',
    status: 'todo',
    priority: 3,
    tags: ['writing', 'urgent'],
    subtasks: [
      { title: 'Outline sections', done: true },
      { title: 'Draft', done: false }
    ],
    createdAt: new Date()  })
  t4 = await db.collection('tasks').insertOne({
    ownerId: userId2,
    projectId: p3.insertedId,
    title: 'Task Four',
    status: 'todo',
    priority: 3,
    tags: ['writing', 'urgent'],
    subtasks: [
      { title: 'Outline sections', done: true },
      { title: 'Draft', done: false }
    ],
    createdAt: new Date()  })
  t5 = await db.collection('tasks').insertOne({
    ownerId: userId2,
    projectId: p4.insertedId,
    title: 'Task Five',
    status: 'todo',    
    priority: 3,
    tags: ['writing', 'urgent'],
    subtasks: [
      { title: 'Outline sections', done: true },
      { title: 'Draft', done: false }
    ],
    createdAt: new Date()
  });

  // Notes

  n1 = await db.collection('notes').insertOne({
    ownerId: userId1,
    projectId: p1.insertedId,
    title: 'Note One',
    body: 'Note for project one',
    tags: [],
    createdAt: new Date()
  });
  n2 = await db.collection('notes').insertOne({
    ownerId: userId1,
    title: 'Note One',
    tags: [],
    body: 'Standalone note for user one',
    createdAt: new Date()
  });
  n3 = await db.collection('notes').insertOne({
    ownerId: userId2,
    title: 'Note One',
    projectId: p2.insertedId,
    tags:[],
    body: 'Note for project two',
    createdAt: new Date()
  });
  n4 = await db.collection('notes').insertOne({
    ownerId: userId2,
    title: 'Note four',
    tags: [],
    body: 'Standalone note for user two',
    createdAt: new Date()
  });
  n5 = await db.collection('notes').insertOne({
    ownerId: userId2,
    title: 'Note five',
    tags: [],
    projectId: p3.insertedId,
    body: 'Note for project three',
    createdAt: new Date()
  });

  // =============================================================================
  //  TODO: Insert your seed data below.
  //
  //  Hints:
  //    - Hash passwords:   const hash = await bcrypt.hash('password123', 10);
  //    - Capture inserted ids:
  //        const u = await db.collection('users').insertOne({ ... });
  //        const userId = u.insertedId;
  //    - Use those ids when inserting projects/tasks/notes.
  //    - Demonstrate schema flexibility: include at least one optional field
  //      on SOME documents but not all (e.g. dueDate on some tasks only).
  //
  //  Sample task shape:
  //    {
  //      ownerId: <ObjectId>,
  //      projectId: <ObjectId>,
  //      title: "Write report introduction",
  //      status: "todo",
  //      priority: 3,
  //      tags: ["writing", "urgent"],
  //      subtasks: [
  //        { title: "Outline sections", done: true },
  //        { title: "Draft", done: false }
  //      ],
  //      createdAt: new Date()
  //    }
  // =============================================================================
  
  console.log('implemented seed.js');
  process.exit(0);
})();
