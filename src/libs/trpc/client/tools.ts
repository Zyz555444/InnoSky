import { createTRPCClient, httpBatchLink, type TRPCLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';
import superjson from 'superjson';

import { withElectronProtocolIfElectron } from '@/const/protocol';
import { type ToolsRouter } from '@/server/routers/tools';

const errorHandlingLink: TRPCLink<ToolsRouter> = () => {
  return ({ op, next }) =>
    observable((observer) =>
      next(op).subscribe({
        complete: () => observer.complete(),
        error: async (err) => {
          const status = err.data?.httpStatus as number;
          const code = err.data?.code as string;

          console.info('[toolsClient] Error:', {
            code,
            message: err.message,
            path: op.path,
            status,
          });

          observer.error(err);
        },
        next: (value) => observer.next(value),
      }),
    );
};

export const toolsClient: any = createTRPCClient<ToolsRouter>({
  links: [
    errorHandlingLink,
    httpBatchLink({
      headers: async () => {
        // dynamic import to avoid circular dependency
        const { createHeaderWithAuth } = await import('@/services/_auth');

        return createHeaderWithAuth();
      },
      maxURLLength: 2083,
      transformer: superjson,
      url: withElectronProtocolIfElectron('/trpc/tools'),
    }),
  ],
});

const createDisabledMarketNode = (): any =>
  new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        if (prop === 'mutate' || prop === 'query')
          return async () => ({
            data: [],
            items: [],
            list: [],
            page: 1,
            pageSize: 0,
            success: false,
            total: 0,
          });
        return createDisabledMarketNode();
      },
    },
  );

toolsClient.market = createDisabledMarketNode();
