module.exports = (thefunc) => (req, res, next) => {
    Promise.resolve(thefunc(req, res, next)).catch((err) => {
        next(err); // Pass the error to Express error handling middleware
    });
};
