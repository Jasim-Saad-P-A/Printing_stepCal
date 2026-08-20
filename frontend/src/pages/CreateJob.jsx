import React, { useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { JobSetup } from '../components/setup/JobSetup';
import { NestingCanvas } from '../components/canvas/NestingCanvas';
import { YieldAnalytics } from '../components/analytics/YieldAnalytics';
import { useJobs } from '../context/JobContext';

export const CreateJob = () => {
  const { currentJob } = useJobs();

  return (
    <PageContainer maxWidth="max-w-[1720px]">
      <div className="flex flex-col gap-4">
        {/* 3-Column Industrial Layout matching reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[calc(100vh-120px)]">
          {/* Column 1: Job & Sheet Setup */}
          <div className="lg:col-span-3 flex flex-col">
            <JobSetup />
          </div>

          {/* Column 2: Interactive Canvas Preview */}
          <div className="lg:col-span-6 flex flex-col">
            <NestingCanvas />
          </div>

          {/* Column 3: Yield Analytics */}
          <div className="lg:col-span-3 flex flex-col">
            <YieldAnalytics />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
