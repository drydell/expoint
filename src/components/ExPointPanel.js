import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from '../lib/antd';
import { getAppHeight, getPanelHeight, numberToPct, numberToPx } from '../lib/utils';
import { API } from '../lib/api';
import { MIN_PANEL_HEIGHT } from '../constants';

export default class ExPointPanel extends Component {
  static propTypes = {
    header: PropTypes.node,
    content: PropTypes.node,
    contentClassName: PropTypes.string,
    position: PropTypes.string
  };

  maximizePanel = () => API.getPanelApi()[this.props.position].max();

  render() {
    const { header, content, contentClassName, position } = this.props;
    return (
      <div
        style={{
          height: '50%',
          overflow: 'hidden',
          transitionProperty: 'height',
          transitionTimingFunction: 'ease-in-out'
        }}
        ref={el => {
          if (el) {
            API.loadSplitterApi({
              [position]: {
                getHeight: () => getPanelHeight(el),
                resetHeight: () => el.style.height = numberToPct(50),
                setMode: mode => el.style.transitionDuration = mode === 'drag' ? '0s' : '1s',
                setHeight: ht => el.style.height = numberToPx(ht),
                setMaxHeight: () => el.style.height = numberToPx(getAppHeight() - MIN_PANEL_HEIGHT),
                setMinHeight: () => el.style.height = numberToPx(MIN_PANEL_HEIGHT)
              }
            });
          }
        }}
      >
        <Panel
          maximizePanel={this.maximizePanel}
          header={header}
          contentClassName={contentClassName || ''}
          content={content}
         />
      </div>
    );
  }
}
