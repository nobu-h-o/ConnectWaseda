import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import type { Session, Account, AuthOptions } from "next-auth";

// Extend the Session and JWT interfaces with custom properties
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}

// Validate environment variables
function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Get environment variables
const googleClientId = getRequiredEnvVar("GOOGLE_CLIENT_ID");
const googleClientSecret = getRequiredEnvVar("GOOGLE_CLIENT_SECRET");
const nextAuthSecret = getRequiredEnvVar("NEXTAUTH_SECRET");

// Auth options configuration
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
  ],
  secret: nextAuthSecret,
  session: {
    // Define strategy with the correct SessionStrategy type
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    /**
     * SignIn callback to restrict access to waseda.jp email addresses only
     */
    async signIn({ user }) {
      const email = user.email;
      
      // Check if the email is valid and ends with waseda.jp
      if (!email || !email.endsWith('waseda.jp')) {
        return false; // Block sign in
      }
      
      return true; // Allow sign in
    },
    
    /**
     * JWT callback to enhance the token with additional data
     */
    async jwt(params: { token: JWT; account: Account | null | undefined }): Promise<JWT> {
      const { token, account } = params;
      
      if (account?.access_token) {
        token.accessToken = account.access_token;
        
        // Preserve existing refreshToken if no new one is provided
        token.refreshToken = account.refresh_token ?? token.refreshToken;
      }
      
      return token;
    },
    
    /**
     * Session callback to add token data to the session
     */
    async session(params: { session: Session; token: JWT }): Promise<Session> {
      const { session, token } = params;
      
      // Only set properties if they exist on the token
      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken;
      }
      
      if (typeof token.refreshToken === "string") {
        session.refreshToken = token.refreshToken;
      }
      
      return session;
    },
  },
};

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export handler for API routes
export { handler as GET, handler as POST, handler as PUT };