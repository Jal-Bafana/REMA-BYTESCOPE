# Defense Flow (Standalone Portal)

## Objective

Provide an isolated analyst workflow to parse and decode obfuscated payload text from the downloaded campaign artifact.

## Input Sources

Analysts can paste any of the following into the portal input:

- Full text file contents containing `PAYLOAD_B64_2=`
- Obfuscated JS wrapper text (`var _0x...='...';eval(...)`)
- Raw Base64 payload

## Decode Pipeline

1. Parse input and extract candidate Base64 payload.
2. Validate Base64 format.
3. Decode layer by layer up to a bounded maximum.
4. Stop when decoded content resembles JavaScript source.
5. Display extracted obfuscated string and decoded output.

## Analyst Outputs

- Status indicator with success/failure and decode layer count
- Wrapped obfuscated string panel
- Wrapped decoded output panel
- Static report section with controls and risk notes

## UI/UX Constraints

- Responsive layout for desktop and mobile
- Long text wrapping enabled to avoid horizontal overflow
- No script execution from decoded content
