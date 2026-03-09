import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("careerhub.db");
const JWT_SECRET = process.env.JWT_SECRET || "careerhub-secret-key-123";

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    bio TEXT,
    skills TEXT,
    experience TEXT,
    education TEXT,
    avatar TEXT
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    salary TEXT,
    type TEXT,
    description TEXT,
    requirements TEXT,
    posted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    logo TEXT
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    job_id INTEGER,
    status TEXT DEFAULT 'applied',
    applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(job_id) REFERENCES jobs(id)
  );

  CREATE TABLE IF NOT EXISTS connections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    connection_id INTEGER,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(connection_id) REFERENCES users(id)
  );
`);

// Seed some jobs if empty
const jobCount = db.prepare("SELECT COUNT(*) as count FROM jobs").get() as { count: number };
if (jobCount.count === 0) {
  const insertJob = db.prepare("INSERT INTO jobs (title, company, location, salary, type, description, requirements, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  const mockJobs = [
    ["Senior Frontend Engineer", "TechNova", "San Francisco, CA", "$140k - $180k", "Full-time", "We are looking for a React expert to lead our UI team.", "React, TypeScript, Tailwind, 5+ years exp", "https://picsum.photos/seed/technova/100/100"],
    ["Product Designer", "CreativeFlow", "Remote", "$100k - $130k", "Full-time", "Design beautiful user experiences for our SaaS platform.", "Figma, UI/UX, Prototyping", "https://picsum.photos/seed/creative/100/100"],
    ["Backend Developer", "DataScale", "New York, NY", "$120k - $160k", "Full-time", "Scale our Node.js microservices architecture.", "Node.js, PostgreSQL, Redis", "https://picsum.photos/seed/datascale/100/100"],
    ["AI Research Intern", "FutureAI", "London, UK", "£40k - £50k", "Internship", "Help us build the next generation of LLMs.", "Python, PyTorch, NLP", "https://picsum.photos/seed/futureai/100/100"],
    ["Marketing Manager", "GrowthRocket", "Austin, TX", "$90k - $120k", "Full-time", "Drive user acquisition through creative campaigns.", "SEO, SEM, Content Marketing", "https://picsum.photos/seed/growth/100/100"]
  ];
  mockJobs.forEach(job => insertJob.run(...job));
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // API Routes
  app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(name, email, hashedPassword);
      const token = jwt.sign({ id: result.lastInsertRowid, email }, JWT_SECRET);
      res.json({ token, user: { id: result.lastInsertRowid, name, email } });
    } catch (e) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });

  app.get("/api/jobs", (req, res) => {
    const jobs = db.prepare("SELECT * FROM jobs ORDER BY posted_at DESC").all();
    res.json(jobs);
  });

  app.get("/api/jobs/:id", (req, res) => {
    const job = db.prepare("SELECT * FROM jobs WHERE id = ?").get(req.params.id);
    res.json(job);
  });

  app.post("/api/applications", authenticateToken, (req: any, res) => {
    const { jobId } = req.body;
    db.prepare("INSERT INTO applications (user_id, job_id) VALUES (?, ?)").run(req.user.id, jobId);
    res.json({ success: true });
  });

  app.get("/api/user/applications", authenticateToken, (req: any, res) => {
    const apps = db.prepare(`
      SELECT a.*, j.title, j.company, j.location 
      FROM applications a 
      JOIN jobs j ON a.job_id = j.id 
      WHERE a.user_id = ?
    `).all(req.user.id);
    res.json(apps);
  });

  app.get("/api/user/profile", authenticateToken, (req: any, res) => {
    const user = db.prepare("SELECT id, name, email, role, bio, skills, experience, education, avatar FROM users WHERE id = ?").get(req.user.id);
    res.json(user);
  });

  app.post("/api/ai/chat", authenticateToken, async (req: any, res) => {
    const { message, history } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.user.id) as any;
    
    // In a real app, we'd call Gemini here. 
    // For now, we'll return a structured prompt for the frontend to handle or 
    // we can just implement the Gemini call here if we had the SDK initialized.
    // Actually, the guidelines say "Always call Gemini API from the frontend code".
    // So I will implement the Gemini logic in the React component.
    res.json({ success: true });
  });

  app.put("/api/user/profile", authenticateToken, (req: any, res) => {
    const { bio, skills, experience, education } = req.body;
    db.prepare("UPDATE users SET bio = ?, skills = ?, experience = ?, education = ? WHERE id = ?")
      .run(bio, skills, experience, education, req.user.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
