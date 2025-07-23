'use client';

import { use, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { QualificationStatus } from '@/lib/enums';
import { Startup, User } from '@/lib/types';
import PendingStartupDialog from './PendingStartupDialog';
import RatedStartupDialog from './RatedStartupDialog';
import QualifiedStartupDialog from './QualifiedStartupDialog';

interface ApplicationsProps {
  startupsPromise: Promise<Startup[]>;
  mentorsPromise: Promise<User[]>;
}

export default function Applications({ startupsPromise, mentorsPromise }: ApplicationsProps) {
  const startups = use(startupsPromise);
  const mentors = use(mentorsPromise);

  const [selectedStartupId, setSelectedStartupId] = useState<number | null>(null);
  const [dialogType, setDialogType] = useState<'pending' | 'rated' | 'qualified' | null>(null);

  const pendingStartups = startups.filter((startup) => startup.qualificationStatus === QualificationStatus.PENDING);
  const ratedStartups = startups.filter((startup) => startup.qualificationStatus === QualificationStatus.RATED);
  const qualifiedStartups = startups.filter((startup) => startup.qualificationStatus === QualificationStatus.QUALIFIED);

  const handleStartupClick = (startupId: number, type: 'pending' | 'rated' | 'qualified') => {
    setSelectedStartupId(startupId);
    setDialogType(type);
  };

  const closeDialog = () => {
    setSelectedStartupId(null);
    setDialogType(null);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rated">Rated</TabsTrigger>
          <TabsTrigger value="qualified">Qualified</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Table className="border-1">
            <TableHeader>
              <TableRow>
                <TableHead>Startup</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Leader</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingStartups.length > 0 ? (
                pendingStartups.map((startup) => (
                  <TableRow
                    key={startup.id}
                    className="cursor-pointer"
                    onClick={() => handleStartupClick(startup.id, 'pending')}
                  >
                    <TableCell className="font-medium">{startup.name}</TableCell>
                    <TableCell>{startup.groupName}</TableCell>
                    <TableCell>{startup.user ? `${startup.user.firstName} ${startup.user.lastName}` : 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    No pending startups found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="rated">
          <Table className="border-1">
            <TableHeader>
              <TableRow>
                <TableHead>Startup</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Leader</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ratedStartups.length > 0 ? (
                ratedStartups.map((startup) => (
                  <TableRow
                    key={startup.id}
                    className="cursor-pointer"
                    onClick={() => handleStartupClick(startup.id, 'rated')}
                  >
                    <TableCell className="font-medium">{startup.name}</TableCell>
                    <TableCell>{startup.groupName}</TableCell>
                    <TableCell>{startup.user ? `${startup.user.firstName} ${startup.user.lastName}` : 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    No rated startups found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="qualified">
          <Table className="border-1">
            <TableHeader>
              <TableRow>
                <TableHead>Startup</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Leader</TableHead>
                <TableHead>Mentor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qualifiedStartups.length > 0 ? (
                qualifiedStartups.map((startup) => (
                  <TableRow
                    key={startup.id}
                    className="cursor-pointer"
                    onClick={() => handleStartupClick(startup.id, 'qualified')}
                  >
                    <TableCell className="font-medium">{startup.name}</TableCell>
                    <TableCell>{startup.groupName}</TableCell>
                    <TableCell>{startup.user ? `${startup.user.firstName} ${startup.user.lastName}` : 'N/A'}</TableCell>
                    <TableCell>
                      {startup.mentors && startup.mentors.length > 0
                        ? startup.mentors.map((mentor) => `${mentor.firstName} ${mentor.lastName}`).join(', ')
                        : 'No mentor assigned'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No qualified startups found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      {selectedStartupId && dialogType === 'pending' && (
        <PendingStartupDialog open={true} onOpenChange={closeDialog} startupId={selectedStartupId} />
      )}

      {selectedStartupId && dialogType === 'rated' && (
        <RatedStartupDialog open={true} onOpenChange={closeDialog} startupId={selectedStartupId} mentors={mentors} />
      )}

      {selectedStartupId && dialogType === 'qualified' && (
        <QualifiedStartupDialog open={true} onOpenChange={closeDialog} startupId={selectedStartupId} />
      )}
    </div>
  );
}
