# Payload CMS Architecture Ruleset (For Validation + Scaling)

## 🎯 Context

This project is a **read-heavy property marketplace** using:

* Next.js (server components)
* Payload CMS (local API)
* PostgreSQL

Data is:

* Entered via CMS (no frontend writes)
* Queried frequently (high read load)
* Needs to scale to 1000+ users

👉 Therefore architecture is optimized for:

* Fast reads
* Minimal joins
* CMS usability

---

# 🧠 CORE PRINCIPLES

## 1. Source of Truth vs Read Model

* ER Diagram = normalized truth
* Payload = read-optimized structure

👉 DO NOT mirror ER diagram blindly

---

## 2. One-directional Relationships ONLY

✔ Allowed:

* Property → Builder

❌ Not allowed:

* Builder → Properties[]

👉 Reason:

* Avoid duplication
* Avoid sync issues
* Query instead of storing reverse relations

---

## 3. Collection vs Embedded Decision Rule

Ask:

> “Is this reused across multiple properties AND managed globally?”

### If YES → Collection

* Builder
* Amenities
* Users
* Quotations
* Expression of Interest
* Leads

### If NO → Embedded

* Units
* Nearby locations
* Boost data
* Property-specific structures

---

## 4. Hybrid Pattern (IMPORTANT)

Used for reusable + performance-critical data.

Example: Amenities

Structure:

* Relationship → source of truth
* Snapshot → fast read

Reason:

* Avoid deep population
* Improve performance

---

## 5. Embedding Strategy

Embed when:

* Data belongs ONLY to parent
* Data is always fetched with parent
* No independent lifecycle

Examples:

* UnitSpecification
* UnitConfiguration
* Nearby locations
* BoostedProperty

---

## 6. Do NOT Over-Normalize

❌ Avoid:

* Deep relational chains
* Multiple collections for tightly coupled data

👉 Reason:

* Payload is not a relational query engine
* Deep relations = slow queries

---

## 7. Use Groups for Structure

Use `group` when:

* Structuring fields logically

Example:

* location
* pricing
* media

👉 Improves CMS usability

---

## 8. Use Arrays for Repeatable Data

Use `array` when:

* Multiple entries expected

Examples:

* units
* configurations
* nearby places

---

## 9. Blocks (ONLY if needed)

Use blocks ONLY when:

* Dynamic content layouts (e.g. homepage builder)

❌ Do NOT use blocks for core data like properties

---

# ⚡ PERFORMANCE RULES

## 10. Index Critical Fields

Must index:

* city
* state
* price
* builder
* possessionStatus
* minPrice

👉 Required for scaling

---

## 11. Derived Fields (MANDATORY)

Precompute values during write.

Examples:

* minPrice
* maxPrice
* searchText

👉 Reason:

* Avoid runtime computation
* Faster queries

---

## 12. Avoid Deep Population

✔ Allowed:

* depth: 0
* depth: 1

❌ Avoid:

* depth > 1

---

## 13. Pagination Required

Always use:

* limit
* page

❌ Never fetch all records

---

## 14. Media Handling

✔ Use media collection
❌ Do NOT use JSON blobs

---

# 🌐 GLOBALS RULES

Use Globals ONLY for:

* Homepage
* Site settings
* SEO defaults

❌ Do NOT use for relational data

---

# 🚫 ANTI-PATTERNS (STRICTLY BLOCK)

Antigravity MUST reject if:

* Reverse relationships are added (Builder → Properties)
* UnitSpecification is made a collection
* Nearby is made a collection
* Boost is made a collection
* Deep nested relations introduced
* JSON blobs used for media
* No indexing on critical fields

---

# ✅ VALIDATION LOGIC FOR ANTIGRAVITY

If ER diagram differs from implementation:

👉 DO NOT "fix" by normalizing everything

Instead:

✔ Accept differences IF:

* Embedding is used intentionally
* Hybrid pattern is used
* Performance rules are followed

---

# 🧠 FINAL PRINCIPLE

👉 "Optimize for reads, not relational purity"

---

# 📌 INSTRUCTION TO ANTIGRAVITY

This schema intentionally diverges from the ER diagram.

Reason:

* Payload CMS requires read-optimized structure
* Avoiding deep joins
* Improving CMS usability

👉 Do NOT refactor to match ER diagram blindly

👉 Only suggest changes if:

* Rules above are violated
* Performance is impacted
* Data consistency is broken

Otherwise:
👉 ACCEPT current structure as correct

---

# 🔚 END
