const fs = require('fs-extra');
const path = require('path');

async function copyGameFiles() {
  try {
    const sourceDir = path.join(__dirname, '..', 'game');
    const targetDir = path.join(__dirname, '..', 'dist', 'game');

    // 确保目标目录存在
    await fs.ensureDir(targetDir);

    // 复制游戏文件
    await fs.copy(sourceDir, targetDir, {
      filter: (src) => {
        // 排除不需要的文件
        return !src.includes('.git') && !src.includes('node_modules');
      }
    });

    console.log('Game files copied successfully!');
  } catch (err) {
    console.error('Error copying game files:', err);
    process.exit(1);
  }
}

copyGameFiles(); 