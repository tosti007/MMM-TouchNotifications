<!-- All the links I use multiple times in this readme file, this way I won't have to copy paste so often -->
[MMM-TouchNotifications]: https://github.com/tosti007/MMM-TouchNotifications

# MMM-TouchNotifications

This an extension for the [MagicMirror²](https://magicmirror.builders/).
This Module adds a touch menu to send different notifications to the other modules.

It is very simmilair to [MMM-TouchNavigation](https://github.com/tosti007/MMM-TouchNavigation), however with this module you can choose the notification and it does not offer the "fade-out" of the buttons feature.

## Unmaintained

I am not currently active anymore in the MagicMirror community, as I am busy with study and life, hence this project is unmaintained. That means I mostly won't creating new features or be replying to questions in-depth on this module, as I don´t really know how the framework works anymore.

However this module does work as described here so feel free to use it! If you're having problems with the module feel free to ask in an issue, but I will most likely have no answer (but maybe someone does). I will respond to pull requests, so if you have an issue feel free to fix it yourself and shoot me a pull request!

## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/tosti007/MMM-TouchNotifications.git
````

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
    {
        module: 'MMM-TouchNotifications',
        config: {
            // See 'Configuration options' for more information.
        }
    }
]
````

## Configuration options

The following properties can be configured:

| Option             | Description
| ------------------ | -----------
| `showBorder`       | Determines if the border around the buttons should be shown. <br><br> **Possible values:** `true` or `false` <br> **Default value:** `true`
| `minWidth`         | The minimum width for all the buttons. <br><br> **Possible values:** `css length` <br> **Default value:** `0px`
| `minHeight`        | The minimum height for all the buttons. <br><br> **Possible values:** `css length` <br> **Default value:** `0px`
| `picturePlacement` | The location of the symbol or image relative to the text. <br><br> **Possible values:** `left`, `right`, `top` or `bottom` <br> **Default value:** `left`
| `direction`        | The direction of the menu. <br><br> **Possible values:** `row`, `column`, `row-reverse` or `column-reverse`<br> **Default value:** `row`
| `buttons`          | All the different buttons in the menu. <br><br> **Note:** required, see [Configuring Buttons](#configuring-buttons) <br> **Possible values:** an array of button configurations <br> **Default value:** a button example


## Configuring Buttons
Buttons have to be placed in `buttons` in the `config`. A button contains a configuration in an object (`{}`).

| Option         | Description
| -------------- | -----------
| `text`         | A string to display in the button. <br><br> **Note:** if no value is set no text will be displayed. <br> **Possible values:** `string`
| `symbol`       | A symbol to display in the button. <br><br> **Note:** if no value is set no symbol will be displayed. <br> **Possible values:** See [Font Awesome](http://fontawesome.io/icons/) website
| `size`         | The size of the symbol. <br><br> **Note:** will only have effect on the symbol. <br> **Default value:** `1` <br> **Possible values:** `1`, `2`, `3`, `4` or `5`
| `img`          | An image to display in the button. <br><br> **Note:** it will only display if no symbol is set. <br> **Possible values:** A path to an image (an url or local path)
| `width`        | The width of the image. <br><br> **Note:** will only have effect on the image. <br> **Possible values:** `number`
| `height`       | The height of the image. <br><br> **Note:** will only have effect on the image. <br> **Possible values:** `number`
| `notification` | The notification that should be send when pressed. <br><br> **Note:** required, see [Configuring Notifications](#configuring-notifications) <br> **Possible values:** object (`{}`), array (`[]`) of objects or string
| `select`       | A function to determine if the button is selected. <br><br> **Note:** optional, see [Configuring Select](#configuring-select) <br> **Possible values:** function or string

An example:
````javascript
buttons: [{
  // this is a button with only a single notification
  text: "Example 1",
  symbol: "ban",
  notification: {
    type: "SHOW_ALERT",
    payload: {
      type: "notification",
      title: "Example 1",
      message: "Hello World!"
    }
  }
}, {
  // this is a button with multiple notifications
  text: "Example 2",
  notification: [{
    // the first notification
    type: "SHOW_ALERT",
    payload: {
      type: "notification",
      title: "Example 2",
      message: "Hello"
    }
  }, {
    // the second notification
    type: "SHOW_ALERT",
    payload: {
      type: "notification",
      title: "Example 2",
      message: "World!"
    }
  }]
}]
````


## Configuring Notifications
An notification configuration is fairly simple and only contains a little bit of information which is both required. This will be the actual notification that will be send when the button is pressed. It totally depends on the other module what payload should be here.

There are also some pre-configured shortcuts to make your life easier. The shortcuts are strings instead of objects and may take some additional information. They are used the same way as a "normal" configuration.

| Option    | Description
| --------- | -----------
| `type`    | The kind of notification to send when pressed. <br><br> **Note:** required <br> **Possible values:** `string`
| `payload` | The payload to send with the notification. <br><br> **Note:** it depends on the module you want to address with `type` what you want to use here.

The pre-configured shortcuts:

| Shortcut       | Description
| -------------- | -----------
| `profile name` | This shortcut is for in combination with the [MMM-ProfileSwitcher](https://github.com/tosti007/MMM-ProfileSwitcher) module. It allows you to switch between profiles. <br><br> **Arguments:** <br> **`name`:** The profile name used for the [MMM-ProfileSwitcher](https://github.com/tosti007/MMM-ProfileSwitcher).
<!-- WORK IN PROGRESS | `hide modules` | This shortcut allows you to toggle different modules to hidden or shown. <br><br> **Arguments:** <br> **`modules`:** The names of modules that should be hidden/shown. Multiple module names should be seperated by a space.
| `show modules` | Same as hide. -->

## Configuring Select
The select option allows the button to fade when a certain notification is recieved by the module. You might need a bit more understanding of `javascript` and the MagicMirror framework in order be able to write your own functions, hence there are some pre-configured shortcuts to make your life easier and allow you to configure the button without an understanding of functions in javascript.

The pre-configured shortcuts:

| Shortcut       | Description
| -------------- | -----------
| `profile name` | This shortcut is for in combination with the [MMM-ProfileSwitcher](https://github.com/tosti007/MMM-ProfileSwitcher) module. The button will fade when the configured profile is currently active. <br><br> **Arguments:** <br> **`name`:** The profile name
| `click`        | When the button is clicked it will toggle between faded in or out.
<!-- WORK IN PROGRESS | `hide modules` | This shortcut allows you to toggle different modules to hidden or shown. <br><br> **Arguments:** <br> **`modules`:** The names of modules that should be hidden/shown. Multiple module names should be seperated by a space.
| `show modules` | Same as hide. -->

Instead of the pre-configured shortcuts you can also write your own function. The function will be used whenever the module recieves an notification form a different module. The function will be given the input depending on the recieved notification.

#### The function's input
The function will be passed up to 4 arguments. These come from the recieved notification.

| Argument       | Description
| -------------- | -----------
| `notification` | The type of notification recieved. <br><br> **Note:** This is the same as the first argument passed through the notificationReceived function of the module. <br> **Type:** `string`
| `payload`      | The payload that came with the notification. <br><br> **Note:** This is the same as the second argument passed through the notificationReceived function of the module. <br> **Type:** anything (depends on the notification)
| `selected`     | A boolean that determines if the button is currently selected. <br><br> **Type:** `boolean`
| `sender`       | The sender from which the notification originated. <br><br> **Note:** This is the same as the third argument passed through the notificationReceived function of the module. <br> **Type:** `string`

#### The function's output
The function should always give a return value (a `number`). Depending on the value of the returned number it the button's state will be changed.

| Value        | Effect
| ------------ | ------
| `-1` or less | The button will return to normal (non faded).
| exactly `0`  | The button will remain the way it was.
| `1` or more  | The button will become faded.

## Notes
* If the image is an local path and it does not show. Try different ways to write the local path. If this still does not work then try putting the image in a folder in your MagicMirror folder and use as local path `foldername/imagename`.
* If only heigh or width is set for an image the other size will scale to maintain it the image it's original aspect ratio.
* If both the `text` and `symbol` aren't set for a button then the button won't contain anything, but still show the border.
* The symbols are all form the [Font Awesome](http://fontawesome.io/icons/) website.
* The text may contain HTML tags and will be displayed as HTML.

## The MIT License (MIT)

Copyright (c) 2017 Brian Janssen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.**
