// 使用 Web Worker 处理游戏初始化
const gameWorker = new Worker('game-worker.js');

// 使用 IntersectionObserver 优化游戏加载
const gameObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 当游戏容器进入视口时开始加载
      loadGame();
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '50px'
});

// 使用 requestIdleCallback 优化资源加载
const loadGame = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      initializeGame();
    });
  } else {
    setTimeout(initializeGame, 100);
  }
};

// 游戏初始化函数
const initializeGame = async () => {
  try {
    // 配置游戏参数
    const config = {
      args: [],
      canvasResizePolicy: 2,
      ensureCrossOriginIsolationHeaders: true,
      executable: 'index',
      experimentalVK: false,
      fileSizes: {
        'index.pck': 39414368,
        'index.wasm': 1650612
      },
      focusCanvas: true,
      gdextensionLibs: []
    };

    // 创建游戏引擎实例
    const engine = new Engine(config);

    // 使用 Promise 处理游戏加载
    await new Promise((resolve, reject) => {
      engine.startGame({
        onProgress: (current, total) => {
          if (current > 0 && total > 0) {
            updateProgress(current, total);
          }
        }
      }).then(resolve).catch(reject);
    });

    // 游戏加载完成后的处理
    hideLoadingScreen();
  } catch (error) {
    console.error('Game initialization failed:', error);
    showError(error);
  }
};

// 更新加载进度
const updateProgress = (current, total) => {
  const progress = document.getElementById('status-progress');
  if (progress) {
    progress.value = current;
    progress.max = total;
  }
};

// 隐藏加载屏幕
const hideLoadingScreen = () => {
  const status = document.getElementById('status');
  if (status) {
    status.style.visibility = 'hidden';
  }
};

// 显示错误信息
const showError = (error) => {
  const status = document.getElementById('status');
  const notice = document.getElementById('status-notice');
  if (status && notice) {
    status.style.visibility = 'visible';
    notice.textContent = error.message || 'An error occurred while loading the game.';
  }
};

// 初始化游戏容器观察
const initGameObserver = () => {
  const gameContainer = document.getElementById('canvas');
  if (gameContainer) {
    gameObserver.observe(gameContainer);
  }
};

// 页面加载完成后初始化
window.addEventListener('load', initGameObserver);

// 清理函数
const cleanup = () => {
  gameObserver.disconnect();
  gameWorker.terminate();
};

// 页面卸载时清理资源
window.addEventListener('unload', cleanup); 