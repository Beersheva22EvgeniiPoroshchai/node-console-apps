//middleware validation  for requests which contain body

export function validate(schema) {
   return (req, res, next) => 
   { 
    if (!schema) {
    schema = req.schema;
}
 if (schema && req.body) {
        const {error} = schema.validate(req.body);
        req.validated = true;
        if (error) {
        req.joiError = error.details[0].message;
        }
     
   }
  next();
}
}