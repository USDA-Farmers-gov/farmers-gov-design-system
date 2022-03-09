export function initialize(Vue) {
  Vue.mixin({
    methods: {
      webFriendlyName(text) {
        if (!!text) {
          text = text.replace(/\s+/g, "-");
          text = text.replace(/[^0-9a-zA-Z\-]/g, "");
          text = text.toLowerCase();
        }
        return text;
      },
      createFormElementId(value) {
        return `${this.data.element_id}-${value}`;
      },
      elementClasses(constant, dynamic) {
        let classes = [constant];
        if (!!dynamic) classes.push(dynamic);
        return classes.join(" ");
      },
      is_chrome() {
        const isChromium = window.chrome;
        const winNav = window.navigator;
        const vendorName = winNav.vendor;
        const isOpera = typeof window.opr !== "undefined";
        const isIEedge = winNav.userAgent.indexOf("Edge") > -1;
        const isIOSChrome = winNav.userAgent.match("CriOS");
        let isChrome = false;

        if (
          isIOSChrome ||
          (isChromium !== null &&
            typeof isChromium !== "undefined" &&
            vendorName === "Google Inc." &&
            isOpera === false &&
            isIEedge === false)
        ) {
          isChrome = true;
        }

        return isChrome;
      },
      is_safari() {
        return navigator.userAgent.indexOf("Safari") > -1 &&
          navigator.userAgent.indexOf("Chrome") === -1
          ? true
          : false;
      },
      is_edge: function () {
        return /Edge/.test(navigator.userAgent) ? true : false;
      },
      is_mobile() {
        return "ontouchstart" in document.documentElement &&
          navigator.userAgent.match(/Mobi/)
          ? true
          : false;
      },
      printFromIframe(content, css) {
        const printFrame = document.createElement("iframe");
        printFrame.name = "print_frame";
        printFrame.style.height = "0";
        printFrame.style.width = "0";
        printFrame.style.visibility = "hidden";
        printFrame.style.border = "none";
        document.body.appendChild(printFrame);

        const frameDoc = printFrame.contentWindow
          ? printFrame.contentWindow
          : printFrame.contentDocument.document
          ? printFrame.contentDocument.document
          : printFrame.contentDocument;
        frameDoc.document.open();
        frameDoc.document.write("<html>");
        frameDoc.document.write(`<head>${css}</head>`);
        frameDoc.document.write(`<body>${content}</body>`);
        frameDoc.document.write("</html>");
        frameDoc.document.close();

        setTimeout(function () {
          window.frames["print_frame"].window.focus();
          window.frames["print_frame"].window.print();
          document.body.removeChild(printFrame);
        }, 250);
      },
      printPopUp(content, css) {
        const isEdge = /Edge/.test(navigator.userAgent) ? true : false;
        const windowHeight = Math.round(screen.height / 2);
        const windowWidth = Math.round(screen.width / 2);
        const top = Math.round(windowHeight / 2);
        const left = Math.round(windowWidth / 2);
        const randomId = Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "");

        sessionStorage.removeItem("print_popup_css");
        sessionStorage.setItem("print_popup_css", css);

        sessionStorage.removeItem("print_popup");
        sessionStorage.setItem("print_popup", content);

        const popup = window.open(
          `/themes/farmers_update/print-popup.html?${randomId}`,
          "print_card",
          `height=${windowHeight},width=${windowWidth},top=${top},left=${left}`
        );
        popup.onafterprint = function () {
          console.log("After print");
        };
        popup.onload = function () {
          popup.print();
          if (isEdge) popup.close();
        };
        if (!isEdge) {
          popup.onafterprint = function () {
            popup.close();
          };
        }
      },
    },
  });
}
