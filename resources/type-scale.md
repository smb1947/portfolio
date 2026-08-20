# Portfolio Type Scale

This document defines the portfolio's visual typography system. The labels describe reusable visual styles. Semantic HTML heading tags should still follow the page's document structure for accessibility.

The scale has two responsive states:

- Mobile: below 768px
- Desktop: 768px and above

## Typography Map

| Portfolio element | Font | Scale | Treatment |
| --- | --- | --- | --- |
| Hero name | [Alex Brush](https://fonts.google.com/specimen/Alex+Brush) | `H1` | Regular `400` with a subtle optical stroke; title case |
| Hero role, credentials, and location | [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) | `S` and contextual hero detail | Bold `700` at every breakpoint; neutral navy text with coral and teal credential separators |
| Footer signature | Cormorant Garamond | Component-specific | Bold `700` at every breakpoint; neutral navy text with coral and teal separators; 18px / 24px on mobile and 20px / 26px from 640px |
| Main section titles | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | `H2` | Regular `450` on mobile / `400` on desktop; italic; title case |
| Expressive subsection titles | Playfair Display | `H3` | Regular `450` on mobile / `400` on desktop; italic; title case |
| Companies, degrees, roles, schools, projects, capabilities, and principles | Playfair Display | `H3` and `H4` | Regular `450` on mobile / `400` on desktop |
| Body copy, capability descriptions, operating-principle descriptions, and project descriptions | Playfair Display | `B` and contextual detail | Custom `500` on mobile / `450` on desktop; subtly tightened tracking with the original layout widths |
| Manager testimonial | Playfair Display | `B` | Custom `500` on mobile / `450` on desktop with a standalone quote icon and no added quotation marks |
| Dates, non-hero locations, eyebrow text, status labels, navigation, buttons, and form UI | [Inter](https://fonts.google.com/specimen/Inter) | `D`, `M`, or component-specific | Regular through bold according to functional hierarchy |

Playfair Display uses `500` as the readable mobile baseline and `450` from the desktop breakpoint upward for prose. Display styles use a lighter regular `450` on mobile / `400` on desktop because their larger sizes already establish hierarchy. Avoid semibold, bold, or black Playfair Display beyond these documented baseline values except where a future design requirement explicitly calls for it. Inline emphasis in long-form copy uses semibold `600`, retaining the coral tint so key ideas such as `WHY`, `MONITOR`, and `ITERATE` remain easily scannable without making surrounding paragraphs heavier.

## Legend

| Token | Meaning | Mobile | Desktop | Usage |
| --- | --- | ---: | ---: | --- |
| `H1` | Page title | 34px / 38px | 60px / 64px | The portfolio owner's name |
| `H2` | Main section heading | 30px / 36px | 36px / 42px | Primary page sections |
| `H3` | Subsection or entry heading | 20px / 26px | 24px / 30px | Major groups, companies, degrees, roles, and schools |
| `H4` | Named item title | 17px / 23px | 18px / 23px | Capabilities, principles, interests, and project titles |
| `B` | Body copy | 17px / 29px | 18px / 30px | Descriptive prose and summaries |
| `S` | Supporting copy | 20px / 26px | 28px / 32px | Short, prominent context supporting a heading |
| `D` | Secondary detail | 14px / 20px | 15px / 21px | Locations, bylines, and secondary context; hero detail uses 18px / 24px on mobile and 20px / 26px on desktop |
| `M` | Metadata | 12px / 16px | 13px / 18px | Dates, eyebrow labels, and compact context |

Each size is written as `font size / line height`.

Project descriptions use 15px / 24px on mobile and 16px / 26px on desktop because they are longer than typical secondary details.

Long-form Playfair Display prose should use `-0.01em` letter spacing. Keep the original layout measures: `max-w-5xl` for About and section-introduction copy, and `max-w-4xl` for experience summaries. These widths keep prose slightly narrower than the card grid without constraining it to a narrow editorial column.

The hero role uses the `S` scale. Hero credentials and location use a contextual detail size of 18px / 24px on mobile and 20px / 26px on desktop. All three use Cormorant Garamond at bold `700`, with normal capitalization and letter spacing. The credential labels remain neutral navy; the first `✦` separator is coral and the second is teal. The coral location icon may still distinguish location from the other hero details. The footer repeats the same neutral-text, coral-first-separator, teal-second-separator treatment at bold `700`. The profile image measures 144px, 176px, 208px, and 240px across the responsive breakpoints. It is positioned with 35% overlapping the cover image and 65% extending below it; the hero layout derives its reserved height from that 65% overhang, keeping the mobile content clear of the image at every size. Alex Brush provides only one weight, so the hero name uses a subtle optical stroke for equivalent emphasis.

## Information Flow

```text
PORTFOLIO
│
├── HERO
│   ├── H1: Shankar Binjawadgi
│   ├── S: AI-First Technical Product Builder (Cormorant Garamond 700)
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
│   │       └── B: Using AI to rethink workflows... (Playfair Display 500 mobile / 450 desktop)
│   │
│   ├── H3: What Is My Modus Operandi
│   │   ├── OPERATING PRINCIPLE
│   │   │   ├── H4: Agency
│   │   │   └── B: Taking ownership and moving ideas forward...
│   │   └── MANAGER NOTE
│   │       ├── B: It was a lot of fun having... (Playfair Display 500 mobile / 450 desktop; standalone quote icon, no quotation marks)
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
Hero detail → .hero-detail
```
