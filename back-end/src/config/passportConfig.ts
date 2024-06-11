import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

// Dummy user data
const users = {
  "user@example.com": { id: 1, password: "password123", name: "John Doe" },
};

// Configure the local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users[username];
    if (user && user.password === password) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect username or password." });
    }
  })
);

// Serialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id: number, done) => {
  const user = Object.values(users).find((user) => user.id === id);
  done(null, user);
});

export default passport;
