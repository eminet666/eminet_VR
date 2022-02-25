(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? factory() : typeof define === "function" && define.amd ? define(factory) : factory()
})(this, function () {
    "use strict";
    AFRAME.registerComponent("debug-cursor", {
        schema: {
            enabled: { default: true},
            all: {default: false},
        },
        init: function () {
            var self = this;
            let all = this.data.all;

            this.el.addEventListener("mouseenter", function (evt) {
                self.log("mouseenter", evt.detail.intersectedEl, "green", all)
            });
            this.el.addEventListener("mouseleave", function (evt) {
                self.log("mouseleave", evt.detail.intersectedEl, "red", all)
            })
            this.el.addEventListener("click", function (evt) {
                self.log("click", evt.detail.intersectedEl, "blue", all)
            })
        },
        log: function (event, intersectedEl, color, all) {
            if (!this.data.enabled) {
                return
            }

            if (all) {
                console.log(`%c[${event}]`, `color: ${color}`);
                console.log(intersectedEl);
            } else {
                if (intersectedEl.id) {
                    console.log(`%c[${event}] ${intersectedEl.id}`, `color: ${color}`)
                } else {
                    // console.log(`%c[${event}]`, `color: ${color}`);
                    // console.log(intersectedEl)
                }
            }
        }
    })
});