/* global Module */

/* Magic Mirror
 * Module: MMM-TouchNotifications
 *
 * By Brian Janssen
 * MIT Licensed.
 */

Module.register("MMM-TouchNotifications", {
  // Default module config.
  defaults: {
    // Determines if the border around the buttons should be shown.
    showBorder: true,
    // The minimum width for all the buttons.
    minWidth: "0px",
    // The minimum height for all the buttons.
    minHeight: "0px",
    // The location of the symbol relative to the text.
    picturePlacement: "left",
    // The direction of the menu.
    direction: "row",
    // All the different buttons in the menu.
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
  },

  // Define required styles.
  getStyles: function() {
    return ["font-awesome.css", this.file("MMM-TouchNotifications.css")];
  },

  start: function() {
    this.config.picturePlacement = {
      "right": "row-reverse",
      "left": "row",
      "top": "column",
      "bottom": "column-reverse"
    }[this.config.picturePlacement];
  },

  // Override dom generator.
  getDom: function() {
    var menu = document.createElement("span");
    menu.className = "notification-menu";
    menu.id = this.identifier + "_menu";
    menu.style.flexDirection = this.config.direction;

    for (var index in this.config.buttons) {
      menu.appendChild(this.createButton(this, index, this.config.buttons[index]));
    }

    return menu;
  },

  createButton: function(self, index, data) {
    var item = document.createElement("span");
    item.id = self.identifier + "_button_" + index;
    item.className = "notification-button";
    item.style.minWidth = self.config.minWidth;
    item.style.minHeight = self.config.minHeight;
    item.style.flexDirection = self.config.picturePlacement;

    if (!self.config.showBorder) {
      item.style.borderColor = "black";
    }

    if (data.notification) {
      self.buttonClick(self, item, data.notification);
    }

    self.buttonPicture(self, item, data);
    self.buttonText(self, item, data);

    return item;
  },

  buttonPicture: function(self, button, data) {
    if (data.symbol) {
      var symbol = document.createElement("span");
      symbol.className = "notification-picture fa fa-" + data.symbol;
      if (data.size) {
        symbol.className += " fa-" + data.size;
        symbol.className += data.size == 1 ? "g" : "x";
      }

      if (data.text && self.config.picturePlacement === "row") { // row = left
        symbol.style.marginRight = "10px";
      }

      button.appendChild(symbol);

    } else if (data.img) {
      var image = document.createElement("img");
      image.className = "notification-picture";
      image.src = data.img;

      if (data.width) image.width = data.width;
      if (data.height) image.height = data.height;

      if (data.text && self.config.picturePlacement === "row") { // row = left
        image.style.marginRight = "10px";
      }

      button.appendChild(image);
    }
  },

  buttonText: function(self, button, data) {
    if (data.text) {
      var text = document.createElement("span");
      text.className = "notification-text";
      text.innerHTML = data.text;

      if ((data.symbol || data.img) && self.config.picturePlacement === "row-reverse") { // right = row-reverse
        text.style.marginRight = "10px";
      }

      button.appendChild(text);
    }
  },

  buttonClick: function(self, button, notification) {
    if (notification.type && notification.payload) {
      button.addEventListener("click", function() {
        self.sendNotification(notification.type, notification.payload);
      });
    } else {
      button.addEventListener("click", function() {
        for (var index in notification) {
          self.sendNotification(notification[index].type, notification[index].payload);
        }
      });
    }
  }
});
