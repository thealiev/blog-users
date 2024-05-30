import React, { useEffect, useState } from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, username, additionalText }) => {
  const [createdAt, setCreatedAt] = useState(additionalText)
  useEffect(() => {
    const date = additionalText?.slice(0, 10)
    setCreatedAt(date)
  }, [additionalText])

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={username} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{username}</span>
        <span className={styles.additional}>{createdAt}</span>
      </div>
    </div>
  );
};
