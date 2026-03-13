import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bslpmtvczbzvcylphknq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Q6xqfEalwZSGmoAglgJ4GA_LlDGXt6T';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const STAGE_GROUPS = [
  { label: 'BEGINNER', subtitle: 'Foundation & Language', range: ['00', '01', '02'], color: '#60a5fa' },
  { label: 'TECHNICAL', subtitle: 'Core Engineering Skills', range: ['03', '04', '05', '06', '07', '08'], color: '#34d399' },
  { label: 'INTEGRATION', subtitle: 'AI, APIs & Platforms', range: ['09', '10', '11'], color: '#f472b6' },
  { label: 'BUSINESS', subtitle: 'Systems, Portfolio & Freelancing', range: ['12', '13', '14'], color: '#fbbf24' },
];

const MILESTONES: Record<string, string> = {
  '02': '🎯 You can now build and manage real Python projects',
  '05': '⚡ You can now write production-quality async automation',
  '08': '🤖 You are now an AI integration engineer',
  '09': '💰 You are now freelance-ready — clients will pay for this',
  '11': '🔧 You can now serve any type of automation client',
  '14': '🚀 You are a full AI automation freelancer',
};

const stages = [
  {
    number: '00', title: 'Mindset & Environment Setup', color: '#818cf8',
    duration: '3–5 days', weeks: 0.5, tag: 'FOUNDATION',
    why: 'Most people skip this and waste months with bad habits. This stage costs 5 days and saves 5 months.',
    topics: [
      'How to use AI tools (Claude, ChatGPT) for learning — debug and understand, never blindly copy',
      'VS Code setup: Python extension, Pylance, GitLens, autopep8 formatter',
      'Terminal basics: navigation, running scripts, understanding paths',
      'How to read error messages — this single skill saves hundreds of hours',
      'How to read official documentation instead of always watching YouTube',
      'Understanding what clients pay for: saved time and solved problems, not clever code',
      'Realistic time expectations: mastery takes 6–12 months of consistent daily practice',
    ],
    projects: [],
    goal: 'Your environment is ready and your mental model is correct before you write a single line.',
  },
  {
    number: '01', title: 'Python Fundamentals — Core', color: '#60a5fa',
    duration: '3–4 weeks', weeks: 3.5, tag: 'LANGUAGE',
    why: 'Real automation is 80% Python basics done very well. You need to write scripts without constantly googling syntax.',
    topics: [
      'Variables, strings (f-strings), numbers (int, float), booleans',
      'Lists, dictionaries, sets, tuples — and when to use each',
      'Indexing, slicing, unpacking',
      'if/elif/else, match/case',
      'for loops, while loops, break, continue, enumerate, zip',
      'Functions: parameters, return values, *args, **kwargs, default values',
      'List comprehensions and dict comprehensions — used in every real script',
      'Standard library: os, sys, datetime, json, re, pathlib',
      'String methods: .split(), .strip(), .replace(), .join()',
      'Regular expressions (re module) — critical for extracting data from text',
      'Basic OOP: classes, __init__, methods, self',
      'Reading/writing .txt, .json, .csv files',
      'Error handling: try/except/finally, raising exceptions, custom error messages',
      'Logging with the logging module instead of print() — for unattended scripts',
    ],
    projects: [
      'CLI calculator with full error handling and input validation',
      'Contact book app: store/search/delete contacts in a JSON file',
      'Text file analyzer: word frequency, regex pattern extraction',
      'To-do list CLI with file persistence and due dates',
    ],
    goal: 'You write scripts from scratch without looking up basic syntax. Errors are handled gracefully.',
  },
  {
    number: '02', title: 'Professional Development Tools', color: '#38bdf8',
    duration: '1 week', weeks: 1, tag: 'TOOLS',
    why: "Without this, your projects can't be shared, secured, or maintained. Clients judge your GitHub before they judge your code.",
    topics: [
      'pip: installing, upgrading, uninstalling packages',
      'Virtual environments with venv — never install packages globally',
      'requirements.txt: freeze and restore environments',
      '.env files and python-dotenv — storing API keys safely, never in code',
      '.gitignore — never commit secrets, venv folders, or __pycache__',
      'Git: init, add, commit, push, pull, branch, merge — daily workflow',
      'GitHub: repos, README files, public vs private, commit history matters',
      'Running scripts from terminal with arguments: sys.argv, argparse',
      'VS Code debugger: breakpoints, watch variables, step through code',
      'How to write a good error prompt for AI debugging',
    ],
    projects: [
      'Push all Stage 01 projects to GitHub with descriptive READMEs',
      'Build a .env secrets management workflow around a fake API key',
    ],
    goal: 'Every project from here is version-controlled, shareable, and secure from day one.',
  },
  {
    number: '03', title: 'HTTP, APIs & Authentication', color: '#22d3ee',
    duration: '2 weeks', weeks: 2, tag: 'APIs',
    why: '90% of automation is API communication. Understanding this deeply — not just copy-pasting — separates you from every tutorial follower.',
    topics: [
      'HTTP fundamentals: requests, responses, status codes (200, 201, 400, 401, 403, 429, 500)',
      'GET, POST, PUT, PATCH, DELETE — what each does and when to use it',
      'Headers: Authorization, Content-Type, User-Agent',
      'Query parameters vs request body',
      'REST API concepts: endpoints, resources, versioning, pagination',
      'API key authentication: header-based and query param-based',
      'Bearer tokens',
      'OAuth 2.0 — authorization code flow, access tokens, refresh tokens (Google, Slack, Microsoft all use this)',
      'Rate limiting: 429 errors, exponential backoff, retry-after headers',
      'Webhooks: receiving data pushed to your endpoint, not just pulling',
      'The requests library: sessions, timeouts, headers, error handling',
      'httpx as a modern async-ready alternative',
      'JSON: parsing nested structures, handling missing keys with .get()',
      'API error handling: timeouts, network errors, retries with backoff',
    ],
    projects: [
      'Weather dashboard: pull live data from OpenWeatherMap',
      "GitHub stats fetcher: display any user's repos and activity",
      'Currency converter with live exchange rates',
      'Webhook receiver with Flask: catch, log, and respond to incoming events',
    ],
    goal: 'You connect to any API, authenticate properly, handle all errors, and process responses reliably.',
  },
  {
    number: '04', title: 'Data Handling & Processing', color: '#34d399',
    duration: '2 weeks', weeks: 2, tag: 'DATA',
    why: 'All automation moves data between systems. You need to clean it, transform it, and output it without losing anything.',
    topics: [
      'CSV: reading, writing, encoding issues, quoting edge cases',
      'JSON: nested structures, arrays of objects, writing formatted output',
      'Excel files with openpyxl: read, write, format cells, create sheets',
      'pandas: DataFrames, Series, read_csv, read_excel, head, info, describe',
      'Filtering rows, selecting columns, sorting, resetting index',
      'Handling missing data: fillna, dropna, isnull',
      'Removing duplicates with drop_duplicates',
      'Data type conversion: strings to numbers, parsing dates',
      'Merging and joining datasets: merge, concat',
      'Groupby and aggregation: sum, count, mean, custom functions',
      'Working with dates: datetime, pd.to_datetime, date formatting',
      'Google Sheets API — businesses live in Sheets, this is essential',
      'Writing clean data pipelines: input → validate → clean → transform → output',
    ],
    projects: [
      'Sales report processor: messy CSV in, clean pivot summary out',
      'Google Sheets automation: read data, modify, push back with formatting',
      'Excel report generator from multiple raw data sources',
      'Contact list deduplication and standardization tool',
    ],
    goal: 'You take data from any source, clean it, transform it, and output it anywhere.',
  },
  {
    number: '05', title: 'Async Programming & Performance', color: '#a3e635',
    duration: '1 week', weeks: 1, tag: 'PERFORMANCE',
    why: 'A script hitting 50 APIs sequentially is 50x slower than one hitting them concurrently. Production automation must be fast.',
    topics: [
      'Why synchronous code fails at scale: the blocking request problem',
      'asyncio: event loop, coroutines, async def, await keyword',
      'aiohttp: async HTTP requests',
      'asyncio.gather(): running multiple coroutines concurrently',
      'Semaphores: controlling concurrency to avoid hitting rate limits',
      'Async context managers: async with',
      'When to use async vs threading vs multiprocessing',
      'Converting a slow sync script to async: practical before/after',
      'Error handling in async code: try/except inside coroutines',
    ],
    projects: [
      'Rewrite a Stage 03 project using async — benchmark the speed difference',
      'Async bulk domain/email checker: validate 100 entries concurrently',
      'Async product price monitor: check 30 pages simultaneously',
    ],
    goal: 'Your scripts run fast. Hundreds of API calls complete in seconds, not minutes.',
  },
  {
    number: '06', title: 'Scheduling, Deployment & Monitoring', color: '#fbbf24',
    duration: '2 weeks', weeks: 2, tag: 'DEPLOYMENT',
    why: 'A script that only runs when you click it is not automation. This stage makes your work truly autonomous — and worth real money.',
    topics: [
      'Cron jobs on Linux/Mac: syntax, scheduling expressions, crontab -e',
      'Windows Task Scheduler equivalent',
      'GitHub Actions: YAML workflows, schedule triggers (cron), secrets management',
      'Cloud deployment: Railway, Render, fly.io — free tier Python script hosting',
      'VPS basics: DigitalOcean/Linode, SSH, running scripts remotely',
      'Docker basics: Dockerfile, build, run, why containers matter for client delivery',
      'Process managers: PM2 or supervisord to keep scripts alive after crashes',
      'File-based logging: log levels, rotation, what to log for unattended scripts',
      'Failure alerting: email or Slack message when a script crashes',
      'Environment variables in cloud platforms: secrets management panels',
      'Health checks: simple endpoints to verify automation is still running',
    ],
    projects: [
      'Daily price tracker deployed to Railway — emails you results every morning',
      'GitHub Actions workflow: runs a Python script on a cron schedule',
      'Script that Slack-alerts you with details when it hits an unhandled error',
    ],
    goal: 'Automations run 24/7 without you. You know immediately when something breaks.',
  },
  {
    number: '07', title: 'Web Scraping & Browser Automation', color: '#fb923c',
    duration: '2 weeks', weeks: 2, tag: 'WEB',
    why: 'Many valuable business processes involve websites with no API. Automating these is highly paid and very commonly needed.',
    topics: [
      'BeautifulSoup: parsing HTML, finding by tag/class/id/attribute, navigating the DOM',
      'requests + BeautifulSoup for static pages',
      'Playwright (preferred over Selenium): launch, navigate, interact',
      'Locating elements: CSS selectors, XPath, accessible role-based selectors',
      'Clicking buttons, typing text, selecting dropdowns, handling modals',
      'Waiting strategies: waitForSelector, waitForNavigation, networkidle',
      'JavaScript-rendered content: SPAs, infinite scroll, dynamic loading',
      'Logging into websites automatically and maintaining sessions',
      'Scraping paginated content: next page patterns, offset/cursor pagination',
      'Downloading files: PDFs, CSVs, images programmatically',
      'Screenshots for verification and debugging',
      'Anti-bot measures: realistic delays, proper headers, user-agent rotation',
      'Legal/ethical awareness: robots.txt, terms of service, responsible rate limiting',
      'Storing scraped data to CSV, JSON, SQLite, or Google Sheets',
    ],
    projects: [
      'Job listing scraper: extract jobs to a spreadsheet and email daily digest',
      'E-commerce price monitor: track prices across multiple products daily',
      'Automated form submitter for a test/demo site',
      'Login automation: authenticate and extract data from a members-only page',
    ],
    goal: 'You automate any website interaction a human could do manually.',
  },
  {
    number: '08', title: 'AI Integration — Deep', color: '#f472b6',
    duration: '3 weeks', weeks: 3, tag: 'AI CORE',
    why: 'Calling the API takes 30 minutes. Getting reliable, structured, business-quality AI outputs is a real engineering skill most people skip entirely.',
    topics: [
      'OpenAI API: chat completions, GPT-4o, parameters (model, messages, max_tokens)',
      'Anthropic Claude API: messages endpoint, content blocks, system prompts',
      'System prompts: writing them to control AI behavior precisely and consistently',
      'Prompt engineering: few-shot examples, chain-of-thought, role assignment',
      'Temperature and top_p: deterministic outputs for business use vs creative outputs',
      'Token counting: tiktoken, estimating costs before sending',
      'Context window management: what to include, what to summarize',
      'Structured outputs: forcing JSON via response_format, schema-based validation',
      'Function calling / tool use: letting the model trigger your Python functions',
      'Output validation: checking AI responses before using them, fallback logic',
      'Retry logic: re-prompting when AI returns malformed or incorrect output',
      'Cost management: caching identical prompts, batching, choosing the right model',
      'Streaming responses: real-time output display',
      'Embeddings: text to vectors, cosine similarity, basic semantic search',
      'Chaining prompts: breaking complex tasks into reliable multi-step pipelines',
    ],
    projects: [
      'AI email writer: bullet points in → polished professional email out',
      'AI document summarizer: PDF in → structured key points with sections out',
      'AI data extractor: unstructured text in → clean validated JSON out',
      'AI email classifier: label by category, urgency, and required action',
      'Multi-turn AI chatbot with conversation memory and context management',
    ],
    goal: 'You build AI features that produce reliable structured outputs for business use — not just impressive demos.',
  },
  {
    number: '09', title: 'Business Integrations — The Real Money APIs', color: '#c084fc',
    duration: '2 weeks', weeks: 2, tag: 'INTEGRATIONS',
    why: "Clients don't pay you to call a weather API. They pay to automate Gmail, Sheets, Slack, and their CRM. These are the APIs that generate recurring income.",
    topics: [
      'Gmail API: read, send, search, label, archive, create drafts',
      'Google Sheets API deep dive: batch updates, cell formatting, named ranges',
      'Google Drive API: upload, download, move, share files programmatically',
      'Slack API: post messages, read channels, slash commands, interactive buttons',
      'Notion API: create and update pages, read/write databases',
      'Airtable API: full CRUD on bases and tables',
      'Twilio: SMS and WhatsApp message automation',
      'HubSpot API: contacts, deals, notes, activities — CRM automation',
      'Calendly API: read bookings, trigger post-booking workflows',
      'Stripe API: read payments, create invoices, handle webhook events',
      'Microsoft Graph API: Outlook, Teams, OneDrive — used by corporate clients',
      "LinkedIn automation: understanding what is and isn't allowed to avoid bans",
    ],
    projects: [
      'Gmail AI assistant: auto-label, categorize, and draft replies to incoming emails',
      'Slack daily briefing bot: pull from 3+ data sources, post a formatted digest',
      'CRM enrichment: name + company in → research + enrich → push to HubSpot',
      'Airtable ↔ Google Sheets bidirectional sync automation',
    ],
    goal: 'You automate the tools businesses actually use every day. This is where freelance projects live.',
  },
  {
    number: '10', title: 'Databases & State Management', color: '#818cf8',
    duration: '1 week', weeks: 1, tag: 'STORAGE',
    why: 'Scripts that only store data in CSV files are fragile and unprofessional. Real systems need queryable, reliable, persistent storage.',
    topics: [
      'SQLite: when to use it, creating tables, Python sqlite3 module',
      'Basic SQL: SELECT, INSERT, UPDATE, DELETE, WHERE, JOIN, ORDER BY',
      'Preventing duplicate records: INSERT OR IGNORE, checking before inserting',
      'State tracking: recording what your automation already processed',
      'When to use SQLite vs PostgreSQL vs a flat JSON file',
      'PostgreSQL basics: connecting with psycopg2, executing queries',
      'Supabase: managed Postgres with a REST API, perfect for quick deployments',
      'Database schema design for automation: jobs, results, logs tables',
    ],
    projects: [
      'Job scraper that stores to SQLite, never duplicates, and tracks per-listing status',
      'Lead pipeline tracker: store leads, mark as emailed, filter by status and date',
    ],
    goal: 'Automations remember state, avoid reprocessing, and store results reliably.',
  },
  {
    number: '11', title: 'Workflow Automation Platforms', color: '#a78bfa',
    duration: '1 week', weeks: 1, tag: 'NO-CODE+',
    why: 'Some clients want Python. Some want no-code. Many want hybrid. Being fluent in both doubles the clients you can serve.',
    topics: [
      'n8n: open-source, self-hostable, most powerful — learn this one deeply',
      'Make (Integromat): visual canvas, 1000+ app integrations',
      'Zapier: most widely used by non-technical clients, understand its limitations',
      'When to recommend no-code vs Python: client technical level, maintenance, complexity',
      'Hybrid systems: Python script triggered by n8n, output sent back to Make',
      'Webhooks in no-code: triggering from external events, passing data',
      'Error handling and retry logic in visual workflows',
      'Self-hosting n8n on a VPS: this is a billable managed service you can offer',
    ],
    projects: [
      'Build the same workflow in Zapier, Make, and n8n — compare cost, power, and maintainability',
      'n8n: Typeform submission → AI summary → Notion page created → Slack alert sent',
    ],
    goal: 'You serve technical and non-technical clients and recommend the right tool for each situation.',
  },
  {
    number: '12', title: 'Building Complete Automation Systems', color: '#7c3aed',
    duration: '4–6 weeks', weeks: 5, tag: 'SYSTEMS',
    why: 'This is where everything combines. You stop writing scripts and start building systems clients pay thousands for.',
    topics: [
      'System design before code: flowcharts, defining triggers, inputs, outputs, and failure states',
      'Modular architecture: reusable modules, separation of concerns, clean folder structure',
      'Configuration-driven systems: YAML/JSON configs so clients adjust without touching code',
      'End-to-end error handling, alerting, and graceful degradation',
      'Writing documentation a non-technical client can follow',
      'Handoff packages: what to deliver, how to present it, client training',
      'Maintenance planning: what happens when an API changes or a dependency breaks',
    ],
    projects: [
      'AI Lead Generation System: scrape → enrich with AI → score → push to CRM → Slack alert',
      'AI Email Reply System: monitor Gmail → classify → AI draft → human approval queue → send',
      'Content Automation Pipeline: keyword → AI research → AI draft → format → publish to Notion/WordPress',
      'AI Customer Support Bot: knowledge base ingestion → answer questions → escalate → log all',
      'Invoice Processing System: PDF in → AI data extraction → validate → push to accounting spreadsheet',
    ],
    goal: 'You have 3–5 complete, documented, deployable systems that solve recognizable business problems.',
  },
  {
    number: '13', title: 'Portfolio & Positioning', color: '#2563eb',
    duration: '2 weeks', weeks: 2, tag: 'PORTFOLIO',
    why: 'A weak portfolio loses clients before the conversation starts. Most developers have terrible portfolios. This is your biggest competitive edge.',
    topics: [
      'GitHub profile: pinned repos, profile README.md, consistent commit history',
      'Writing a great README: problem → demo GIF → installation → usage → example output',
      'Loom demo videos: walking through your systems in action (clients watch these, not code)',
      'Case studies: problem, your approach, measurable result (saves X hours/week, processes X records)',
      'Choosing 2–3 niches: e-commerce, real estate, agencies, SaaS, medical practices',
      'Writing outcome-based service descriptions, not tech-stack descriptions',
      'LinkedIn profile: headline, about section, featured projects, skills endorsements',
      'One-page portfolio website: services, projects, results, contact',
    ],
    projects: [
      '5 GitHub repos with polished READMEs, demo videos, and documented measurable results',
      'Simple one-page portfolio website with your niche, services, and 2–3 case studies',
    ],
    goal: 'A potential client visiting your GitHub or LinkedIn immediately understands what you do and why to hire you.',
  },
  {
    number: '14', title: 'Freelancing — Getting & Keeping Clients', color: '#0369a1',
    duration: 'Ongoing', weeks: 2, tag: 'BUSINESS',
    why: 'Technical skill without business skill earns nothing. This stage is as important as all the others combined.',
    topics: [
      'Upwork: niche positioning, proposal format (problem → solution → proof → price), first contracts',
      'Fiverr: gig creation, tiered pricing, upsell structure',
      'LinkedIn outreach: identifying decision makers, connection messages, follow-up sequence',
      'Pricing strategy: never charge hourly for automation — charge per project or per outcome',
      'Discovery calls: questions to understand the actual problem under the stated request',
      "Proposals: problem statement, solution, timeline, price, what's NOT included",
      'Scope creep prevention: clear contracts, change request process',
      'Delivering work professionally: documentation, handoff call, client training',
      'Retainer model: turning one-time projects into monthly maintenance revenue',
      'Asking for referrals at the right moment',
      "Red flags: how to identify bad clients before you're trapped in a project",
      'Contracts: Bonsai or AND.CO — IP assignment, payment terms, kill fee',
    ],
    projects: [
      'Submit 10 Upwork proposals using the problem-solution-proof format',
      'Create 3 Fiverr gigs with specific deliverables and outcome-based titles',
      'Conduct 2 discovery calls and write a proper proposal after each',
    ],
    goal: 'You find clients, price correctly, deliver professionally, and build recurring income.',
  },
];

