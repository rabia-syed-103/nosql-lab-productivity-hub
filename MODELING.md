# Schema Design — Personal Productivity Hub

> Fill in every section below. Keep answers concise.

---

## 1. Collections Overview

Briefly describe each collection (1–2 sentences each):

- **users** — Store information for each user,including their id,email,password,name and date.
- **projects** — Represents a grouping of related tasks and notes. It helps users organize their work into separate categories or goals.
- **tasks** — Contains individual to-do items within a project, including status, priority, deadlines, and subtasks. It is the main unit for tracking progress and work.
- **notes** — Stores textual information such as ideas, reminders, or documentation. Notes can optionally be linked to a project or exist independently.

---

## 2. Document Shapes

For each collection, write the document shape (field name + type + required/optional):

### users
```
{
  _id: ObjectId,
  email: string (required, unique),
  passwordHash: string (required),
  name: string (required),
  createdAt: Date (required)
}
```

### projects
```
{
  _id: ObjectId,
  ownerId: ObjectId (required, ref: users),
  name: string (required),
  description: string (optional),
  archived: boolean (required, default: false),
  createdAt: Date (required)
}
```

### tasks
```
{
  _id: ObjectId,
  ownerId: ObjectId (required, ref: users),
  projectId: ObjectId (required, ref: projects),
  title: string (required),
  status: string (required, enum: "todo" | "in-progress" | "done"),
  priority: number (required, default: 1),
  tags: string[] (required, default: []),
  subtasks: [{ title: string, done: boolean }] (required, default: []),
  dueDate: Date (optional),
  createdAt: Date (required)
}
```

### notes
```
{
  _id: ObjectId,
  ownerId: ObjectId (required, ref: users),
  projectId: ObjectId (optional, ref: projects),
  title: string (required),
  body: string (required),
  tags: string[] (required, default: []),
  createdAt: Date (required)
}
```

---

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                       | Embed or Reference? | Why? |
|-----------------------------------|---------------------|------|
| Subtasks inside a task            |  Embed        |  Subtasks are owned exclusively by one task and always read together with it.    |
| Tags on a task                    |     Embed                |   Tags are simple strings with no independent identity, embedding them as an array keeps the document self-contained.    |
| Project → Task ownership          |       Reference              |   Tasks are queried independently (filtered by status, sorted by priority) and can number in the hundreds; referencing avoids huge embedded arrays on the project document.   |
| Note → optional Project link      |       Reference             |    Notes can exist without any project , so a reference is the natural choice rather than nesting notes inside a project.   |

---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

> _Your answer here._
