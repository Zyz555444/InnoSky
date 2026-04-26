import useSWR from 'swr';

import { type MarketUserProfile } from './types';

/**
 * Hook to fetch and cache Market user profile using SWR
 *
 * @param username - The username to fetch profile for (typically userInfo.sub)
 * @returns SWR response with user profile data
 */
export const useMarketUserProfile = (username: string | null | undefined) => {
  return useSWR<MarketUserProfile | null>(
    username ? ['market-user-profile', username] : null,
    async () => null,
    {
      dedupingInterval: 60_000, // 1 minute deduplication
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
};