const TOTAL_WEEKS = stages.reduce((sum, s) => sum + s.weeks, 0);

// ─── Piston Code Runner ───────────────────────────────────────────────────────

async function runCode(code: string, stdin: string): Promise<{ output: string; error: string }> {
  try {
    const res = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'python',
        version: '3.10.0',
        files: [{ name: 'solution.py', content: code }],
        stdin,
        run_timeout: 5000,
      }),
    });
    const data = await res.json();
    return {
      output: (data.run?.stdout || '').trim(),
      error: (data.run?.stderr || '').trim(),
    };
  } catch {
    return { output: '', error: 'Network error — could not connect to code runner.' };
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface CodingProblem {
  id: string;
  title: string;
  description: string;
  inputSpec: string;
  outputSpec: string;
  example: { input: string; output: string };
  testInput: string;
  expectedOutput: string;
}

interface TopicContent {
  explanation: string;
  codeExample: string;
  problems: CodingProblem[];
}

// ─── Stage 01 Content ─────────────────────────────────────────────────────────

const STAGE01_CONTENT: Record<string, TopicContent> = {

  'Variables, strings (f-strings), numbers (int, float), booleans': {
    explanation: "Variables store data — no type declarations needed in Python.\n\nStrings hold text: use single or double quotes. F-strings let you embed values directly:\n  name = 'Alice'\n  print(f'Hello {name}!')  # Hello Alice!\n\nNumbers:\n  int   — whole numbers: 42, -7, 0\n  float — decimals: 3.14, -0.5\n\nBooleans: True or False (capital T and F)\n  is_active = True\n  score = 95\n  passed = score >= 60  # True\n\nYou can convert between types:\n  int('42')    # 42\n  float('3.5') # 3.5\n  str(100)     # '100'",
    codeExample: "name = 'Alice'\nage = 25\nheight = 1.75\nis_student = True\n\nprint(f'Name: {name}')\nprint(f'Age: {age}')\nprint(f'Height: {height:.2f}m')\nprint(f'Student: {is_student}')\n\n# Type conversion\nyear = int(input('Enter year: '))\nprint(f'Next year: {year + 1}')",
    problems: [
      {
        id: 's01t01p0', title: 'Greeting Card',
        description: 'Read a name and an age. Print a greeting in the exact format shown.',
        inputSpec: 'Line 1: a name\nLine 2: an age (integer)',
        outputSpec: 'Hello {name}! You are {age} years old.',
        example: { input: 'Alice\n25', output: 'Hello Alice! You are 25 years old.' },
        testInput: 'Marcus\n32', expectedOutput: 'Hello Marcus! You are 32 years old.',
      },
      {
        id: 's01t01p1', title: 'Temperature Converter',
        description: 'Read a temperature in Celsius. Convert to Fahrenheit (F = C * 9/5 + 32). Print the result with 1 decimal place.',
        inputSpec: 'One line: temperature in Celsius (number)',
        outputSpec: '{result}F',
        example: { input: '0', output: '32.0F' },
        testInput: '100', expectedOutput: '212.0F',
      },
      {
        id: 's01t01p2', title: 'Simple Calculator',
        description: 'Read two integers. Print their sum, difference, and product, each on its own line.',
        inputSpec: 'Line 1: integer a\nLine 2: integer b',
        outputSpec: '{a+b}\n{a-b}\n{a*b}',
        example: { input: '5\n3', output: '8\n2\n15' },
        testInput: '10\n4', expectedOutput: '14\n6\n40',
      },
    ],
  },

  'Lists, dictionaries, sets, tuples — and when to use each': {
    explanation: "Python has four main collection types:\n\nList — ordered, mutable, allows duplicates:\n  fruits = ['apple', 'banana', 'apple']\n  fruits.append('cherry')\n\nDictionary — key-value pairs, fast lookups:\n  person = {'name': 'Alice', 'age': 25}\n  person['city'] = 'London'\n\nSet — unordered, unique values only, great for deduplication:\n  unique = {1, 2, 3, 2, 1}  # {1, 2, 3}\n  a | b  # union\n  a & b  # intersection\n\nTuple — ordered, immutable (cannot change):\n  point = (10, 20)\n  x, y = point\n\nWhen to use:\n  List → ordered collection you'll modify\n  Dict → lookup by key\n  Set  → need unique items or set operations\n  Tuple → fixed data, coordinates, return values",
    codeExample: "# List\nscores = [85, 92, 78, 95]\nscores.append(88)\nprint(f'Avg: {sum(scores)/len(scores):.1f}')\n\n# Dictionary\nstudent = {'name': 'Bob', 'grade': 'A'}\nprint(student.get('age', 'not set'))  # not set\n\n# Set - deduplication\nraw = ['alice', 'bob', 'alice', 'carol']\nunique = set(raw)\nprint(sorted(unique))  # ['alice', 'bob', 'carol']\n\n# Tuple\nx, y = (10, 20)\nprint(f'x={x}, y={y}')",
    problems: [
      {
        id: 's01t02p0', title: 'List Stats',
        description: 'Read n, then n integers on one line (space-separated). Print their minimum, maximum, and sum, each on its own line.',
        inputSpec: 'Line 1: n\nLine 2: n space-separated integers',
        outputSpec: '{min}\n{max}\n{sum}',
        example: { input: '4\n3 1 4 1', output: '1\n4\n9' },
        testInput: '5\n10 30 20 50 40', expectedOutput: '10\n50\n150',
      },
      {
        id: 's01t02p1', title: 'Dictionary Lookup',
        description: 'Read n, then n lines of "key value" pairs to build a dictionary. Then read a key and print its value, or "Not found" if missing.',
        inputSpec: 'Line 1: n\nNext n lines: "key value"\nLast line: key to look up',
        outputSpec: 'The value, or "Not found"',
        example: { input: '2\ncolor blue\nsize large\ncolor', output: 'blue' },
        testInput: '3\nname Alice\ncity London\nage 25\ncountry', expectedOutput: 'Not found',
      },
      {
        id: 's01t02p2', title: 'Set Operations',
        description: 'Read two lines of space-separated integers. Print their union (sorted, comma-separated) then their intersection (sorted, comma-separated).',
        inputSpec: 'Line 1: space-separated integers\nLine 2: space-separated integers',
        outputSpec: 'Line 1: union sorted comma-separated\nLine 2: intersection sorted comma-separated',
        example: { input: '1 2 3\n2 3 4', output: '1,2,3,4\n2,3' },
        testInput: '1 2 3 4 5\n3 4 5 6 7', expectedOutput: '1,2,3,4,5,6,7\n3,4,5',
      },
    ],
  },

  'Indexing, slicing, unpacking': {
    explanation: "Python gives you powerful ways to access and extract data from sequences.\n\nIndexing (0-based, negatives count from end):\n  items = ['a', 'b', 'c', 'd']\n  items[0]   # 'a'  (first)\n  items[-1]  # 'd'  (last)\n  items[1]   # 'b'\n\nSlicing [start:stop:step] — extracts a sub-list:\n  items[1:3]   # ['b', 'c']  (stop is exclusive)\n  items[::2]   # ['a', 'c']  (every other)\n  items[::-1]  # ['d','c','b','a'] (reversed)\n\nUnpacking — assign multiple values at once:\n  a, b, c = [1, 2, 3]\n  first, *rest = [1, 2, 3, 4]  # first=1, rest=[2,3,4]\n  x, y = y, x  # swap two variables!",
    codeExample: "words = ['the', 'quick', 'brown', 'fox']\n\n# Indexing\nprint(words[0])    # the\nprint(words[-1])   # fox\n\n# Slicing\nprint(words[1:3])  # ['quick', 'brown']\nprint(words[::2])  # ['the', 'brown']\n\n# Unpacking\nfirst, *middle, last = words\nprint(first, last)  # the fox\n\n# Swap\na, b = 10, 20\na, b = b, a\nprint(a, b)  # 20 10",
    problems: [
      {
        id: 's01t03p0', title: 'First and Last',
        description: 'Read a sentence. Print its first word on line 1 and its last word on line 2.',
        inputSpec: 'One line: a sentence (multiple words)',
        outputSpec: 'Line 1: first word\nLine 2: last word',
        example: { input: 'the quick brown fox', output: 'the\nfox' },
        testInput: 'Python is awesome for automation', expectedOutput: 'Python\nautomation',
      },
      {
        id: 's01t03p1', title: 'Every Other',
        description: 'Read space-separated numbers. Print every other element starting from index 0, each on its own line.',
        inputSpec: 'One line: space-separated integers',
        outputSpec: 'Elements at indices 0, 2, 4 ... each on own line',
        example: { input: '10 20 30 40 50', output: '10\n30\n50' },
        testInput: '5 10 15 20 25 30', expectedOutput: '5\n15\n25',
      },
      {
        id: 's01t03p2', title: 'Swap Ends',
        description: 'Read three space-separated values a b c. Swap a and c using unpacking. Print the result space-separated.',
        inputSpec: 'One line: three space-separated values',
        outputSpec: 'The three values with first and last swapped, space-separated',
        example: { input: '1 2 3', output: '3 2 1' },
        testInput: 'apple banana cherry', expectedOutput: 'cherry banana apple',
      },
    ],
  },

  'if/elif/else, match/case': {
    explanation: "Conditional statements let your code make decisions.\n\nif/elif/else:\n  score = 85\n  if score >= 90:\n      grade = 'A'\n  elif score >= 80:\n      grade = 'B'\n  elif score >= 70:\n      grade = 'C'\n  else:\n      grade = 'F'\n\nPython evaluates top to bottom and stops at the first True condition.\n\nmatch/case (Python 3.10+) — like switch in other languages:\n  match command:\n      case 'quit':\n          quit()\n      case 'help':\n          show_help()\n      case _:  # default\n          print('Unknown command')\n\nCommon patterns:\n  if x > 0 and y > 0:   # both true\n  if x == 0 or y == 0:  # either true\n  if not is_done:        # negation",
    codeExample: "# Grade classifier\ndef get_grade(score):\n    if score >= 90:\n        return 'A'\n    elif score >= 80:\n        return 'B'\n    elif score >= 70:\n        return 'C'\n    elif score >= 60:\n        return 'D'\n    else:\n        return 'F'\n\nprint(get_grade(95))  # A\nprint(get_grade(72))  # C\n\n# Leap year\nyear = 2000\nif (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:\n    print('Leap year')\nelse:\n    print('Not a leap year')",
    problems: [
      {
        id: 's01t04p0', title: 'Positive Negative Zero',
        description: 'Read an integer. Print "positive", "negative", or "zero".',
        inputSpec: 'One line: an integer',
        outputSpec: '"positive", "negative", or "zero"',
        example: { input: '5', output: 'positive' },
        testInput: '-3', expectedOutput: 'negative',
      },
      {
        id: 's01t04p1', title: 'Grade Classifier',
        description: 'Read a score (0-100). Print the letter grade: A (90+), B (80+), C (70+), D (60+), F (below 60).',
        inputSpec: 'One line: an integer score',
        outputSpec: 'A, B, C, D, or F',
        example: { input: '92', output: 'A' },
        testInput: '73', expectedOutput: 'C',
      },
      {
        id: 's01t04p2', title: 'Leap Year',
        description: 'Read a year. Print "Leap year" if it is a leap year, otherwise "Not a leap year". A year is a leap year if divisible by 4 but not 100, OR divisible by 400.',
        inputSpec: 'One line: a year (integer)',
        outputSpec: '"Leap year" or "Not a leap year"',
        example: { input: '2000', output: 'Leap year' },
        testInput: '1900', expectedOutput: 'Not a leap year',
      },
    ],
  },

  'for loops, while loops, break, continue, enumerate, zip': {
    explanation: "Loops repeat code. Two main types:\n\nfor loop — iterate over a sequence:\n  for i in range(5):       # 0,1,2,3,4\n  for item in my_list:     # each element\n  for i, v in enumerate(items):  # index + value\n  for a, b in zip(list1, list2): # pairs from two lists\n\nwhile loop — repeat while a condition is true:\n  while count < 10:\n      count += 1\n\nControl keywords:\n  break    — exit the loop immediately\n  continue — skip rest of this iteration, go to next\n\nEnumerate gives you index and value:\n  for i, name in enumerate(['Alice', 'Bob']):\n      print(i, name)  # 0 Alice, 1 Bob\n\nZip pairs two lists:\n  for name, score in zip(names, scores):\n      print(f'{name}: {score}')",
    codeExample: "# FizzBuzz\nfor i in range(1, 16):\n    if i % 15 == 0:\n        print('FizzBuzz')\n    elif i % 3 == 0:\n        print('Fizz')\n    elif i % 5 == 0:\n        print('Buzz')\n    else:\n        print(i)\n\n# Enumerate\nfruits = ['apple', 'banana', 'cherry']\nfor i, fruit in enumerate(fruits, start=1):\n    print(f'{i}. {fruit}')\n\n# While with break\ntotal = 0\nwhile True:\n    n = int(input())\n    if n == 0:\n        break\n    total += n\nprint(total)",
    problems: [
      {
        id: 's01t05p0', title: 'FizzBuzz',
        description: 'Read n. Print FizzBuzz from 1 to n: print "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for multiples of both, otherwise the number.',
        inputSpec: 'One line: integer n',
        outputSpec: 'n lines of FizzBuzz output',
        example: { input: '5', output: '1\n2\nFizz\n4\nBuzz' },
        testInput: '15', expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
      },
      {
        id: 's01t05p1', title: 'Sum of Evens',
        description: 'Read space-separated integers. Print the sum of only the even numbers.',
        inputSpec: 'One line: space-separated integers',
        outputSpec: 'Sum of even numbers only',
        example: { input: '1 2 3 4 5 6', output: '12' },
        testInput: '7 14 3 8 22 5 10', expectedOutput: '54',
      },
      {
        id: 's01t05p2', title: 'Multiplication Table',
        description: 'Read n. Print the multiplication table for n from 1 to 10, one result per line.',
        inputSpec: 'One line: integer n',
        outputSpec: '10 lines: n*1, n*2, ... n*10',
        example: { input: '3', output: '3\n6\n9\n12\n15\n18\n21\n24\n27\n30' },
        testInput: '7', expectedOutput: '7\n14\n21\n28\n35\n42\n49\n56\n63\n70',
      },
    ],
  },

  'Functions: parameters, return values, *args, **kwargs, default values': {
    explanation: "Functions package reusable logic. Define once, call many times.\n\nBasic function:\n  def greet(name):\n      return f'Hello {name}!'\n\nDefault parameter values:\n  def greet(name, greeting='Hello'):\n      return f'{greeting} {name}!'\n  greet('Alice')           # Hello Alice!\n  greet('Alice', 'Hi')     # Hi Alice!\n\n*args — accepts any number of positional arguments:\n  def total(*args):\n      return sum(args)\n  total(1, 2, 3, 4)  # 10\n\n**kwargs — accepts any number of keyword arguments:\n  def show(**kwargs):\n      for k, v in kwargs.items():\n          print(f'{k}: {v}')\n  show(name='Alice', age=25)\n\nAlways return something meaningful. Functions that don't return anything return None.",
    codeExample: "def factorial(n):\n    result = 1\n    for i in range(2, n + 1):\n        result *= i\n    return result\n\nprint(factorial(5))  # 120\n\n# Default parameter\ndef power(base, exp=2):\n    return base ** exp\n\nprint(power(3))    # 9\nprint(power(2, 8)) # 256\n\n# *args\ndef average(*args):\n    return sum(args) / len(args)\n\nprint(average(10, 20, 30))  # 20.0\n\n# **kwargs\ndef profile(**kwargs):\n    for k, v in kwargs.items():\n        print(f'{k}: {v}')\n\nprofile(name='Alice', city='London')",
    problems: [
      {
        id: 's01t06p0', title: 'Factorial',
        description: 'Read an integer n. Write a function factorial(n) and print its result.',
        inputSpec: 'One line: integer n (0 <= n <= 12)',
        outputSpec: 'n! (factorial of n)',
        example: { input: '5', output: '120' },
        testInput: '8', expectedOutput: '40320',
      },
      {
        id: 's01t06p1', title: 'Average with *args',
        description: 'Read space-separated numbers. Pass them to an average(*args) function and print the result to 2 decimal places.',
        inputSpec: 'One line: space-separated numbers',
        outputSpec: 'Average to 2 decimal places',
        example: { input: '10 20 30', output: '20.00' },
        testInput: '5 15 25 35 45 55', expectedOutput: '30.00',
      },
      {
        id: 's01t06p2', title: 'Word Counter',
        description: 'Read a sentence then a target word. Write a function count_word(sentence, word) that counts how many times the word appears (case-insensitive). Print the count.',
        inputSpec: 'Line 1: sentence\nLine 2: word to count',
        outputSpec: 'Count of the word (integer)',
        example: { input: 'Hello world hello HELLO\nhello', output: '3' },
        testInput: 'The cat sat on the mat the cat sat\nthe', expectedOutput: '3',
      },
    ],
  },

  'List comprehensions and dict comprehensions — used in every real script': {
    explanation: "Comprehensions are Python's most powerful one-liner tool. They build lists or dicts in a single readable expression.\n\nList comprehension:\n  [expression for item in iterable if condition]\n\nExamples:\n  squares = [x**2 for x in range(1, 6)]\n  # [1, 4, 9, 16, 25]\n\n  evens = [x for x in range(20) if x % 2 == 0]\n  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]\n\n  clean = [s.strip() for s in raw_list]\n\nDict comprehension:\n  {key: value for item in iterable if condition}\n\n  lengths = {word: len(word) for word in words}\n  # {'hello': 5, 'world': 5}\n\n  squared = {x: x**2 for x in range(5)}\n  # {0:0, 1:1, 2:4, 3:9, 4:16}\n\nWhen to use: anytime you'd write a for loop just to build a list or dict.",
    codeExample: "# List comprehension — squares\nsquares = [x**2 for x in range(1, 6)]\nprint(squares)  # [1, 4, 9, 16, 25]\n\n# With condition — only evens\nnums = [1, 2, 3, 4, 5, 6, 7, 8]\nevens = [x for x in nums if x % 2 == 0]\nprint(evens)  # [2, 4, 6, 8]\n\n# Dict comprehension — word lengths\nwords = ['Python', 'is', 'great']\nlengths = {w: len(w) for w in words}\nprint(lengths)  # {'Python': 6, 'is': 2, 'great': 5}\n\n# Transforming strings\nraw = ['  alice ', '  BOB ', ' carol  ']\nclean = [s.strip().lower() for s in raw]\nprint(clean)  # ['alice', 'bob', 'carol']",
    problems: [
      {
        id: 's01t07p0', title: 'Squares List',
        description: 'Read n. Use a list comprehension to build a list of squares from 1 to n. Print them comma-separated.',
        inputSpec: 'One line: integer n',
        outputSpec: 'Squares 1² to n², comma-separated',
        example: { input: '5', output: '1,4,9,16,25' },
        testInput: '7', expectedOutput: '1,4,9,16,25,36,49',
      },
      {
        id: 's01t07p1', title: 'Filter Evens',
        description: 'Read space-separated integers. Use a list comprehension to keep only even numbers. Print them space-separated.',
        inputSpec: 'One line: space-separated integers',
        outputSpec: 'Even numbers only, space-separated',
        example: { input: '1 2 3 4 5 6', output: '2 4 6' },
        testInput: '11 4 7 8 3 16 9 2', expectedOutput: '4 8 16 2',
      },
      {
        id: 's01t07p2', title: 'Word Lengths',
        description: 'Read space-separated words. Use a dict comprehension to map each word to its length. Print each pair as "word: length", one per line, in original order.',
        inputSpec: 'One line: space-separated words',
        outputSpec: '"word: length" for each word, one per line',
        example: { input: 'Python is fun', output: 'Python: 6\nis: 2\nfun: 3' },
        testInput: 'automation engineer freelance', expectedOutput: 'automation: 10\nengineer: 8\nfreelance: 9',
      },
    ],
  },

  'Standard library: os, sys, datetime, json, re, pathlib': {
    explanation: "Python ships with a powerful standard library — no installs needed.\n\njson — parse and create JSON:\n  import json\n  data = json.loads('{\"name\": \"Alice\"}')\n  print(data['name'])  # Alice\n  text = json.dumps({'x': 1}, indent=2)\n\nre — regular expressions for pattern matching:\n  import re\n  emails = re.findall(r'[\\w.]+@[\\w.]+', text)\n  nums = re.findall(r'\\d+', '3 cats and 12 dogs')\n\ndatetime — work with dates and times:\n  from datetime import datetime\n  now = datetime.now()\n  dt = datetime.strptime('2025-01-15', '%Y-%m-%d')\n  print(dt.strftime('%d/%m/%Y'))  # 15/01/2025\n\nos — interact with the operating system:\n  import os\n  os.getcwd()           # current directory\n  os.listdir('.')       # list files\n  os.environ.get('HOME') # environment variable\n\nsys — system-level access:\n  import sys\n  sys.argv  # command line arguments\n  sys.exit(0)  # exit script",
    codeExample: "import json, re\nfrom datetime import datetime\n\n# JSON\nraw = '{\"name\": \"Alice\", \"scores\": [90, 85, 92]}'\ndata = json.loads(raw)\nprint(data['name'])          # Alice\nprint(sum(data['scores']))   # 267\n\n# Regex\ntext = 'Call 555-1234 or 555-5678'\nnumbers = re.findall(r'\\d{3}-\\d{4}', text)\nprint(numbers)  # ['555-1234', '555-5678']\n\n# Datetime\ndate_str = '2025-03-15'\ndt = datetime.strptime(date_str, '%Y-%m-%d')\nprint(dt.strftime('%d %B %Y'))  # 15 March 2025",
    problems: [
      {
        id: 's01t08p0', title: 'JSON Parser',
        description: 'Read a JSON string from input. Extract and print the value of the key "name".',
        inputSpec: 'One line: a JSON string with at least a "name" key',
        outputSpec: 'The value of "name"',
        example: { input: '{"name": "Alice", "age": 25}', output: 'Alice' },
        testInput: '{"name": "Jordan", "city": "Paris", "score": 98}', expectedOutput: 'Jordan',
      },
      {
        id: 's01t08p1', title: 'Number Extractor',
        description: 'Read a line of text. Use re.findall to extract all integers. Print them comma-separated.',
        inputSpec: 'One line: text containing integers',
        outputSpec: 'All integers found, comma-separated in order',
        example: { input: 'I have 3 cats and 12 dogs', output: '3,12' },
        testInput: 'Order 42 contains 7 items costing 199 dollars', expectedOutput: '42,7,199',
      },
      {
        id: 's01t08p2', title: 'Date Reformatter',
        description: 'Read a date in YYYY-MM-DD format. Print it reformatted as DD/MM/YYYY.',
        inputSpec: 'One line: date string in YYYY-MM-DD format',
        outputSpec: 'Date in DD/MM/YYYY format',
        example: { input: '2025-01-15', output: '15/01/2025' },
        testInput: '2000-12-31', expectedOutput: '31/12/2000',
      },
    ],
  },

  'String methods: .split(), .strip(), .replace(), .join()': {
    explanation: "Strings have powerful built-in methods for manipulation.\n\n.strip() — removes whitespace from both ends:\n  '  hello  '.strip()   # 'hello'\n  'hello\\n'.rstrip()    # 'hello' (right only)\n\n.split() — splits into a list:\n  'a,b,c'.split(',')     # ['a', 'b', 'c']\n  '  a  b  c  '.split() # ['a', 'b', 'c'] (splits on any whitespace)\n\n.join() — joins a list into a string:\n  ','.join(['a', 'b', 'c'])  # 'a,b,c'\n  ' '.join(words)            # join with spaces\n\n.replace() — replaces all occurrences:\n  'hello world'.replace('world', 'Python')  # 'hello Python'\n\nOther useful methods:\n  .upper()   .lower()   .title()   .capitalize()\n  .startswith('hi')  .endswith('!')\n  .count('l')   .find('o')   .index('o')\n  .isdigit()  .isalpha()  .isspace()",
    codeExample: "# Clean and split CSV\nline = '  Alice , 30 , London  '\nfields = [f.strip() for f in line.split(',')]\nprint(fields)  # ['Alice', '30', 'London']\n\n# Join\nwords = ['Python', 'is', 'powerful']\nprint(' '.join(words))   # Python is powerful\nprint('-'.join(words))   # Python-is-powerful\n\n# Replace\ntext = 'I love Java. Java is great.'\nprint(text.replace('Java', 'Python'))\n# I love Python. Python is great.\n\n# Title case after strip\nmessage = '  hello world  '\nprint(message.strip().title())  # Hello World",
    problems: [
      {
        id: 's01t09p0', title: 'Clean and Title Case',
        description: 'Read a string with leading/trailing spaces. Strip whitespace then print in title case (first letter of each word capitalized).',
        inputSpec: 'One line: string with surrounding whitespace',
        outputSpec: 'Stripped, title-cased string',
        example: { input: '  hello world  ', output: 'Hello World' },
        testInput: '  python automation engineer  ', expectedOutput: 'Python Automation Engineer',
      },
      {
        id: 's01t09p1', title: 'CSV Field Extractor',
        description: 'Read a line of comma-separated values (each may have surrounding spaces). Strip each field and print them one per line.',
        inputSpec: 'One line: comma-separated values with possible surrounding spaces',
        outputSpec: 'Each field stripped, one per line',
        example: { input: ' Alice , 25 , London ', output: 'Alice\n25\nLondon' },
        testInput: '  Python  ,  Django  ,  FastAPI  ,  Supabase  ', expectedOutput: 'Python\nDjango\nFastAPI\nSupabase',
      },
      {
        id: 's01t09p2', title: 'Word Replacer',
        description: 'Read a sentence, then the word to find, then the replacement. Print the sentence with all occurrences replaced.',
        inputSpec: 'Line 1: sentence\nLine 2: word to find\nLine 3: replacement word',
        outputSpec: 'Modified sentence',
        example: { input: 'I love cats and cats love me\ncats\ndogs', output: 'I love dogs and dogs love me' },
        testInput: 'Python is fun and Python is powerful\nPython\nRust', expectedOutput: 'Rust is fun and Rust is powerful',
      },
    ],
  },

  'Regular expressions (re module) — critical for extracting data from text': {
    explanation: "Regular expressions (regex) let you find and extract patterns from text.\n\nImport: import re\n\nKey functions:\n  re.findall(pattern, text)  — returns list of all matches\n  re.search(pattern, text)   — finds first match (or None)\n  re.sub(pattern, repl, text) — replaces matches\n  re.match(pattern, text)    — matches at start only\n\nCommon pattern pieces:\n  \\d    — digit (0-9)\n  \\w    — word character (letter/digit/_)\n  \\s    — whitespace\n  .     — any character (except newline)\n  +     — one or more\n  *     — zero or more\n  ?     — zero or one\n  {3}   — exactly 3\n  [abc] — character class (a, b, or c)\n  ^     — start of string\n  $     — end of string\n\nExamples:\n  r'\\d+'         — one or more digits\n  r'[A-Z][a-z]+' — capital letter followed by lowercase\n  r'\\b\\w+@\\w+\\.\\w+' — simple email pattern",
    codeExample: "import re\n\n# Find all numbers in text\ntext = 'Order 42: 3 shirts at $29 each'\nnums = re.findall(r'\\d+', text)\nprint(nums)  # ['42', '3', '29']\n\n# Extract emails\ntext2 = 'Contact alice@example.com or bob@test.org'\nemails = re.findall(r'[\\w.]+@[\\w.]+\\.[a-z]+', text2)\nprint(emails)  # ['alice@example.com', 'bob@test.org']\n\n# Remove all non-digits (clean phone number)\nphone = '(555) 123-4567'\ndigits = re.sub(r'\\D', '', phone)\nprint(digits)  # 5551234567\n\n# Find capitalized words\nsentence = 'Alice went to London with Bob'\ncaps = re.findall(r'\\b[A-Z][a-z]+', sentence)\nprint(caps)  # ['Alice', 'London', 'Bob']",
    problems: [
      {
        id: 's01t10p0', title: 'Email Extractor',
        description: 'Read a line of text. Use re.findall to extract all email addresses. Print each on its own line.',
        inputSpec: 'One line: text containing email addresses',
        outputSpec: 'Each email address on its own line',
        example: { input: 'Email hello@example.com or info@test.org for help', output: 'hello@example.com\ninfo@test.org' },
        testInput: 'Send invoice to billing@company.com and copy admin@mysite.org and ceo@corp.io', expectedOutput: 'billing@company.com\nadmin@mysite.org\nceo@corp.io',
      },
      {
        id: 's01t10p1', title: 'Phone Digit Extractor',
        description: 'Read a phone number in any format. Use re.sub to remove all non-digit characters. Print only the digits.',
        inputSpec: 'One line: phone number in any format',
        outputSpec: 'Only the digits',
        example: { input: '(123) 456-7890', output: '1234567890' },
        testInput: '+1-800-555-0199', expectedOutput: '18005550199',
      },
      {
        id: 's01t10p2', title: 'Capitalized Word Finder',
        description: 'Read a sentence. Use re.findall to find all words that start with a capital letter (ignore the first word if it is at the start of the sentence — just find ALL capitalized words). Print each on its own line.',
        inputSpec: 'One line: a sentence',
        outputSpec: 'Capitalized words (matching [A-Z][a-z]+), one per line',
        example: { input: 'Alice and Bob went to London', output: 'Alice\nBob\nLondon' },
        testInput: 'Mary visited Paris and met John near the Eiffel Tower', expectedOutput: 'Mary\nParis\nJohn\nEiffel\nTower',
      },
    ],
  },

  'Basic OOP: classes, __init__, methods, self': {
    explanation: "Object-Oriented Programming lets you bundle data and behavior together.\n\nA class is a blueprint. An instance is a specific object made from that blueprint.\n\nDefining a class:\n  class Dog:\n      def __init__(self, name, breed):  # constructor\n          self.name = name   # instance attribute\n          self.breed = breed\n\n      def bark(self):  # method\n          return f'{self.name} says: Woof!'\n\n      def info(self):\n          return f'{self.name} ({self.breed})'\n\nUsing it:\n  dog = Dog('Rex', 'Labrador')  # create instance\n  print(dog.bark())   # Rex says: Woof!\n  print(dog.info())   # Rex (Labrador)\n\nself always refers to the current instance.\n__init__ runs automatically when you create an object.\nMethods are just functions that belong to a class and always take self as the first parameter.",
    codeExample: "class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n        self.transactions = []\n\n    def deposit(self, amount):\n        self.balance += amount\n        self.transactions.append(f'+{amount}')\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            return 'Insufficient funds'\n        self.balance -= amount\n        self.transactions.append(f'-{amount}')\n        return self.balance\n\n    def statement(self):\n        return f'{self.owner}: ${self.balance}'\n\nacc = BankAccount('Alice', 100)\nacc.deposit(50)\nacc.withdraw(30)\nprint(acc.statement())  # Alice: $120",
    problems: [
      {
        id: 's01t11p0', title: 'Rectangle Class',
        description: 'Create a Rectangle class with width and height. Add area() and perimeter() methods. Read width then height. Print area then perimeter.',
        inputSpec: 'Line 1: width (integer)\nLine 2: height (integer)',
        outputSpec: 'Line 1: area\nLine 2: perimeter',
        example: { input: '4\n3', output: '12\n14' },
        testInput: '7\n5', expectedOutput: '35\n24',
      },
      {
        id: 's01t11p1', title: 'Bank Account',
        description: 'Create a BankAccount class (starting balance 0). Read commands: "deposit N", "withdraw N", "balance". For "balance" print the current balance. Process all commands until EOF.',
        inputSpec: 'Lines of commands: "deposit N", "withdraw N", or "balance"',
        outputSpec: 'Print current balance each time "balance" is seen',
        example: { input: 'deposit 100\nwithdraw 30\nbalance', output: '70' },
        testInput: 'deposit 500\ndeposit 200\nwithdraw 100\nbalance\ndeposit 50\nbalance', expectedOutput: '600\n650',
      },
      {
        id: 's01t11p2', title: 'Student Class',
        description: 'Create a Student class with name and a list of scores. Add add_scores(scores_list) and average() methods. Read name, then scores space-separated. Print "name: average" with average to 2 decimal places.',
        inputSpec: 'Line 1: student name\nLine 2: space-separated scores',
        outputSpec: '{name}: {average:.2f}',
        example: { input: 'Alice\n90 85 92 88', output: 'Alice: 88.75' },
        testInput: 'Jordan\n72 68 80 91 55', expectedOutput: 'Jordan: 73.20',
      },
    ],
  },

  'Reading/writing .txt, .json, .csv files': {
    explanation: "File I/O lets your scripts persist data between runs.\n\nReading/writing text files:\n  with open('file.txt', 'r') as f:\n      content = f.read()       # entire file as string\n      lines = f.readlines()    # list of lines\n\n  with open('file.txt', 'w') as f:\n      f.write('Hello\\n')       # write string\n\nAlways use 'with' — it automatically closes the file.\nModes: 'r' read, 'w' write (overwrites), 'a' append\n\nJSON files:\n  import json\n  with open('data.json', 'r') as f:\n      data = json.load(f)   # parse JSON file\n\n  with open('data.json', 'w') as f:\n      json.dump(data, f, indent=2)\n\nCSV files:\n  import csv\n  with open('data.csv', 'r') as f:\n      reader = csv.DictReader(f)\n      for row in reader:\n          print(row['name'])\n\n  with open('out.csv', 'w', newline='') as f:\n      writer = csv.DictWriter(f, fieldnames=['name', 'age'])\n      writer.writeheader()\n      writer.writerow({'name': 'Alice', 'age': 25})",
    codeExample: "import json\n\n# Write and read text file\nlines = ['Python', 'automation', 'is great']\nwith open('notes.txt', 'w') as f:\n    f.write('\\n'.join(lines))\n\nwith open('notes.txt', 'r') as f:\n    content = f.readlines()\nprint(f'Lines: {len(content)}')\nprint(content[0].strip())\n\n# Write and read JSON\ndata = {'name': 'Alice', 'scores': [90, 85]}\nwith open('data.json', 'w') as f:\n    json.dump(data, f)\n\nwith open('data.json', 'r') as f:\n    loaded = json.load(f)\nprint(loaded['name'])  # Alice",
    problems: [
      {
        id: 's01t12p0', title: 'File Writer and Reader',
        description: 'Read 3 lines of text. Write them to "output.txt". Read the file back. Print "Lines: {count}" then print the second line.',
        inputSpec: '3 lines of text',
        outputSpec: '"Lines: 3" then the second line',
        example: { input: 'Hello\nWorld\nPython', output: 'Lines: 3\nWorld' },
        testInput: 'Automation\nIs\nPowerful', expectedOutput: 'Lines: 3\nIs',
      },
      {
        id: 's01t12p1', title: 'JSON Save and Load',
        description: 'Read n, then n "key value" pairs. Build a dict, save to "data.json", load it back. Print all key-value pairs sorted by key, one per line as "key: value".',
        inputSpec: 'Line 1: n\nNext n lines: "key value"',
        outputSpec: 'Sorted key: value pairs',
        example: { input: '2\nname Alice\ncity London', output: 'city: London\nname: Alice' },
        testInput: '3\nage 30\nname Bob\ncountry USA', expectedOutput: 'age: 30\ncountry: USA\nname: Bob',
      },
      {
        id: 's01t12p2', title: 'Number Summer',
        description: 'Read n, then n integers on one line (space-separated). Write each number on its own line to "nums.txt". Read the file back and print the total sum.',
        inputSpec: 'Line 1: n\nLine 2: n space-separated integers',
        outputSpec: 'Sum of all numbers',
        example: { input: '3\n10 20 30', output: '60' },
        testInput: '5\n100 200 300 400 500', expectedOutput: '1500',
      },
    ],
  },

  'Error handling: try/except/finally, raising exceptions, custom error messages': {
    explanation: "Error handling prevents scripts from crashing when things go wrong.\n\nBasic structure:\n  try:\n      risky_code()\n  except ValueError as e:\n      print(f'Value error: {e}')\n  except (TypeError, KeyError):\n      print('Type or key error')\n  else:\n      print('No error occurred')  # runs if no exception\n  finally:\n      print('Always runs')  # runs regardless\n\nRaising exceptions:\n  if age < 0:\n      raise ValueError('Age cannot be negative')\n\nCommon exception types:\n  ValueError    — wrong value (int('abc'))\n  TypeError     — wrong type ('a' + 1)\n  KeyError      — dict key missing\n  IndexError    — list index out of range\n  ZeroDivisionError — divide by zero\n  FileNotFoundError — file doesn't exist\n\nBest practice: always catch SPECIFIC exceptions. Never use bare except: — it hides real bugs.",
    codeExample: "def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'Error: division by zero'\n    except TypeError:\n        return 'Error: must be numbers'\n\nprint(safe_divide(10, 2))   # 5.0\nprint(safe_divide(10, 0))   # Error: division by zero\n\ndef validate_age(age):\n    if age < 0 or age > 120:\n        raise ValueError(f'Age {age} is out of range (0-120)')\n    return age\n\ntry:\n    print(validate_age(25))   # 25\n    print(validate_age(-1))   # raises ValueError\nexcept ValueError as e:\n    print(f'Error: {e}')",
    problems: [
      {
        id: 's01t13p0', title: 'Safe Division',
        description: 'Read two values. Try to convert them to numbers and divide the first by the second. Handle ZeroDivisionError and ValueError. Print the result as a float or the error message.',
        inputSpec: 'Line 1: value a\nLine 2: value b',
        outputSpec: 'Result as float, or "Error: division by zero", or "Error: invalid input"',
        example: { input: '10\n4', output: '2.5' },
        testInput: '15\n0', expectedOutput: 'Error: division by zero',
      },
      {
        id: 's01t13p1', title: 'Safe List Access',
        description: 'Read space-separated items, then an index. Try to access that index. Handle IndexError. Print the item or "Error: index out of range".',
        inputSpec: 'Line 1: space-separated items\nLine 2: index (integer)',
        outputSpec: 'The item, or "Error: index out of range"',
        example: { input: 'apple banana cherry\n1', output: 'banana' },
        testInput: 'apple banana cherry\n10', expectedOutput: 'Error: index out of range',
      },
      {
        id: 's01t13p2', title: 'Age Validator',
        description: 'Read an age. Write validate_age(age) that raises ValueError if age is not 0-120. Print "Valid age: {age}" or "Error: {message}".',
        inputSpec: 'One line: an age value',
        outputSpec: '"Valid age: {age}" or "Error: {message}"',
        example: { input: '25', output: 'Valid age: 25' },
        testInput: '150', expectedOutput: 'Error: Age must be between 0 and 120',
      },
    ],
  },

  'Logging with the logging module instead of print() — for unattended scripts': {
    explanation: "When scripts run unattended (scheduled, on servers), print() is not enough. The logging module gives you:\n\n• Log levels (in order of severity):\n  DEBUG < INFO < WARNING < ERROR < CRITICAL\n\n• Timestamps and labels automatically\n• Easy file output\n• Turn off debug messages in production\n\nBasic setup:\n  import logging, sys\n  logging.basicConfig(\n      stream=sys.stdout,\n      level=logging.DEBUG,\n      format='%(levelname)s - %(message)s'\n  )\n\n  logging.debug('Detailed debug info')\n  logging.info('Script started')\n  logging.warning('Something unexpected')\n  logging.error('An error occurred')\n  logging.critical('Fatal error!')\n\nIn production: set level=logging.WARNING (DEBUG and INFO won't print)\nIn development: set level=logging.DEBUG\n\nAlways use logging over print in any script that will run without you watching it.",
    codeExample: "import logging, sys\n\nlogging.basicConfig(\n    stream=sys.stdout,\n    level=logging.DEBUG,\n    format='%(levelname)s - %(message)s'\n)\n\ndef process_items(items):\n    logging.info(f'Processing {len(items)} items')\n    results = []\n    for item in items:\n        try:\n            results.append(int(item) * 2)\n            logging.debug(f'Processed: {item}')\n        except ValueError:\n            logging.warning(f'Skipped invalid: {item}')\n    return results\n\ndata = ['1', '2', 'bad', '4']\nprint(process_items(data))",
    problems: [
      {
        id: 's01t14p0', title: 'Log by Value',
        description: 'Set up logging to stdout with format "%(levelname)s - %(message)s". Read an integer. Log WARNING "Value above 100" if >100, ERROR "Value is negative" if <0, INFO "Value is valid" otherwise.',
        inputSpec: 'One line: an integer',
        outputSpec: 'The appropriate log line',
        example: { input: '50', output: 'INFO - Value is valid' },
        testInput: '150', expectedOutput: 'WARNING - Value above 100',
      },
      {
        id: 's01t14p1', title: 'Processor Logger',
        description: 'Set up logging to stdout with format "%(levelname)s - %(message)s". Read space-separated values. For each: log INFO "Processed: {v}" if it can be converted to int, WARNING "Skipped: {v}" otherwise.',
        inputSpec: 'One line: space-separated values (mix of valid integers and invalid)',
        outputSpec: 'One log line per value',
        example: { input: '1 2 bad 4', output: 'INFO - Processed: 1\nINFO - Processed: 2\nWARNING - Skipped: bad\nINFO - Processed: 4' },
        testInput: '10 hello 30 world 50', expectedOutput: 'INFO - Processed: 10\nWARNING - Skipped: hello\nINFO - Processed: 30\nWARNING - Skipped: world\nINFO - Processed: 50',
      },
      {
        id: 's01t14p2', title: 'Script Logger',
        description: 'Set up logging to stdout with format "%(levelname)s - %(message)s". Log INFO "Script started". Read n, compute 100/n. Log INFO "Result: {result}" or ERROR "Division by zero". Then log INFO "Script finished".',
        inputSpec: 'One line: integer n',
        outputSpec: '3 log lines',
        example: { input: '5', output: 'INFO - Script started\nINFO - Result: 20.0\nINFO - Script finished' },
        testInput: '4', expectedOutput: 'INFO - Script started\nINFO - Result: 25.0\nINFO - Script finished',
      },
    ],
  },

};

// ─── Stage 01 Final Problems ──────────────────────────────────────────────────

const STAGE01_FINAL_PROBLEMS: CodingProblem[] = [
  {
    id: 's01final0', title: 'Contact Book',
    description: 'Read n contacts in "name,phone" format. Store in a dict. Read a name to look up. Print the phone number or "Not found".',
    inputSpec: 'Line 1: n\nNext n lines: "name,phone"\nLast line: name to look up',
    outputSpec: 'Phone number or "Not found"',
    example: { input: '3\nAlice,555-1234\nBob,555-5678\nCarol,555-9012\nBob', output: '555-5678' },
    testInput: '3\nAlice,555-1234\nBob,555-5678\nCarol,555-9012\nDave', expectedOutput: 'Not found',
  },
  {
    id: 's01final1', title: 'Word Frequency Counter',
    description: 'Read a sentence. Count each word (case-insensitive). Print each word and count in alphabetical order as "word: count".',
    inputSpec: 'One line: a sentence',
    outputSpec: '"word: count" for each word, alphabetically sorted',
    example: { input: 'the cat sat on the mat', output: 'cat: 1\nmat: 1\non: 1\nsat: 1\nthe: 2' },
    testInput: 'to be or not to be that is the question', expectedOutput: 'be: 2\nis: 1\nnot: 1\nor: 1\nquestion: 1\nthat: 1\nthe: 1\nto: 2',
  },
  {
    id: 's01final2', title: 'Student Grade Manager',
    description: 'Create a Student class with name and scores. Add add_score(), average(), and grade() (A>=90, B>=80, C>=70, D>=60, F otherwise). Read name, then scores until "done". Print Name, Average (1 decimal), Grade.',
    inputSpec: 'Line 1: name\nNext lines: integer scores\n"done" to finish',
    outputSpec: 'Name: {name}\nAverage: {avg:.1f}\nGrade: {letter}',
    example: { input: 'Alice\n90\n85\n92\n88\ndone', output: 'Name: Alice\nAverage: 88.8\nGrade: B' },
    testInput: 'Bob\n55\n62\n48\n70\ndone', expectedOutput: 'Name: Bob\nAverage: 58.8\nGrade: F',
  },
  {
    id: 's01final3', title: 'Data Cleaner',
    description: 'Set up logging to stdout ("%(levelname)s - %(message)s"). Read n records in "name,age,city" format. For each: strip all fields, try to convert age to int — if invalid log WARNING "Skipped: {raw}" and skip. Otherwise print "name | age | city".',
    inputSpec: 'Line 1: n\nNext n lines: "name,age,city"',
    outputSpec: 'Valid: "name | age | city"\nInvalid: "WARNING - Skipped: {raw line}"',
    example: { input: '3\nAlice,25,London\nBob,bad,Paris\nCarol,30,Tokyo', output: 'Alice | 25 | London\nWARNING - Skipped: Bob,bad,Paris\nCarol | 30 | Tokyo' },
    testInput: '4\nMarcus,32,Berlin\nJane,abc,Oslo\nKim,28,Seoul\nAlex,xyz,Lima', expectedOutput: 'Marcus | 32 | Berlin\nWARNING - Skipped: Jane,abc,Oslo\nKim | 28 | Seoul\nWARNING - Skipped: Alex,xyz,Lima',
  },
  {
    id: 's01final4', title: 'Shopping Cart',
    description: 'Implement a shopping cart. Process commands: "add item", "remove item", "list", "total". For "add": print "Added: {item}". For "remove": print "Removed: {item}" or "Not found: {item}". For "list": print numbered items or "Cart is empty". For "total": print "Items: {count}".',
    inputSpec: 'Lines of commands until EOF',
    outputSpec: 'Response to each command',
    example: { input: 'add Apple\nadd Banana\nlist', output: 'Added: Apple\nAdded: Banana\n1. Apple\n2. Banana' },
    testInput: 'add Python\nadd Django\nadd Flask\nremove Django\nlist\ntotal', expectedOutput: 'Added: Python\nAdded: Django\nAdded: Flask\nRemoved: Django\n1. Python\n2. Flask\nItems: 2',
  },
];

// ─── Code Problem Block ───────────────────────────────────────────────────────

function CodeProblemBlock({
  problem, color, index, onPass,
}: {
  problem: CodingProblem; color: string; index: number; onPass: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ output: string; error: string; passed: boolean } | null>(null);
  const [passed, setPassed] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleRun = async () => {
    if (!file) return;
    setRunning(true);
    setResult(null);
    try {
      const code = await file.text();
      const { output, error } = await runCode(code, problem.testInput);
      const ok = output === problem.expectedOutput.trim();
      setResult({ output: output || error, error, passed: ok });
      if (ok) { setPassed(true); setTimeout(onPass, 600); }
    } catch {
      setResult({ output: '', error: 'Failed to run.', passed: false });
    }
    setRunning(false);
  };

  return (
    <div style={{ background: '#07080f', border: `1px solid ${passed ? '#34d39940' : result && !result.passed ? '#f8717128' : '#1e2030'}`, borderRadius: 10, padding: 18, marginBottom: 14, transition: 'border-color 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: passed ? '#34d399' : color + '22', border: `2px solid ${passed ? '#34d399' : color + '55'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: passed ? '#07080f' : color, flexShrink: 0 }}>
          {passed ? '✓' : index + 1}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>{problem.title}</div>
      </div>
      <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, marginBottom: 14 }}>{problem.description}</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <div style={{ background: '#0c0d17', borderRadius: 8, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: color, letterSpacing: '0.12em', fontWeight: 600, marginBottom: 6 }}>INPUT FORMAT</div>
          <pre style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'monospace' }}>{problem.inputSpec}</pre>
        </div>
        <div style={{ background: '#0c0d17', borderRadius: 8, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: color, letterSpacing: '0.12em', fontWeight: 600, marginBottom: 6 }}>OUTPUT FORMAT</div>
          <pre style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'monospace' }}>{problem.outputSpec}</pre>
        </div>
      </div>

      <div style={{ background: '#0c0d17', borderRadius: 8, padding: '10px 12px', marginBottom: 14, border: `1px solid ${color}15` }}>
        <div style={{ fontSize: 10, color: color, letterSpacing: '0.12em', fontWeight: 600, marginBottom: 8 }}>EXAMPLE</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: '#374151', marginBottom: 4 }}>Input:</div>
            <pre style={{ fontSize: 12, color: '#94a3b8', background: '#07080f', padding: '6px 8px', borderRadius: 5, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{problem.example.input}</pre>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#374151', marginBottom: 4 }}>Expected Output:</div>
            <pre style={{ fontSize: 12, color: '#34d399', background: '#07080f', padding: '6px 8px', borderRadius: 5, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{problem.example.output}</pre>
          </div>
        </div>
      </div>

      {!passed && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <input ref={fileRef} type="file" accept=".py" onChange={e => { setFile(e.target.files?.[0] || null); setResult(null); }} style={{ display: 'none' }} />
          <button onClick={() => fileRef.current?.click()} style={{ background: '#1a1d2e', border: '1px solid #2d3050', color: '#94a3b8', fontSize: 12, fontWeight: 600, padding: '8px 14px', borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            {file ? `📄 ${file.name}` : '📁 Upload .py file'}
          </button>
          <button onClick={handleRun} disabled={!file || running} style={{ background: file && !running ? color : '#1e2030', border: 'none', color: file && !running ? '#07080f' : '#374151', fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 7, cursor: file && !running ? 'pointer' : 'not-allowed', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
            {running ? <><span style={{ width: 12, height: 12, border: '2px solid #07080f30', borderTop: '2px solid #07080f', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />Running...</> : '▶ Run & Check'}
          </button>
        </div>
      )}

      {result && (
        <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: result.passed ? '#34d39910' : '#f8717110', border: `1px solid ${result.passed ? '#34d39930' : '#f8717130'}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: result.passed ? '#34d399' : '#f87171', marginBottom: result.output ? 6 : 0 }}>
            {result.passed ? '✓ Correct! Test passed.' : '✗ Wrong output. Try again.'}
          </div>
          {result.output && !result.passed && (
            <div>
              <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>Your output:</div>
              <pre style={{ fontSize: 12, color: '#94a3b8', margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{result.output}</pre>
              <div style={{ fontSize: 10, color: '#475569', marginBottom: 4, marginTop: 8 }}>Expected:</div>
              <pre style={{ fontSize: 12, color: '#34d399', margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{problem.expectedOutput}</pre>
            </div>
          )}
        </div>
      )}
      {passed && <div style={{ marginTop: 10, fontSize: 13, color: '#34d399', fontWeight: 600 }}>✓ Problem solved!</div>}
    </div>
  );
}

// ─── Topic Learn Modal ────────────────────────────────────────────────────────

function TopicLearnModal({
  topic, stageColor, onClose, onComplete,
}: {
  topic: string; stageColor: string; onClose: () => void; onComplete: () => void;
}) {
  const content = STAGE01_CONTENT[topic] || null;
  const [passedProblems, setPassedProblems] = useState([false, false, false]);
  const [showCode, setShowCode] = useState(false);
  const allPassed = passedProblems.every(Boolean);

  if (!content) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={e => e.target === e.currentTarget && onClose()}>
        <div style={{ background: '#0c0d17', border: `1px solid ${stageColor}40`, borderRadius: 16, width: '100%', maxWidth: 520, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 14 }}>🚧</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>Content Coming Soon</div>
          <div style={{ fontSize: 14, color: '#475569', marginBottom: 20 }}>Practice problems for this topic are being prepared.</div>
          <button onClick={onClose} style={{ background: stageColor, border: 'none', color: '#07080f', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#0c0d17', border: `1px solid ${stageColor}40`, borderRadius: 16, width: '100%', maxWidth: 700, maxHeight: '92vh', overflowY: 'auto', padding: 28 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 10, color: stageColor, letterSpacing: '0.14em', fontWeight: 700, marginBottom: 6 }}>LEARN THIS TOPIC</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.4, maxWidth: 520 }}>{topic}</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: 22, cursor: 'pointer', flexShrink: 0, lineHeight: 1 }}>×</button>
        </div>

        {/* Explanation */}
        <div style={{ background: stageColor + '08', border: `1px solid ${stageColor}20`, borderLeft: `3px solid ${stageColor}`, borderRadius: 8, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: stageColor, letterSpacing: '0.12em', marginBottom: 10, fontWeight: 600 }}>EXPLANATION</div>
          <pre style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'Inter, sans-serif' }}>{content.explanation}</pre>
        </div>

        {/* Code Example */}
        <div style={{ marginBottom: 24 }}>
          <button onClick={() => setShowCode(!showCode)} style={{ background: 'transparent', border: `1px solid ${stageColor}40`, color: stageColor, fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 6, cursor: 'pointer', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>
            {showCode ? '▼ HIDE CODE EXAMPLE' : '▶ SHOW CODE EXAMPLE'}
          </button>
          {showCode && (
            <div style={{ marginTop: 10, background: '#07080f', border: `1px solid ${stageColor}20`, borderRadius: 8, padding: '14px 16px' }}>
              <pre style={{ fontSize: 13, color: '#a5b4fc', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'monospace' }}>{content.codeExample}</pre>
            </div>
          )}
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {passedProblems.map((p, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: p ? '#34d399' : '#1e2030', transition: 'background 0.3s' }} />
          ))}
        </div>

        <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 16 }}>
          PRACTICE PROBLEMS — Write each solution in VS Code, upload the .py file to verify
        </div>

        {content.problems.map((p, i) => (
          <CodeProblemBlock key={p.id} problem={p} color={stageColor} index={i}
            onPass={() => setPassedProblems(prev => { const n = [...prev]; n[i] = true; return n; })} />
        ))}

        {allPassed && (
          <div style={{ marginTop: 8, padding: '20px', borderRadius: 12, background: '#34d39910', border: '1px solid #34d39940', textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#34d399', marginBottom: 12 }}>All 3 problems solved!</div>
            <button onClick={onComplete} style={{ background: '#34d399', border: 'none', color: '#07080f', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
              Mark Topic Complete ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Stage Quiz Modal ─────────────────────────────────────────────────────────

function StageQuizModal({
  stage, onClose, onPass,
}: {
  stage: typeof stages[0]; onClose: () => void; onPass: () => void;
}) {
  const problems = stage.number === '01' ? STAGE01_FINAL_PROBLEMS : [];
  const [passed, setPassed] = useState<boolean[]>(Array(problems.length).fill(false));
  const allPassed = problems.length > 0 && passed.every(Boolean);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#0c0d17', border: `1px solid ${stage.color}50`, borderRadius: 16, width: '100%', maxWidth: 720, maxHeight: '92vh', overflowY: 'auto', padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: stage.color, letterSpacing: '0.14em', fontWeight: 700, marginBottom: 6 }}>STAGE COMPLETION CHALLENGE</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0' }}>{stage.title}</div>
            <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>Pass all 5 problems to complete this stage</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: 22, cursor: 'pointer' }}>×</button>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {problems.length > 0 ? problems.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: passed[i] ? '#34d399' : '#1e2030', transition: 'background 0.3s' }} />
          )) : [1,2,3,4,5].map(i => <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: '#1e2030' }} />)}
        </div>

        {problems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#475569', fontSize: 14 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🚧</div>
            Stage challenges for this stage are coming soon!
          </div>
        ) : (
          <>
            <div style={{ fontSize: 12, color: '#374151', marginBottom: 20, lineHeight: 1.7 }}>
              Write each solution in VS Code, then upload the <code style={{ color: stage.color, background: stage.color + '15', padding: '1px 5px', borderRadius: 4 }}>.py</code> file. Your code runs against a hidden test input — the output must match exactly.
            </div>
            {problems.map((p, i) => (
              <CodeProblemBlock key={p.id} problem={p} color={stage.color} index={i}
                onPass={() => setPassed(prev => { const n = [...prev]; n[i] = true; return n; })} />
            ))}
          </>
        )}

        {allPassed && (
          <div style={{ marginTop: 16, padding: '28px', borderRadius: 12, background: '#34d39910', border: '1px solid #34d39940', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🏆</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#34d399', marginBottom: 8 }}>Stage Complete!</div>
            <div style={{ fontSize: 14, color: '#475569', marginBottom: 20 }}>You passed all 5 challenges. Stage {stage.number} is mastered.</div>
            <button onClick={onPass} style={{ background: '#34d399', border: 'none', color: '#07080f', padding: '14px 32px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 16, fontFamily: 'Inter, sans-serif' }}>
              Complete Stage 🎉
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Reset Password Screen ────────────────────────────────────────────────────

function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get('access_token');
    if (access_token) {
      supabase.auth.setSession({ access_token, refresh_token: params.get('refresh_token') || '' })
        .then(({ error: e }) => {
          if (e) setError('Invalid or expired reset link. Please request a new one.');
          else setSessionReady(true);
        });
    } else {
      setError('Invalid reset link. Please request a new one.');
    }
  }, []);

  const handleResetPassword = async () => {
    setError('');
    if (!newPassword || !confirmPassword) { setError('Please enter your new password.'); return; }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    const { error: e } = await supabase.auth.updateUser({ password: newPassword });
    if (e) setError(e.message);
    else { setSuccess(true); setTimeout(() => { window.location.href = '/'; }, 3000); }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#07080f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#2d3050', letterSpacing: '0.18em', marginBottom: 14, fontWeight: 600 }}>AI AUTOMATION MASTERY ROADMAP — v2.0</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, background: 'linear-gradient(135deg, #e2e8f0 0%, #818cf8 50%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>RESET PASSWORD</h1>
          <p style={{ marginTop: 12, color: '#475569', fontSize: 14 }}>Enter your new password below.</p>
        </div>
        <div style={{ background: '#0c0d17', border: '1px solid #1e2030', borderRadius: 16, padding: 32 }}>
          {!success ? (
            <>
              {!sessionReady && !error && <div style={{ textAlign: 'center', color: '#475569', fontSize: 14, padding: '20px 0' }}>Verifying reset link...</div>}
              {error && <div style={{ fontSize: 13, color: '#f87171', background: '#f8717115', border: '1px solid #f8717130', borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>{error}</div>}
              {sessionReady && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>NEW PASSWORD</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleResetPassword()} placeholder="Min. 6 characters" style={{ width: '100%', background: '#07080f', border: '1px solid #1e2030', borderRadius: 8, padding: '11px 14px', fontSize: 14, color: '#e2e8f0', fontFamily: 'Inter, sans-serif', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>CONFIRM PASSWORD</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleResetPassword()} placeholder="Re-enter your password" style={{ width: '100%', background: '#07080f', border: '1px solid #1e2030', borderRadius: 8, padding: '11px 14px', fontSize: 14, color: '#e2e8f0', fontFamily: 'Inter, sans-serif', outline: 'none' }} />
                  </div>
                  {error && <div style={{ fontSize: 13, color: '#f87171', background: '#f8717115', border: '1px solid #f8717130', borderRadius: 8, padding: '10px 14px' }}>{error}</div>}
                  <button onClick={handleResetPassword} disabled={loading} style={{ width: '100%', padding: '12px 0', borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #818cf8, #f472b6)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif', opacity: loading ? 0.7 : 1, marginTop: 4 }}>
                    {loading ? 'Resetting...' : 'Reset Password →'}
                  </button>
                  <a href="/" style={{ textAlign: 'center', color: '#818cf8', textDecoration: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Back to Login</a>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#34d399', marginBottom: 8 }}>Password Reset Successful!</div>
              <div style={{ fontSize: 13, color: '#475569' }}>Redirecting you to login...</div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#1e2030' }}>Your progress is saved to your account across all devices.</div>
      </div>
    </div>
  );
}

// ─── Auth Screen ──────────────────────────────────────────────────────────────

function AuthScreen({ onAuth }: { onAuth: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const handle = async () => {
    setError(''); setSuccess(''); setLoading(true);
    if (!email || !password) { setError('Please enter your email and password.'); setLoading(false); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }
    if (mode === 'signup') {
      const { error: e } = await supabase.auth.signUp({ email, password });
      if (e) setError(e.message);
      else { setSuccess('Account created! You can now log in.'); setMode('login'); setEmail(''); setPassword(''); }
    } else {
      const { error: e } = await supabase.auth.signInWithPassword({ email, password });
      if (e) setError(e.message);
      else onAuth();
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setForgotError(''); setForgotSuccess(''); setForgotLoading(true);
    if (!forgotEmail) { setForgotError('Please enter your email.'); setForgotLoading(false); return; }
    const { error: e } = await supabase.auth.resetPasswordForEmail(forgotEmail, { redirectTo: `${window.location.origin}/` });
    if (e) setForgotError(e.message);
    else { setForgotSuccess('Password reset email sent! Check your inbox.'); setTimeout(() => { setShowForgotPassword(false); setForgotEmail(''); }, 3000); }
    setForgotLoading(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#07080f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: '#2d3050', letterSpacing: '0.18em', marginBottom: 14, fontWeight: 600 }}>AI AUTOMATION MASTERY ROADMAP — v2.0</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, background: 'linear-gradient(135deg, #e2e8f0 0%, #818cf8 50%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>FROM ZERO TO<br />FREELANCE AI ENGINEER</h1>
          <p style={{ marginTop: 12, color: '#475569', fontSize: 14 }}>Track your progress. Own your journey.</p>
        </div>
        <div style={{ background: '#0c0d17', border: '1px solid #1e2030', borderRadius: 16, padding: 32 }}>
          {!showForgotPassword ? (
            <>
              <div style={{ display: 'flex', background: '#07080f', borderRadius: 10, padding: 4, marginBottom: 28, border: '1px solid #1a1d2e' }}>
                {(['login', 'signup'] as const).map(m => (
                  <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                    style={{ flex: 1, padding: '8px 0', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif', background: mode === m ? '#818cf8' : 'transparent', color: mode === m ? '#07080f' : '#475569', transition: 'all 0.15s' }}>
                    {m === 'login' ? 'Log In' : 'Sign Up'}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>EMAIL</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handle()} placeholder="you@example.com" style={{ width: '100%', background: '#07080f', border: '1px solid #1e2030', borderRadius: 8, padding: '11px 14px', fontSize: 14, color: '#e2e8f0', fontFamily: 'Inter, sans-serif', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>PASSWORD</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handle()} placeholder="Min. 6 characters" style={{ width: '100%', background: '#07080f', border: '1px solid #1e2030', borderRadius: 8, padding: '11px 14px', fontSize: 14, color: '#e2e8f0', fontFamily: 'Inter, sans-serif', outline: 'none' }} />
                </div>
                {error && <div style={{ fontSize: 13, color: '#f87171', background: '#f8717115', border: '1px solid #f8717130', borderRadius: 8, padding: '10px 14px' }}>{error}</div>}
                {success && <div style={{ fontSize: 13, color: '#34d399', background: '#34d39915', border: '1px solid #34d39930', borderRadius: 8, padding: '10px 14px' }}>{success}</div>}
                <button onClick={handle} disabled={loading} style={{ width: '100%', padding: '12px 0', borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #818cf8, #f472b6)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif', opacity: loading ? 0.7 : 1, marginTop: 4 }}>
                  {loading ? 'Please wait...' : mode === 'login' ? 'Log In →' : 'Create Account →'}
                </button>
                {mode === 'login' && (
                  <button onClick={() => setShowForgotPassword(true)} style={{ width: '100%', padding: '10px 0', borderRadius: 8, border: 'none', background: 'transparent', color: '#818cf8', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    Forgot Password?
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <button onClick={() => { setShowForgotPassword(false); setForgotError(''); setForgotSuccess(''); }} style={{ background: 'transparent', border: 'none', color: '#818cf8', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 20 }}>← Back to Login</button>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>Reset Password</div>
              <div style={{ fontSize: 13, color: '#475569', marginBottom: 16 }}>Enter your email and we'll send you a password reset link.</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#475569', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>EMAIL</label>
                  <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleForgotPassword()} placeholder="your@email.com" style={{ width: '100%', background: '#07080f', border: '1px solid #1e2030', borderRadius: 8, padding: '11px 14px', fontSize: 14, color: '#e2e8f0', fontFamily: 'Inter, sans-serif', outline: 'none' }} />
                </div>
                {forgotError && <div style={{ fontSize: 13, color: '#f87171', background: '#f8717115', border: '1px solid #f8717130', borderRadius: 8, padding: '10px 14px' }}>{forgotError}</div>}
                {forgotSuccess && <div style={{ fontSize: 13, color: '#34d399', background: '#34d39915', border: '1px solid #34d39930', borderRadius: 8, padding: '10px 14px' }}>{forgotSuccess}</div>}
                <button onClick={handleForgotPassword} disabled={forgotLoading} style={{ width: '100%', padding: '12px 0', borderRadius: 8, border: 'none', cursor: forgotLoading ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #818cf8, #f472b6)', color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif', opacity: forgotLoading ? 0.7 : 1 }}>
                  {forgotLoading ? 'Sending...' : 'Send Reset Link →'}
                </button>
              </div>
            </>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#1e2030' }}>Your progress is saved to your account across all devices.</div>
      </div>
    </div>
  );
}

// ─── Main Roadmap ─────────────────────────────────────────────────────────────

export default function Roadmap() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState('ALL');
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean[]>>({});
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [currentStage, setCurrentStage] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [lastActive, setLastActive] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [celebration, setCelebration] = useState<string | null>(null);
  const [allExpanded, setAllExpanded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);
  const [learnModal, setLearnModal] = useState<{ stageNum: string; topicIdx: number } | null>(null);
  const [quizModal, setQuizModal] = useState<string | null>(null);

  const stageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.location.hash.includes('type=recovery')) { setAuthLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => { setUser(data.session?.user ?? null); setAuthLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setUser(session?.user ?? null); });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase.from('progress').select('*').eq('user_id', user.id).single();
      if (error && error.code !== 'PGRST116') { console.error(error); return; }
      if (data) {
        setCompletedTopics(data.completed_topics || {});
        setCompletedStages(data.completed_stages || []);
        setCurrentStage(data.current_stage || null);
        setNotes(data.notes || {});
        setStreak(data.streak || 0);
        setLastActive(data.last_active || null);
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (data.last_active !== today) {
          const newStreak = data.last_active === yesterday ? (data.streak || 0) + 1 : 1;
          setStreak(newStreak);
          setLastActive(today);
          saveToSupabase({ streak: newStreak, last_active: today });
        }
      }
    })();
  }, [user]);

  const saveToSupabase = (updates: object) => {
    if (!user) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaveStatus('saving');
    saveTimer.current = setTimeout(async () => {
      const today = new Date().toDateString();
      const { error } = await supabase.from('progress').upsert({
        user_id: user.id,
        completed_topics: completedTopics,
        completed_stages: completedStages,
        current_stage: currentStage,
        notes, streak,
        last_active: today,
        updated_at: new Date().toISOString(),
        ...updates,
      }, { onConflict: 'user_id' });
      setSaveStatus(error ? 'error' : 'saved');
      setTimeout(() => setSaveStatus(null), 2000);
    }, 800);
  };

  const saveTopics = (t: Record<string, boolean[]>) => { setCompletedTopics(t); saveToSupabase({ completed_topics: t }); };
  const saveStages = (s: string[]) => { setCompletedStages(s); saveToSupabase({ completed_stages: s }); };
  const saveNote = (num: string, val: string) => { const n = { ...notes, [num]: val }; setNotes(n); saveToSupabase({ notes: n }); };
  const saveCurrent = (num: string | null) => { setCurrentStage(num); saveToSupabase({ current_stage: num }); };

  // Mark a topic as done (from learn modal — only sets to true, never toggles)
  const completeTopic = (stageNum: string, idx: number, totalTopics: number) => {
    const prev = completedTopics[stageNum] || Array(totalTopics).fill(false);
    if (prev[idx]) { setLearnModal(null); return; }
    const next = [...prev];
    next[idx] = true;
    saveTopics({ ...completedTopics, [stageNum]: next });
    setLearnModal(null);
  };

  // Toggle topic manually (checkbox)
  const toggleTopic = (stageNum: string, idx: number, totalTopics: number) => {
    const prev = completedTopics[stageNum] || Array(totalTopics).fill(false);
    const next = [...prev];
    next[idx] = !next[idx];
    saveTopics({ ...completedTopics, [stageNum]: next });
  };

  const toggleStage = (stageNum: string) => {
    if (completedStages.includes(stageNum)) {
      saveStages(completedStages.filter(s => s !== stageNum));
    } else {
      saveStages([...completedStages, stageNum]);
      setCelebration(stageNum);
      setTimeout(() => setCelebration(null), 4000);
    }
  };

  const completeStageFromQuiz = (stageNum: string) => {
    if (!completedStages.includes(stageNum)) {
      saveStages([...completedStages, stageNum]);
      setCelebration(stageNum);
      setTimeout(() => setCelebration(null), 4000);
    }
    setQuizModal(null);
  };

  const stageProgress = (stageNum: string) => (completedTopics[stageNum] || []).filter(Boolean).length;

  const totalTopicsAll = stages.reduce((sum, s) => sum + s.topics.length, 0);
  const doneTopicsAll = stages.reduce((sum, s) => sum + (completedTopics[s.number] || []).filter(Boolean).length, 0);
  const overallPct = Math.round((doneTopicsAll / totalTopicsAll) * 100);
  const weeksCompleted = stages.filter(s => completedStages.includes(s.number)).reduce((sum, s) => sum + s.weeks, 0);
  const weeksLeft = Math.round(TOTAL_WEEKS - weeksCompleted);

  const jumpToCurrent = () => {
    if (currentStage && stageRefs.current[currentStage]) {
      stageRefs.current[currentStage]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setOpen(currentStage);
    }
  };

  const tags = ['ALL', 'FOUNDATION', 'LANGUAGE', 'TOOLS', 'APIs', 'DATA', 'PERFORMANCE', 'DEPLOYMENT', 'WEB', 'AI CORE', 'INTEGRATIONS', 'STORAGE', 'NO-CODE+', 'SYSTEMS', 'PORTFOLIO', 'BUSINESS'];
  const filtered = filter === 'ALL' ? stages : stages.filter(s => s.tag === filter);
  const tagColors: Record<string, string> = {
    FOUNDATION: '#818cf8', LANGUAGE: '#60a5fa', TOOLS: '#38bdf8', APIs: '#22d3ee',
    DATA: '#34d399', PERFORMANCE: '#a3e635', DEPLOYMENT: '#fbbf24', WEB: '#fb923c',
    'AI CORE': '#f472b6', INTEGRATIONS: '#c084fc', STORAGE: '#818cf8',
    'NO-CODE+': '#a78bfa', SYSTEMS: '#7c3aed', PORTFOLIO: '#2563eb', BUSINESS: '#0369a1',
  };

  const getStageStatus = (num: string) => {
    if (completedStages.includes(num)) return 'done';
    if (currentStage === num) return 'active';
    return 'idle';
  };
  const isOpen = (num: string) => allExpanded || open === num;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCompletedTopics({}); setCompletedStages([]); setCurrentStage(null);
    setNotes({}); setStreak(0); setLastActive(null);
  };

  if (authLoading) return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#07080f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: 14, color: '#475569' }}>Loading...</div>
    </div>
  );

  if (window.location.hash.includes('type=recovery')) return <ResetPasswordScreen />;
  if (!user) return <AuthScreen onAuth={() => {}} />;

  const learnStage = learnModal ? stages.find(s => s.number === learnModal.stageNum) : null;
  const quizStage = quizModal ? stages.find(s => s.number === quizModal) : null;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#07080f', minHeight: '100vh', color: '#e2e8f0' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f1117; }
        ::-webkit-scrollbar-thumb { background: #2d2f3e; border-radius: 2px; }
        .stage-card { transition: all 0.2s ease; }
        .stage-card:hover { transform: translateY(-1px); }
        .filter-btn { transition: all 0.15s ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; padding: 6px 12px; border-radius: 6px; }
        .topic-row:hover { background: rgba(255,255,255,0.02); border-radius: 6px; }
        .check-box { transition: all 0.15s ease; cursor: pointer; flex-shrink: 0; }
        .check-box:hover { transform: scale(1.1); }
        .learn-btn:hover { opacity: 0.8; transform: translateY(-1px); }
        textarea { resize: vertical; font-family: 'Inter', sans-serif; }
        textarea:focus { outline: none; }
        .expand-arrow { transition: transform 0.2s ease; display: inline-block; }
        @keyframes celebIn { from { opacity: 0; transform: translateY(20px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .celeb { animation: celebIn 0.4s ease, fadeOut 0.5s ease 3.5s forwards; }
        @media (max-width: 600px) {
          .topic-grid { grid-template-columns: 1fr !important; }
          .header-stats { gap: 20px !important; }
          .filter-bar { gap: 5px !important; }
          .filter-btn { font-size: 10px !important; padding: 4px 8px !important; }
          .stage-title { font-size: 14px !important; }
        }
      `}</style>

      {/* Modals */}
      {learnModal && learnStage && (
        <TopicLearnModal
          topic={learnStage.topics[learnModal.topicIdx]}
          stageColor={learnStage.color}
          onClose={() => setLearnModal(null)}
          onComplete={() => completeTopic(learnModal.stageNum, learnModal.topicIdx, learnStage.topics.length)}
        />
      )}
      {quizModal && quizStage && (
        <StageQuizModal
          stage={quizStage}
          onClose={() => setQuizModal(null)}
          onPass={() => completeStageFromQuiz(quizModal)}
        />
      )}

      {/* Top bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: '#07080f', borderBottom: '1px solid #1a1d2e', padding: '10px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1, height: 6, background: '#1a1d2e', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${overallPct}%`, background: 'linear-gradient(90deg, #818cf8, #f472b6)', borderRadius: 99, transition: 'width 0.4s ease' }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#818cf8', minWidth: 42 }}>{overallPct}%</span>
          <span style={{ fontSize: 12, color: '#374151', whiteSpace: 'nowrap' }}>{completedStages.length}/15 stages</span>
          {currentStage && (
            <button onClick={jumpToCurrent} style={{ background: '#1a1d2e', border: '1px solid #2d3050', color: '#818cf8', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              → Current Stage
            </button>
          )}
          {saveStatus === 'saving' && <span style={{ fontSize: 11, color: '#475569' }}>Saving...</span>}
          {saveStatus === 'saved' && <span style={{ fontSize: 11, color: '#34d399' }}>✓ Saved</span>}
          {saveStatus === 'error' && <span style={{ fontSize: 11, color: '#f87171' }}>Save failed</span>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 4 }}>
            <span style={{ fontSize: 11, color: '#374151', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</span>
            <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #1e2030', color: '#475569', fontSize: 11, padding: '3px 9px', borderRadius: 5, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Log out</button>
          </div>
        </div>
      </div>

      {/* Celebration toast */}
      {celebration && (
        <div className="celeb" style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 999, background: '#0c0d17', border: '1px solid #818cf8', borderRadius: 12, padding: '16px 24px', textAlign: 'center', maxWidth: 340, boxShadow: '0 0 40px #818cf840' }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>🎉</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>Stage {celebration} Complete!</div>
          {MILESTONES[celebration] && <div style={{ fontSize: 13, color: '#818cf8', marginTop: 4 }}>{MILESTONES[celebration]}</div>}
        </div>
      )}

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: 40, borderBottom: '1px solid #1e2030', paddingBottom: 32 }}>
          <div style={{ fontSize: 11, color: '#2d3050', letterSpacing: '0.18em', marginBottom: 14, fontWeight: 600 }}>AI AUTOMATION MASTERY ROADMAP — v2.0</div>
          <h1 style={{ fontSize: 'clamp(30px, 6vw, 54px)', fontWeight: 800, lineHeight: 1.1, background: 'linear-gradient(135deg, #e2e8f0 0%, #818cf8 50%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            FROM ZERO TO<br />FREELANCE AI ENGINEER
          </h1>
          <p style={{ marginTop: 16, color: '#64748b', fontSize: 15, lineHeight: 1.8, maxWidth: 580 }}>
            15 stages. Click ▶ Learn on any topic to study it and solve 3 problems. Complete all topics, then take the 5-problem stage quiz to finish.
          </p>
          <div className="header-stats" style={{ display: 'flex', gap: 28, marginTop: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {[['15', 'Total Stages'], [`${weeksLeft}w`, 'Weeks Left'], [`${streak}🔥`, 'Day Streak'], [`${completedStages.length}`, 'Completed']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#818cf8' }}>{num}</div>
                <div style={{ fontSize: 12, color: '#374151', marginTop: 2, fontWeight: 500 }}>{label}</div>
              </div>
            ))}
            {lastActive && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Last active</div>
                <div style={{ fontSize: 12, color: '#2d3050', marginTop: 2 }}>{lastActive}</div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => { if (allExpanded) { setOpen(null); setAllExpanded(false); } else setAllExpanded(true); }}
            style={{ background: '#0f1117', border: '1px solid #1a1d2e', color: '#94a3b8', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 6, cursor: 'pointer' }}>
            {allExpanded ? '↑ Collapse All' : '↓ Expand All'}
          </button>
          {currentStage && (
            <button onClick={() => saveCurrent(null)} style={{ background: '#0f1117', border: '1px solid #1a1d2e', color: '#64748b', fontSize: 12, padding: '6px 14px', borderRadius: 6, cursor: 'pointer' }}>
              Clear Current Stage
            </button>
          )}
        </div>

        {/* Filter bar */}
        <div className="filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
          {tags.map(tag => (
            <button key={tag} className="filter-btn" onClick={() => setFilter(tag)}
              style={{ background: filter === tag ? tagColors[tag] || '#818cf8' : '#0f1117', color: filter === tag ? '#07080f' : '#4b5563', border: `1px solid ${filter === tag ? tagColors[tag] || '#818cf8' : '#1a1d2e'}` }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Stage list */}
        {filter === 'ALL' ? (
          STAGE_GROUPS.map(group => {
            const groupStages = stages.filter(s => group.range.includes(s.number));
            return (
              <div key={group.label} style={{ marginBottom: 36 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 3, height: 32, background: group.color, borderRadius: 99 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: group.color, letterSpacing: '0.14em' }}>{group.label}</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{group.subtitle}</div>
                  </div>
                  <div style={{ flex: 1, height: 1, background: '#1a1d2e', marginLeft: 8 }} />
                  <div style={{ fontSize: 12, color: '#2d3050', fontWeight: 500 }}>
                    {groupStages.filter(s => completedStages.includes(s.number)).length}/{groupStages.length}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {groupStages.map(stage => renderStage(stage))}
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(stage => renderStage(stage))}
          </div>
        )}

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #1a1d2e', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#1e2030', letterSpacing: '0.1em', fontWeight: 500 }}>
            CLICK ▶ LEARN ON ANY TOPIC · SOLVE 3 PROBLEMS · COMPLETE ALL TOPICS · TAKE THE STAGE QUIZ
          </div>
        </div>
      </div>
    </div>
  );

  function renderStage(stage: typeof stages[0]) {
    const status = getStageStatus(stage.number);
    const topicsDone = stageProgress(stage.number);
    const stagePct = stage.topics.length > 0 ? Math.round((topicsDone / stage.topics.length) * 100) : 0;
    const stageOpen = isOpen(stage.number);
    const topicsState = completedTopics[stage.number] || Array(stage.topics.length).fill(false);
    const allTopicsDone = stage.topics.length > 0 && topicsState.every(Boolean);
    const hasLearnContent = stage.number === '01';
    const hasQuiz = stage.number === '01';

    const borderColor = status === 'done' ? '#34d399' : status === 'active' ? stage.color : '#1e2030';
    const bgColor = status === 'done' ? '#0a1a12' : status === 'active' ? '#0d0d1f' : '#0c0d17';

    return (
      <div key={stage.number} ref={el => { stageRefs.current[stage.number] = el; }}
        className="stage-card"
        style={{ background: bgColor, borderRadius: 12, overflow: 'hidden', border: `1px solid ${borderColor}` }}>

        {/* Stage header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', cursor: 'pointer' }}
          onClick={() => { if (!allExpanded) setOpen(stageOpen && !allExpanded ? null : stage.number); }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: stage.color, minWidth: 32, lineHeight: 1, opacity: status === 'done' ? 1 : 0.6 }}>{stage.number}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span className="stage-title" style={{ fontSize: 16, fontWeight: 700, color: status === 'done' ? '#94a3b8' : '#e2e8f0', textDecoration: status === 'done' ? 'line-through' : 'none', textDecorationColor: '#34d399' }}>{stage.title}</span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', padding: '2px 7px', borderRadius: 4, background: stage.color + '18', color: stage.color, border: `1px solid ${stage.color}35` }}>{stage.tag}</span>
              {status === 'active' && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: stage.color + '25', color: stage.color, border: `1px solid ${stage.color}60`, letterSpacing: '0.06em' }}>IN PROGRESS</span>}
              {status === 'done' && <span style={{ fontSize: 13 }}>✅</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 5 }}>
              <div style={{ fontSize: 12, color: '#374151' }}>{stage.duration}</div>
              {stage.topics.length > 0 && (
                <>
                  <div style={{ width: 60, height: 3, background: '#1a1d2e', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${stagePct}%`, background: stage.color, borderRadius: 99, transition: 'width 0.3s' }} />
                  </div>
                  <div style={{ fontSize: 11, color: '#374151' }}>{topicsDone}/{stage.topics.length}</div>
                </>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {status !== 'done' && (
              <button onClick={e => { e.stopPropagation(); saveCurrent(currentStage === stage.number ? null : stage.number); }}
                style={{ background: 'transparent', border: `1px solid ${currentStage === stage.number ? stage.color : '#2d3050'}`, color: currentStage === stage.number ? stage.color : '#374151', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {currentStage === stage.number ? '★ Current' : '☆ Set Current'}
              </button>
            )}
            <div className="check-box" onClick={e => { e.stopPropagation(); toggleStage(stage.number); }}
              style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${status === 'done' ? '#34d399' : '#2d3050'}`, background: status === 'done' ? '#34d39920' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
              {status === 'done' ? '✓' : ''}
            </div>
            <span className="expand-arrow" style={{ color: '#374151', fontSize: 20, transform: stageOpen ? 'rotate(90deg)' : 'rotate(0deg)', pointerEvents: 'none' }}>›</span>
          </div>
        </div>

        {MILESTONES[stage.number] && (
          <div style={{ margin: '0 20px 14px', padding: '8px 14px', background: '#fbbf2410', border: '1px solid #fbbf2430', borderRadius: 8, fontSize: 13, color: '#fbbf24', fontWeight: 500 }}>
            {MILESTONES[stage.number]}
          </div>
        )}

        {stageOpen && (
          <div style={{ padding: '0 20px 24px', borderTop: `1px solid ${stage.color}18` }}>
            <div style={{ background: stage.color + '08', border: `1px solid ${stage.color}20`, borderLeft: `3px solid ${stage.color}`, borderRadius: 8, padding: '13px 16px', margin: '16px 0' }}>
              <div style={{ fontSize: 11, color: stage.color, letterSpacing: '0.12em', marginBottom: 6, fontWeight: 600 }}>WHY THIS STAGE MATTERS</div>
              <div style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.7 }}>{stage.why}</div>
            </div>

            {stage.topics.length > 0 && (
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>
                  TOPICS TO MASTER {hasLearnContent ? '— click ▶ Learn to study each topic' : '— check off topics as you complete them'}
                </div>
                <div className="topic-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 6 }}>
                  {stage.topics.map((t, idx) => (
                    <div key={idx} className="topic-row" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '6px 4px' }}>
                      <div className="check-box" onClick={() => toggleTopic(stage.number, idx, stage.topics.length)}
                        style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${topicsState[idx] ? stage.color : '#2d3050'}`, background: topicsState[idx] ? stage.color + '25' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: stage.color, marginTop: 2, flexShrink: 0 }}>
                        {topicsState[idx] ? '✓' : ''}
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flex: 1 }}>
                        <span style={{ fontSize: 11, color: stage.color, opacity: 0.5, minWidth: 20, fontWeight: 600, marginTop: 2 }}>{String(idx + 1).padStart(2, '0')}</span>
                        <span style={{ fontSize: 14, color: topicsState[idx] ? '#374151' : '#cbd5e1', lineHeight: 1.6, textDecoration: topicsState[idx] ? 'line-through' : 'none', textDecorationColor: '#374151', flex: 1 }}>{t}</span>
                      </div>
                      {hasLearnContent && (
                        <button className="learn-btn" onClick={() => setLearnModal({ stageNum: stage.number, topicIdx: idx })}
                          style={{ background: topicsState[idx] ? '#1a1d2e' : stage.color + '20', border: `1px solid ${topicsState[idx] ? '#1e2030' : stage.color + '50'}`, color: topicsState[idx] ? '#374151' : stage.color, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 5, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, marginTop: 2, transition: 'all 0.15s', fontFamily: 'Inter, sans-serif' }}>
                          {topicsState[idx] ? '✓ Done' : '▶ Learn'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stage Quiz CTA */}
            {hasQuiz && status !== 'done' && (
              <div style={{ margin: '16px 0', padding: '14px 16px', borderRadius: 10, background: allTopicsDone ? stage.color + '12' : '#07080f', border: `1px solid ${allTopicsDone ? stage.color + '40' : '#1e2030'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: allTopicsDone ? stage.color : '#374151', marginBottom: 2 }}>
                    {allTopicsDone ? '🎯 All topics done! Take the stage quiz to complete.' : `Complete all ${stage.topics.length} topics to unlock the final quiz`}
                  </div>
                  <div style={{ fontSize: 11, color: '#374151' }}>Pass all 5 problems to finish the stage</div>
                </div>
                <button onClick={() => allTopicsDone && setQuizModal(stage.number)} disabled={!allTopicsDone}
                  style={{ background: allTopicsDone ? `linear-gradient(135deg, ${stage.color}, #818cf8)` : '#1e2030', border: 'none', color: allTopicsDone ? '#07080f' : '#374151', fontSize: 12, fontWeight: 700, padding: '10px 20px', borderRadius: 8, cursor: allTopicsDone ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif' }}>
                  {allTopicsDone ? 'Take Stage Quiz →' : `${topicsDone}/${stage.topics.length} done`}
                </button>
              </div>
            )}

            {stage.projects.length > 0 && (
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>PRACTICE PROJECTS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {stage.projects.map((p, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#94a3b8' }}>
                      <span style={{ color: stage.color, fontSize: 8, marginTop: 5, flexShrink: 0 }}>◆</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: '#0f1117', borderRadius: 8, border: '1px solid #1a1d2e', marginBottom: 16 }}>
              <span style={{ color: stage.color, fontSize: 14, flexShrink: 0 }}>✓</span>
              <div>
                <span style={{ fontSize: 11, color: '#475569', letterSpacing: '0.1em', fontWeight: 600 }}>STAGE GOAL — </span>
                <span style={{ fontSize: 14, color: '#94a3b8' }}>{stage.goal}</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.12em', marginBottom: 8, fontWeight: 600 }}>MY NOTES & RESOURCES</div>
              <textarea value={notes[stage.number] || ''} onChange={e => saveNote(stage.number, e.target.value)}
                placeholder="Add your notes, resource links, or thoughts here..."
                style={{ width: '100%', minHeight: 80, background: '#0f1117', border: '1px solid #1a1d2e', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
