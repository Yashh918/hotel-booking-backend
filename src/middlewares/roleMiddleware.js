export const isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin') {
        return res
            .status(403)
            .json({message: "Access denied. Admin only!"});
    }

    next();
}

export const isVendor = (req, res, next) => {
    if(req.user.role !== 'vendor'){
        return res
            .status(403)
            .json({message: "Acces denied. Vendor only!"});
    }
    next();
}

export const isCustomer = (req, res, next) => {
    if(req.user.role !== 'customer'){
        return res
            .status(403)
            .json({message: "Acces denied. Customer only!"})
    }
    next()
}