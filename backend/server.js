import 'dotenv/config';
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "users.json");

// --- SECURE KEYS: Pulling from .env file ---
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

app.use(cors({ 
    origin: "http://127.0.0.1:5500", 
    credentials: true 
}));

app.use(express.json());
app.use(session({ 
    secret: "medication-tracker-secure-key", 
    resave: false, 
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true } 
}));

app.use(passport.initialize());
app.use(passport.session());

function readUsers() {
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "{}");
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeUsers(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    let users = readUsers();
    if (!users[profile.id]) {
        users[profile.id] = { name: profile.displayName, email: profile.emails[0].value, medications: [] };
        writeUsers(users);
    }
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    const users = readUsers();
    done(null, users[id] ? { id, ...users[id] } : null);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "http://127.0.0.1:5500" }),
    (req, res) => res.redirect("http://127.0.0.1:5500") 
);

app.get("/auth/status", (req, res) => {
    if (req.isAuthenticated()) res.json({ loggedIn: true, user: req.user });
    else res.json({ loggedIn: false });
});

app.get("/logout", (req, res) => {
    req.logout(() => res.redirect("http://127.0.0.1:5500"));
});

app.get("/medications", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json([]);
    const users = readUsers();
    res.json(users[req.user.id].medications || []);
});

app.post("/medications", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send();
    let users = readUsers();
    const newMed = { id: Date.now(), status: "Pending", ...req.body };
    users[req.user.id].medications.push(newMed);
    writeUsers(users);
    res.status(201).json(newMed);
});

app.listen(PORT, () => console.log(`🚀 Secure Server running on http://localhost:${PORT}`));