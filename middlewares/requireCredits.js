module.exports = (req, res, next) => {
    if(!req.user.credits){
        return res.status(403).send({error: 'you must have credits to create surveys!'});
    }

    next();
};