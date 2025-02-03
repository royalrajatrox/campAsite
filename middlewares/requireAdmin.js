module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }

    if (!req.user.isAdmin) {
        return res.status(403).send({ error: 'Admin access required!' });
    }

    next(); // Proceed to the next middleware or route handler
};
