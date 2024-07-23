import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-7xl text-primary">Protected Page</h1>
        <p className="text-neutral text-lg">
          This page is protected. Only authenticated users can access it.
        </p>
        <AuthButton />
      </div>
    </div>
  );
}
