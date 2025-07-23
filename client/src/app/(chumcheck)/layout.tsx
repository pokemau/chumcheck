import { AppHeader } from "@/components/AppHeader";
import { getUser } from "@/lib/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  // const role = await getUserRole();
  const user = await getUser();

  return (
    <div className="flex h-full flex-col overflow-x-hidden">

      <div
        className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#ecf3fc_1px,transparent_1px)] [background-size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#171e31_1px,transparent_1px)]"
      ></div>

      <AppHeader user={user} />

      <div className="mx-auto my-5 flex h-full w-4/5 flex-col">
        <div className="min-h-14"></div>
        <div
          className="flex-1 h-full"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

