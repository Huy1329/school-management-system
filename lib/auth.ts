import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

type JWTToken = { [key: string]: unknown; id?: string | number };
type AuthUser = { id?: string | number };
type AuthSession = { user?: { id?: string | number } } & Record<
  string,
  unknown
>;

export const auth = betterAuth({
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },
  database: new Pool({
    connectionString: process.env.DATABASE_URL, // ✅ Nên dùng env thay vì hardcode
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 ngày
  },
  callbacks: {
    async jwt({ token, user }: { token: JWTToken; user?: AuthUser }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: AuthSession;
      token: JWTToken;
    }) {
      if (token?.id) {
        session.user = session.user || {};
        session.user.id = token.id;
      }
      return session;
    },
  },
});
