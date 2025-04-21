
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import fileSystemService from '../../services/fileSystemService';

const FileExplorer = () => {
  const { t } = useTranslation();
  const [currentPath, setCurrentPath] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  const currentDir = fileSystemService.getDirectory(currentPath) || fileSystemService.getDirectory('');
  
  const handleNavigate = (itemName) => {
    const newPath = currentPath ? `${currentPath}/${itemName}` : itemName;
    setCurrentPath(newPath);
    setSelectedItem(null);
  };
  
  const handleBack = () => {
    const parts = currentPath.split('/').filter(p => p);
    parts.pop();
    setCurrentPath(parts.join('/'));
    setSelectedItem(null);
  };
  
  const handleCreateFolder = () => {
    const name = prompt(t('apps.files.newFolderPrompt'));
    if (name && fileSystemService.createDirectory(currentPath, name)) {
      setSelectedItem(null);
    }
  };
  
  const handleCreateFile = () => {
    const name = prompt(t('apps.files.newFilePrompt'));
    if (name && fileSystemService.createFile(currentPath, name)) {
      setSelectedItem(null);
    }
  };
  
  const handleDelete = () => {
    if (selectedItem && confirm(t('apps.files.deleteConfirm'))) {
      fileSystemService.deleteItem(currentPath, selectedItem.name);
      setSelectedItem(null);
    }
  };

  return (
    <div className="file-explorer">
      <div className="file-toolbar">
        <button onClick={handleBack} disabled={!currentPath}>⬅️</button>
        <button onClick={handleCreateFolder}>📁 {t('apps.files.newFolder')}</button>
        <button onClick={handleCreateFile}>📄 {t('apps.files.newFile')}</button>
        <button onClick={handleDelete} disabled={!selectedItem}>🗑️ {t('apps.files.delete')}</button>
      </div>
      
      <div className="file-path">
        📁 {currentPath || 'root'}
      </div>
      
      <div className="file-list">
        {Object.entries(currentDir.children).map(([name, item]) => (
          <div
            key={name}
            className={`file-item ${selectedItem?.name === name ? 'selected' : ''}`}
            onClick={() => setSelectedItem(item)}
            onDoubleClick={() => item.type === 'directory' && handleNavigate(name)}
          >
            {item.type === 'directory' ? '📁' : '📄'} {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
