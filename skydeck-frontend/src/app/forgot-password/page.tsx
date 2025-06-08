import { getSession } from "@/app/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | SkyDeck",
  description: "Reset your SkyDeck account password",
};

export default async function ForgotPasswordPage() {
  const user = await getSession();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            We'll send you a link to reset your password
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          action="/api/auth/forgot-password"
          method="POST"
        >
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Send Reset Link
            </button>
          </div>

          <div className="text-center text-sm">
            <Link
              href="/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Return to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
