<!-- All the links I use multiple times in this readme file, this way I won't have to copy paste so often -->
[MMM-TouchNotifications]: https://github.com/tosti007/MMM-TouchNotifications

# MMM-TouchNavigation

This an extension for the [MagicMirror²](https://magicmirror.builders/).
This Module adds a touch menu to send different notifications to the other modules.

It is very simmilair to [MMM-TouchNavigation](https://github.com/tosti007/MMM-TouchNavigation), however with this module you can choose the notification and it does not offer the "fade-out" of the buttons feature.

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
| `notification` | The notification that should be send when pressed. <br><br> **Note:** required, see [Configuring Notifications](#configuring-notifications) <br> **Possible values:** object (`{}`) or array (`[]`) of objects

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

| Option    | Description
| --------- | -----------
| `type`    | The kind of notification to send when pressed. <br><br> **Note:** required <br> **Possible values:** `string`
| `payload` | The payload to send with the notification. <br><br> **Note:** it depends on the module you want to address with `type` what you want to use here.


## Notes
* **Important:** unfortunatly positioning this module as fullscreen will result in the menu floating top left. I currently do not know how to fix this but will look into it. If you know how don't hesitate to either write me or send me a pull request!
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
