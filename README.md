# ⚡ MeetingAI — AI Meeting Assistant

A full-stack application that processes meeting transcripts using Claude AI to extract summaries, key discussion points, and action items — then stores and displays everything in a clean dashboard.

---

## Tech Stack

| Layer     | Technology                   |
|-----------|------------------------------|
| Frontend  | React 18, React Router v6, Axios |
| Backend   | Node.js, Express             |
| Database  | MySQL                        |
| AI        | Anthropic Claude (claude-sonnet) |

---

## Project Structure

```
meeting-assistant/
├── backend/
│   ├── config/
│   │   ├── db.js              # MySQL connection pool
│   │   └── schema.sql         # Database schema
│   ├── controllers/
│   │   ├── meetingController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── errorHandler.js    # Global error handler + asyncHandler
│   ├── models/
│   │   ├── meetingModel.js
│   │   └── taskModel.js
│   ├── routes/
│   │   ├── meetingRoutes.js
│   │   └── taskRoutes.js
│   ├── services/
│   │   └── aiService.js       # Claude AI integration
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── SummaryCard.jsx
    │   │   ├── TaskList.jsx
    │   │   └── TranscriptUploadForm.jsx
    │   ├── pages/
    │   │   ├── DashboardPage.jsx
    │   │   ├── MeetingDetailPage.jsx
    │   │   ├── TasksPage.jsx
    │   │   └── UploadPage.jsx
    │   ├── services/
    │   │   └── api.js          # Axios API client
    │   ├── styles/
    │   │   └── global.css
    │   ├── App.jsx
    │   └── index.js
    └── package.json
```

---

## Prerequisites

- **Node.js** v18 or higher
- **MySQL** v8 or higher
- **Anthropic API key** — get one at https://console.anthropic.com

---

## Setup Instructions

### 1. Clone / download the project

```bash
cd meeting-assistant
```

### 2. Set up the MySQL database

Open your MySQL client and run:

```sql
-- From the backend/config/schema.sql file
CREATE DATABASE IF NOT EXISTS meeting_assistant;
USE meeting_assistant;

CREATE TABLE IF NOT EXISTS meetings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  transcript LONGTEXT NOT NULL,
  summary TEXT,
  key_points JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  meeting_id INT NOT NULL,
  task TEXT NOT NULL,
  owner VARCHAR(255),
  deadline VARCHAR(255),
  status ENUM('pending', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (meeting_id) REFERENCES meetings(id) ON DELETE CASCADE
);
```

Or run the schema file directly:

```bash
mysql -u root -p < backend/config/schema.sql
```

### 3. Configure backend environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=meeting_assistant
ANTHROPIC_API_KEY=sk-ant-...your-key-here...
```

### 4. Install backend dependencies & start

```bash
cd backend
npm install
npm run dev       # Development (with nodemon auto-reload)
# or
npm start         # Production
```

The backend will start at **http://localhost:5000**

### 5. Install frontend dependencies & start

In a new terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will open at **http://localhost:3000**

---

## API Reference

### Meetings

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | /api/meetings        | Upload transcript, trigger AI processing |
| GET    | /api/meetings        | List all meetings                    |
| GET    | /api/meetings/:id    | Get meeting with tasks               |

**POST /api/meetings — Request body:**
```json
{
  "title": "Q4 Planning Sync",
  "transcript": "Alice: Let's review targets... Bob: I'll handle outreach by Friday..."
}
```

**POST /api/meetings — Response:**
```json
{
  "message": "Meeting processed successfully",
  "meeting": {
    "id": 1,
    "title": "Q4 Planning Sync",
    "summary": "...",
    "key_points": ["...", "..."],
    "created_at": "..."
  },
  "tasks": [
    { "id": 1, "task": "Handle client outreach", "owner": "Bob", "deadline": "Friday", "status": "pending" }
  ]
}
```

### Tasks

| Method | Endpoint        | Description                    |
|--------|-----------------|--------------------------------|
| GET    | /api/tasks      | List all tasks (supports ?status=pending&owner=Alice) |
| PUT    | /api/tasks/:id  | Update task status             |

**PUT /api/tasks/:id — Request body:**
```json
{ "status": "completed" }
```

---

## Features

### Upload Page
- Paste transcript text directly
- Upload `.txt` files with drag-and-drop
- Real-time character count
- AI processing indicator

### Dashboard Page
- Grid of all processed meetings
- Summary previews on cards
- Meeting count stats

### Meeting Detail Page
- Full AI summary with accent styling
- Key discussion points list
- Action items with checkboxes
- Filter tasks by status (all/pending/completed)
- Collapsible original transcript

### Tasks Page
- All tasks across every meeting
- Filter by status (pending/completed)
- Filter by owner (dropdown from actual data)
- Completion rate stats

---

## AI Processing

The app uses **Anthropic Claude (claude-sonnet-4-20250514)** to analyze transcripts.

The prompt instructs Claude to return a strict JSON object:

```json
{
  "summary": "3-5 sentence meeting summary",
  "key_points": ["Point 1", "Point 2", "..."],
  "action_items": [
    {
      "task": "Task description",
      "owner": "Person name or 'Unassigned'",
      "deadline": "Deadline or 'Not specified'"
    }
  ]
}
```

---

## Environment Variables

| Variable           | Required | Description                      |
|--------------------|----------|----------------------------------|
| PORT               | No       | Backend port (default: 5000)     |
| DB_HOST            | Yes      | MySQL host                       |
| DB_USER            | Yes      | MySQL username                   |
| DB_PASSWORD        | Yes      | MySQL password                   |
| DB_NAME            | Yes      | Database name                    |
| ANTHROPIC_API_KEY  | Yes      | Your Anthropic API key           |

---

## Sample Transcript to Test

```
[09:00] Sarah: Let's start the sprint planning. We have 3 main items today.

[09:02] John: First, the login bug — I'll fix it and deploy to staging by Wednesday.

[09:05] Sarah: Great. Second, the onboarding redesign. Maria, can you handle the wireframes?

[09:06] Maria: Sure, I'll have the wireframes ready by end of next week.

[09:10] John: The API rate limiting issue is still open. I think we should tackle it this sprint.

[09:12] Sarah: Agreed. John, own that too, EOD Friday.

[09:15] Maria: I'll also update the design system documentation before the next sprint review.

[09:18] Sarah: Perfect. Let's make sure all of this is tracked. Talk next Monday.
```

This transcript will produce 3 owners, 4 tasks, and clear deadlines.

---

## Troubleshooting

**MySQL connection failed**
- Check your `.env` DB credentials
- Make sure MySQL service is running: `sudo service mysql start`

**Anthropic API error**
- Verify your `ANTHROPIC_API_KEY` in `.env`
- Check you have API credits at https://console.anthropic.com

**CORS error in browser**
- Make sure backend is running on port 5000
- The frontend proxy in `package.json` handles `/api` requests automatically

**Frontend blank page**
- Run `npm install` again
- Check browser console for errors
