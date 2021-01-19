module.exports = asyncHandler = (callback) => (req, res, next) => {
    callback(req, res, next).catch(next);
};
