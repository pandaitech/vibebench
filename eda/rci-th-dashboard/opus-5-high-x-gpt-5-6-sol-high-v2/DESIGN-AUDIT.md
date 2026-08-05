# Design audit — RCI Tabung Haji dashboard

## Why the original interface feels generic

| Gap in the original | Why it weakens the report | Revamp response |
|---|---|---|
| Permanent left sidebar | It establishes a familiar admin-product pattern before the report has a chance to establish its own identity. It also consumes valuable width on charts. | Chapters now live in a full-screen report index. The reading canvas receives the full viewport width. |
| Sticky utility bar with empty flexible space | The header behaves like software chrome rather than an investigative publication. | A compact masthead carries report identity, active chapter, utilities, and reading progress as one system. |
| Every subject is placed in the same rounded card | Equal containers imply equal importance and flatten the narrative hierarchy. | Sections are numbered report exhibits separated by strong rules; there is no universal floating-card treatment. |
| KPI tiles all share the same scale | Eight very different facts become a wall of boxes, so the eye scans shape rather than meaning. | Figures behave like an evidence strip with indexed items, tighter captions, larger numerals, and an explicit hover transition. |
| Familiar dark teal dashboard palette | It is competent but strongly associated with financial SaaS products and does not belong specifically to this report. | Warm document stock, carbon ink, signal orange, and evidence-specific data colours create a forensic publication identity. |
| System typography throughout | One neutral sans-serif cannot distinguish report title, data, source, warning, and navigation voices. | Condensed display type drives chapter headlines, a readable body face carries narrative text, and mono type marks evidence and source metadata. |
| Section titles are modest | The story starts at the same visual volume as each component, so chapter changes do not feel consequential. | Chapter titles are oversized, compressed, and anchored by an orange case-file rule. |
| Charts float on plain card surfaces | They read as embedded widgets instead of primary evidence. | Charts sit on ruled evidence sheets, with lighter axes, restrained legends, and consistent provenance treatment. |
| “Apa ditunjuk / Jangan simpul” is visually secondary | These are essential interpretation safeguards, but the original dashed divider makes them feel optional. | Interpretation notes form a bordered reading apparatus with the warning given its own signal colour. |
| Pills are used for provenance, filters, and controls | Repeating pill geometry makes different actions feel interchangeable and creates a generic component-library look. | Provenance becomes a stamped label; filters become joined switches; sources become small rectangular citations. |
| Tables are conventional data grids | The default grid treatment disconnects tables from the investigative tone and is difficult to scan on a phone. | Tables use a ledger treatment with ruled cells, sticky first columns, compact headers, and deliberate horizontal overflow. |
| Timeline is a standard vertical line | It does not exploit desktop width and visually resembles common template timelines. | It remains chronological on mobile and becomes a split case chronology on wider screens. |
| Mobile navigation depends on a small top button | Long report pages leave chapter access far away from the reader’s thumb. | A persistent bottom chapter dock shows the current section and opens the report index. |
| Desktop-first breakpoints | Auto-fit grids preserve too many columns for too long and force dense text into narrow cards. | The base layout is one column; columns are introduced only when space is genuinely available. |
| Little sense of reading position | Active navigation indicates the chapter but not progress through the chapter itself. | A signal-yellow line in the masthead tracks progress through the current report chapter. |
| Hover carries several discoveries | Tooltips and underlined terms work well with a mouse, but the surrounding controls are not consistently touch-sized. | Filters, menu items, source links, and chapter controls use larger minimum targets and work in a single-column mobile flow. |
| Interface identity competes with report credibility | Decorative dashboard chrome makes the presentation feel authored by a template. | Decoration is limited to document rules, numbering, stamps, and graph-paper texture—motifs that reinforce evidence and traceability. |

## Content integrity

- The data modules, report wording, calculations, chart logic, tables, simulators, citations, warnings, findings, recommendations, glossary, and CSV exports are retained from the source implementation.
- The revamp changes hierarchy, navigation, layout, typography, colour, responsive behaviour, and component presentation.
- No report fact or sentence was rewritten for the interface revamp.
