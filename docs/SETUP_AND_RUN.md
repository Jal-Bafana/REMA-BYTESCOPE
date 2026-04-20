# Setup and Run

## Requirements

- Any modern browser (Edge, Chrome, Firefox)
- Local file access only
- No backend required

## Run the Public Campaign Site

1. Open `index.html` in your browser.
2. Navigate into article pages.
3. Click sponsored ad in secure prompting article.
4. Complete sign-in form.
5. Continue to dashboard and claim page.
6. Download `api-credits-tool-obfuscated.txt`.

## Run the Defense Portal

1. Open `defense-site/index.html`.
2. Paste the downloaded TXT file content.
3. Click `Decode Layers`.
4. Review extracted obfuscated payload and decoded source text.

## Quick Troubleshooting

### Download blocked

- The artifact is plain text (`.txt`), not executable script.
- If browser blocks download, use a different browser or permit local download prompt.

### Decode failed

- Ensure full TXT content is copied, including `PAYLOAD_B64_2=` line.
- Remove accidental extra characters before or after payload.

### Layout issues on mobile

- Refresh after orientation change.
- Use latest browser version for CSS grid and wrapping support.
