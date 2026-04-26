const EMPTY_MARKET_RESULT = {
  data: [],
  items: [],
  list: [],
  page: 1,
  pageSize: 0,
  success: false,
  total: 0,
};

class MarketApiService {
  getSkillDownloadUrl(_identifier: string): string {
    return '';
  }
}

const marketApiServiceProxy = new Proxy(new MarketApiService(), {
  get: (target, prop, receiver) => {
    if (Reflect.has(target, prop)) return Reflect.get(target, prop, receiver);
    return async () => EMPTY_MARKET_RESULT;
  },
});

export const marketApiService: any = marketApiServiceProxy;
