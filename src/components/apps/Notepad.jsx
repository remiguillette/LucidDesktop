import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Notepad = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState(t('apps.notepad.untitled'));
  const [isSaved, setIsSaved] = useState(true);

  // Détecter les changements de contenu
  useEffect(() => {
    if (content !== '') {
      setIsSaved(false);
    }
  }, [content]);

  // Gérer les changements dans la zone de texte
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  // Simuler une opération de sauvegarde
  const handleSave = () => {
    console.log(`Saving: ${fileName} with content: ${content}`);
    setIsSaved(true);
    // Dans une véritable application, cela sauvegarderait le contenu dans un système de fichiers
  };

  // Simuler une opération "nouveau document"
  const handleNew = () => {
    if (!isSaved) {
      const confirmNew = window.confirm(t('apps.notepad.confirmNew'));
      if (!confirmNew) return;
    }
    setContent('');
    setFileName(t('apps.notepad.untitled'));
    setIsSaved(true);
  };

  // Simuler une opération de changement de nom
  const handleRename = () => {
    const newName = prompt(t('apps.notepad.promptRename'), fileName);
    if (newName && newName.trim() !== '') {
      setFileName(newName.trim());
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