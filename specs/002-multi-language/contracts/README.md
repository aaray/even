# API Contracts: Multi-Language Support

**Feature**: 002-multi-language
**Date**: 2026-02-05

## Summary

This feature requires **no API changes**. All internationalization is handled client-side:

- Translation strings are bundled with the frontend
- Language preference is stored in browser localStorage
- Formatting uses browser Intl APIs with locale parameter
- No server-side rendering of translated content

## Existing API Endpoints (Unchanged)

The following endpoints continue to operate identically:

| Endpoint | Status | Notes |
|----------|--------|-------|
| `GET /artist` | Unchanged | Returns artist data (name, bio untranslated) |
| `GET /products` | Unchanged | Returns product data (titles untranslated) |
| `GET /earnings` | Unchanged | Returns numeric data (formatted client-side) |
| `GET /fans` | Unchanged | Returns numeric data (formatted client-side) |
| `GET /health` | Unchanged | Health check |

## Future Considerations

If the application later requires:
- Server-side rendered translations
- User preference stored in database
- API-driven translation content

Then new contracts would be added:

```
POST /user/preferences
{
  "language": "en" | "es" | "pt-BR"
}

GET /user/preferences
→ { "language": "en" }
```

This is **not in scope** for the current implementation.
