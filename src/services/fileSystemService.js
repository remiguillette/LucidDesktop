
// Simple in-memory file system service
const fileSystem = {
  root: {
    type: 'directory',
    name: 'root',
    children: {
      'Documents': {
        type: 'directory',
        name: 'Documents',
        children: {
          'notes.txt': {
            type: 'file',
            name: 'notes.txt',
            content: 'Welcome to BeaverOS!',
            created: new Date().toISOString(),
            modified: new Date().toISOString()
          }
        }
      },
      'Images': {
        type: 'directory',
        name: 'Images',
        children: {}
      },
      'Downloads': {
        type: 'directory',
        name: 'Downloads',
        children: {}
      }
    }
  }
};

const getDirectory = (path) => {
  const parts = path.split('/').filter(p => p);
  let current = fileSystem.root;
  
  for (const part of parts) {
    if (!current.children[part]) return null;
    current = current.children[part];
  }
  
  return current;
};

const createFile = (path, name, content = '') => {
  const dir = getDirectory(path);
  if (!dir) return false;
  
  dir.children[name] = {
    type: 'file',
    name,
    content,
    created: new Date().toISOString(),
    modified: new Date().toISOString()
  };
  
  return true;
};

const createDirectory = (path, name) => {
  const dir = getDirectory(path);
  if (!dir) return false;
  
  dir.children[name] = {
    type: 'directory',
    name,
    children: {}
  };
  
  return true;
};

const deleteItem = (path, name) => {
  const dir = getDirectory(path);
  if (!dir || !dir.children[name]) return false;
  
  delete dir.children[name];
  return true;
};

const readFile = (path) => {
  const parts = path.split('/').filter(p => p);
  const fileName = parts.pop();
  const dir = getDirectory(parts.join('/'));
  
  if (!dir || !dir.children[fileName] || dir.children[fileName].type !== 'file') {
    return null;
  }
  
  return dir.children[fileName];
};

export default {
  getDirectory,
  createFile,
  createDirectory,
  deleteItem,
  readFile
};
