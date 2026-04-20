# Architecture

## High-Level Design

The project is split into two static websites to separate user-facing campaign simulation from analyst-facing defense operations.

1. Public campaign site (root HTML pages)
2. Defense portal (`defense-site/`)

This separation keeps the campaign experience realistic while preserving an independent investigation environment.

## Public Campaign Site Components

- `index.html`: Blog landing page with article links
- `article-secure-prompting.html`: Long-form article containing sponsored ad trigger
- `article-soc-workflows.html`: Long-form article
- `article-threat-modeling.html`: Long-form article
- `login.html`: Credential capture simulation (local only)
- `dashboard.html`: Coupon stage after sign-in
- `malicious.html`: Download trigger for obfuscated `.txt` payload
- `styles.css`: Shared campaign styling
- `script.js`: Shared logic for click flow, validation, safe redirects, logging, and artifact generation

## Defense Site Components

- `defense-site/index.html`: Input, extraction, decode, and reporting UI
- `defense-site/styles.css`: Independent responsive analyst UI
- `defense-site/script.js`: Payload parsing and layered Base64 decoding logic

## Data Model (Browser Local Storage)

Public site stores lightweight session telemetry in localStorage:

- `rema_logs`: Array of event records
- `rema_credentials`: Captured sign-in values for simulation context

Event schema:

- `time`: locale-formatted timestamp
- `event`: event label
- `details`: event description

## Payload Format

Downloaded file: `api-credits-tool-obfuscated.txt`

Contains:

- Header line
- `PAYLOAD_B64_2=<double-encoded value>`
- `OBFUSCATED_JS=var _0x7f='...';eval(atob(atob(_0x7f)));`

The defense parser extracts Base64 from either key-value format or obfuscated JS wrapper.

## Safety and Scope

- No executable payload is auto-run.
- Downloaded artifact is plain text.
- Defense decode output is rendered as text only.
- No backend or remote exfil endpoint is used in runtime flow.
