# REMA Malvertising Simulation - Execution Plan

## 1. Objective
Build a full frontend-only educational simulation for both red-team attack emulation and blue-team analysis/remediation.

## 2. Scope
- Attack chain simulation:
  - AI Blog -> Malicious Ad -> Phishing Login -> Coupon + Email Lure -> Malicious Page -> Malware Download
- Defender workflow simulation:
  - Reverse engineering of obfuscated JavaScript sample
  - Malware analysis report
  - Defensive controls demonstration
- Logging and observability:
  - localStorage-based event collection for all key stages

## 3. Red Team Workstream
1. Landing lure on blog with sponsored ad click event.
2. Credential capture form simulation with validation and storage notice.
3. Coupon dashboard that escalates trust.
4. Simulated phishing email delivery in dashboard.
5. Email-open event and malicious-link traversal.
6. Simulated malware download event and artifact acquisition.

## 4. Blue Team Workstream
1. Show encoded sample and decode controls.
2. Present malware behavior and risk report.
3. Enforce defensive controls in app flow:
   - CSP
   - Input validation
   - Safe redirect allow-list
   - Malware safe mode without runtime eval execution
4. Incident operations helpers:
   - Event timeline visibility
   - Export logs (JSON evidence package)
   - Reset simulation state

## 5. Implementation Steps
1. Update dashboard UI with phishing email simulation and incident action controls.
2. Extend script logic for email lifecycle events, log export, reset, and timeline rendering.
3. Extend analysis UI with timeline and actions.
4. Extend styles for timeline/panel controls and responsive behavior.
5. Produce complete operational documentation with architecture, flow, testing, and runbook.

## 6. Validation Checklist
- Ad click logs captured.
- Login capture logs captured.
- Coupon click logs captured.
- Email sent/open logs captured.
- Malware download logs captured.
- Decode action logs captured.
- Log export creates JSON file.
- Reset clears simulation state.
- All pages work by opening index.html locally.

## 7. Safety Constraints
- Simulation only.
- No real payload execution.
- No external exfiltration.
- No network exploitation logic.
