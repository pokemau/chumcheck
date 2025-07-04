'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import clsx from "clsx";
import { User } from "@/lib/types";

interface NavLink {
  name: string;
  href: string;
}

export function AppHeader({ user }: { user: User }) {

  const pathName = usePathname();

  const getStartupInfo = () => {
    const match = pathName.match(/^\/startups\/(\d+)\/(.+)$/);
    return {
      isStartupDetailPage: Boolean(match && match[2] !== 'pending'),
      startupId: match?.[1],
      currentPage: match?.[2]
    };
  };

  const { isStartupDetailPage, startupId } = getStartupInfo();

  const getNavLinks = (): NavLink[] => {
    if (isStartupDetailPage && startupId) {
      return [
        { name: 'Readiness', href: `/startups/${startupId}/readiness-level` },
        { name: 'RNA', href: `/startups/${startupId}/rna` },
        { name: 'RNS', href: `/startups/${startupId}/rns` },
        { name: 'Initiatives', href: `/startups/${startupId}/initiatives` },
        { name: 'Roadblocks', href: `/startups/${startupId}/roadblocks` },
        { name: 'Progress', href: `/startups/${startupId}/progress` },
        { name: 'Overview', href: `/startups/${startupId}/overview` },
      ];
    }

    return [
      { name: 'Startups', href: '/startups' },
      { name: 'Account', href: '/account/profile' },
    ];
  };

  const navLinks = getNavLinks();

  const isActiveLink = (href: string) => {
    return pathName === href || pathName.startsWith(href);
  };

  return (

    <header
      className="text-flutter-gray dark:text-flutter-white fixed left-1/2 top-0 z-10 flex h-16 w-screen -translate-x-1/2 justify-center border-b transition-all duration-300"
    >
      <nav className="flex h-16 w-4/5 items-center p-[var(--navbar-padding,0.5rem)] px-0">

        <div className="flex flex-1 cursor-pointer gap-2">
          <Image
            src="/logo.png"
            alt="citeams_logo"
            className="h-7 w-7"
            width={167 / 5}
            height={165 / 5}
          />
          <Link href="/startups" className="cursor-pointer text-xl font-black normal-case">ChumCheck</Link>
        </div>

        <div className="flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'relative flex h-[48px] grow items-center justify-center gap-2 rounded-md text-sm font-medium hover:text-blue-600 md:flex-none md:justify-start transition-colors',
                {
                  'text-blue-600': isActiveLink(link.href)
                }
              )}
            >
              <p className="hidden md:block">{link.name}</p>

              {isActiveLink(link.href) && (
                <div className="bg-blue-600 absolute bottom-0 l-0 h-[1px] w-full"></div>
              )}
            </Link>
          ))}
        </div>

        <Separator orientation="vertical" className="mx-4"/>

        <Badge
          variant="outline"
          className="bg-flutter-gray/20 h-8 rounded-full text-sm font-normal"
        >{user.role}</Badge>

      </nav>

    </header>
  )
}

