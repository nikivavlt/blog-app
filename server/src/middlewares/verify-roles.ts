// const verifyRoles = (...allowedRoles) => {
 // 5:24:00 Dave Gray
// }
// isAllowed true/ false


// const verifyRoles = (...allowedRoles) => {
//     return (req, res, next) => {
//         if (!req?.roles) return res.sendStatus(401);
//         const rolesArray = [...allowedRoles];
//         const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
//         if (!result) return res.sendStatus(401);
//         next();
//     }
// }

