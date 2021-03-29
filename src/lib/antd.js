import React, { useState, useEffect } from 'react';
import { forEach, includes, isFinite, map, toUpper } from 'lodash';
import {
  AutoComplete,
  Button,
  Dropdown,
  Input,
  InputNumber,
  Layout,
  Menu,
  Modal,
  Space
} from 'antd';

import { DownOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import '../components/ExPoint.css';

import { API } from './api';

const { Header, Content } = Layout;
const { TextArea } = Input;

const buildMenu = ({ field, options, updateFormData }) => (
  <Menu>
    {
      map(options, opt => {
        return (
          <Menu.Item
            key={`${field}-${opt}`}
            onClick={evt => updateFormData(evt.key)}
          >
            {opt}
          </Menu.Item>
        );
      })
    }
  </Menu>
);

export const CommentInput = ({ field, value, rows, cols, updateFormData }) => (
  <Space wrap style={{ width: '100%' }}>
    <TextArea
      rows={rows || 4}
      cols={cols || 200}
      value={value}
      size="large"
      style={{width: '100%' }}
      placeholder="<COMMENT>"
      onChange={evt => updateFormData({ field, value: evt.target.value })}
    />
  </Space>
);

export const ActionDropdownMenu = ({ field, text, trigger, options, updateFormData }) =>
  DropdownMenu({
    field,
    text,
    trigger,
    options,
    updateFormData,
    style: { color: '#FFFFFF', backgroundColor: text === 'Sell' ? '#FF0000' : 'rgb(0, 100, 0)'}
  });

export const DropdownMenu = ({ field, text, trigger, options, updateFormData, style }) => (
  <Space wrap>
    <Dropdown overlay={buildMenu({ field, options, updateFormData })} trigger={[trigger || 'click']}>
      <Button
        onClick={evt => evt.preventDefault()}
        style={style || {}}
      >
        {text} <DownOutlined />
      </Button>
    </Dropdown>
  </Space>
);

export const Panel = ({ content, header, contentClassName, maximizePanel }) => (
  <Layout className="layout">
    <Header style={{ cursor: 'pointer' }} onClick={maximizePanel}>
      {header}
    </Header>
    <Content className={contentClassName || ''}>
      {content}
    </Content>
  </Layout>
);

export const PriceInput = ({ field, min, defaultValue, value, updateFormData }) => (
  <Space wrap>
    <InputNumber
      min={min}
      precision={2}
      defaultValue={defaultValue}
      value={value}
      stringMode={false}
      onChange={val =>
        updateFormData({
          field,
          value: isFinite(val) && val >= min ? val : defaultValue
        })
      }
    />
  </Space>
);

export const QtyInput = ({ field, min, max, defaultValue, value, updateFormData }) => (
  <Space wrap>
    <InputNumber
      min={min}
      max={max}
      defaultValue={defaultValue}
      value={value}
      stringMode={false}
      onChange={val =>
        updateFormData({
          field,
          value: isFinite(val) && val >= min && val <= max ? val : defaultValue
        })
      }
    />
  </Space>
);

export const showError = message => Modal.error({ title: 'Error', content: message });

export const SymbolInput = ({ field, allOptions, updateFormData, initialValue }) => {
  const [datasource] = useState(map(allOptions, opt => ({ value: opt, label: opt })));
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(initialValue);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    API.loadSymbolApi({
      onSearch,
      setValue
    });
  }, []);

  const onSearch = val => {
    const newOpts = [];
    if (val) {
      const newVal = toUpper(val);
      forEach(datasource, opt => {
        if (includes(opt.value, newVal)) {
          newOpts.push({ value: opt.value });
        }
      });
    }
    setOptions(newOpts);
  };

  return (
    <Space wrap>
      <AutoComplete
        options={options}
        style={{ width: 150 }}
        placeholder="<ENTER SYMBOL>"
        notFoundContent="not found"
        value={value}
        onSearch={onSearch}
        onSelect={val => updateFormData({ field, value: val })}
        onChange={val => setValue(val)}
      />
    </Space>
  );
};

export const Submit = ({ onClickHandler, submitAttrbs }) => (
  <Space wrap>
    <Button
      onClick={onClickHandler}
      disabled={submitAttrbs.disabled}
      loading={submitAttrbs.loading}
      style={{ backgroundColor: '#DDDDDD' }}
    >
      Submit
    </Button>
  </Space>
);
