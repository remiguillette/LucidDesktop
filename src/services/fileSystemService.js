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

const listFiles = (path) => {
    const dir = getDirectory(path);
    return dir ? Object.keys(dir.children) : [];
};

const getFile = (path) => {
    return readFile(path);
};


const getRecentNotes = () => {
  const path = '/Documents';
  const files = listFiles(path);
  return files
    .filter(file => file.endsWith('.txt'))
    .map(file => ({
      name: file,
      content: getFile(path + '/' + file)?.content || '', //Added ?.content to handle null
      lastModified: new Date(getFile(path + '/' + file)?.modified || new Date()) //Handle potential null modified
    }))
    .sort((a, b) => b.lastModified - a.lastModified)
    .slice(0, 5);
};

export default {
  getDirectory,
  createFile,
  createDirectory,
  deleteItem,
  readFile,
  listFiles,
  getFile,
  getRecentNotes
};