'use client'
import { Card, CardContent } from "@/components/ui/card";
import { QualificationStatus, TaskStatus } from "@/lib/enums";
import { Startup } from "@/lib/types";
import { startupStatusMap } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Startups({ startups }: { startups: Startup[] }) {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Startups");

  const filterStatusMap: Record<string, number[]> = {
    Qualified: [3],
    Pending: [1, 2],
    Rejected: [4],
    Paused: [5],
    Completed: [6],
  };

  const filteredStartups = startups.filter((startup) => {
    if (filter !== "All Startups" && !filterStatusMap[filter]?.includes(startup.qualificationStatus)) {
      return false;
    }
    if (search && !startup.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;

  });

  const filterNames = ["All Startups", "Qualified", "Pending", "Rejected", "Paused", "Completed"];

  return (
    <>
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2 w-[400px]">
          <div className="relative flex-1">
            <input
              className="w-full rounded-lg border border-gray-800 bg-background px-4 py-2 pr-12 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search startups..."
              onChange={e => setSearch(e.target.value)}
            />

            {/* TODO: FIX ADD SEARCH ICON HAHA */}
            {/* <Button className="absolute right-2 t-0 "> */}
            {/*   <Image src='/magnifying_glass.png' width={16} height={16} alt='Image of a magnifying glass' /> */}
            {/* </Button> */}
          </div>
        </div>
        <div className="flex gap-0.5 border border-border rounded-xl w-fit">
          {filterNames.map((filterName, index) => (
            <button
              key={filterName}
              onClick={() => setFilter(filterName)}
              className={`px-4 py-1.5 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700
                          ${filter === filterName ? "bg-accent text-white font-bold" : ''}
                          ${index === 0 ? "rounded-tl-lg rounded-bl-lg" : ""} 
                          ${index === filterNames.length - 1 ? "rounded-tr-lg rounded-br-lg" : ""} `}
            >{filterName}</button>
          ))}
        </div>
      </div>

      <div className="mt-3 pb-10 grid grid-cols-4 gap-5">
        {filteredStartups.map(startup => (
          <Link key={startup.id} href={`/startups/${startup.id}/${startup.qualificationStatus === QualificationStatus.QUALIFIED ? 'readiness-level' : 'pending'}`}>
            <Card className="h-40 w-auto cursor-pointer bg-background border border-gray-700 hover:bg-accent rounded-xl p-0 transition-colors duration-150">
              <CardContent className="h-full">
                <div className="flex flex-col h-full p-3 justify-between">
                  <div className="flex items-center gap-3 mb-1 w-full">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563eb] text-white text-base font-bold">
                      {startup.name
                        .split(' ')
                        .map((word: string) => word.charAt(0).toUpperCase())
                        .join('')
                        .slice(0, 3)}
                    </div>
                    <span className="text-base font-semibold text-white truncate max-w-[120px]" title={startup.name}>
                      {startup.name.length > 10 ? startup.name.slice(0, 10) + '...' : startup.name}
                    </span>
                    <span className={`ml-auto border rounded px-2 py-0.5 text-xs font-semibold ${startupStatusMap[startup.qualificationStatus].border} ${startupStatusMap[startup.qualificationStatus].text} ${startupStatusMap[startup.qualificationStatus].bg}`}>
                      {startupStatusMap[startup.qualificationStatus].label}
                      {/* {status.label === 'Qualified' && role === 'Mentor' ? 'Active' : status.label} */}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#b3bed7] mb-1">
                    Initiatives
                    <span className="ml-1 font-bold text-white">{startup.initiatives.filter(initiative => initiative.status === TaskStatus.Completed).length} / {startup.initiatives.length}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded mb-2">

                    <div
                      className={`h-2 bg-white rounded`}
                      style={{
                        width: `${startup.initiatives.length > 0
                          ? (startup.initiatives.filter(initiative => initiative.status === TaskStatus.Completed).length / startup.initiatives.length) * 100
                          : 0
                          }%`
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#b3bed7]">
                    <Image src="/checked.png" alt="Checked" width={16} height={16} />
                    <span className="text-[#b3bed7]">No consultation pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

      </div>
    </>
  )
}

