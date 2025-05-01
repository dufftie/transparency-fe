import { Button } from 'antd';
import styles from './support-button.module.scss';

export default function SupportButton() {
  return (
    <Button className={styles.button} type="primary" size="large" href="/support">
      Support
    </Button>
  );
}