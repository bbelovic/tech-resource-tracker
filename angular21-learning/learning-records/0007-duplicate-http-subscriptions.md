# Duplicate HTTP Subscriptions

The learner correctly identified that calling `getTechResourceById(id)` twice can produce duplicate HTTP requests and therefore duplicate backend/database work. Future lessons can build on this with the concept that Angular `HttpClient` observables are cold and that reusing a stream may require sharing or restructuring.
