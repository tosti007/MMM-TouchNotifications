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

    for (var i = 0; i < this.config.buttons.length; i++) {
      if (typeof this.config.buttons[i].notification === "string" && this.config.buttons[i].select === undefined) {
        this.config.buttons[i].select = this.config.buttons[i].notification;
      }
    }
  },

  notificationReceived: function(notification, payload, sender) {
    var event;
    if (window.CustomEvent) {
      event = new CustomEvent("touch-notification", {
        detail: {
          "notification": notification,
          "payload": payload,
          "sender": sender
        }
      });
    } else {
      event = document.createEvent("CustomEvent");
      event.initCustomEvent("touch-notification", true, true, {
        "notification": notification,
        "payload": payload,
        "sender": sender
      });
    }

    var element = document.getElementById(this.identifier + "_menu");
    if (element) {
      // element.dispatchEvent(event); argh events don't pass down to children
      element.notification(event);
    }

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

    menu.notification = function(event) {
      var childs = menu.children;
      for (var i = 0; i < childs.length; i++) {
        childs[i].dispatchEvent(event);
      }
    };

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
    if (data.select) {
      self.buttonEvent(self, item, data.select);
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
    if (typeof notification !== "string") {
      if (notification.type && notification.payload) {
        button.addEventListener("click", function() {
          self.sendNotification(notification.type, notification.payload);
        });
      } else {
        button.addEventListener("click", function() {
          for (var index in notification) {
            self.buttonClick(self, button, notification[index]);
          }
        });
      }
      return;
    }

    var data = notification.split(" ");
    switch (data[0]) {
      case "profile":
        button.addEventListener("click", function() {
          self.sendNotification("CURRENT_PROFILE", data[1]);
        });
        break;

      case "show":
      case "hide":
        // TODO
        break;
    }
  },

  buttonEvent: function(self, button, select) {
    if (typeof select === "function") {
      button.addEventListener("touch-notification", function(e) {
        var result = select(e.detail.notification, e.detail.payload,
          button.className === "notification-button selected", e.detail.sender);

        if (result < 0) {
          button.className = "notification-button";
        } else if (result > 0) {
          button.className = "notification-button selected";
        }
      });
      return;
    }

    var data = select.split(" ");
    switch (data[0]) {
      case "profile":
        self.buttonEvent(self, button, function(type, payload) {
          if (type === "CHANGED_PROFILE") {
            if (payload.to === data[1]) {
              return 1;
            } else {
              return -1;
            }
          }
          return 0;
        });
        break;

      case "click":
        button.addEventListener("click", function() {
          if (button.className === "notification-button selected") {
            button.className = "notification-button";
          } else {
            button.className = "notification-button selected";
          }
        });
        break;

      case "show":
      case "hide":
        // TODO
        break;
    }
  }
});
