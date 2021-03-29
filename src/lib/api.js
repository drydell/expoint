export const API = (function() {
  let formApi = {};
  let gridApi = {};
  let splitterApi = {
    initial: {},
    delta: 0
  };
  let symbolApi = {};
  return {
    getFormApi: () => formApi,
    loadFormApi: api => {
      formApi = {
        ...formApi,
        ...api
      };
    },
    getGridApi: () => gridApi,
    loadGridApi: api => {
      gridApi = {
        ...gridApi,
        ...api,
        setRowData: data => api.setRowData(rowData => [data, ...rowData])
      };
    },
    getPanelApi: () => splitterApi.panelApi,
    getSplitterApi: () => splitterApi, 
    loadSplitterApi: api => {
      splitterApi = {
        ...splitterApi,
        ...api
      };
    },
    getSymbolApi: () => symbolApi,
    loadSymbolApi: api => {
      symbolApi = {
        ...symbolApi,
        ...api
      };
    }
  };
}());
