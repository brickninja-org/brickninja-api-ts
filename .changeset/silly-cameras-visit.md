---
"@brickninjaapi/types": minor
"@brickninjaapi/fetch": patch
---

Add typed support for `/v2/elements` with schema-aware `ElementV2`, and update schema version metadata.

Harden fetch runtime safety by handling omitted options and missing content-type headers without crashing.
