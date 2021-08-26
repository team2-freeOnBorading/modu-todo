import styled from 'styled-components';

const RadioButtonItem = styled.input`
  margin-right: 12px;
  &[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    width: 20px;
    height: 20px;
    padding: 3px;
    background-clip: content-box;
    border: 2px solid #bbbbbb;
    background-color: #e7e6e7;
    border-radius: 50%;
  }
  &[type='radio']:checked {
    background-color: #8ee5c2;
  }
`;

export default RadioButtonItem;
