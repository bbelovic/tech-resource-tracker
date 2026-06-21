# Typed Service Return Types

The learner correctly identified that Angular service HTTP methods should normally expose `Observable<T>` where `T` is the concrete domain type, such as `TechResource`, `TechResourceDetailsDTO`, or an array of those types. Future lessons can build on this by practicing how to choose `T` from backend contracts and how to remove weak `Observable<Object>` and obsolete `toPromise()` usage.
