# eslint-plugin-ui5-property-init-in-oninit

Ensure class properties are initialized at declaration or in onInit method or through functions called by onInit, unless marked as optional.

## Installation

```bash
npm install eslint-plugin-ui5-property-init-in-oninit --save-dev
```

## TODO 

- maybe make it a warning by default with extends 
- constructor init only happens once 
- maybe check if is a controller 

### Key Differences Between Constructor and onInit

constructor:
- Called only once when the class instance is created.
- Good for overall class setup and calling super().

onInit:
 - Specific to SAP UI5 controllers and views.
 - Called by UI5 framework when the view is instantiated.
 - Ideal for UI5-specific setup like model initialization and data fetching.

Combining both methods helps utilize the strengths of ES6 classes while adhering to SAP UI5 MVC patterns and lifecycle management.