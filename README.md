# Screen-Aspect-Ratio-Extension
A scratch/turbowarp extension for detecting client's device screen aspect ratio.

Also contains a detector for screen orientation. Very useful for adapting your project's layout to several device if you haven't before. If you don't want to do it the proper way. Also great for debugging purposes.

Best part: no need to install other extension anymore after installing this (for the purpose intended in this extension), i guess.

What makes this extension better than other extensions? Good question. Please leave :D

## Notes regarding versions
- SECURE version means it uses window.screen function to get the data.
- EASY version means it uses window.inner function to get the data.

## Which should i pick? 
Well, for starter you may want to see this table. And decide for yourself as I am too lazy to type an explanation.

| Feature              | `window.screen` | `window.inner` |
|----------------------|-----------------|----------------|
| Needs permissions    | Yes (multi-monitor) | No           |
| Measures physical display | Yes       | No           |
| Affected by zoom     | No              | Yes           |
| Changes on resize    | No              | Yes           |
| Includes browser UI  | N/A             | No            |

FOR SCRATCH:
## How to Load:
1. Download the .js file that suits your needs. (available at the release page)
2. In Scratch, use "Load Experimental Extension"
3. Select the file

## Important Notes:
- Multi-monitor features require Chrome/Edge 98+ or Firefox 103+
- The browser may prompt for permission to access screen details
- On older browsers, it will gracefully fall back to primary display only

FOR TURBOWARP:
## Loading in TurboWarp:

1. Same as 1.) in the Scratch Method.
2. In TurboWarp:
   - Click "Extensions" in the toolbar
   - Select "Load Extension"
   - Choose "JavaScript File"
   - Upload your file

## Limitations to Note:

1. **Multi-monitor support** requires:
   - Chrome/Edge 98+ or Firefox 103+
   - User permission (TurboWarp will prompt)
   - HTTPS connection (except localhost)

2. **Mobile devices** may report unexpected ratios due to:
   - Browser chrome (address bars)
   - Viewport scaling
   - Device-specific pixel ratios

3. **TurboWarp Packager** may require additional permissions for the packaged app to access screen details
