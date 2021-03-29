/* redux constants */
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED';
export const SET_UPDATED_COUNT = 'SET_UPDATED_COUNT';

/* order entry constants */
export const BUTTON_STATES = {
  disabled: { disabled: true, loading: false },
  enabled: { disabled: false, loading: false },
  loading: { disabled: true, loading: true }
};
export const INITIAL_STATE = {
  action: 'Buy',
  symbol: '',
  qty: 0,
  orderType: 'Market', 
  tif: 'DAY',
  price: 0.00,
  stopPrice: 0.00,
  comment: ''
};

export const OPTIONS = {
  action: ['Buy', 'Sell'],
  symbol: ['AAPL', 'MSFT', 'GOOGL', 'VZ', 'MMM', 'NFLX', 'FB', 'TWTR', 'AMZN', 'EBAY'],
  tif: ['GTC', 'DAY', 'FOK', 'IOC'],
  orderType: ['Market', 'Limit']
}

/* resizing constants */
export const MIN_PANEL_HEIGHT = 64;

/* ag-grid constants */
export const DEFAULT_COL_DEF = {
  editable: false,
  sortable: true,
  cellStyle: { border: '1px solid #000000', borderTop: 'none' }
};

export const COL_DEFS = [
  { field: 'action', width: 100, cellStyle: { textAlign: 'left' } },
  { field: 'symbol', width: 100, cellStyle: { textAlign: 'left' } },
  { field: 'qty', type: 'numericColumn', width: 100 },
  { field: 'orderType', headerName: 'Order Type', width: 125, cellStyle: { textAlign: 'left' } },
  { field: 'tif', headerName: 'TIF', type: 'numericColumn', width: 75 },
  { field: 'price', type: 'numericColumn', width: 100 },
  { field: 'stopPrice', headerName: 'Stop Price', type: 'numericColumn', width: 100 },
  { field: 'comment', flex: 2, cellStyle: { textAlign: 'left' }, tooltipValueGetter: ({ value }) => value || 'No comment entered for this order' }
];
