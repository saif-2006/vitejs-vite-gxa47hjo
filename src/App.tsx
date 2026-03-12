import { useState, useEffect, useRef } from 'react';

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

function loadState() {
  try {
    return {
      completedTopics: JSON.parse(localStorage.getItem('completedTopics') || '{}'),
      completedStages: JSON.parse(localStorage.getItem('completedStages') || '[]'),
      currentStage: localStorage.getItem('currentStage') || null,
      notes: JSON.parse(localStorage.getItem('notes') || '{}'),
      lastActive: localStorage.getItem('lastActive') || null,
      streak: parseInt(localStorage.getItem('streak') || '0'),
    };
  } catch { return { completedTopics: {}, completedStages: [], currentStage: null, notes: {}, lastActive: null, streak: 0 }; }
}

export default function Roadmap() {
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
  const stageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const s = loadState();
    setCompletedTopics(s.completedTopics);
    setCompletedStages(s.completedStages);
    setCurrentStage(s.currentStage);
    setNotes(s.notes);
    setLastActive(s.lastActive);
    setStreak(s.streak);

    // Update streak
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (s.lastActive !== today) {
      const newStreak = s.lastActive === yesterday ? s.streak + 1 : 1;
      setStreak(newStreak);
      setLastActive(today);
      localStorage.setItem('streak', String(newStreak));
      localStorage.setItem('lastActive', today);
    }
  }, []);

  const saveTopics = (t: Record<string, boolean[]>) => { setCompletedTopics(t); localStorage.setItem('completedTopics', JSON.stringify(t)); };
  const saveStages = (s: string[]) => { setCompletedStages(s); localStorage.setItem('completedStages', JSON.stringify(s)); };
  const saveNote = (num: string, val: string) => { const n = { ...notes, [num]: val }; setNotes(n); localStorage.setItem('notes', JSON.stringify(n)); };
  const saveCurrent = (num: string | null) => { setCurrentStage(num); if (num) localStorage.setItem('currentStage', num); else localStorage.removeItem('currentStage'); };

  const toggleTopic = (stageNum: string, idx: number, totalTopics: number) => {
    const prev = completedTopics[stageNum] || Array(totalTopics).fill(false);
    const next = [...prev];
    next[idx] = !next[idx];
    const updated = { ...completedTopics, [stageNum]: next };
    saveTopics(updated);
    // Auto-complete stage if all topics done
    if (next.every(Boolean) && !completedStages.includes(stageNum)) {
      const newStages = [...completedStages, stageNum];
      saveStages(newStages);
      setCelebration(stageNum);
      setTimeout(() => setCelebration(null), 4000);
    }
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

  const stageProgress = (stageNum: string, total: number) => {
    const t = completedTopics[stageNum] || [];
    return t.filter(Boolean).length;
  };

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

  const toggleExpandAll = () => {
    if (allExpanded) { setOpen(null); setAllExpanded(false); }
    else { setAllExpanded(true); }
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
        textarea { resize: vertical; font-family: 'Inter', sans-serif; }
        textarea:focus { outline: none; }
        .expand-arrow { transition: transform 0.2s ease; display: inline-block; }
        @keyframes celebIn { from { opacity: 0; transform: translateY(20px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        .celeb { animation: celebIn 0.4s ease, fadeOut 0.5s ease 3.5s forwards; }
        @media (max-width: 600px) {
          .topic-grid { grid-template-columns: 1fr !important; }
          .header-stats { gap: 20px !important; }
          .filter-bar { gap: 5px !important; }
          .filter-btn { font-size: 10px !important; padding: 4px 8px !important; }
          .stage-title { font-size: 14px !important; }
        }
      `}</style>

      {/* Sticky progress bar */}
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
            15 stages. Every skill, tool, and critical gap — track your progress and become a freelance AI automation engineer.
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
          <button onClick={toggleExpandAll} style={{ background: '#0f1117', border: '1px solid #1a1d2e', color: '#94a3b8', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 6, cursor: 'pointer' }}>
            {allExpanded ? '↑ Collapse All' : '↓ Expand All'}
          </button>
          {currentStage && (
            <button onClick={() => saveCurrent(null)} style={{ background: '#0f1117', border: '1px solid #1a1d2e', color: '#64748b', fontSize: 12, padding: '6px 14px', borderRadius: 6, cursor: 'pointer' }}>
              Clear Current Stage
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
          {tags.map(tag => (
            <button key={tag} className="filter-btn" onClick={() => setFilter(tag)}
              style={{ background: filter === tag ? tagColors[tag] || '#818cf8' : '#0f1117', color: filter === tag ? '#07080f' : '#4b5563', border: `1px solid ${filter === tag ? tagColors[tag] || '#818cf8' : '#1a1d2e'}` }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Stage groups */}
        {filter === 'ALL' ? (
          STAGE_GROUPS.map(group => {
            const groupStages = stages.filter(s => group.range.includes(s.number));
            return (
              <div key={group.label} style={{ marginBottom: 36 }}>
                {/* Group header */}
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
            CLICK ANY STAGE TO EXPAND · CHECK OFF TOPICS AS YOU LEARN · BUILD IN ORDER
          </div>
        </div>
      </div>
    </div>
  );

  function renderStage(stage: typeof stages[0]) {
    const status = getStageStatus(stage.number);
    const topicsDone = stageProgress(stage.number, stage.topics.length);
    const stagePct = Math.round((topicsDone / stage.topics.length) * 100);
    const stageOpen = isOpen(stage.number);
    const topicsState = completedTopics[stage.number] || Array(stage.topics.length).fill(false);

    const borderColor = status === 'done' ? '#34d399' : status === 'active' ? stage.color : '#1e2030';
    const bgColor = status === 'done' ? '#0a1a12' : status === 'active' ? '#0d0d1f' : '#0c0d17';

    return (
      <div key={stage.number} ref={el => { stageRefs.current[stage.number] = el; }}
        className="stage-card"
        style={{ background: bgColor, borderRadius: 12, overflow: 'hidden', border: `1px solid ${borderColor}` }}>

        {/* Stage header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', cursor: 'pointer' }}
          onClick={() => { if (!allExpanded) setOpen(stageOpen && !allExpanded ? null : stage.number); }}>

          {/* Stage number */}
          <div style={{ fontSize: 18, fontWeight: 800, color: stage.color, minWidth: 32, lineHeight: 1, opacity: status === 'done' ? 1 : 0.6 }}>
            {stage.number}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span className="stage-title" style={{ fontSize: 16, fontWeight: 700, color: status === 'done' ? '#94a3b8' : '#e2e8f0', textDecoration: status === 'done' ? 'line-through' : 'none', textDecorationColor: '#34d399' }}>
                {stage.title}
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', padding: '2px 7px', borderRadius: 4, background: stage.color + '18', color: stage.color, border: `1px solid ${stage.color}35` }}>
                {stage.tag}
              </span>
              {status === 'active' && (
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: stage.color + '25', color: stage.color, border: `1px solid ${stage.color}60`, letterSpacing: '0.06em' }}>
                  IN PROGRESS
                </span>
              )}
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
            {/* Mark as current */}
            {status !== 'done' && (
              <button onClick={e => { e.stopPropagation(); saveCurrent(currentStage === stage.number ? null : stage.number); }}
                style={{ background: 'transparent', border: `1px solid ${currentStage === stage.number ? stage.color : '#2d3050'}`, color: currentStage === stage.number ? stage.color : '#374151', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 4, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {currentStage === stage.number ? '★ Current' : '☆ Set Current'}
              </button>
            )}
            {/* Stage complete toggle */}
            <div className="check-box" onClick={e => { e.stopPropagation(); toggleStage(stage.number); }}
              style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${status === 'done' ? '#34d399' : '#2d3050'}`, background: status === 'done' ? '#34d39920' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
              {status === 'done' ? '✓' : ''}
            </div>
            <span className="expand-arrow" style={{ color: '#374151', fontSize: 20, transform: stageOpen ? 'rotate(90deg)' : 'rotate(0deg)', pointerEvents: 'none' }}>›</span>
          </div>
        </div>

        {/* Milestone */}
        {MILESTONES[stage.number] && (
          <div style={{ margin: '0 20px 14px', padding: '8px 14px', background: '#fbbf2410', border: '1px solid #fbbf2430', borderRadius: 8, fontSize: 13, color: '#fbbf24', fontWeight: 500 }}>
            {MILESTONES[stage.number]}
          </div>
        )}

        {/* Expanded content */}
        {stageOpen && (
          <div style={{ padding: '0 20px 24px', borderTop: `1px solid ${stage.color}18` }}>

            {/* Why */}
            <div style={{ background: stage.color + '08', border: `1px solid ${stage.color}20`, borderLeft: `3px solid ${stage.color}`, borderRadius: 8, padding: '13px 16px', margin: '16px 0' }}>
              <div style={{ fontSize: 11, color: stage.color, letterSpacing: '0.12em', marginBottom: 6, fontWeight: 600 }}>WHY THIS STAGE MATTERS</div>
              <div style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.7 }}>{stage.why}</div>
            </div>

            {/* Topics */}
            {stage.topics.length > 0 && (
              <div style={{ marginBottom: 22 }}>
                <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.12em', marginBottom: 12, fontWeight: 600 }}>TOPICS TO MASTER</div>
                <div className="topic-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 6 }}>
                  {stage.topics.map((t, idx) => (
                    <div key={idx} className="topic-row"
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '6px 4px', cursor: 'pointer' }}
                      onClick={() => toggleTopic(stage.number, idx, stage.topics.length)}>
                      <div className="check-box"
                        style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${topicsState[idx] ? stage.color : '#2d3050'}`, background: topicsState[idx] ? stage.color + '25' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: stage.color, marginTop: 2, flexShrink: 0 }}>
                        {topicsState[idx] ? '✓' : ''}
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flex: 1 }}>
                        <span style={{ fontSize: 11, color: stage.color, opacity: 0.5, minWidth: 20, fontWeight: 600, marginTop: 2 }}>{String(idx + 1).padStart(2, '0')}</span>
                        <span style={{ fontSize: 14, color: topicsState[idx] ? '#374151' : '#cbd5e1', lineHeight: 1.6, textDecoration: topicsState[idx] ? 'line-through' : 'none', textDecorationColor: '#374151' }}>{t}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
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

            {/* Goal */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: '#0f1117', borderRadius: 8, border: '1px solid #1a1d2e', marginBottom: 16 }}>
              <span style={{ color: stage.color, fontSize: 14, flexShrink: 0 }}>✓</span>
              <div>
                <span style={{ fontSize: 11, color: '#475569', letterSpacing: '0.1em', fontWeight: 600 }}>STAGE GOAL — </span>
                <span style={{ fontSize: 14, color: '#94a3b8' }}>{stage.goal}</span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <div style={{ fontSize: 11, color: '#475569', letterSpacing: '0.12em', marginBottom: 8, fontWeight: 600 }}>MY NOTES & RESOURCES</div>
              <textarea
                value={notes[stage.number] || ''}
                onChange={e => saveNote(stage.number, e.target.value)}
                placeholder="Add your notes, resource links, or thoughts here..."
                style={{ width: '100%', minHeight: 80, background: '#0f1117', border: '1px solid #1a1d2e', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
