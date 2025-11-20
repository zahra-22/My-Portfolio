export default function isAdmin(req, res, next) {
  console.log(" isAdmin middleware running...");
  console.log(" req.user received from JWT:", req.user);

  if (!req.user) {
    console.log(" No user found in request");
    return res.status(401).json({ message: "Not logged in" });
  }

  if (req.user.role !== "admin") {
    console.log(" User role is NOT admin →", req.user.role);
    return res.status(403).json({ message: "Only administrators can add projects" });
  }

  console.log(" ADMIN CONFIRMED — proceeding to create project");
  next();
}
