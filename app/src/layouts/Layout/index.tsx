import { NavLink } from 'ice';
import React, { ReactElement } from 'react';

import styles from './index.module.scss';

export default function Layout(props: {children: ReactElement}): ReactElement {
  return (
    <div className={styles.layout}>
      <div className={styles.aside}>
        <NavLink to="/home" className={styles.navItem} activeClassName={styles.navItemActive} >物料管理</NavLink>
      </div>
      <div className={styles.main}>{props.children}</div>
    </div>
  );
}
