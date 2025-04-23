import React, { useState, useRef, useEffect } from 'react';

const ApplicationWindow = ({ title, icon, initialPosition, initialSize, children, onClose, onMinimize }) => {
  const [position, setPosition] = useState(initialPosition || { x: 50, y: 50 });
  const [size, setSize] = useState(initialSize || { width: 600, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const windowRef = useRef(null);
  const prevSizeRef = useRef(null);
  const prevPositionRef = useRef(null);

  // Position initiale au centre de l'écran si non spécifiée
  useEffect(() => {
    if (!initialPosition && windowRef.current) {
      const centerX = (window.innerWidth - size.width) / 2;
      const centerY = (window.innerHeight - size.height) / 3;
      setPosition({ 
        x: Math.max(0, centerX), 
        y: Math.max(0, centerY) 
      });
    }
  }, []);

  // Gestionnaire pour commencer le glissement
  const handleDragStart = (e) => {
    if (isMaximized) return; // Pas de glissement en mode maximisé
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Gestionnaire pour commencer le redimensionnement
  const handleResizeStart = (e, direction) => {
    if (isMaximized) return; // Pas de redimensionnement en mode maximisé
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setDragOffset({
      x: e.clientX,
      y: e.clientY,
      initialWidth: size.width,
      initialHeight: size.height,
      initialX: position.x,
      initialY: position.y
    });
  };

  // Gestionnaire de mouvement (glissement et redimensionnement)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        // S'assurer que la fenêtre reste dans les limites visibles
        setPosition({
          x: Math.max(0, Math.min(newX, window.innerWidth - size.width)),
          y: Math.max(0, Math.min(newY, window.innerHeight - size.height))
        });
      } else if (isResizing) {
        const deltaX = e.clientX - dragOffset.x;
        const deltaY = e.clientY - dragOffset.y;

        // Calcul de la nouvelle taille et position en fonction de la direction
        let newWidth = dragOffset.initialWidth;
        let newHeight = dragOffset.initialHeight;
        let newX = dragOffset.initialX;
        let newY = dragOffset.initialY;

        // Redimensionnement horizontal
        if (resizeDirection.x !== 0) {
          if (resizeDirection.x < 0) {
            // Redimensionner depuis la gauche
            newWidth = Math.max(200, dragOffset.initialWidth - deltaX);
            newX = dragOffset.initialX + dragOffset.initialWidth - newWidth;
          } else {
            // Redimensionner depuis la droite
            newWidth = Math.max(200, dragOffset.initialWidth + deltaX);
          }
        }

        // Redimensionnement vertical
        if (resizeDirection.y !== 0) {
          if (resizeDirection.y < 0) {
            // Redimensionner depuis le haut
            newHeight = Math.max(150, dragOffset.initialHeight - deltaY);
            newY = dragOffset.initialY + dragOffset.initialHeight - newHeight;
          } else {
            // Redimensionner depuis le bas
            newHeight = Math.max(150, dragOffset.initialHeight + deltaY);
          }
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeDirection]);

  // Fonction pour maximiser/restaurer la fenêtre
  const toggleMaximize = () => {
    if (isMaximized) {
      // Restaurer la taille et la position précédentes
      setSize(prevSizeRef.current);
      setPosition(prevPositionRef.current);
    } else {
      // Sauvegarder la taille et la position actuelles
      prevSizeRef.current = size;
      prevPositionRef.current = position;

      // Maximiser la fenêtre (avec marge de 5px pour les bords de l'écran)
      setSize({
        width: window.innerWidth - 10,
        height: window.innerHeight - 65 // Tenir compte de la barre de navigation
      });
      setPosition({ x: 5, y: 5 });
    }

    setIsMaximized(!isMaximized);
  };

  return (
    <div
      ref={windowRef}
      className={`app-window ${isMaximized ? 'maximized' : ''} ${isMinimized ? 'minimized' : ''}`}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        display: isMinimized ? 'none' : 'flex'
      }}
    >
      {/* Barre de titre de la fenêtre */}
      <div 
        className="window-titlebar"
        onMouseDown={handleDragStart}
        onDoubleClick={toggleMaximize}
      >
        <div className="window-title-left">
          {icon && <span className="window-icon">{icon}</span>}
          <span className="window-title">{title}</span>
        </div>
        <div className="window-controls">
          <button 
            className="window-control minimize" 
            title="Minimiser"
            onClick={(e) => {
              e.stopPropagation();
              if (onMinimize) onMinimize();
            }}
          >
            _
          </button>
          <button 
            className="window-control maximize" 
            title={isMaximized ? "Restaurer" : "Maximiser"}
            onClick={toggleMaximize}
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button 
            className="window-control fullscreen" 
            title="Plein écran"
            onClick={() => {
              const content = windowRef.current.querySelector('.window-content');
              if (content) {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  content.requestFullscreen();
                }
              }
            }}
          >
            ⛶
          </button>
          <button 
            className="window-control close" 
            title="Fermer"
            onClick={() => {
              if (typeof onClose === 'function') {
                onClose();
              }
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Contenu de la fenêtre */}
      <div className="window-content">
        {children}
      </div>

      {/* Poignées de redimensionnement (8 directions) */}
      {!isMaximized && (
        <>
          {/* Coin supérieur gauche */}
          <div 
            className="window-resize-handle nw-resize" 
            onMouseDown={(e) => handleResizeStart(e, { x: -1, y: -1 })}
          />

          {/* Bord supérieur */}
          <div 
            className="window-resize-handle n-resize" 
            onMouseDown={(e) => handleResizeStart(e, { x: 0, y: -1 })}
          />

          {/* Coin supérieur droit */}
          <div 
            className="window-resize-handle ne-resize" 
            onMouseDown={(e) => handleResizeStart(e, { x: 1, y: -1 })}
          />

          {/* Bord droit */}
          <div 
            className="window-resize-handle e-resize" 
            onMouseDown={(e) => handleResizeStart(e, { x: 1, y: 0 })}
          />

          {/* Coin inférieur droit */}
          <div 
            className="window-resize-handle se-resize" 
            onMouseDown={(e) => handleResizeStart(e, { x: 1, y: 1 })}
          />

          {/* Bord inférieur */}
          <div 
            className="window-resize-handle s-resize" 
            onMouseDown={(e) => handleResizeStart(e, { x: 0, y: 1 })}
          />

          {/* Coin inférieur gauche */}
          <div 
            className="window-resize-handle sw-resize" 
            onMouseDown={(e) => handleResizeStart(e, { x: -1, y: 1 })}
          />

          {/* Bord gauche */}
          <div 
            className="window-resize-handle w-resize" 
            onMouseDown={(e) => handleResizeStart(e, { x: -1, y: 0 })}
          />
        </>
      )}
    </div>
  );
};

export default ApplicationWindow;