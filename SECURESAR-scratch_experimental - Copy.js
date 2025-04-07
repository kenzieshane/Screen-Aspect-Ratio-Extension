// Kenzie Shane Setiawan
class WindowRatioExtension {
  constructor(runtime) {
    this.runtime = runtime;
  }

  getInfo() {
    return {
      id: 'screenratio',
      name: 'Easy Screen Aspect Ratio',
      color1: '#5CF1FF',
      color2: '#42B4C8',
      blocks: [
        {
          opcode: 'getWindowRatio',
          blockType: Scratch.BlockType.REPORTER,
          text: 'window ratio'
        },
        {
          opcode: 'getWindowRatioName',
          blockType: Scratch.BlockType.REPORTER,
          text: 'window ratio name'
        },
        {
          opcode: 'getOrientation',
          blockType: Scratch.BlockType.REPORTER,
          text: 'window orientation'
        },
        {
          opcode: 'getWidth',
          blockType: Scratch.BlockType.REPORTER,
          text: 'window width'
        },
        {
          opcode: 'getHeight',
          blockType: Scratch.BlockType.REPORTER,
          text: 'window height'
        }
      ]
    };
  }

  getWindowRatio() {
    return window.innerWidth / window.innerHeight;
  }

  getWindowRatioName() {
    const ratio = window.innerWidth / window.innerHeight;
    const ratios = {
      '32:9': 3.56,
      '21:9': 2.37,
      '16:9': 1.78,
      '16:10': 1.6,
      '3:2': 1.5,
      '5:4': 1.25,
      '4:3': 1.33,
      '1:1': 1
    };
    
    let closest = '16:9';
    let smallestDiff = Infinity;
    
    for (const [name, value] of Object.entries(ratios)) {
      const diff = Math.abs(ratio - value);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closest = name;
      }
    }
    
    return closest;
  }

  getOrientation() {
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  }

  getWidth() {
    return window.innerWidth;
  }

  getHeight() {
    return window.innerHeight;
  }
}

// For the experimental extension format
(function() {
  const extensionInstance = new WindowRatioExtension();
  Scratch.extensions.register(extensionInstance);
})();