import { Card } from "@/components/ui/card";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#ecf3fc_1px,transparent_1px)] [background-size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#171e31_1px,transparent_1px)]"></div>
      <div className="flex h-screen w-scren items-center justify-center">
        <Card className="flex h-4/5 w-4/5 items-center justify-center bg-white shadow-lg dark:bg-[#020817] py-0">
          {children}
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
