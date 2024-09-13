import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import pg from "pg";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Express Session Middleware
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 86400000 }, // 1 day
    })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());


const db = new pg.Client({
    // connectionString: process.env.DATABASE_URL,
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, result.rows[0]);
});

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if the user already exists
                let result = await db.query("SELECT * FROM users WHERE google_id = $1", [profile.id]);

                if (result.rows.length === 0) {
                    // Register the new user
                    result = await db.query(
                        "INSERT INTO users (google_id, username, email, name) VALUES ($1, $2, $3, $4) RETURNING *",
                        [profile.id, profile.displayName, profile.emails[0].value, profile.name.givenName]
                    );
                }

                return done(null, result.rows[0]);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// Routes for Register and Login with Local Strategy
app.post("/register", async (req, res) => {
    console.log(req.body);
    // console.log(req);
    const { name, username, email, password } = req.body;
    const saltRounds = 12;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await db.query(
            "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, username, email, hashedPassword]
        );
        res.json({ success: true, user: result.rows[0] });
    } catch (error) {
        if (error.code === "23505") {
            res.status(400).json({ message: "User already registered" });
        } else {
            res.status(500).json({ message: "Registration failed" });
        }
    }
});

app.post("/login", async (req, res) => {
    console.log(req.body);
    // console.log(req);
    const { username, password } = req.body;

    try {
        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = result.rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.user = user;
            res.json({ success: true, token: req.sessionID });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
});

// Google OAuth Routes
app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // Successful authentication
        res.redirect("/home");
    }
);

app.get("/session", (req, res) => {
    if (req.session.user) {
        res.json({ isLoggedIn: true, user: req.session.user });
    } else {
        res.json({ isLoggedIn: false });
    }
});

app.get("/library", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const result = await db.query("SELECT * FROM code WHERE user_id = $1", [
            req.session.user.id,
        ]);
        res.json({ codes: result.rows });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch codes" });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
