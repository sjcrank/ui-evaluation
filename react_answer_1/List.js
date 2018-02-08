import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

const styles = {
  cursor:'pointer'
};

const selectedItem = (item) => {
  console.log(item);
};

const List = props => {
  return (
    <ul>
      {props.data.map((item, index)=>{
        return <li style={styles} key={index} onClick={()=>props.selectItem(item)}>{item}</li>;
      })}
    </ul>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  selectItem: PropTypes.func,
};

const items = ["hello", "world", "nograj"];

render(<List data={items} selectItem={(item) => selectedItem(item)}/>, document.getElementById('root'));
