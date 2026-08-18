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
| `H3` | Subsection or primary entry heading | 20px / 26px | 24px / 30px | Major groups and the primary identity of work or education entries |
| `H4` | Nested detail heading | 17px / 23px | 18px / 23px | Capabilities, principles, expanded roles, and schools |
| `H5` | Nested project title | 16px / 22px | 17px / 23px | Individual projects inside work or education entries |
| `B` | Body copy | 16px / 28px | 17px / 29px | Descriptive prose and summaries |
| `S` | Supporting copy | 16px / 22px | 18px / 24px | Short, prominent context supporting a heading |
| `D` | Secondary detail | 14px / 20px | 15px / 21px | Locations, bylines, and secondary context |
| `M` | Metadata | 12px / 16px | 13px / 18px | Dates, eyebrow labels, and compact context |

Each size is written as `font size / line height`.

The three hero-supporting lines use one complete treatment: the `S` scale, Inter sans-serif, semibold weight, normal capitalization, and normal letter spacing. Color and the location icon may still distinguish their functions.

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
│   ├── B: Intro copy
│   │
│   ├── H3: What I’ve Been Building
│   │   ├── B: A snapshot of a few products...
│   │   └── PROJECT
│   │       ├── H4: StreakFit AI
│   │       ├── M: 2026 · ONGOING
│   │       └── B: Discovered 3 student fitness pain points...
│   │
│   ├── H3: What I Bring to the Table
│   │   └── CAPABILITY
│   │       ├── H4: AI-First Product Building
│   │       └── B: Using AI to rethink workflows...
│   │
│   ├── H3: What Is My Modus Operandi
│   │   ├── OPERATING PRINCIPLE
│   │   │   ├── H4: Agency
│   │   │   └── B: Taking ownership and moving ideas forward...
│   │   └── MANAGER NOTE
│   │       ├── B: It was a lot of fun having...
│   │       ├── D: Manager name and title
│   │       └── M: AWS internship context
│   │
│   └── H3: What I Geek Out On
│       └── H4: Behavioral psychology · Hiking · Gym · Poker · Anime
│
├── H2: Where I’ve Worked
│   └── WORK EXPERIENCE
│       ├── H3: AWS
│       ├── M: Employment dates
│       ├── H4: Senior Product Manager Technical, AWS FinOps
│       ├── D: Seattle, WA
│       ├── B: Worked on AWS FinOps cost optimization...
│       └── PROJECT
│           ├── H5: Project title
│           ├── M: Project date
│           └── B: Project description
│
├── H2: What I’ve Studied
│   └── EDUCATION
│       ├── H3: Master of Business Administration
│       ├── M: Graduation year
│       ├── H4: Foster School of Business
│       ├── D: Seattle, WA
│       ├── B: Education summary
│       └── PROJECT
│           ├── H5: Project title
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
H5 → .type-h5
B  → .type-body
S  → .type-supporting
D  → .type-detail
M  → .type-meta
```
