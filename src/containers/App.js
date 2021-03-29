import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setLastUpdated, setUpdatedCount } from '../actions';
import { ExPointBlotter } from '../components/ExPointBlotter';
import { ExPointOrderEntry } from '../components/ExPointOrderEntry';
import { API } from '../lib/api';
import { onMouseMove } from '../lib/utils';

import './App.css';

function App({ dispatch, lastUpdated, updatedCount }) {
  const getLastUpdated = () => lastUpdated;
  // for handling redux state
  const stateHandlers = {
    getUpdatedCount: () => updatedCount,
    updateLastUpdated: payload => dispatch(setLastUpdated(payload)),
    updateCount: () => dispatch(setUpdatedCount())
  };

  useEffect(() => {
    const splitterApi = API.getSplitterApi();
    splitterApi.panelApi = {
      top: {
        getHeight: splitterApi.top.getHeight,
        max: () => {
          splitterApi.top.setMode('minmax');
          splitterApi.bottom.setMode('minmax');
          splitterApi.top.setMaxHeight();
          splitterApi.bottom.setMinHeight();
        }
      },
      bottom: { 
        getHeight: splitterApi.bottom.getHeight,
        max: () => {
          splitterApi.top.setMode('minmax');
          splitterApi.bottom.setMode('minmax');
          splitterApi.top.setMinHeight();
          splitterApi.bottom.setMaxHeight();
        }
      }
    };
  }, []);

  return (
    <div className="App">
      <ExPointOrderEntry
        position="top"
        stateHandlers={stateHandlers}
      />
      <div
        className="splitter"
        onMouseDown={evt => {
          const splitterApi = API.getSplitterApi();
          splitterApi.top.setMode('drag');
          splitterApi.bottom.setMode('drag');
          splitterApi.initial = {
            Y: evt.clientY,
            topHeight: splitterApi.top.getHeight(),
            bottomHeight: splitterApi.bottom.getHeight()
          };
          document.onmousemove = onMouseMove;
          document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
          };
        }}
      />
      <ExPointBlotter
        position="bottom"
        stateHandlers={{ getLastUpdated }}
      />
    </div>
  );
}

export default connect(state => state)(App);
