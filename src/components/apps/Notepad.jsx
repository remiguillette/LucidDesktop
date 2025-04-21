
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import fileSystemService from '../../services/fileSystemService';

const Notepad = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState(t('apps.notepad.untitled'));
  const [isSaved, setIsSaved] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const [recentNotes, setRecentNotes] = useState([]);

  useEffect(() => {
    if (content !== '') {
      setIsSaved(false);
    }
  }, [content]);

  useEffect(() => {
    setRecentNotes(fileSystemService.getRecentNotes());
  }, []);

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

  const handleOpenRecent = (note) => {
    if (!isSaved) {
      const confirmOpen = window.confirm(t('apps.notepad.confirmNew'));
      if (!confirmOpen) return;
    }
    setContent(note.content);
    setFileName(note.name.replace('.txt', ''));
    setIsSaved(true);
    setShowRecent(false);
  };

  return (
    <div className="notepad-container">
      <div className="notepad-toolbar">
        <div className="notepad-buttons">
          <div className="recent-notes-dropdown">
            <button 
              className="notepad-button" 
              onClick={() => setShowRecent(!showRecent)}
              title={t('apps.notepad.recent')}
            >
              {t('apps.notepad.recent')}
            </button>
            {showRecent && (
              <div className="recent-notes-menu">
                {recentNotes.length > 0 ? (
                  recentNotes.map((note, index) => (
                    <div 
                      key={index} 
                      className="recent-note-item"
                      onClick={() => handleOpenRecent(note)}
                    >
                      {note.name}
                    </div>
                  ))
                ) : (
                  <div className="recent-note-item no-notes">
                    {t('apps.notepad.noRecent')}
                  </div>
                )}
              </div>
            )}
          </div>
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
