import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/home");
  };

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-8 px-8 pt-8 sm:max-w-5xl">
      <Link href={"/"} className="bg-buttonSecondary self-start rounded-xl p-2">
        Back
      </Link>
      <form className="mb-32 flex w-full flex-1 flex-col justify-center gap-2 text-foreground sm:max-w-md">
        <h1 className="text-3xl text-primary">Log In</h1>
        <label className="text-md text-textPrimary" htmlFor="email">
          Email
        </label>
        <input
          className="border-inputBorder mb-6 rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="border-inputBorder mb-6 rounded-md border-1 bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-buttonPrimary mb-2 rounded-md px-4 py-2 text-foreground"
          pendingText="Signing In..."
        >
          Log in
        </SubmitButton>
        <div className="flex flex-row justify-center">
          <p className="mr-2">Don't have an account?</p>
          <Link href={"/signup"} className="text-blue-600">
            Sign Up!
          </Link>
        </div>
      </form>
    </div>
  );
}
