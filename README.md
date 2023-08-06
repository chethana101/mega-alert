<div align="center">
  <div style="display: flex; justify-content: center; align-items: center;">
    <img width="200" height="200"
        src="https://github.com/chethana101/mega-alert/blob/main/assets/images/mega-alert-logo.png">
    <h1>Mega Alert</h1>
  </div>
  <p>Notification Alert Library</p>
  <p>Mega Alert is a library for add notifications alerts for website or the web applications.</p>
  <img height="400"
        src="https://github.com/chethana101/mega-alert/blob/main/assets/gif/mega-alert-demo.gif">
</div>

## Installation

To install this package you can use the below npm command.

```sh
npm install mega-alert
```

or inline

```js
<script src="mega-alert.min.js"></script>
```
## Example Usage:
### Markup

```html
<head>
    <link rel="stylesheet" href="mega-alert.min.css">
</head>
<body>
    <div id="mega-alert-container">
</body>
```
### Default initialization

```js
// Require module
var MegaAlert = require('mega-alert');

// Default configurations
let options = {
    theme: "light",
    position: "bottom-right",
    icon: true,
    closeIcon: true,
    animation: true,
    leftBorderColor: true,
    autoClose: 5000,
};

// Initialize
const megaAlert = MegaAlert("#mega-alert-container", options);

// Error Alert
megaAlert.error();

// Success Alert
megaAlert.success();

// Warning Alert
megaAlert.warning();

// Inoformation Alert
megaAlert.info();
```

Not only that but also you can change the default title and the paragraph like this.

```js
// Initialize
const megaAlert = MegaAlert("#mega-alert-container", options);

// Error Alert
megaAlert.error({
    titleVisibility: true,
    paragraphVisibility: true,
    title: "Here is the title",
    paragraph: "Here is the alert paragraph",
    buttons: [
        {
            buttonName: "Close",
            onClick: function (alert) {
                megaAlert.removeAlert(alert);
            }
        }
    ]
});

```

Using the above configurations you can control the title and paragraph with custom text and visibility. Not only that you can use custom buttons for the alerts. In there, you can declare buttons as objects. As parameters it will take the `buttonName` and the `onClick` listener.

### Loading Alert

Mega alert also provide the loading alert. Here is the usage.

```js
// Initialize
const megaAlert = MegaAlert("#mega-alert-container", options);

// Loading Alert
megaAlert.loading({
    title: "Here is the title",
    paragraph: "Here is the alert paragraph",
});

```

In the loading alert also you can add the title and the paragraph as a parameters. Configurations are not required.

### Promises Alert

This alert is provided to the control the return on the promises. Here is the code example.

```js
// Initialize
const megaAlert = MegaAlert("#mega-alert-container", options);

// Promise Alert
const promise = new Promise((resolve, reject) => {
    // Simulate an asynchronous operation
    setTimeout(() => {
        const randomNumber = Math.random();
        if (randomNumber > 0.5) {
            resolve("Promise resolved successfully!");
        } else {
            reject("Promise rejected!");
        }
    }, 2000);
});

megaAlert.promise({
    promise: promise, // Pass your promise here
    title: "Promise in progress...",
    promiseRejectTitle: "Promise is rejected",
    promiseResolvedTitle: "Promise is resolved",
    promiseRejectParagraph: "Promise is rejected because if the reason.",
    promiseResolvedParagraph: "Promise is resolved because if the reason.",
});

```

That means if promise is pending, it will shop the pending alert (like a loading), then if the promise will success it will show the success alert otherwise show the promise rejected alert. There are also some configurations for the control reject and the resolved alerts. (Check the above code)

### Removing Alerts

Mega alert also provides the capabilities to remove the specific alert or all the alerts at once. Here is the code example.

```js
// Initialize
const megaAlert = MegaAlert("#mega-alert-container", options);

// Alerts
const errorAlert = megaAlert.error();
const successAlert = megaAlert.success();

// Remove specific alert
megaAlert.removeAlert(errorAlert);
megaAlert.removeAlert(successAlert);

// Remove all the alerts
megaAlert.removeAllAlerts();

```

## Options

Here are all the configurations that mega alert takes.

```js
let options = {
    theme: "light",
    position: "bottom-right",
    icon: true,
    closeIcon: true,
    animation: true,
    leftBorderColor: true,
    iconElement: "span",
    setCustomIcons: {
        error: "", // String, URL, Elements
        warning: "",
        info: "",
        success: "",
    },
    titleFontSize: "10px",
    paragraphFontSize: "10px",
    autoClose: 5000,
    progressBar: true,
    closeOnBodyClick: true,
};
```

### theme
This is a parameter that use for the change the alert theme. You can pass `light`, `dark` and `colored` as the parameters. This is a required parameter. Do not forget to add this.

### position
This parameter is controls the positions of the alerts. For that you can pass `top-left`, `top-right`, `bottom-left`, `bottom-right`, `top-center` and `bottom-center` values. This is a required parameter. Do not forget to add this.

### icon
Using this parameter you can hide the alert icon. As the parameter it will take `true` or `false`. . Default value is `false`.

### closeIcon
This is a parameter that you can use for hide and display close icon. This parameter also take the `true` or `false`. Default value is `false`.

### animation
This parameter can you for control the alert animation. That means when you put this as `true` alert will display with slide animation, also when it's close it will be slide and disappear. Default value is the `false`

### leftBorderColor
Using this parameter you can add the left border to the alert. That border color will be according to the type of alert. This parameter also takes boolean values such as `true` and `false`. Default value is `false`.

### iconElement
This is a parameter that you can use to make custom icons with prefer tags. It will take any type of HTML tag. You have to pass the tag as a string. Default will be `span`.

### setCustomIcons
Using this parameter you can customize each alert types. This parameter takes object of `error`, `warning`, `info` and `success`. For each sub-parameters you can pass either `class name`, `url` and `html element`.

### titleFontSize
This is a parameter that provides control the alert title font size. Default font size will be `12px`.

### paragraphFontSize
This is a parameter that provides control the alert paragraph font size. Default font size will be `10px`.

### autoClose
This parameter is use for set autoClose time. That means, when you put this parameter with `5000` the alert will disappear after 5 seconds. value is in milliseconds.

### progressBar
Using this parameter with `autoClose` option you can see the progress bar bottom of the alert. It will synchronize with the auto close time. Default will be `false`.

### closeOnBodyClick
This is a parameter that can use for close alert when clicking on the alert body. You can use `true` or `false` for this parameter. Default will be `false`.


## Feedback and Support

We appreciate your interest in Aqua IDE and value your feedback. If you encounter any issues, have suggestions for improvement, or would like to contribute to the project, please don't hesitate to [open an issue](https://github.com/chethana101/mega-alert/issues) on our GitHub repository.

## License

Mega Alert is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
