import {Button, Form} from 'antd';

import {ButtonProps} from 'antd/es/button';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';


interface LoginSubmitProps extends ButtonProps {
  className?: string;
}

const LoginSubmit: React.FC<LoginSubmitProps> = ({className, ...rest}) => {
  const clsString = classNames(styles.submit, className);
  return (
    <Form.Item name={"item"}>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />
    </Form.Item>
  );
};

export default LoginSubmit;
