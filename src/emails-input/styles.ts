// @ts-ignore
import { css } from 'astroturf';
const styles = css`
  .fontFamily {
    font-family: Open Sans, sans-serif;
    font-size: 14px;
  }

  .emailsInput {
    width: 100%;
    min-height: 96px;
    max-height: 180px;
    overflow-y: auto;
    background: #ffffff;
    border: 1px solid #c3c2cf;
    border-radius: 4px;
    padding: 8px 7px;
  }

  .email {
    composes: fontFamily;
    display: inline-block;
    margin: 2px 4px;
    padding: 0 10px;
    font-style: normal;
    font-weight: normal;
    line-height: 24px;
    text-align: right;
    color: #050038;
  }
  .delete {
    margin-left: 8px;
    cursor: pointer;
    font-size: 12px;
  }
  .emailStateValid {
    composes: email;
    border-radius: 100px;
    background: rgba(102, 153, 255, 0.2);
  }
  .emailStateInvalid {
    composes: email;
    background: #ffffff;
  }

  .input {
    composes: email;
    border: none;
    padding-left: 8px;
    text-align: left;
  }
  .input::-webkit-input-placeholder {
    text-align: left;
    color: #c3c2cf;
  }
  .input::-moz-placeholder {
    text-align: left;
    color: #c3c2cf;
  }
  .input:-ms-input-placeholder {
    text-align: left;
    color: #c3c2cf;
  }
  .input:focus {
    box-shadow: none;
    border: none;
    outline: none;
    text-align: left;
  }
`;

export default styles;
