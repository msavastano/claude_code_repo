# Claude Code Agent + Skill Example

This project demonstrates the canonical relationship between a **Skill** and an
**Agent** in Claude Code.

## Structure

```
.claude/
├── agents/
│   └── code-reviewer/
│       └── AGENT.md          ← The agent: who does the work
└── skills/
    └── code-quality/
        ├── SKILL.md          ← The skill: how to do the work
        ├── standards.md      ← Supporting reference (language rules)
        └── checklist.md      ← Supporting reference (pre-merge audit)
```

## The Relationship

```
You ──────────────────────────────────────► Parent Claude
                                                │
                                   @code-reviewer review auth.py
                                                │
                                                ▼
                                        code-reviewer Agent
                                        (separate Claude instance)
                                                │
                                      loads code-quality Skill
                                                │
                                                ▼
                                     SKILL.md ──► standards.md
                                      (always)     (if needed)
                                                │
                                                ▼
                                        Produces review
                                                │
                                                ▼
                                        Reports back to parent
```

**Skill** = the `code-quality` directory. Passive. Tells Claude _how_ to review
code — the format, severity definitions, and language rules. Loaded on demand.

**Agent** = the `code-reviewer`. Active. A separate Claude instance that _does_
the review by loading and following the Skill.

## Usage

```bash
# Quick review
@code-reviewer review src/auth.py

# Language-specific review (loads standards.md)
@code-reviewer review src/api.go for Go standards

# Full pre-merge audit (loads checklist.md)
@code-reviewer full audit of src/ before merging PR #42
```

## Key Design Principles

1. **Skill = knowledge, Agent = worker.** Don't put procedural instructions in
   the Agent — put them in the Skill so they're reusable by other agents too.

2. **Progressive disclosure.** The Skill only loads `standards.md` and
   `checklist.md` when relevant — keeps context efficient.

3. **Agent is read-only.** This agent never modifies files. Separation of
   concerns: review is separate from fixing.

4. **Clear invocation triggers.** Both the Skill description and Agent
   description use action-oriented keywords so Claude routes correctly.
