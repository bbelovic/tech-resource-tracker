# Modern Angular 21 Resources

## Knowledge

- [Angular: HTTP Client overview](https://angular.dev/guide/http)
  Use for: understanding Angular's `HttpClient`, typed response values, error handling, interceptors, and testing support.
- [Angular: Making HTTP requests](https://angular.dev/guide/http/making-requests)
  Use for: typed `http.get<T>()` / `http.post<T>()`, mutation requests, request bodies, and the fact that subscribing fires the HTTP request.
- [Angular: Setting up HttpClient](https://angular.dev/guide/http/setup)
  Use for: the modern `provideHttpClient()` setup path and migration away from legacy module wiring.
- [Angular: Signals](https://angular.dev/guide/signals)
  Use for: local UI state, signal reads/writes, computed state, and how Angular tracks signal usage in templates.
- [Angular: Template control flow](https://angular.dev/guide/templates/control-flow)
  Use for: replacing `*ngIf`, `*ngFor`, and `ngSwitch` with `@if`, `@for`, and `@switch`.
- [TypeScript Handbook: Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
  Use for: interfaces, object shapes, optional fields, and how TypeScript describes data contracts.
- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
  Use for: understanding `Observable<T>`, `HttpClient.get<T>()`, and typed reusable APIs.
- [RxJS: firstValueFrom](https://rxjs.dev/api/index/function/firstValueFrom)
  Use for: replacing obsolete `toPromise()` when code truly needs a promise.

## Wisdom (Communities)

- [Angular GitHub discussions](https://github.com/angular/angular/discussions)
  Use for: real-world migration questions and framework behavior discussion.
- [Angular Discord](https://discord.gg/angular)
  Use for: quick feedback from Angular practitioners when official docs are not enough.

## Gaps

- We still need to decide whether to keep Karma/Jasmine long term or migrate tests toward the newer Angular 21 testing defaults.
