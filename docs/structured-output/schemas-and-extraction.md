# Schemas & Extraction

Structured outputs make downstream processing safer by constraining shape. They do not automatically make the extracted facts true.

<img class="diagram" src="/diagrams/structured-output-pipeline.svg" alt="Structured extraction and validation pipeline">

## What schema conformance gives you

A strict output schema can guarantee properties such as:

- valid JSON;
- required keys;
- allowed types;
- enum membership;
- nested object shape;
- array item shape;
- additional-property restrictions.

This removes fragile “parse JSON from prose” logic.

## What schema conformance does not give you

A valid object may still contain:

- a fabricated value;
- the wrong date;
- a misread amount;
- an unsupported inference;
- a missing source reference;
- stale data;
- an overconfident interpretation.

Treat structure, semantics, and evidence as separate dimensions.

## Design the schema around uncertainty

If information may be absent, represent that honestly.

Poor design:

```json
{"phone": ""}
```

Better:

```json
{
  "phone": null,
  "phone_status": "not_present"
}
```

For uncertain fields, consider:

```json
{
  "value": "Acme Ltd",
  "status": "explicit",
  "evidence": {
    "source_id": "doc-17",
    "page": 2,
    "quote": "Acme Ltd"
  }
}
```

## Provenance in nested schemas

When downstream users need to verify extracted data, attach provenance at the field or claim level rather than only at the document level.

Example:

```json
{
  "invoice": {
    "vendor": {
      "value": "Northwind Services",
      "source": {"page": 1, "region": "header"}
    },
    "total": {
      "value": 1240.50,
      "currency": "EUR",
      "source": {"page": 2, "region": "totals"}
    }
  }
}
```

This makes review and correction targeted.

## Semantic extraction vs normalization

Use Claude for semantic interpretation:

- a leaf icon means vegetarian;
- “approx. two weeks” is a duration expression;
- a table row is the invoice total;
- two phrases refer to the same skill.

Use deterministic code for canonical conversion:

- remove currency symbols;
- convert to decimal;
- normalize dates;
- map labels to controlled enums;
- enforce locale rules;
- deduplicate exact identifiers.

## Verbatim extraction and inference

Define the allowed inference boundary explicitly.

Possible policies:

- **verbatim only** — return only text directly present;
- **normalized explicit** — normalize explicit text but do not infer;
- **supported inference** — infer only when evidence meets a rule;
- **open interpretation** — broader semantic extraction with uncertainty.

Do not ask for “skills” without defining whether implied skills count.

## Few-shot examples

Examples help when the extraction boundary is subtle. Cover:

- normal cases;
- compound phrases;
- missing values;
- ambiguous values;
- duplicates;
- conflicting fields;
- unusually long and short documents;
- unsupported inference.

Examples should vary, not repeat one easy format.

## Time and versioning

For time-sensitive extraction, store:

- source timestamp;
- extraction timestamp;
- model and prompt version;
- schema version;
- normalization version;
- evidence reference.

This makes stale or inconsistent records traceable.

## Schema design checklist

- Are optional and missing values explicit?
- Is uncertainty represented?
- Is evidence attached at the right granularity?
- Are dates, money, and units unambiguous?
- Are enums controlled?
- Can the schema evolve without losing history?
- Is semantic extraction separated from normalization?
- Can a reviewer trace every critical field to a source?
