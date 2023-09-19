const valid = (req, res, next) => {
   
    if (!req.body) {
        
        throw `no body exists`;
    }
    if (!req.validated) {
        throw `must be validated`
    }
    if (req.joierror) {
        res.status(500)
        throw req.joierror;
    }
   
    next();

}
export default valid;