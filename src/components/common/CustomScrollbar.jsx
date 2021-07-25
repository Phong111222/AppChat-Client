import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    width: '5px',
    backgroundColor: '#cecece',
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = (props) => (
  <Scrollbars
    autoHide
    autoHideTimeout={500}
    autoHideDuration={200}
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

export default CustomScrollbars;
