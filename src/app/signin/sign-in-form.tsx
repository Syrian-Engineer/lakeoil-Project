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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [serverType, setServerType] = useState<"central" | "local" | null>(null);
  const [customLocalServer, setCustomLocalServer] = useState("");
  const CENTRAL_SERVER = "http://central.oktin.ak4tek.com:3950";

  useEffect(() => {
    const saved = localStorage.getItem("backend_url");
    if (saved) {
      if (saved === CENTRAL_SERVER) {
        setServerType("central");
      } else {
        setServerType("local");
        setCustomLocalServer(saved);
      }
    }
  }, []);

  function selectCentral() {
    setServerType("central");
    localStorage.setItem("backend_url", CENTRAL_SERVER);
  }

  function selectLocal() {
    setServerType("local");
  }

  function getBackendUrl() {
    if (serverType === "central") {
      return CENTRAL_SERVER;
    }

    if (serverType === "local" && customLocalServer) {
      return customLocalServer.startsWith("http")
        ? customLocalServer
        : `${customLocalServer}`;
    }

    return null;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const backendUrl = getBackendUrl();

    if (!backendUrl) {
      setError("Please select or enter a server first");
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
      // ✅ Save for middleware (SERVER SIDE)
        // document.cookie = `access_token=${accessToken}; path=/; samesite=lax; httpOnly: true`;
        document.cookie = `backend_url=${backendUrl}; path=/; max-age=86400; samesite=lax`;
      // ✅ Save for client usage
        sessionStorage.setItem("access_token", accessToken);
        sessionStorage.setItem("user_record", JSON.stringify(userRecord));
        localStorage.setItem("email", email);
        localStorage.setItem("backend_url", backendUrl);

      const isSuperAdmin = userRecord?.roles?.name === "SuperAdmin";
      localStorage.setItem("isSuperAdmin", isSuperAdmin ? "true" : "false");

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
      {/* 🔵 SERVER SELECTION */}
      <div className="mb-6 space-y-4">
        <Title as="h6">Select Server</Title>

        <div className="flex gap-3">
          <Button
            type="button"
            variant={serverType === "central" ? "solid" : "outline"}
            onClick={selectCentral}
            className="w-full"
          >
            🌍 Central Server
          </Button>

          <Button
            type="button"
            variant={serverType === "local" ? "solid" : "outline"}
            onClick={selectLocal}
            className="w-full"
          >
            🏠 Local Server
          </Button>
        </div>

        {/* Show input only when local selected */}
        {serverType === "local" && (
          <Input
            type="text"
            placeholder="Enter local server (e.g. 192.168.8.224:3000)"
            value={customLocalServer}
            onChange={(e) => setCustomLocalServer(e.target.value)}
          />
        )}
      </div>

      {/* 🔐 LOGIN FORM */}
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
          <Text className="text-red-500 text-sm">{error}</Text>
        )}

        <Button className="w-full" type="submit" size="lg" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Logging in...</span>
            </div>
          ) : (
            <>
              <span>Login</span>
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </>
  );
}