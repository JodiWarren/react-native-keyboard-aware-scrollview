import PropTypes from 'prop-types';
import React from 'react';

import {
  ScrollView
} from 'react-native';

import KeyboardAwareBase from './KeyboardAwareBase'

export default class KeyboardAwareScrollView extends KeyboardAwareBase {
  render() {
    return (
      <ScrollView {...this.props} {...this.style}
        automaticallyAdjustContentInsets={false}
        contentInset={{bottom: this.state.keyboardHeight}}
        ref={(r) => {
          this._keyboardAwareView = r;
        }}
        onLayout={(layoutEvent) => {
          this._onKeyboardAwareViewLayout(layoutEvent.nativeEvent.layout);
        }}
        onScroll={(event) => {
          this._onKeyboardAwareViewScroll(event.nativeEvent.contentOffset);
          if(this.props.onScroll) {
            this.props.onScroll(event);
          }
        }}
        onContentSizeChange={() => {
          this._updateKeyboardAwareViewContentSize();
        }}
        scrollEventThrottle={200}
      />
    );
  }
}

KeyboardAwareScrollView.propTypes = {
  getTextInputRefs: PropTypes.func,
  onScroll: PropTypes.func,
  statusBar: PropTypes.bool
};
KeyboardAwareScrollView.defaultProps = {
  ...KeyboardAwareBase.defaultProps,
  getTextInputRefs: () => {
    return [];
  }
};
