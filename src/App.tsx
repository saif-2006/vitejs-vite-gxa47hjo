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

// ─── Piston Code Runner ──────────────────────────────────────────────────────

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

// ─── Stage 01 Content ────────────────────────────────────────────────────────

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

const STAGE01_CONTENT: Record<string, TopicContent> = {
  'Variables, strings (f-strings), numbers (int, float), booleans': {
    explanation: `In Python, variables store data. You don't declare types — Python figures it out.\n\n• Strings (str): text in quotes — "hello"\n• Integers (int): whole numbers — 42\n• Floats (float): decimals — 3.14\n• Booleans (bool): True or False\n\nf-strings embed variables inside strings with curly braces:\n  name = "Alice"\n  print(f"Hello, {name}!")  →  Hello, Alice!\n\nYou can do math inside f-strings too: f"Next year: {age + 1}"`,
    codeExample: `name = "Alice"\nage = 25\nheight = 5.6\nis_student = True\n\nprint(f"Name: {name}")\nprint(f"Age: {age}")\nprint(f"Height: {height}")\nprint(f"Is student: {is_student}")\nprint(f"Next year: {age + 1}")`,
    problems: [
      { id: 's01t00p0', title: 'Personal Info Card', description: 'Ask the user for their name and age. Print a sentence using an f-string.', inputSpec: 'Line 1: a name\nLine 2: an age (integer)', outputSpec: '"My name is {name} and I am {age} years old."', example: { input: 'Alice\n25', output: 'My name is Alice and I am 25 years old.' }, testInput: 'Jordan\n19', expectedOutput: 'My name is Jordan and I am 19 years old.' },
      { id: 's01t00p1', title: 'Next Year Calculator', description: 'Ask for name and age. Print how old they will be next year.', inputSpec: 'Line 1: name\nLine 2: current age (integer)', outputSpec: '"{name} will be {age+1} next year."', example: { input: 'Bob\n30', output: 'Bob will be 31 next year.' }, testInput: 'Sara\n17', expectedOutput: 'Sara will be 18 next year.' },
      { id: 's01t00p2', title: 'Price Tag', description: 'Ask for a product name and price (float). Print a price tag formatted to 2 decimal places.', inputSpec: 'Line 1: product name\nLine 2: price (float)', outputSpec: '"{product} costs ${price:.2f}"', example: { input: 'Apple\n0.5', output: 'Apple costs $0.50' }, testInput: 'Laptop\n999.9', expectedOutput: 'Laptop costs $999.90' },
    ],
  },
  'Lists, dictionaries, sets, tuples — and when to use each': {
    explanation: `Python has 4 main collection types:\n\n• List [] — ordered, changeable, allows duplicates. Use for sequences.\n  fruits = ["apple", "banana", "cherry"]\n\n• Dictionary {} — key-value pairs. Use for lookup by name.\n  person = {"name": "Alice", "age": 25}\n\n• Set {} — unordered, NO duplicates. Use for unique items.\n  unique = {1, 2, 2, 3}  →  {1, 2, 3}\n\n• Tuple () — ordered, UNCHANGEABLE. Use for fixed data.\n  point = (10.5, 20.3)\n\nRule of thumb: sequences→list, lookup→dict, unique→set, fixed→tuple`,
    codeExample: `fruits = ["apple", "banana", "cherry"]\nfruits.append("mango")\nprint(fruits[0])  # apple\n\nperson = {"name": "Alice", "age": 25}\nprint(person["name"])  # Alice\n\nnums = {1, 2, 3, 2, 1}\nprint(nums)  # {1, 2, 3}\n\npoint = (10, 20)\nprint(point[0])  # 10`,
    problems: [
      { id: 's01t01p0', title: 'Shopping List', description: 'Ask for 3 items (one per line). Store in a list and print the list, then print the second item.', inputSpec: '3 lines, each containing one item name', outputSpec: 'Line 1: the full list\nLine 2: the second item', example: { input: 'apple\nbanana\ncherry', output: "['apple', 'banana', 'cherry']\nbanana" }, testInput: 'milk\neggs\nbread', expectedOutput: "['milk', 'eggs', 'bread']\neggs" },
      { id: 's01t01p1', title: 'Person Dictionary', description: 'Ask for name, age, and city. Store in a dict and print each value with its label.', inputSpec: 'Line 1: name\nLine 2: age\nLine 3: city', outputSpec: 'Name: {name}\nAge: {age}\nCity: {city}', example: { input: 'Alice\n25\nLondon', output: 'Name: Alice\nAge: 25\nCity: London' }, testInput: 'Marcus\n32\nTokyo', expectedOutput: 'Name: Marcus\nAge: 32\nCity: Tokyo' },
      { id: 's01t01p2', title: 'Unique Numbers', description: 'Ask for 5 numbers (one per line, some may repeat). Store in a set and print the count of unique values.', inputSpec: '5 lines each with an integer', outputSpec: '"Unique count: {n}"', example: { input: '1\n2\n2\n3\n1', output: 'Unique count: 3' }, testInput: '5\n5\n5\n10\n10', expectedOutput: 'Unique count: 2' },
    ],
  },
  'Indexing, slicing, unpacking': {
    explanation: `Indexing accesses specific elements. Python uses zero-based indexing (first item = index 0).\nNegative indexing counts from the end: -1 is the last item.\n\n  fruits = ["apple", "banana", "cherry"]\n  fruits[0]   →  "apple"\n  fruits[-1]  →  "cherry"\n\nSlicing gets a portion: sequence[start:stop:step]\n  fruits[0:2]   →  ["apple", "banana"]  (stop is exclusive)\n  text[::-1]    →  reverses the string\n\nUnpacking assigns multiple variables at once:\n  a, b, c = [1, 2, 3]\n  first, *rest = [1, 2, 3, 4, 5]  →  first=1, rest=[2,3,4,5]`,
    codeExample: `text = "Hello, World!"\nprint(text[0])      # H\nprint(text[-1])     # !\nprint(text[0:5])    # Hello\nprint(text[::-1])   # !dlroW ,olleH\n\nnums = [10, 20, 30, 40, 50]\nfirst, second, *rest = nums\nprint(first)   # 10\nprint(rest)    # [30, 40, 50]`,
    problems: [
      { id: 's01t02p0', title: 'First and Last', description: 'Ask for a word. Print the first letter, last letter, and the word reversed.', inputSpec: 'One line: a word', outputSpec: 'Line 1: first letter\nLine 2: last letter\nLine 3: word reversed', example: { input: 'Python', output: 'P\nn\nnohtyP' }, testInput: 'automation', expectedOutput: 'a\nn\nnoitamotua' },
      { id: 's01t02p1', title: 'Middle Slice', description: 'Ask for a sentence. Print only characters from index 2 to index 8 (exclusive, so indices 2-7).', inputSpec: 'One line: a sentence (at least 8 characters)', outputSpec: 'One line: characters from index 2 to 7', example: { input: 'Hello World', output: 'llo Wo' }, testInput: 'Programming is fun', expectedOutput: 'ogrammi' },
      { id: 's01t02p2', title: 'Unpack Three', description: 'Ask for 3 numbers on one line separated by spaces. Unpack them into a, b, c and print their sum.', inputSpec: 'One line: 3 integers separated by spaces', outputSpec: '"Sum: {a+b+c}"', example: { input: '10 20 30', output: 'Sum: 60' }, testInput: '7 14 21', expectedOutput: 'Sum: 42' },
    ],
  },
  'if/elif/else, match/case': {
    explanation: `Conditional statements let your code make decisions.\n\n  if condition:\n      # runs if True\n  elif another_condition:\n      # runs if first was False and this is True\n  else:\n      # runs if all conditions were False\n\nComparison operators: == != > < >= <=\nLogical operators: and, or, not\n\nPython 3.10+ has match/case (like switch in other languages):\n  match command:\n      case "quit":\n          print("Quitting")\n      case _:\n          print("Unknown")  # _ is the default\n\nImportant: use == for comparison, = for assignment.`,
    codeExample: `score = 75\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelif score >= 70:\n    print("Grade: C")\nelse:\n    print("Grade: F")\n\nday = "Monday"\nmatch day:\n    case "Saturday" | "Sunday":\n        print("Weekend!")\n    case _:\n        print("Weekday")`,
    problems: [
      { id: 's01t03p0', title: 'Grade Calculator', description: 'Ask for a score (0-100). Print the grade: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60).', inputSpec: 'One line: an integer 0-100', outputSpec: '"Grade: X" where X is the letter', example: { input: '85', output: 'Grade: B' }, testInput: '72', expectedOutput: 'Grade: C' },
      { id: 's01t03p1', title: 'Even or Odd', description: 'Ask for a number. Print "Even", "Odd", or "Zero" if the number is 0.', inputSpec: 'One line: an integer', outputSpec: '"Even", "Odd", or "Zero"', example: { input: '4', output: 'Even' }, testInput: '7', expectedOutput: 'Odd' },
      { id: 's01t03p2', title: 'Season Finder', description: 'Ask for a month number (1-12). Print the season: Spring (3-5), Summer (6-8), Autumn (9-11), Winter (12,1,2).', inputSpec: 'One line: integer 1-12', outputSpec: 'The season name', example: { input: '7', output: 'Summer' }, testInput: '11', expectedOutput: 'Autumn' },
    ],
  },
  'for loops, while loops, break, continue, enumerate, zip': {
    explanation: `FOR loop — iterate over a sequence:\n  for item in ["a", "b", "c"]:\n      print(item)\n  for i in range(5):  # 0, 1, 2, 3, 4\n\nWHILE loop — repeat while condition is True:\n  count = 0\n  while count < 3:\n      count += 1\n\nbreak — exit the loop immediately\ncontinue — skip to the next iteration\n\nenumerate() — get index AND value at the same time:\n  for i, fruit in enumerate(["apple", "banana"]):\n      print(i, fruit)  # 0 apple, then 1 banana\n\nzip() — loop over two lists simultaneously:\n  for name, age in zip(["Alice", "Bob"], [25, 30]):\n      print(name, age)`,
    codeExample: `fruits = ["apple", "banana", "cherry"]\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")\n\nnames = ["Alice", "Bob"]\nscores = [95, 87]\nfor name, score in zip(names, scores):\n    print(f"{name}: {score}")\n\nfor n in range(10):\n    if n == 3: continue\n    if n == 7: break\n    print(n)`,
    problems: [
      { id: 's01t04p0', title: 'Multiplication Table', description: 'Ask for a number n. Print its multiplication table from 1 to 10.', inputSpec: 'One line: an integer n', outputSpec: '10 lines: "n x i = result"', example: { input: '3', output: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30' }, testInput: '5', expectedOutput: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50' },
      { id: 's01t04p1', title: 'Sum Until Zero', description: 'Keep reading numbers until the user enters 0. Print the total sum (not including 0).', inputSpec: 'Multiple lines of integers, ending with 0', outputSpec: '"Total: {sum}"', example: { input: '5\n3\n2\n0', output: 'Total: 10' }, testInput: '10\n20\n30\n0', expectedOutput: 'Total: 60' },
      { id: 's01t04p2', title: 'Numbered List', description: 'Ask for n then n item names. Print as a numbered list using enumerate starting at 1.', inputSpec: 'Line 1: n\nNext n lines: item names', outputSpec: 'n lines: "1. item"', example: { input: '3\napple\nbanana\ncherry', output: '1. apple\n2. banana\n3. cherry' }, testInput: '4\npython\njavascript\nrust\ngo', expectedOutput: '1. python\n2. javascript\n3. rust\n4. go' },
    ],
  },
  'Functions: parameters, return values, *args, **kwargs, default values': {
    explanation: `Functions group reusable code. Define with def, call by name.\n\n  def greet(name):           # name is a parameter\n      return f"Hello, {name}!"\n\n  result = greet("Alice")    # "Alice" is the argument\n\nDefault values — used when argument is not provided:\n  def greet(name, greeting="Hello"):\n      return f"{greeting}, {name}!"\n\n*args — any number of positional arguments (tuple):\n  def add(*numbers):\n      return sum(numbers)\n  add(1, 2, 3, 4)  # works!\n\n**kwargs — any number of keyword arguments (dict):\n  def show(**info):\n      for key, val in info.items():\n          print(f"{key}: {val}")\n  show(name="Alice", age=25)`,
    codeExample: `def power(base, exponent=2):\n    return base ** exponent\n\nprint(power(3))      # 9\nprint(power(2, 10))  # 1024\n\ndef total(*nums):\n    return sum(nums)\n\nprint(total(1, 2, 3, 4, 5))  # 15\n\ndef profile(**info):\n    for k, v in info.items():\n        print(f"{k}: {v}")\n\nprofile(name="Alice", city="London")`,
    problems: [
      { id: 's01t05p0', title: 'Rectangle Area', description: 'Write area(width, height=10). Ask for width and height (type "default" to use default height of 10). Print the area.', inputSpec: 'Line 1: width (integer)\nLine 2: height (integer or "default")', outputSpec: '"Area: {result}"', example: { input: '5\n4', output: 'Area: 20' }, testInput: '6\ndefault', expectedOutput: 'Area: 60' },
      { id: 's01t05p1', title: 'Sum of Many', description: 'Ask for numbers on one line separated by spaces. Use a *args function to compute and print their sum.', inputSpec: 'One line: integers separated by spaces', outputSpec: '"Sum: {total}"', example: { input: '1 2 3 4 5', output: 'Sum: 15' }, testInput: '10 20 30 40', expectedOutput: 'Sum: 100' },
      { id: 's01t05p2', title: 'Greeting Function', description: 'Write greet(name, greeting="Hello", punctuation="!"). Ask for name, greeting word, and punctuation. Print the result.', inputSpec: 'Line 1: name\nLine 2: greeting word\nLine 3: punctuation', outputSpec: '"{greeting}, {name}{punctuation}"', example: { input: 'Alice\nHi\n?', output: 'Hi, Alice?' }, testInput: 'Marcus\nHey\n!!', expectedOutput: 'Hey, Marcus!!' },
    ],
  },
  'List comprehensions and dict comprehensions — used in every real script': {
    explanation: `Comprehensions create lists or dicts in one concise line — very Pythonic.\n\nList comprehension: [expression for item in iterable if condition]\n\n  # Old way:\n  squares = []\n  for n in range(5):\n      squares.append(n ** 2)\n\n  # Comprehension:\n  squares = [n ** 2 for n in range(5)]  →  [0, 1, 4, 9, 16]\n\nWith filter:\n  evens = [n for n in range(10) if n % 2 == 0]\n\nDict comprehension: {key: value for item in iterable}\n  lengths = {word: len(word) for word in ["hi", "hello"]}\n  →  {"hi": 2, "hello": 5}\n\nYou'll use these in almost every real automation script.`,
    codeExample: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens = [n for n in nums if n % 2 == 0]\nsquares = [n**2 for n in nums]\nupper = [w.upper() for w in ["hello", "world"]]\n\nwords = ["python", "is", "awesome"]\nlengths = {w: len(w) for w in words}\nprint(lengths)`,
    problems: [
      { id: 's01t06p0', title: 'Squares List', description: 'Ask for n. Use a list comprehension to create squares from 1 to n. Print the list.', inputSpec: 'One line: integer n', outputSpec: 'The list of squares', example: { input: '5', output: '[1, 4, 9, 16, 25]' }, testInput: '7', expectedOutput: '[1, 4, 9, 16, 25, 36, 49]' },
      { id: 's01t06p1', title: 'Filter Long Words', description: 'Ask for a sentence. Use a list comprehension to get only words longer than 4 characters. Print the filtered list.', inputSpec: 'One line: a sentence', outputSpec: 'List of words with more than 4 characters', example: { input: 'the quick brown fox jumps', output: "['quick', 'brown', 'jumps']" }, testInput: 'I love programming with python every day', expectedOutput: "['programming', 'python', 'every']" },
      { id: 's01t06p2', title: 'Word Length Dict', description: 'Ask for a sentence. Use a dict comprehension mapping each word to its length. Print the dict.', inputSpec: 'One line: a sentence with unique words', outputSpec: 'The dictionary', example: { input: 'hello world python', output: "{'hello': 5, 'world': 5, 'python': 6}" }, testInput: 'code is fun', expectedOutput: "{'code': 4, 'is': 2, 'fun': 3}" },
    ],
  },
  'Standard library: os, sys, datetime, json, re, pathlib': {
    explanation: `Python's standard library handles almost everything — no installation needed.\n\nos — interact with the OS:\n  import os\n  os.getcwd()  # current directory\n  os.path.exists(path)  # check if file exists\n\ndatetime — work with dates and times:\n  from datetime import datetime\n  now = datetime.now()\n  now.strftime("%Y-%m-%d")  →  "2024-01-15"\n\njson — parse and create JSON:\n  import json\n  data = json.loads('{"name": "Alice"}')  # string → dict\n  text = json.dumps({"name": "Alice"})    # dict → string\n\npathlib — modern file paths:\n  from pathlib import Path\n  p = Path("folder/file.txt")\n  p.exists(), p.suffix, p.stem`,
    codeExample: `import json\nfrom datetime import datetime\n\ndata = {"name": "Alice", "age": 25}\njson_string = json.dumps(data, indent=2)\nprint(json_string)\n\nraw = '{"city": "London", "pop": 9000000}'\nparsed = json.loads(raw)\nprint(parsed["city"])\n\nnow = datetime.now()\nprint(now.strftime("%Y-%m-%d"))`,
    problems: [
      { id: 's01t07p0', title: 'JSON Builder', description: 'Ask for name, age, and city. Build a dict and print it as formatted JSON with indent=2.', inputSpec: 'Line 1: name\nLine 2: age (integer)\nLine 3: city', outputSpec: 'Formatted JSON with indent=2', example: { input: 'Alice\n25\nLondon', output: '{\n  "name": "Alice",\n  "age": 25,\n  "city": "London"\n}' }, testInput: 'Marcus\n32\nTokyo', expectedOutput: '{\n  "name": "Marcus",\n  "age": 32,\n  "city": "Tokyo"\n}' },
      { id: 's01t07p1', title: 'JSON Parser', description: 'Given a JSON string, parse it and print the "product" and "price" formatted to 2 decimal places.', inputSpec: 'One line: JSON string with "product" and "price" keys', outputSpec: 'Product: {product}\nPrice: ${price:.2f}', example: { input: '{"product": "Laptop", "price": 999.9}', output: 'Product: Laptop\nPrice: $999.90' }, testInput: '{"product": "Headphones", "price": 49.5}', expectedOutput: 'Product: Headphones\nPrice: $49.50' },
      { id: 's01t07p2', title: 'Date Formatter', description: 'Ask for a date in YYYY-MM-DD format. Parse it and print in "DD Month YYYY" format (e.g., "15 January 2024").', inputSpec: 'One line: date in YYYY-MM-DD format', outputSpec: 'Date in "DD Month YYYY" format', example: { input: '2024-01-15', output: '15 January 2024' }, testInput: '2026-03-13', expectedOutput: '13 March 2026' },
    ],
  },
  'String methods: .split(), .strip(), .replace(), .join()': {
    explanation: `String methods are essential for cleaning and processing text in automation.\n\n.split(sep) — split string into list:\n  "hello world".split()   →  ["hello", "world"]\n  "a,b,c".split(",")      →  ["a", "b", "c"]\n\n.strip() — remove leading/trailing whitespace:\n  "  hello  ".strip()     →  "hello"\n\n.replace(old, new) — replace all occurrences:\n  "hello world".replace("world", "Python")  →  "hello Python"\n\n.join(iterable) — join list into a string:\n  ", ".join(["a", "b", "c"])  →  "a, b, c"\n\nOther useful methods: .upper() .lower() .startswith() .endswith() .count() .find()`,
    codeExample: `raw = "  John Doe , 25 , London  "\nparts = [p.strip() for p in raw.split(",")]\nprint(parts)  # ["John Doe", "25", "London"]\n\nresult = " | ".join(parts)\nprint(result)  # "John Doe | 25 | London"\n\ntext = "I love cats. Cats are great."\nprint(text.replace("cats", "dogs").replace("Cats", "Dogs"))`,
    problems: [
      { id: 's01t08p0', title: 'CSV Row Parser', description: 'Ask for a CSV line (comma-separated, may have spaces). Split, strip each value, and print each on its own line.', inputSpec: 'One line: comma-separated values (may have spaces)', outputSpec: 'Each value on its own line, stripped', example: { input: 'Alice , 25 , London , developer', output: 'Alice\n25\nLondon\ndeveloper' }, testInput: 'Python , automation , freelance , 2024', expectedOutput: 'Python\nautomation\nfreelance\n2024' },
      { id: 's01t08p1', title: 'Word Reverser', description: 'Ask for a sentence. Split into words, reverse the word order, join back with spaces and print.', inputSpec: 'One line: a sentence', outputSpec: 'Sentence with word order reversed', example: { input: 'Hello World Python', output: 'Python World Hello' }, testInput: 'I love coding in Python', expectedOutput: 'Python in coding love I' },
      { id: 's01t08p2', title: 'Text Cleaner', description: 'Ask for a string with "---" as separators. Replace "---" with " | ", strip the whole string, and print.', inputSpec: 'One line: string with "---" separators and possible extra spaces', outputSpec: 'Cleaned string', example: { input: '  apple---banana---cherry  ', output: 'apple | banana | cherry' }, testInput: '  python---javascript---rust  ', expectedOutput: 'python | javascript | rust' },
    ],
  },
  'Regular expressions (re module) — critical for extracting data from text': {
    explanation: `Regular expressions (regex) find, extract, and validate patterns in text — essential for scraping.\n\n  import re\n\nKey functions:\n  re.search(pattern, text)    — find first match anywhere\n  re.findall(pattern, text)   — find ALL matches → list\n  re.sub(pattern, repl, text) — replace matches\n\nCommon patterns:\n  \\d   — any digit (0-9)\n  \\d+  — one or more digits\n  \\w+  — one or more word characters\n  .    — any character\n  *    — 0 or more\n  +    — 1 or more\n  []   — character class: [aeiou] matches any vowel\n\nExample:\n  phones = re.findall(r"\\d{3}-\\d{4}", "Call 555-1234")`,
    codeExample: `import re\n\ntext = "Contact: alice@email.com or bob@work.org"\nemails = re.findall(r"[\\w.]+@[\\w.]+", text)\nprint(emails)\n\ntext2 = "I have 3 cats and 12 fish"\nnums = re.findall(r"\\d+", text2)\nprint(nums)  # ["3", "12"]\n\nmasked = re.sub(r"\\d", "#", "Card: 1234 5678")\nprint(masked)  # "Card: #### ####"`,
    problems: [
      { id: 's01t09p0', title: 'Number Extractor', description: 'Ask for a sentence containing numbers. Use re.findall to extract all numbers and print them as a list.', inputSpec: 'One line: a sentence containing integers', outputSpec: 'List of number strings found', example: { input: 'I bought 3 apples and 12 oranges for 5 dollars', output: "['3', '12', '5']" }, testInput: 'There are 7 days in a week and 24 hours in a day and 60 minutes in an hour', expectedOutput: "['7', '24', '60']" },
      { id: 's01t09p1', title: 'Email Validator', description: 'Ask for an email address. Use re.match to check if it matches a basic email pattern. Print "Valid" or "Invalid".', inputSpec: 'One line: an email address', outputSpec: '"Valid" or "Invalid"', example: { input: 'alice@example.com', output: 'Valid' }, testInput: 'not-an-email', expectedOutput: 'Invalid' },
      { id: 's01t09p2', title: 'Digit Masker', description: 'Ask for a string with digits. Use re.sub to replace all digits with "*". Print the masked string.', inputSpec: 'One line: a string with digits', outputSpec: 'Same string with all digits replaced by "*"', example: { input: 'Card: 4532 1234 5678 9012', output: 'Card: **** **** **** ****' }, testInput: 'Phone: 555-867-5309', expectedOutput: 'Phone: ***-***-****' },
    ],
  },
  'Basic OOP: classes, __init__, methods, self': {
    explanation: `OOP bundles data and functions together into objects.\n\nA class is a blueprint. An object is an instance created from it.\n\n  class Dog:\n      def __init__(self, name, breed):  # runs when object is created\n          self.name = name              # stores data on the object\n          self.breed = breed\n\n      def bark(self):                   # method (function on the object)\n          return f"{self.name} says: Woof!"\n\n  dog1 = Dog("Rex", "Labrador")\n  print(dog1.bark())   →  Rex says: Woof!\n\nself always refers to the current object and must be the first parameter of every method.`,
    codeExample: `class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        return f"Deposited ${amount}. Balance: ${self.balance}"\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            return "Insufficient funds"\n        self.balance -= amount\n        return f"Withdrew ${amount}. Balance: ${self.balance}"\n\nacc = BankAccount("Alice", 100)\nprint(acc.deposit(50))\nprint(acc.withdraw(30))`,
    problems: [
      { id: 's01t10p0', title: 'Student Class', description: 'Create Student class with name and grade. Add pass_fail() that returns "Pass" if grade>=50 else "Fail". Ask for name and grade, print both.', inputSpec: 'Line 1: student name\nLine 2: grade (0-100)', outputSpec: 'Student: {name}\nResult: Pass or Fail', example: { input: 'Alice\n75', output: 'Student: Alice\nResult: Pass' }, testInput: 'Bob\n42', expectedOutput: 'Student: Bob\nResult: Fail' },
      { id: 's01t10p1', title: 'Rectangle Class', description: 'Create Rectangle class with width and height. Add area() and perimeter() methods. Ask for dimensions and print both.', inputSpec: 'Line 1: width\nLine 2: height', outputSpec: 'Area: {area}\nPerimeter: {perimeter}', example: { input: '5\n3', output: 'Area: 15\nPerimeter: 16' }, testInput: '8\n4', expectedOutput: 'Area: 32\nPerimeter: 24' },
      { id: 's01t10p2', title: 'Counter Class', description: 'Create Counter class starting at 0. Add increment(), decrement(), reset() methods each returning current count. Process commands until "done", print count after each.', inputSpec: 'Multiple lines: "increment", "decrement", or "reset", ending with "done"', outputSpec: 'Count after each command (not "done")', example: { input: 'increment\nincrement\ndecrement\nreset\ndone', output: '1\n2\n1\n0' }, testInput: 'increment\nincrement\nincrement\ndecrement\ndone', expectedOutput: '1\n2\n3\n2' },
    ],
  },
  'Reading/writing .txt, .json, .csv files': {
    explanation: `File handling is essential — scripts constantly read inputs and write outputs.\n\nReading a text file:\n  with open("file.txt", "r") as f:\n      content = f.read()        # entire file as string\n      lines = f.readlines()     # list of lines\n\nWriting a text file:\n  with open("file.txt", "w") as f:  # "w" overwrites, "a" appends\n      f.write("Hello\\n")\n\nJSON files:\n  import json\n  with open("data.json", "r") as f:\n      data = json.load(f)           # file → dict\n  with open("data.json", "w") as f:\n      json.dump(data, f, indent=2)  # dict → file\n\nAlways use "with open(...)" — it automatically closes the file even if an error occurs.`,
    codeExample: `import json\n\ndata = {"name": "Alice", "scores": [95, 87, 92]}\nwith open("student.json", "w") as f:\n    json.dump(data, f, indent=2)\n\nwith open("student.json", "r") as f:\n    loaded = json.load(f)\n    print(loaded["name"])\n    print(sum(loaded["scores"]))`,
    problems: [
      { id: 's01t11p0', title: 'File Writer and Reader', description: 'Ask for 3 lines of text. Write them to output.txt. Read it back and print the number of lines and the second line.', inputSpec: '3 lines of text', outputSpec: 'Lines: 3\n{second line}', example: { input: 'Hello\nWorld\nPython', output: 'Lines: 3\nWorld' }, testInput: 'Automation\nIs\nPowerful', expectedOutput: 'Lines: 3\nIs' },
      { id: 's01t11p1', title: 'JSON Save and Load', description: 'Ask for a name and 3 scores. Build a dict, save to scores.json, load it back, print the name and average score to 1 decimal.', inputSpec: 'Line 1: name\nLines 2-4: three integer scores', outputSpec: 'Name: {name}\nAverage: {avg}', example: { input: 'Alice\n90\n85\n92', output: 'Name: Alice\nAverage: 89.0' }, testInput: 'Bob\n70\n80\n75', expectedOutput: 'Name: Bob\nAverage: 75.0' },
      { id: 's01t11p2', title: 'Line Counter', description: 'Ask for n lines of text. Write to a file. Then read and print: total lines, total words, total characters (no newlines).', inputSpec: 'Line 1: n\nNext n lines: text', outputSpec: 'Lines: {n}\nWords: {w}\nChars: {c}', example: { input: '2\nHello World\nPython is great', output: 'Lines: 2\nWords: 5\nChars: 26' }, testInput: '3\nI love Python\nAutomation is key\nKeep coding', expectedOutput: 'Lines: 3\nWords: 8\nChars: 37' },
    ],
  },
  'Error handling: try/except/finally, raising exceptions, custom error messages': {
    explanation: `Error handling prevents your script from crashing when something goes wrong.\n\n  try:\n      risky_code()\n  except ValueError as e:\n      print(f"Value error: {e}")\n  except (TypeError, KeyError) as e:\n      print(f"Error: {e}")\n  finally:\n      print("This always runs")  # cleanup code\n\nRaising exceptions:\n  raise ValueError("Age must be positive")\n\nCommon exception types:\n  ValueError — wrong value type (int("hello"))\n  TypeError — wrong type ("hello" + 5)\n  KeyError — dict key not found\n  IndexError — list index out of range\n  ZeroDivisionError — dividing by zero\n\nBest practice: always catch specific exceptions, never bare except:`,
    codeExample: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Error: Cannot divide by zero"\n    except TypeError:\n        return "Error: Please provide numbers"\n\nprint(safe_divide(10, 2))   # 5.0\nprint(safe_divide(10, 0))   # Error: Cannot divide by zero\n\ndef get_age(value):\n    try:\n        age = int(value)\n        if age < 0:\n            raise ValueError("Age cannot be negative")\n        return age\n    except ValueError as e:\n        return f"Invalid: {e}"`,
    problems: [
      { id: 's01t12p0', title: 'Safe Division', description: 'Ask for two values. Try to divide the first by the second. Handle ZeroDivisionError and ValueError (non-numeric). Print the result or error.', inputSpec: 'Line 1: first value\nLine 2: second value', outputSpec: 'Result as float, "Error: division by zero", or "Error: invalid input"', example: { input: '10\n2', output: '5.0' }, testInput: '10\n0', expectedOutput: 'Error: division by zero' },
      { id: 's01t12p1', title: 'Safe List Access', description: 'Ask for space-separated items and an index. Access that index. Handle IndexError. Print the item or error.', inputSpec: 'Line 1: space-separated items\nLine 2: index (integer)', outputSpec: 'The item or "Error: index out of range"', example: { input: 'apple banana cherry\n1', output: 'banana' }, testInput: 'apple banana cherry\n10', expectedOutput: 'Error: index out of range' },
      { id: 's01t12p2', title: 'Age Validator', description: 'Ask for an age. Convert to int — if invalid raise ValueError. If negative raise ValueError with "Age cannot be negative". Print "Valid age: {age}" or "Error: {message}".', inputSpec: 'One line: age input', outputSpec: '"Valid age: {age}" or "Error: {message}"', example: { input: '25', output: 'Valid age: 25' }, testInput: '-5', expectedOutput: 'Error: Age cannot be negative' },
    ],
  },
  'Logging with the logging module instead of print() — for unattended scripts': {
    explanation: `When scripts run unattended (on servers, scheduled), print() is not enough. logging gives you:\n• Log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL\n• Timestamps automatically\n• Write to files easily\n• Turn off debug messages in production\n\n  import logging\n  logging.basicConfig(\n      level=logging.DEBUG,\n      format="%(asctime)s - %(levelname)s - %(message)s"\n  )\n\n  logging.debug("Detailed debug info")\n  logging.info("Script started")\n  logging.warning("Something unexpected")\n  logging.error("An error occurred")\n\nIn production: set level=logging.WARNING\nIn development: set level=logging.DEBUG`,
    codeExample: `import logging\n\nlogging.basicConfig(\n    level=logging.DEBUG,\n    format="%(levelname)s - %(message)s"\n)\n\ndef process_data(data):\n    logging.info(f"Processing {len(data)} items")\n    results = []\n    for item in data:\n        try:\n            results.append(int(item) * 2)\n            logging.debug(f"Processed: {item}")\n        except ValueError:\n            logging.warning(f"Skipped: {item}")\n    return results\n\nprint(process_data(["1", "2", "bad", "4"]))`,
    problems: [
      { id: 's01t13p0', title: 'Logging Levels', description: 'Set up logging with format "%(levelname)s - %(message)s". Ask for a number. Log WARNING if >100, ERROR if <0, INFO "Value accepted" otherwise. Print the log line.', inputSpec: 'One line: an integer', outputSpec: 'The log message triggered', example: { input: '50', output: 'INFO - Value accepted' }, testInput: '150', expectedOutput: 'WARNING - Value too high' },
      { id: 's01t13p1', title: 'Safe Processor', description: 'Set up logging format "%(levelname)s - %(message)s". Ask for space-separated values. Log DEBUG "Processed: {n}" for valid ints, WARNING "Skipped: {val}" for invalid. Print all log lines.', inputSpec: 'One line: space-separated values (mix of valid/invalid)', outputSpec: 'One log line per value', example: { input: '1 2 bad 4', output: 'DEBUG - Processed: 1\nDEBUG - Processed: 2\nWARNING - Skipped: bad\nDEBUG - Processed: 4' }, testInput: '10 hello 30 world', expectedOutput: 'DEBUG - Processed: 10\nWARNING - Skipped: hello\nDEBUG - Processed: 30\nWARNING - Skipped: world' },
      { id: 's01t13p2', title: 'Script Logger', description: 'Log INFO "Script started". Ask for a number, compute 100/n. Log INFO "Result: {result}" or ERROR "Failed: division by zero". Then log INFO "Script finished". Print all 3 log lines.', inputSpec: 'One line: a number', outputSpec: '3 log lines', example: { input: '5', output: 'INFO - Script started\nINFO - Result: 20.0\nINFO - Script finished' }, testInput: '0', expectedOutput: 'INFO - Script started\nERROR - Failed: division by zero\nINFO - Script finished' },
    ],
  },
};

const STAGE01_FINAL_PROBLEMS: CodingProblem[] = [
  { id: 's01final0', title: 'Contact Book', description: 'Ask for n contacts (name,phone per line). Store in a dict. Then ask for a name to look up. Print the phone or "Not found".', inputSpec: 'Line 1: n\nNext n lines: "name,phone"\nLast line: name to look up', outputSpec: 'Phone number or "Not found"', example: { input: '3\nAlice,555-1234\nBob,555-5678\nCarol,555-9012\nBob', output: '555-5678' }, testInput: '3\nAlice,555-1234\nBob,555-5678\nCarol,555-9012\nDave', expectedOutput: 'Not found' },
  { id: 's01final1', title: 'Word Frequency Counter', description: 'Ask for a sentence. Count frequency of each word (case-insensitive). Print each word and count in alphabetical order as "word: count".', inputSpec: 'One line: a sentence', outputSpec: 'One line per word alphabetically: "word: count"', example: { input: 'the cat sat on the mat the cat', output: 'cat: 2\nmat: 1\non: 1\nsat: 1\nthe: 3' }, testInput: 'to be or not to be that is the question', expectedOutput: 'be: 2\nis: 1\nnot: 1\nor: 1\nquestion: 1\nthat: 1\nthe: 1\nto: 2' },
  { id: 's01final2', title: 'Student Grade Manager', description: 'Create a Student class with name and scores list. Add add_score(), average(), and grade() (A/B/C/D/F by average). Ask for name, then scores until "done". Print name, average (1 decimal), and grade.', inputSpec: 'Line 1: name\nNext lines: integer scores\n"done" to finish', outputSpec: 'Name: {name}\nAverage: {avg}\nGrade: {letter}', example: { input: 'Alice\n90\n85\n92\n88\ndone', output: 'Name: Alice\nAverage: 88.8\nGrade: B' }, testInput: 'Bob\n55\n62\n48\n70\ndone', expectedOutput: 'Name: Bob\nAverage: 58.8\nGrade: F' },
  { id: 's01final3', title: 'Data Cleaner Pipeline', description: 'Ask for n lines of raw data ("name, age, city"). Clean each: strip whitespace from each field, convert age to int. Skip invalid age records with a warning. Print valid records as "name | age | city" and warnings as "WARNING - Skipped: {raw_line}".', inputSpec: 'Line 1: n\nNext n lines: "name, age, city" with spaces', outputSpec: 'Valid: "name | age | city"\nInvalid: "WARNING - Skipped: {line}"', example: { input: '3\n Alice , 25 , London \n Bob , bad , Paris \n Carol , 30 , Tokyo ', output: 'Alice | 25 | London\nWARNING - Skipped:  Bob , bad , Paris \nCarol | 30 | Tokyo' }, testInput: '3\n  Marcus , 32 , Berlin  \n  Jane , abc , Oslo  \n  Kim , 28 , Seoul  ', expectedOutput: 'Marcus | 32 | Berlin\nWARNING - Skipped:   Jane , abc , Oslo  \nKim | 28 | Seoul' },
  { id: 's01final4', title: 'File TODO App', description: 'Read existing todos from todos.json if it exists (default to empty list). Ask for a command: "add {task}", "list", or "done {index}" (1-based). Execute, save back to todos.json, and print result.', inputSpec: 'One line: a command', outputSpec: 'add: "Added: {task}"\nlist: numbered list or "No todos"\ndone: "Completed: {task}"', example: { input: 'add Buy groceries', output: 'Added: Buy groceries' }, testInput: 'list', expectedOutput: 'No todos' },
];

// ─── Topic Learn Modal ───────────────────────────────────────────────────────

function CodeProblemBlock({
  problem, color, index, onPass,
}: {
  problem: CodingProblem; color: string; index: number; onPass: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ output: string; error: string; passed?: boolean } | null>(null);
  const [passed, setPassed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setResult(null);
  };

  const handleRun = async () => {
    if (!file) return;
    setRunning(true);
    setResult(null);
    try {
      const code = await file.text();
      const { output, error } = await runCode(code, problem.testInput);
      const actualOutput = output.trim();
      const expectedOutput = problem.expectedOutput.trim();
      const ok = actualOutput === expectedOutput;
      setResult({ output: actualOutput || error, error, passed: ok });
      if (ok) { setPassed(true); setTimeout(onPass, 800); }
    } catch {
      setResult({ output: '', error: 'Failed to run code.', passed: false });
    }
    setRunning(false);
  };

  return (
    <div style={{ background: '#07080f', border: `1px solid ${passed ? '#34d39940' : result && !result.passed ? '#f8717130' : '#1e2030'}`, borderRadius: 10, padding: 18, marginBottom: 14, transition: 'border-color 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: passed ? '#34d399' : color + '30', border: `2px solid ${passed ? '#34d399' : color + '60'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: passed ? '#07080f' : color, flexShrink: 0 }}>
          {passed ? '✓' : index + 1}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>{problem.title}</div>
      </div>
      <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, marginBottom: 14 }}>{problem.description}</div>

      {/* Specs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        <div style={{ background: '#0c0d17', borderRadius: 8, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: color, letterSpacing: '0.12em', fontWeight: 600, marginBottom: 6 }}>INPUT</div>
          <pre style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'monospace' }}>{problem.inputSpec}</pre>
        </div>
        <div style={{ background: '#0c0d17', borderRadius: 8, padding: '10px 12px' }}>
          <div style={{ fontSize: 10, color: color, letterSpacing: '0.12em', fontWeight: 600, marginBottom: 6 }}>OUTPUT</div>
          <pre style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'monospace' }}>{problem.outputSpec}</pre>
        </div>
      </div>

      {/* Example */}
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

      {/* Upload + Run */}
      {!passed && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <input ref={fileInputRef} type="file" accept=".py" onChange={handleFileChange} style={{ display: 'none' }} />
          <button onClick={() => fileInputRef.current?.click()} style={{ background: '#1a1d2e', border: `1px solid #2d3050`, color: '#94a3b8', fontSize: 12, fontWeight: 600, padding: '8px 14px', borderRadius: 7, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            {file ? `📄 ${file.name}` : '📁 Upload .py file'}
          </button>
          <button onClick={handleRun} disabled={!file || running} style={{ background: file && !running ? color : '#1e2030', border: 'none', color: file && !running ? '#07080f' : '#374151', fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 7, cursor: file && !running ? 'pointer' : 'not-allowed', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
            {running ? <><div style={{ width: 12, height: 12, border: '2px solid #07080f30', borderTop: '2px solid #07080f', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Running...</> : '▶ Run & Check'}
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: result.passed ? '#34d39910' : '#f8717110', border: `1px solid ${result.passed ? '#34d39930' : '#f8717130'}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: result.passed ? '#34d399' : '#f87171', marginBottom: result.output ? 6 : 0 }}>
            {result.passed ? '✓ Correct! All test cases passed.' : '✗ Output does not match. Try again.'}
          </div>
          {result.output && (
            <div>
              <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>Your output:</div>
              <pre style={{ fontSize: 12, color: '#94a3b8', margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{result.output}</pre>
            </div>
          )}
          {!result.passed && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>Expected:</div>
              <pre style={{ fontSize: 12, color: '#34d399', margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{problem.expectedOutput}</pre>
            </div>
          )}
        </div>
      )}
      {passed && <div style={{ marginTop: 10, fontSize: 13, color: '#34d399', fontWeight: 600 }}>✓ Problem solved!</div>}
    </div>
  );
}

function TopicLearnModal({
  topic, stageTitle, stageColor, onClose, onComplete,
}: {
  topic: string; stageTitle: string; stageColor: string;
  onClose: () => void; onComplete: () => void;
}) {
  const content = STAGE01_CONTENT[topic] || null;
  const [passedProblems, setPassedProblems] = useState<boolean[]>([false, false, false]);
  const [showCode, setShowCode] = useState(false);
  const allPassed = passedProblems.every(Boolean);

  const handlePass = (idx: number) => {
    const next = [...passedProblems];
    next[idx] = true;
    setPassedProblems(next);
  };

  if (!content) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={e => e.target === e.currentTarget && onClose()}>
        <div style={{ background: '#0c0d17', border: `1px solid ${stageColor}40`, borderRadius: 16, width: '100%', maxWidth: 580, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🚧</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>Coming Soon</div>
          <div style={{ fontSize: 14, color: '#475569', marginBottom: 20 }}>Practice problems for this topic are being prepared. Check back soon!</div>
          <button onClick={onClose} style={{ background: stageColor, border: 'none', color: '#07080f', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#0c0d17', border: `1px solid ${stageColor}40`, borderRadius: 16, width: '100%', maxWidth: 680, maxHeight: '92vh', overflowY: 'auto', padding: 28 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 10, color: stageColor, letterSpacing: '0.14em', fontWeight: 700, marginBottom: 6 }}>LEARN THIS TOPIC</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.4, maxWidth: 520 }}>{topic}</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: 22, cursor: 'pointer', lineHeight: 1, padding: '0 4px', flexShrink: 0 }}>×</button>
        </div>

        {/* Progress pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: passedProblems[i] ? '#34d399' : '#1e2030', transition: 'background 0.3s' }} />
          ))}
        </div>

        {/* Explanation */}
        <div style={{ background: stageColor + '08', border: `1px solid ${stageColor}20`, borderLeft: `3px solid ${stageColor}`, borderRadius: 8, padding: '14px 16px', marginBottom: 6 }}>
          <div style={{ fontSize: 11, color: stageColor, letterSpacing: '0.12em', fontWeight: 700, marginBottom: 10 }}>EXPLANATION</div>
          <pre style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.85, whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'Inter, sans-serif' }}>{content.explanation}</pre>
        </div>

        {/* Code example toggle */}
        <button onClick={() => setShowCode(s => !s)} style={{ background: 'transparent', border: 'none', color: stageColor, fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: '10px 0', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
          {showCode ? '▾' : '▸'} {showCode ? 'Hide' : 'Show'} Code Example
        </button>
        {showCode && (
          <div style={{ background: '#07080f', border: '1px solid #1e2030', borderRadius: 8, padding: '14px 16px', marginBottom: 18 }}>
            <pre style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'monospace' }}>{content.codeExample}</pre>
          </div>
        )}

        {/* Problems */}
        <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.12em', fontWeight: 600, marginBottom: 14, marginTop: showCode ? 4 : 14 }}>
          CODING CHALLENGES — solve all 3 to complete this topic
        </div>
        <div style={{ fontSize: 12, color: '#374151', marginBottom: 16, lineHeight: 1.6 }}>
          Write your solution in VS Code, then upload the <code style={{ color: stageColor, background: stageColor + '15', padding: '1px 5px', borderRadius: 4 }}>.py</code> file here. We'll run it with test inputs and check the output automatically.
        </div>

        {content.problems.map((p, i) => (
          <CodeProblemBlock key={p.id} problem={p} color={stageColor} index={i} onPass={() => handlePass(i)} />
        ))}

        {/* Complete button */}
        {allPassed && (
          <div style={{ marginTop: 8, padding: '20px', borderRadius: 12, background: '#34d39910', border: '1px solid #34d39940', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#34d399', marginBottom: 12 }}>All 3 problems solved!</div>
            <button onClick={onComplete} style={{ background: '#34d399', border: 'none', color: '#07080f', padding: '12px 28px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 15, fontFamily: 'Inter, sans-serif' }}>
              Mark Topic Complete ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// ─── Stage Quiz Modal ────────────────────────────────────────────────────────

function StageQuizModal({
  stage, onClose, onPass,
}: {
  stage: typeof stages[0]; onClose: () => void; onPass: () => void;
}) {
  const isStage01 = stage.number === '01';
  const problems = isStage01 ? STAGE01_FINAL_PROBLEMS : [];
  const [passedProblems, setPassedProblems] = useState<boolean[]>(Array(problems.length).fill(false));
  const passedCount = passedProblems.filter(Boolean).length;
  const allPassed = passedCount >= 5 && passedProblems.every(Boolean);

  const handlePass = (idx: number) => {
    const next = [...passedProblems];
    next[idx] = true;
    setPassedProblems(next);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#0c0d17', border: `1px solid ${stage.color}50`, borderRadius: 16, width: '100%', maxWidth: 700, maxHeight: '92vh', overflowY: 'auto', padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: stage.color, letterSpacing: '0.14em', fontWeight: 700, marginBottom: 6 }}>STAGE COMPLETION CHALLENGE</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0' }}>{stage.title}</div>
            <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>Solve all 5 problems to complete this stage</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#475569', fontSize: 22, cursor: 'pointer' }}>×</button>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {problems.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: passedProblems[i] ? '#34d399' : '#1e2030', transition: 'background 0.3s' }} />
          ))}
        </div>

        {!isStage01 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#475569', fontSize: 14 }}>
            🚧 Stage challenges coming soon!
          </div>
        )}

        <div style={{ fontSize: 12, color: '#374151', marginBottom: 18, lineHeight: 1.6 }}>
          Write each solution in VS Code, then upload the <code style={{ color: stage.color, background: stage.color + '15', padding: '1px 5px', borderRadius: 4 }}>.py</code> file. We'll run it with hidden test inputs and verify the output.
        </div>

        {problems.map((p, i) => (
          <CodeProblemBlock key={p.id} problem={p} color={stage.color} index={i} onPass={() => handlePass(i)} />
        ))}

        {allPassed && (
          <div style={{ marginTop: 16, padding: '24px', borderRadius: 12, background: '#34d39910', border: '1px solid #34d39940', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🏆</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#34d399', marginBottom: 8 }}>Stage Complete!</div>
            <div style={{ fontSize: 14, color: '#475569', marginBottom: 20 }}>You solved all 5 challenges. Stage {stage.number} is mastered.</div>
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

// ─── Auth Screen ────────────────────────────────────────────────────────────

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

// ─── Main Roadmap ────────────────────────────────────────────────────────────

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

  // AI modal state
  const [learnModal, setLearnModal] = useState<{ stageNum: string; topicIdx: number } | null>(null);
  const [quizModal, setQuizModal] = useState<string | null>(null); // stageNum

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
          setStreak(newStreak); setLastActive(today);
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
        user_id: user.id, completed_topics: completedTopics, completed_stages: completedStages,
        current_stage: currentStage, notes, streak, last_active: today,
        updated_at: new Date().toISOString(), ...updates,
      }, { onConflict: 'user_id' });
      setSaveStatus(error ? 'error' : 'saved');
      setTimeout(() => setSaveStatus(null), 2000);
    }, 800);
  };

  const saveTopics = (t: Record<string, boolean[]>) => { setCompletedTopics(t); saveToSupabase({ completed_topics: t }); };
  const saveStages = (s: string[]) => { setCompletedStages(s); saveToSupabase({ completed_stages: s }); };
  const saveNote = (num: string, val: string) => { const n = { ...notes, [num]: val }; setNotes(n); saveToSupabase({ notes: n }); };
  const saveCurrent = (num: string | null) => { setCurrentStage(num); saveToSupabase({ current_stage: num }); };

  const completeTopic = (stageNum: string, idx: number, totalTopics: number) => {
    const prev = completedTopics[stageNum] || Array(totalTopics).fill(false);
    const next = [...prev];
    next[idx] = true;
    const updated = { ...completedTopics, [stageNum]: next };
    saveTopics(updated);
    setLearnModal(null);
  };

  const toggleTopic = (stageNum: string, idx: number, totalTopics: number) => {
    const prev = completedTopics[stageNum] || Array(totalTopics).fill(false);
    const next = [...prev];
    next[idx] = !next[idx];
    const updated = { ...completedTopics, [stageNum]: next };
    saveTopics(updated);
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
      const newStages = [...completedStages, stageNum];
      saveStages(newStages);
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

  if (authLoading) return <div style={{ fontFamily: 'Inter, sans-serif', background: '#07080f', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontSize: 14, color: '#475569' }}>Loading...</div></div>;
  if (window.location.hash.includes('type=recovery')) return <ResetPasswordScreen />;
  if (!user) return <AuthScreen onAuth={() => {}} />;

  // Find learn modal data
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
        .learn-btn:hover { opacity: 0.85; }
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
          stageTitle={learnStage.title}
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

      {/* Celebration */}
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
            15 stages. Click any topic to get an AI explanation + practice problems. Complete all topics, then take the stage quiz.
          </p>
          <div className="header-stats" style={{ display: 'flex', gap: 28, marginTop: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {[['15', 'Total Stages'], [`${weeksLeft}w`, 'Weeks Left'], [`${streak}🔥`, 'Day Streak'], [completedStages.length > 0 ? `${completedStages.length}` : '0', 'Completed']].map(([num, label]) => (
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

        {/* Stages */}
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
            CLICK ANY TOPIC TO LEARN · COMPLETE ALL TOPICS · TAKE THE STAGE QUIZ TO FINISH
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

    const borderColor = status === 'done' ? '#34d399' : status === 'active' ? stage.color : '#1e2030';
    const bgColor = status === 'done' ? '#0a1a12' : status === 'active' ? '#0d0d1f' : '#0c0d17';

    return (
      <div key={stage.number} ref={el => { stageRefs.current[stage.number] = el; }}
        className="stage-card"
        style={{ background: bgColor, borderRadius: 12, overflow: 'hidden', border: `1px solid ${borderColor}` }}>

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
                <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>TOPICS TO MASTER — click a topic to learn it with AI</div>
                <div className="topic-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 6 }}>
                  {stage.topics.map((t, idx) => (
                    <div key={idx} className="topic-row"
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '6px 4px' }}>
                      <div className="check-box" onClick={() => toggleTopic(stage.number, idx, stage.topics.length)}
                        style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${topicsState[idx] ? stage.color : '#2d3050'}`, background: topicsState[idx] ? stage.color + '25' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: stage.color, marginTop: 2, flexShrink: 0 }}>
                        {topicsState[idx] ? '✓' : ''}
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flex: 1 }}>
                        <span style={{ fontSize: 11, color: stage.color, opacity: 0.5, minWidth: 20, fontWeight: 600, marginTop: 2 }}>{String(idx + 1).padStart(2, '0')}</span>
                        <span style={{ fontSize: 14, color: topicsState[idx] ? '#374151' : '#cbd5e1', lineHeight: 1.6, textDecoration: topicsState[idx] ? 'line-through' : 'none', textDecorationColor: '#374151', flex: 1 }}>{t}</span>
                      </div>
                      <button className="learn-btn" onClick={() => setLearnModal({ stageNum: stage.number, topicIdx: idx })}
                        style={{ background: topicsState[idx] ? '#1a1d2e' : stage.color + '20', border: `1px solid ${topicsState[idx] ? '#1e2030' : stage.color + '50'}`, color: topicsState[idx] ? '#374151' : stage.color, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, marginTop: 2 }}>
                        {topicsState[idx] ? '✓ Done' : '▶ Learn'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stage Quiz CTA */}
            {stage.topics.length > 0 && status !== 'done' && (
              <div style={{ margin: '16px 0', padding: '14px 16px', borderRadius: 10, background: allTopicsDone ? stage.color + '12' : '#07080f', border: `1px solid ${allTopicsDone ? stage.color + '40' : '#1e2030'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: allTopicsDone ? stage.color : '#374151', marginBottom: 2 }}>
                    {allTopicsDone ? '🎯 All topics complete! Take the stage quiz.' : `Complete all ${stage.topics.length} topics to unlock the stage quiz`}
                  </div>
                  <div style={{ fontSize: 11, color: '#374151' }}>Score 4/5 to finish the stage</div>
                </div>
                <button onClick={() => allTopicsDone && setQuizModal(stage.number)} disabled={!allTopicsDone}
                  style={{ background: allTopicsDone ? `linear-gradient(135deg, ${stage.color}, #818cf8)` : '#1e2030', border: 'none', color: allTopicsDone ? '#07080f' : '#374151', fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 8, cursor: allTopicsDone ? 'pointer' : 'not-allowed', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
                  {allTopicsDone ? 'Take Quiz →' : `${topicsDone}/${stage.topics.length} done`}
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
