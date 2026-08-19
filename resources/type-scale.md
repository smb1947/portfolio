# Portfolio Type Scale

This document defines the portfolio's visual typography system. The labels describe reusable visual styles. Semantic HTML heading tags should still follow the page's document structure for accessibility.

The scale has two responsive states:

- Mobile: below 768px
- Desktop: 768px and above

## Complete Typography Map

| Portfolio element | Font | Scale | Treatment |
| --- | --- | --- | --- |
| Hero name | [Alex Brush](https://fonts.google.com/specimen/Alex+Brush) | `H1` | Regular weight and title case |
| Hero role, credentials, and location | [Oranienbaum](https://fonts.google.com/specimen/Oranienbaum) | `S` and `D` | Regular weight and normal capitalization; use size and color to preserve hierarchy |
| Main section titles | [Oregano](https://fonts.google.com/specimen/Oregano) | `H2` | Regular weight and title case |
| Expressive section subtitles | [Rancho](https://fonts.google.com/specimen/Rancho) | `H3` | Regular weight and title case |
| Companies, degrees, roles, and schools | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | `H3` | Semibold weight |
| Project, capability, principle, and interest titles | Playfair Display | `H4` | Semibold weight |
| Body copy and project descriptions | Playfair Display | `B` and `D` | Regular weight with the defined generous line height |
| Quotes and highlighted prose | Playfair Display | `B` | Regular italic |
| Dates, non-hero locations, eyebrow text, and status labels | [Inter](https://fonts.google.com/specimen/Inter) | `D` and `M` | Semibold or bold; uppercase only for compact labels |
| Navigation and footer links | Inter | Component-specific | Medium or semibold |
| Buttons and calls to action | Inter | Component-specific | Semibold |
| Form labels, inputs, validation, and helper text | Inter | Component-specific | Regular through semibold according to hierarchy |
| Interactive diagram labels | Inter or Playfair Display | `D` or `H4` | Inter for small functional labels; Playfair Display for prominent titles |
| Tooltips and accessibility instructions | Inter | `D` or `M` | Regular or medium |

This map defines the intended typography system; the site implementation may not yet match it. The type-scale classes define font size and line height, while font families and weights are applied separately according to context.

Keep Oregano and Rancho at `H2` or `H3` sizes and use title case so their expressive letterforms remain readable. Playfair Display body copy should retain the documented line heights and comfortable paragraph widths.

## Legend

| Token | Meaning | Mobile | Desktop | Usage |
| --- | --- | ---: | ---: | --- |
| `H1` | Page title | 32px / 34px | 48px / 50px | The portfolio owner's name |
| `H2` | Main section heading | 30px / 36px | 36px / 42px | Primary page sections |
| `H3` | Subsection or entry heading | 20px / 26px | 24px / 30px | Major groups, companies, degrees, roles, and schools |
| `H4` | Named item title | 17px / 23px | 18px / 23px | Capabilities, principles, interests, and project titles |
| `B` | Body copy | 16px / 28px | 17px / 29px | Descriptive prose and summaries |
| `S` | Supporting copy | 16px / 22px | 18px / 24px | Short, prominent context supporting a heading |
| `D` | Secondary detail | 14px / 20px | 15px / 21px | Locations, bylines, and secondary context |
| `M` | Metadata | 12px / 16px | 13px / 18px | Dates, eyebrow labels, and compact context |

Each size is written as `font size / line height`.

Project descriptions use the `D` font size with a relaxed line height of 22px on mobile and 24px on desktop because they are longer than typical secondary details.

The hero role uses the `S` scale. The credentials and location use the `D` scale. All three use Oranienbaum at regular weight, normal capitalization, and normal letter spacing. Color and the location icon may still distinguish their functions.

## Information Flow

```text
PORTFOLIO
│
├── HERO
│   ├── H1: Shankar Binjawadgi
│   ├── S: AI-First Technical Product Builder
│   ├── D: AWS · Microsoft Azure · Foster
│   └── D: Seattle, WA
│
├── H2: Who I Am
│   ├── B: Intro copy
│   │
│   ├── H3: What I’ve Been Building
│   │   ├── B: A snapshot of a few products...
│   │   └── PROJECT
│   │       ├── H4: StreakFit AI
│   │       ├── M: 2026 · ONGOING
│   │       └── D: Discovered 3 student fitness pain points...
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
│       ├── H3: Senior Product Manager Technical, AWS FinOps
│       ├── D: Seattle, WA
│       ├── B: Worked on AWS FinOps cost optimization...
│       └── PROJECT
│           ├── H4: Project title
│           ├── M: Project date
│           └── D: Project description
│
├── H2: What I’ve Studied
│   └── EDUCATION
│       ├── H3: Master of Business Administration
│       ├── M: Graduation year
│       ├── H3: Foster School of Business
│       ├── D: Seattle, WA
│       ├── B: Education summary
│       └── PROJECT
│           ├── H4: Project title
│           ├── M: Project date
│           └── D: Project description
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
