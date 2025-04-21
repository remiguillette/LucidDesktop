
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Trash = () => {
  const { t } = useTranslation();
  const [trashItems] = useState([]);

  return (
    <div className="trash-container">
      <h2>{t('apps.trash.title')}</h2>
      {trashItems.length === 0 ? (
        <p>{t('apps.trash.empty')}</p>
      ) : (
        <ul className="trash-items">
          {trashItems.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Trash;
