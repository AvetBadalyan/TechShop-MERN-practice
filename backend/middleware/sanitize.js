// Guards against NoSQL (MongoDB operator) injection by removing any object
// keys that start with "$" or contain ".". These are the characters attackers
// use to smuggle query operators (e.g. { "$gt": "" }) into req.body/query.
//
// Note: in Express 5, req.query is a read-only getter, so we mutate the
// contents of each object in place rather than reassigning it. This replaces
// the unmaintained `express-mongo-sanitize` package.

const FORBIDDEN = /^\$|\./;

const sanitizeInPlace = (value) => {
  if (Array.isArray(value)) {
    value.forEach(sanitizeInPlace);
    return;
  }
  if (value !== null && typeof value === "object") {
    for (const key of Object.keys(value)) {
      if (FORBIDDEN.test(key)) {
        delete value[key];
      } else {
        sanitizeInPlace(value[key]);
      }
    }
  }
};

const sanitize = (req, res, next) => {
  // req.query's contents are mutable even though the property itself isn't.
  if (req.body) sanitizeInPlace(req.body);
  if (req.params) sanitizeInPlace(req.params);
  if (req.query) sanitizeInPlace(req.query);
  next();
};

export default sanitize;
