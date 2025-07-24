import { StartupBreadcrumb } from "@/components/startups/StartupBreadcrumb";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StartupBreadcrumb />
      <div>{children}</div>
    </>
  );
}
