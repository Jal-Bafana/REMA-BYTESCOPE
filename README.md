# ByteScope Campaign and Defense Simulation

ByteScope is a frontend-only educational security simulation with two separate websites:

1. A public-facing campaign website that simulates a social-engineering journey.
2. A standalone defense portal for reverse engineering and analysis.

## Project Goals

- Demonstrate a realistic user journey from content site to suspicious download event.
- Keep offensive behavior non-operational and safe for classroom/demo use.
- Provide a separate defender experience with deobfuscation workflow.
- Support a clean presentation flow without explicit attack labels on the public UI.

## Structure

```
rema-project/
	index.html
	article-secure-prompting.html
	article-soc-workflows.html
	article-threat-modeling.html
	login.html
	dashboard.html
	malicious.html
	styles.css
	script.js
	malware/
		api-credits-tool.js
	defense-site/
		index.html
		styles.css
		script.js
	PROJECT_PLAN.md
	README.md
	docs/
		ARCHITECTURE.md
		CAMPAIGN_FLOW.md
		DEFENSE_FLOW.md
		PRESENTATION_GUIDE.md
		SETUP_AND_RUN.md
```

## Website 1: Public Campaign Site

### Entry

- `index.html`

### Journey

1. User opens the ByteScope blog homepage.
2. User opens long-form article pages.
3. User clicks sponsored ad embedded in `article-secure-prompting.html`.
4. User signs in on `login.html`.
5. User clicks coupon on `dashboard.html`.
6. User claims and downloads obfuscated artifact from `malicious.html`.

### Public Site Notes

- No blue-team screens are mixed into public flow.
- No top-right navigation clutter on main pages.
- Downloaded artifact is `.txt`, not executable script.

## Website 2: Defense Portal

### Entry

- `defense-site/index.html`

### Defender Workflow

1. Paste obfuscated payload copied from downloaded `.txt` file.
2. Click decode.
3. Review extracted payload and decoded output.
4. Review analyst report and control recommendations.

## Core Safety Rules

- Simulation only.
- No real malware execution.
- No active exploitation.
- Payload content is demonstrative text for analysis.

## Running Locally

No build process or backend required.

1. Open `index.html` in browser for campaign site.
2. Open `defense-site/index.html` in browser for defense portal.

For detailed steps, see `docs/SETUP_AND_RUN.md`.

## Documentation

- `docs/ARCHITECTURE.md` for system design.
- `docs/CAMPAIGN_FLOW.md` for red-team simulation journey.
- `docs/DEFENSE_FLOW.md` for blue-team workflow.
- `docs/PRESENTATION_GUIDE.md` for live demo script.
- `docs/SETUP_AND_RUN.md` for setup and troubleshooting.
