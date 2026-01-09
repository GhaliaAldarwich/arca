"use client";

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { BoardList } from './_components/board_list';
import { EmptyOrg } from './_components/empty-org';
import { useOrganization } from '@clerk/nextjs';

interface QueryParams {
  search?: string;
  favorites?: string;
}

const DashboardPage = () => {
  
  const { organization } = useOrganization();
  const nextSearchParams = useSearchParams();
  
  const query: QueryParams = useMemo(() => {
    const search = nextSearchParams?.get('search') || undefined;
    const favorites = nextSearchParams?.get('favorites') || undefined;
    
    return { 
        ...(search && { search }), 
        ...(favorites && { favorites }) 
    };
  }, [nextSearchParams]);

  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
     
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList 
          orgId={organization.id}
          query={query} 
        />
      )}
    </div>
  );
};

export default DashboardPage;