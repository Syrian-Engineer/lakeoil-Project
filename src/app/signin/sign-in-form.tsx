"use client";

import { useState, useEffect } from "react";
import { translate } from "@/translations/translate";
import { signInFormTranslations } from "@/translations/signinPage/signinFrom";
import { useRouter } from "next/navigation";
import { Input, Button, Title, Text, Password } from "rizzui";
import { PiArrowRightBold } from "react-icons/pi";

export default function SignInForm() {
  const lang = "en";
  const loginText = translate(signInFormTranslations, lang, "login");

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customServer, setCustomServer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("backend_url");
    if (saved) {
      setCustomServer(saved);
    }
  }, []);

  function getBackendUrl() {
    return customServer.trim() || null;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const backendUrl = getBackendUrl();

    if (!backendUrl) {
      setError("Please enter a server URL");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-backend-url": backendUrl,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const result = await response.json();

      const accessToken = result?.data?.access_token;
      const userRecord = result?.data?.user_record;

      if (!accessToken) {
        throw new Error("Login failed: no token received");
      }

      // Save for middleware
      document.cookie = `access_token=${accessToken}; path=/; samesite=lax`;
      document.cookie = `backend_url=${backendUrl}; path=/; max-age=86400; samesite=lax`;

      // Save for client usage
      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("user_record", JSON.stringify(userRecord));
      localStorage.setItem("email", email);
      localStorage.setItem("backend_url", backendUrl);

      router.push("/reports");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-6">
        <Title as="h6" className="mb-2">
          Server URL
        </Title>

        <Input
          type="text"
          placeholder="e.g. http://192.168.8.224:3000"
          value={customServer}
          onChange={(e) => setCustomServer(e.target.value)}
          required
        />
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          type="email"
          size="lg"
          label="Email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Password
          label="Password"
          placeholder="Enter your password"
          size="lg"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Text className="text-red-500 text-sm">
            {error}
          </Text>
        )}

        <Button
          className="w-full"
          type="submit"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Logging in...</span>
            </div>
          ) : (
            <>
              {/* <span>{loginText || "Login"}</span> */}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </>
  );
}