// import jwt from 'jsonwebtoken';

// const userAuth = async (req, res, next) => {
//     // 1. CORRECTLY extract the token (from "Bearer <token>" or "token" header)
//     const authHeader = req.headers.authorization || req.headers.token;
    
//     // 2. Check if token exists
//     if (!authHeader) {
//         return res.status(401).json({
//             success: false,
//             message: 'Authorization token missing'
//         });
//     }

//     // 3. Extract the clean token (remove "Bearer " prefix if present)
//     const token = authHeader.startsWith('Bearer ') 
//         ? authHeader.split(' ')[1] 
//         : authHeader;

//     // 4. Verify the token (now guaranteed to be a string)
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { id: decoded.id }; // Attach to request
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: 'Invalid token: ' + error.message
//         });
//     }
// };

// export default userAuth;



import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        // 1. Get token from headers (support both 'Authorization' and 'token' headers)
        const authHeader = req.headers.authorization || req.headers.token;
        
        if (!authHeader) {
            throw new Error('Authorization token missing');
        }

        // 2. Extract token from "Bearer <token>" or raw token
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.split(' ')[1] 
            : authHeader;

        if (!token) {
            throw new Error('Malformed token');
        }

        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();

    } catch (error) {
        console.error('Authentication Error:', error.message);
        return res.status(401).json({
            success: false,
            message: error.message || 'Authentication failed' // Ensure message is always a string
        });
    }
};

export default userAuth;