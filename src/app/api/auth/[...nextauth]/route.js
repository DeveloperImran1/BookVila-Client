import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from "axios";

export const authOptions = {
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days session
    },
    providers: [
        // Email/password login with credentials
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                const userInfo = { email, password }


                // Validation
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                const res = await axios.post(`http://localhost:9000/getSingleUser`, userInfo)
                const currentUser = res?.data;
console.log("userInfo", userInfo, "currentUser", currentUser)
                // User not found or password not match
                if (!currentUser?.success) {
                    throw new Error(currentUser?.message);
                }

                return currentUser; // Successful login
            },
        }),
        // Google login provider
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        //  Facebook login provider
        FacebookProvider({
            clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }) {
            const { email, name, image } = user;


console.log("user is ", user, "account is", account, "profile is", profile)

            if (account?.provider === 'google' || account?.provider === 'facebook') {
                try {
                    console.log("Google or facebood user info is", user, "Account is ", account, "profile is ", profile)

                    const newUser = {
                        name: name,
                        email: email,
                        photo: image,
                      }
                  
                      console.log("newUser", newUser)
                      const resp = await axios.post('http://localhost:9000/addeNewUser', newUser)
                      console.log("SignUp korar por responce is ", resp)

                   
                    // Return user details
                    return true;
                } catch (error) {
                    console.error('Error during social sign-in:', error);
                    return false; // Fail the sign-in process if error occurs
                }
            }

            return true; // Allow normal sign-in for credentials
        },
        async jwt({ token, user }) {
            if (user) {
                console.log("Assigning user to token:", user);
                token.id = user.id || user.sub; // Use `sub` for Google users
                token.name = user.name;
                token.email = user.email;
                token.photo = user.image; // Corrected property
            }
            return token;
        },
        async session({ session, token }) {
            console.log("Populating session with token data:", token);
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image = token.photo; // Adjusted to match `photo`
            return session;
        },
    },

    pages: {
        signIn: '/login' // Custom sign-in page
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
