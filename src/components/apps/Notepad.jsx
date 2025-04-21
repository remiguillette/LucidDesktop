
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import fileSystemService from '../../services/fileSystemService';

const Notepad = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState(t('apps.notepad.untitled'));
  const [isSaved, setIsSaved] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (content !== '') {
      setIsSaved(false);
    }
  }, [content]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    const path = '/Documents';
    const success = fileSystemService.createFile(path, fileName + '.txt', content);
    if (success) {
      setIsSaved(true);
      setStatusMessage('Document saved successfully');
      setTimeout(() => setStatusMessage(''), 2000);
    } else {
      setStatusMessage('Error saving document');
      setTimeout(() => setStatusMessage(''), 2000);
    }
  };

  const handleNew = () => {
    if (!isSaved) {
      const confirmNew = window.confirm(t('apps.notepad.confirmNew'));
      if (!confirmNew) return;
    }
    setContent('');
    setFileName(t('apps.notepad.untitled'));
    setIsSaved(true);
  };

  const handleRename = () => {
    const newName = prompt(t('apps.notepad.promptRename'), fileName);
    if (newName && newName.trim() !== '') {
      setFileName(newName.trim());
      setIsSaved(false);
    }
  };

  return (
    <div className="notepad-container">
      <div className="notepad-toolbar">
        <div className="notepad-buttons">
          <button className="notepad-button" onClick={handleNew} title={t('apps.notepad.new')}>
            {t('apps.notepad.new')}
          </button>
          <button className="notepad-button" onClick={handleSave} title={t('apps.notepad.save')}>
            {t('apps.notepad.save')}
          </button>
          <button className="notepad-button" onClick={handleRename} title={t('apps.notepad.rename')}>
            {t('apps.notepad.rename')}
          </button>
        </div>
        <div className="notepad-filename">
          {fileName}{!isSaved && ' *'}
          {statusMessage && <span className="status-message">{statusMessage}</span>}
        </div>
      </div>
      <textarea
        className="notepad-editor"
        value={content}
        onChange={handleChange}
        placeholder={t('apps.notepad.placeholder')}
      />
    </div>
  );
};

export default Notepad;
