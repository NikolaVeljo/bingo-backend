const profile = ( req, res ) => {
    res.status(200).json(req.session);
}

module.exports = {
    profile,
}