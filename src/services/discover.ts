const EMPTY_MARKET_RESULT = {
  data: [],
  items: [],
  list: [],
  page: 1,
  pageSize: 0,
  success: false,
  total: 0,
};

const createDisabledMarketMethod = async () => EMPTY_MARKET_RESULT;

const discoverServiceProxy = new Proxy(
  {},
  {
    get: () => createDisabledMarketMethod,
  },
);

export const discoverService: any = discoverServiceProxy;
