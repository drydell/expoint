import React, { useState, useEffect } from 'react';
import { defer, delay, isPlainObject } from 'lodash';

import ExPointPanel from './ExPointPanel';
import { BUTTON_STATES, INITIAL_STATE, OPTIONS } from '../constants';
import {
  ActionDropdownMenu, CommentInput, DropdownMenu, PriceInput, QtyInput, showError, SymbolInput, Submit
} from '../lib/antd';

import { API } from '../lib/api';
import { resetSymbolInput } from '../lib/utils';

import './ExPoint.css';

export const ExPointOrderEntry = ({
  position,
  stateHandlers
}) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [submitAttrbs, setSubmitAttribs] = useState(BUTTON_STATES.disabled);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    API.loadFormApi({
      setFormData,
      setSubmitAttribs
    });
  }, []);

  const updateFormData = upd => {
    let field;
    let value;
    if (isPlainObject(upd)) {
      field = upd.field;
      value = upd.value;
    } else {
      [field, value] = upd.split('-');
    }
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    switch (true) {
      case (newData.symbol === ''):
      case (newData.qty === 0):
      case (newData.qty > 999):
      case (newData.orderType === 'Limit' && (newData.price === 0.00 || newData.stopPrice === 0.00)):
        setSubmitAttribs(BUTTON_STATES.disabled);
        break;
      default:
        setSubmitAttribs(BUTTON_STATES.enabled);
        break;
    }
  }; 

  const onClickHandler = () => {
    if (((stateHandlers.getUpdatedCount() + 1) % 10) === 0) {
      showError('Order Time has elapsed');
      stateHandlers.updateCount();
    } else {
      setSubmitAttribs(BUTTON_STATES.loading);
      const gridApi = API.getGridApi();
      delay(() => {
        gridApi.showLoadingOverlay();
        delay(() => {
          gridApi.setRowData(formData);
          stateHandlers.updateLastUpdated(new Date());
          setFormData(INITIAL_STATE);
          setSubmitAttribs(BUTTON_STATES.disabled);
          resetSymbolInput(INITIAL_STATE.symbol);
          gridApi.hideOverlay();
          defer(gridApi.flashRow);
        }, 1000);
      }, 1000);
    }
  };

  return (
    <ExPointPanel
      header={(
        <div className="header">
          <div><span className="title">EXD Trader</span>Order Entry</div>
        </div>
      )}
      content={(
        <div className="form-container">
          <div className="left-form-half">
            <div className="left-field-container">
              <div>
                <div className="field-label">Action:</div>
                <div>
                  <ActionDropdownMenu
                    options={OPTIONS.action}
                    field="action"
                    text={formData.action}
                    updateFormData={updateFormData}
                  />
                </div>
              </div>
              <div>
                <div className="field-label">Symbol:</div>
                <div>
                  <SymbolInput
                    allOptions={OPTIONS.symbol}
                    field="symbol"
                    initialValue={formData.symbol}
                    updateFormData={updateFormData}
                  />
                </div>
              </div>
            </div>
            <div className="left-field-container">
              <div>
                <div className="field-label">Order Type:</div>
                <div>
                  <DropdownMenu
                    options={OPTIONS.orderType}
                    field="orderType"
                    text={formData.orderType}
                    updateFormData={updateFormData}
                  />
                </div>
              </div>
              <div>
                <div className="field-label">TIF:</div>
                <div>
                  <DropdownMenu
                    options={OPTIONS.tif}
                    field="tif"
                    text={formData.tif}
                    updateFormData={updateFormData}
                  />
                </div>
              </div>
            </div>
            <div className="left-field-container">
              <div style={{ width: '100%' }}>
                <CommentInput
                  field="comment"
                  value={formData.comment}
                  updateFormData={updateFormData}
                />
              </div>
            </div>
          </div>
          <div className="right-form-half">
            <div className="right-field-container">
              <div>
                <div className="field-label">Qty:</div>
                <div>
                  <QtyInput
                    field="qty"
                    min={0}
                    max={999}
                    defaultValue={0}
                    value={formData.qty}
                    updateFormData={updateFormData}
                  />
                </div>
              </div>
              <div>
                <div className="field-label">Price:</div>
                <div>
                  <PriceInput
                    field="price"
                    defaultValue={0.00}
                    min={0.00}
                    value={formData.price}
                    updateFormData={updateFormData}
                  />
                </div>
              </div>
            </div>
            <div className="right-field-container">
              <div>
                <div className="field-label">Stop Price:</div>
                <div>
                  <PriceInput
                    field="stopPrice"
                    min={0.00}
                    defaultValue={0.00}
                    value={formData.stopPrice}
                    updateFormData={updateFormData}
                  />
                </div>
              </div>
            </div>
            <div className="right-field-container" style={{ paddingTop: '15%' }}>
              <Submit
                onClickHandler={onClickHandler}
                submitAttrbs={submitAttrbs}
              />
            </div>
          </div>
        </div>
      )}
      contentClassName="order-entry"
      position={position}
    />
  );
};
