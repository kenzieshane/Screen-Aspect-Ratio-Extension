// Kenzie Shane Setiawan 2025

class ScreenRatioExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.screenDetails = null;
  }

  getInfo() {
    return {
      id: 'screenRatio',
      name: 'Screen Aspect Ratio',
      blocks: [
        {
          opcode: 'detectRatio',
          blockType: Scratch.BlockType.REPORTER,
          text: 'screen ratio of display [DISPLAY]',
          arguments: {
            DISPLAY: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'getOrientation',
          blockType: Scratch.BlockType.REPORTER,
          text: 'orientation of display [DISPLAY]',
          arguments: {
            DISPLAY: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'getDisplayCount',
          blockType: Scratch.BlockType.REPORTER,
          text: 'number of displays'
        }
      ],
      menus: {
        DISPLAY: {
          acceptReporters: true,
          items: ['1', '2', '3', '4']
        }
      }
    };
  }

  async detectRatio(args) {
    await this._initScreenDetails();
    const displayNum = Math.max(1, Math.min(4, Math.round(args.DISPLAY))) - 1;
    
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
    
    let width, height;
    if (this.screenDetails?.screens?.length > displayNum) {
      width = this.screenDetails.screens[displayNum].width;
      height = this.screenDetails.screens[displayNum].height;
    } else {
      width = window.screen.width;
      height = window.screen.height;
    }
    
    const ratio = width / height;
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

  async getOrientation(args) {
    await this._initScreenDetails();
    const displayNum = Math.max(1, Math.min(4, Math.round(args.DISPLAY))) - 1;
    
    let width, height;
    if (this.screenDetails?.screens?.length > displayNum) {
      width = this.screenDetails.screens[displayNum].width;
      height = this.screenDetails.screens[displayNum].height;
    } else {
      width = window.screen.width;
      height = window.screen.height;
    }
    
    return width > height ? 'landscape' : 'portrait';
  }

  async getDisplayCount() {
    await this._initScreenDetails();
    return this.screenDetails?.screens?.length || 1;
  }

  async _initScreenDetails() {
    if (window.getScreenDetails && !this.screenDetails) {
      try {
        this.screenDetails = await window.getScreenDetails();
      } catch (e) {
        console.warn('Could not get screen details:', e);
      }
    }
    return this.screenDetails;
  }
}

Scratch.extensions.register(new ScreenRatioExtension());
