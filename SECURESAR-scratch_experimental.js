// Kenzie Shane Setiawan 2025

(function(ext) {
    // Cleanup function when extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Screen ratio detection with all features
    const Ratios = {
        '32:9': 3.56,   // Super ultrawide
        '21:9': 2.37,   // Ultrawide
        '16:9': 1.78,   // Widescreen
        '16:10': 1.6,   // Widescreen laptop
        '3:2': 1.5,     // Surface/Chromebook
        '5:4': 1.25,    // Business monitors
        '4:3': 1.33,    // Standard
        '1:1': 1,       // Square
        '9:32': 0.28,   // Portrait super ultrawide
        '9:21': 0.42,   // Portrait ultrawide
        '9:16': 0.56,   // Portrait widescreen
        '10:16': 0.625, // Portrait widescreen laptop
        '2:3': 0.67,    // Portrait Surface/Chromebook
        '4:5': 0.8      // Portrait business monitors
    };

    // Main ratio detection function
    ext.detectScreenRatio = function(displayNum = 0) {
        const screen = window.screen;
        let width, height;
        
        if (displayNum > 0 && window.screenDetails && screenDetails.screens) {
            // Multi-monitor support
            const displays = screenDetails.screens;
            displayNum = Math.min(displayNum - 1, displays.length - 1);
            width = displays[displayNum].width;
            height = displays[displayNum].height;
        } else {
            // Primary display
            width = screen.width;
            height = screen.height;
        }
        
        return findClosestRatio(width / height);
    };

    // Orientation detection
    ext.getOrientation = function(displayNum = 0) {
        if (displayNum > 0 && window.screenDetails && screenDetails.screens) {
            const screen = screenDetails.screens[Math.min(displayNum - 1, screenDetails.screens.length - 1)];
            return screen.width > screen.height ? 'landscape' : 'portrait';
        }
        return window.screen.width > window.screen.height ? 'landscape' : 'portrait';
    };

    // Multiple monitor support
    ext.getDisplayCount = function() {
        return window.screenDetails?.screens?.length || 1;
    };

    // Helper function to find closest ratio
    function findClosestRatio(ratio) {
        let closest = ratio >= 1 ? '16:9' : '9:16';
        let smallestDiff = Infinity;
        
        for (const [name, value] of Object.entries(Ratios)) {
            const diff = Math.abs(ratio - value);
            if (diff < smallestDiff) {
                smallestDiff = diff;
                closest = name;
            }
        }
        
        // Special cases
        if (Math.abs(ratio - 1.33) < 0.03 && Math.abs(ratio - 1.25) < 0.03) {
            return ratio > 1.29 ? '4:3' : '5:4';
        }
        if (Math.abs(ratio - 0.75) < 0.03 && Math.abs(ratio - 0.8) < 0.03) {
            return ratio > 0.77 ? '3:4' : '5:8';
        }
        
        return closest;
    }

    // Block definitions
    var descriptor = {
        blocks: [
            ['r', 'screen ratio %n', 'detectScreenRatio', 1],
            ['r', 'exact ratio of display %n', 'getExactRatio', 1],
            ['r', 'orientation of display %n', 'getOrientation', 1],
            ['r', 'number of displays', 'getDisplayCount'],
            ['r', 'is display %n in portrait mode?', 'isPortrait', 1],
            ['r', 'is display %n in landscape mode?', 'isLandscape', 1]
        ],
        menus: {
            displays: Array.from({length: 4}, (_, i) => (i + 1).toString())
        }
    };

    // Additional functions
    ext.getExactRatio = function(displayNum = 1) {
        if (displayNum > 1 && window.screenDetails && screenDetails.screens) {
            const displays = screenDetails.screens;
            displayNum = Math.min(displayNum - 1, displays.length - 1);
            return displays[displayNum].width / displays[displayNum].height;
        }
        return window.screen.width / window.screen.height;
    };

    ext.isPortrait = function(displayNum = 1) {
        return ext.getOrientation(displayNum) === 'portrait';
    };

    ext.isLandscape = function(displayNum = 1) {
        return ext.getOrientation(displayNum) === 'landscape';
    };

    // Register the extension
    ScratchExtensions.register('Screen Aspect Ratio', descriptor, ext);

    // Request permission for multi-monitor info
    if (window.getScreenDetails) {
        window.getScreenDetails().catch(() => {});
    }
})({});