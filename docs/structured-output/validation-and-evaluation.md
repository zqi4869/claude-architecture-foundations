# Validation, Repair & Evaluation

A reliable extraction or classification pipeline needs more than a good prompt. It needs an observable validation and evaluation loop.

## Validation-error repair

If a model returns a value that fails validation, repeating the same request often repeats the same error. Provide the exact validation feedback.

Example:

```text
Field: quantity
Expected: number
Received: "2 to 3"
Instruction: return a single numeric value only if the source explicitly provides one; otherwise return null and mark the field ambiguous.
```

This converts a blind retry into a targeted repair.

## Bound the repair loop

A repair policy should define:

- maximum attempts;
- which errors are repairable;
- whether the original source remains available;
- when to return partial output;
- when to route to human review;
- how every attempt is logged.

Do not retry indefinitely.

## Validate at multiple layers

### Structural validation

- valid JSON;
- required fields;
- types and enums.

### Semantic validation

- amount is non-negative;
- end date is after start date;
- percentage is in range;
- identifier exists;
- totals reconcile.

### Source-fidelity validation

- critical fields have evidence;
- quotes exist in the source;
- unsupported inference is absent;
- conflicts are preserved.

### Business validation

- policy rules;
- downstream acceptance criteria;
- permissions and ownership;
- duplicate detection.

## Define success before tuning

Prompt improvement is meaningful only when success is measurable.

Define:

- unit of evaluation;
- target metrics;
- critical error types;
- edge-case distribution;
- acceptable abstention rate;
- review capacity;
- downstream impact.

## Aggregate accuracy can mislead

A system with 97% overall accuracy may fail badly on:

- a rare document type;
- high-value financial fields;
- handwritten sources;
- a specific language;
- long tables;
- low-quality scans.

Segment evaluation by document type, field, risk, and source quality.

## Confidence is not enough

Model-reported confidence may be poorly calibrated. Combine it with observable signals:

- evidence present or absent;
- source contradiction;
- validation failures;
- document quality;
- out-of-distribution indicators;
- disagreement across methods;
- historical segment performance.

## Human review strategy

Use two complementary approaches:

1. **Risk-based review** for ambiguity, high impact, and failure signals.
2. **Random sampling** to detect silent failure in apparently easy cases.

If reviewer capacity is limited, prioritize high-impact uncertainty while preserving a small unbiased sample.

## Regression suites

A useful evaluation set contains:

- representative normal cases;
- known historical failures;
- boundary values;
- missing and conflicting fields;
- adversarial or misleading layouts;
- stale data situations;
- tool and backend failures.

Run the same suite when changing:

- prompt;
- model;
- schema;
- normalization code;
- OCR or preprocessing;
- tool definitions.

## Production monitoring

Track:

- schema failure rate;
- repair success rate;
- abstention rate;
- review rate;
- reviewer correction rate;
- error rate by segment;
- unsupported inference rate;
- missing provenance rate;
- downstream rejection rate;
- latency and cost.

## Evaluation principle

<div class="decision-banner">
A result is reliable only when the system can explain what was checked, what evidence supported it, and which failures remain possible.
</div>
