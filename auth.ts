import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  pages: {
    signIn: "/login", // 로그인 페이지 경로
  },
  callbacks: {
    async signIn({ user, account }) {
      const apiUrl = process.env.API_URL;
      const { name, email } = user;

      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // 새로 작성한 user-auth API 호출
          const userAuthRes = await fetch(`${apiUrl}/api/user-auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: { name, email } }),
          });

          // API 응답이 성공적이지 않을 경우 로그인 차단
          if (!userAuthRes.ok) {
            console.error("Failed to authenticate user via user-auth API");
            return false;
          }

          // 성공적으로 로그인 허용
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }

      // 다른 provider일 경우 false 반환
      return false;
    },
  },
});
