# Mission: Modern Angular 21 Refactoring

## Why
Learn enough modern TypeScript and Angular 21 to safely refactor `tech-resource-tracker` from older Angular patterns to current typed services, modern component state, and reliable E2E-tested UI behavior.

## Success looks like
- Refactor Angular services from weak `Object` types and `toPromise()` to typed `Observable<T>` and deliberate promise conversion where needed.
- Explain how data moves from `HttpClient` through RxJS into component state and the template.
- Modernize one component at a time using Angular 21 patterns while keeping CI green.
- Debug rendering and E2E failures using evidence instead of guesswork.

## Constraints
- Use this repository as the practice project.
- Keep lessons small and practical.
- Prefer incremental, reviewable changes over large rewrites.
- Preserve the current passing CI behavior unless a lesson explicitly runs an experiment.

## Out of scope
- Rewriting the entire frontend in one pass.
- Replacing Angular with another framework.
- Deep backend refactoring except where it clarifies frontend contracts.
