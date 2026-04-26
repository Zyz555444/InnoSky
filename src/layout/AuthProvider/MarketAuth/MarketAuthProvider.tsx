'use client';

import { type ReactNode, createContext, useContext, useMemo } from 'react';

import { type MarketAuthContextType, type MarketUserProfile } from './types';

interface MarketAuthProviderProps {
  children: ReactNode;
  isDesktop?: boolean;
}

const noopAsyncBoolean = async () => false;
const noopAsyncVoid = async () => {};
const noopAsyncNull = async () => null;

const DEFAULT_CONTEXT: MarketAuthContextType = {
  checkAndShowClaimableResources: noopAsyncBoolean,
  getAccessToken: () => null,
  getCurrentUserInfo: () => null,
  getRefreshToken: () => null,
  handleUnauthorized: noopAsyncBoolean,
  isAuthenticated: false,
  isLoading: false,
  openProfileSetup: (_onSuccess?: (profile: MarketUserProfile) => void) => {},
  refreshToken: noopAsyncBoolean,
  session: null,
  signIn: noopAsyncNull,
  signOut: noopAsyncVoid,
  status: 'unauthenticated',
};

const MarketAuthContext = createContext<MarketAuthContextType>(DEFAULT_CONTEXT);

export const MarketAuthProvider = ({ children, isDesktop }: MarketAuthProviderProps) => {
  void isDesktop;
  const value = useMemo(() => DEFAULT_CONTEXT, []);
  return <MarketAuthContext.Provider value={value}>{children}</MarketAuthContext.Provider>;
};

export const useMarketAuth = () => useContext(MarketAuthContext);
