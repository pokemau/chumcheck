'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { useGetStartupData } from '@/hooks/useGetStartup';
import { getCurrentTab } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Spinner } from '../ui/shadcn-io/spinner';

export function StartupBreadcrumb() {
  const pathName = usePathname().split('/');
  const startupId = Number(pathName[2]);
  const currentTab = pathName[3];

  const { data: startup, isLoading, error } = useGetStartupData(startupId);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {isLoading ? <Spinner className="h-4" /> : startup?.name || 'Unknown Startup'}
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentTab ? getCurrentTab(currentTab) : 'Unkown'}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {isLoading ? (
        <h1 className="text-2xl font-bold mt-4 mb-2">Loading...</h1>
      ) : (
        <h1 className="text-2xl font-bold mt-4 mb-2">{startup?.name}</h1>
      )}
    </>
  );
}
