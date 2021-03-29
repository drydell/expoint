import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { isNull } from 'lodash';

import ExPointPanel from './ExPointPanel';
import { BUTTON_STATES, DEFAULT_COL_DEF, COL_DEFS } from '../constants';
import { API } from '../lib/api';
import { resetSymbolInput } from '../lib/utils';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './ExPoint.css';

export const ExPointBlotter = ({
  position,
  stateHandlers
}) => {
  const [rowData, setRowData] = useState([]);
  const formatLastUpdated = lastUpdated => isNull(lastUpdated) ? null : `Last Updated: ${lastUpdated}`; 

  const onGridReady = ({ api }) => {
    API.loadGridApi({
      flashRow: () => {
        api.ensureIndexVisible(0, 'top');
        api.flashCells({ rowNodes: [api.getModel().rowsToDisplay[0]] });
      },
      hideOverlay: () => api.hideOverlay(),
      showLoadingOverlay: () => api.showLoadingOverlay(),
      setRowData
    });
  };

  const populateForm = ({ data }) => {
    const formApi = API.getFormApi();
    formApi.setFormData(data);
    formApi.setSubmitAttribs(BUTTON_STATES.enabled);
    resetSymbolInput(data.symbol);
  };

  return (
    <ExPointPanel
      header={(
        <div className="header">
          <div>Order Blotter</div>
          <div>{formatLastUpdated(stateHandlers.getLastUpdated())}</div>
        </div>
      )}
      content={(
        <div className="ag-theme-alpine blotter">
          <AgGridReact
            onGridReady={onGridReady}
            rowData={rowData}
            defaultColDef={DEFAULT_COL_DEF}
            columnDefs={COL_DEFS}
            onRowClicked={populateForm}
          />
        </div>
      )}
      position={position}
    />
  );
};
