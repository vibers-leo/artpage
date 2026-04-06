---
description: Workspace Audit Workflow
---
// turbo-all
1. Run Next.js audit script
```
bash /tmp/audit_nextjs.sh
```
2. Run Expo audit script
```
bash /tmp/audit_expo.sh
```
3. Read the output files
```
cat /tmp/audit_results_nextjs.txt
cat /tmp/audit_results_expo.txt
```
4. Update 오류현황보고.md with the results.
