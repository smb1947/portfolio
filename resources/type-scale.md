# Portfolio Type Scale

This document defines the portfolio's visual typography system. The labels describe reusable visual styles. Semantic HTML heading tags should still follow the page's document structure for accessibility.

The scale has two responsive states:

- Mobile: below 768px
- Desktop: 768px and above

## Legend

| Token | Meaning | Mobile | Desktop | Usage |
| --- | --- | ---: | ---: | --- |
| `H1` | Page title | 32px / 34px | 48px / 50px | The portfolio owner's name |
| `H2` | Main section heading | 30px / 36px | 36px / 42px | Primary page sections |
| `H3` | Subsection heading | 20px / 26px | 24px / 30px | Major groups inside a section |
| `H4` | Named item title | 17px / 23px | 18px / 23px | Projects, capabilities, principles, organizations, roles, and degrees |
| `B` | Body copy | 16px / 28px | 17px / 29px | Descriptive prose and summaries |
| `S` | Supporting copy | 16px / 22px | 18px / 24px | Short, prominent context supporting a heading |
| `D` | Secondary detail | 14px / 20px | 15px / 21px | Locations, bylines, and secondary context |
| `M` | Metadata | 12px / 16px | 13px / 18px | Dates, eyebrow labels, and compact context |

Each size is written as `font size / line height`.

The three hero-supporting lines use the Inter sans-serif family so the role, credentials, and location share one font. Weight, capitalization, tracking, and color may still distinguish their functions.

## Information Flow

```text
PORTFOLIO
│
├── HERO
│   ├── H1: Shankar Binjawadgi
│   ├── S: AI-First Technical Product Builder
│   ├── S: AWS · Microsoft Azure · Foster
│   └── S: Seattle, WA
│
├── H2: Who I Am
│   └── B: Intro copy
│
├── H3: What I’ve Been Building
│   ├── B: A snapshot of a few products...
│   └── PROJECT
│       ├── H4: StreakFit AI
│       ├── M: 2026 · ONGOING
│       └── B: Discovered 3 student fitness pain points...
│
├── H3: What I Bring to the Table
│   └── CAPABILITY
│       ├── H4: AI-First Product Building
│       └── B: Using AI to rethink workflows...
│
├── H3: What Is My Modus Operandi
│   ├── OPERATING PRINCIPLE
│   │   ├── H4: Agency
│   │   └── B: Taking ownership and moving ideas forward...
│   └── MANAGER NOTE
│       ├── B: It was a lot of fun having...
│       ├── D: Manager name and title
│       └── M: AWS internship context
│
├── H3: What I Geek Out On
│   └── H4: Behavioral psychology · Hiking · Gym · Poker · Anime
│
├── H2: Where I’ve Worked
│   └── WORK EXPERIENCE
│       ├── H4: AWS
│       ├── M: Employment dates
│       ├── H4: Senior Product Manager Technical, AWS FinOps
│       ├── D: Seattle, WA
│       ├── B: Worked on AWS FinOps cost optimization...
│       └── PROJECT
│           ├── H4: Project title
│           ├── M: Project date
│           └── B: Project description
│
├── H2: What I’ve Studied
│   └── EDUCATION
│       ├── H4: Foster School of Business
│       ├── M: Graduation year
│       ├── H4: Master of Business Administration
│       ├── D: Seattle, WA
│       ├── B: Education summary
│       └── PROJECT
│           ├── H4: Project title
│           ├── M: Project date
│           └── B: Project description
│
└── H2: How to Connect
    └── B: Liked my work? Let’s connect...
```

## Implementation Classes

The corresponding CSS classes are:

```text
H1 → .type-h1
H2 → .type-h2
H3 → .type-h3
H4 → .type-h4
B  → .type-body
S  → .type-supporting
D  → .type-detail
M  → .type-meta
```
