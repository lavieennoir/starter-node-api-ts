let baseDir: string;

export const setBaseDir = (val: string) => {
  if (baseDir) {
    // Allow set baseDir only once
    return;
  }
  baseDir = val;
};

export const getBaseDir = () => baseDir;

export default {
  setBaseDir,
  getBaseDir
};
