// Login a user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      birthDate: user.birthDate,
      gender: user.gender,
      role: user.role,
    },
  });
};

// Logout a user
export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const decoded = jwt.decode(token);

    if (!decoded || !decoded.exp) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const expiresAt = new Date(decoded.exp * 1000);

    const blacklisted = await BlacklistedToken.findOne({ token });

    if (blacklisted) {
      return res.status(400).json({ message: "Token already blacklisted" });
    }

    await BlacklistedToken.create({ token, expiresAt });

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
};
