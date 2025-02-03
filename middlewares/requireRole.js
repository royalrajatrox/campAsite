module.exports = (requiredRole) => {
    return (req, res, next) => {
        // Check if the user is logged in
        if (!req.user) {
            return res.status(401).send({ error: 'You must log in!' });
        }

        // Check if the user's role matches the required role
        if (req.user.role !== requiredRole) {
            return res.status(403).send({ error: 'Access denied!' });
        }

        next(); // Proceed to the next middleware or route handler
    };
};
