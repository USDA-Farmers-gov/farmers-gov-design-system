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
      getExternalLinksFromContent(content) {
        const extLinkData = JSON.parse(localStorage.getItem("extlink_data"));
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const links = doc.body.querySelectorAll("a");
        let extLinks = [];
        links.forEach((link) => {
          const internalLink = this.checkIfLinkInternal(link, extLinkData);
          if (!internalLink) extLinks.push(link.href);
        });
        return extLinks;
      },
      handleLinkAlert(event) {
        if (!!event.target.href && this.extLinks.includes(event.target.href)) {
          event.preventDefault();
          const extLinkData = JSON.parse(localStorage.getItem("extlink_data"));
          var confirm = window.confirm(extLinkData.extAlertText);
          if (!!confirm) window.open(event.target, "_blank");
        }
      },
      checkIfLinkInternal(link) {
        const extLinkData = JSON.parse(localStorage.getItem("extlink_data"));
        const url = !!link.href ? link.href : link;

        let domain = new URL(url);
        domain = domain.hostname;
        let extExclude = new RegExp(
          extLinkData.extExclude.replace(/\\/, "\\"),
          "i"
        );
        return extExclude.test(domain);
      },
      setAllLinksOpenInNewWindow(content) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const links = doc.body.querySelectorAll("a");

        links.forEach((link) => {
          link.setAttribute("target", "_blank");
        });

        return doc.body.innerHTML;
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
      is_edge() {
        return /Edge/.test(navigator.userAgent) ? true : false;
      },
      is_firefox() {
        return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
      },
      is_ios() {
        return /(ipad|iphone)/g.test(navigator.userAgent.toLowerCase());
      },
      is_android() {
        return navigator.userAgent.toLowerCase().indexOf("android") > -1;
      },
      is_mobile() {
        return "ontouchstart" in document.documentElement &&
          navigator.userAgent.match(/Mobi/)
          ? true
          : false;
      },
      printFromIframe(content, css) {
        window.frames["print_frame"].document.head.innerHTML = css;
        window.frames["print_frame"].document.body.innerHTML = content;

        setTimeout(function () {
          window.frames["print_frame"].window.focus();
          window.frames["print_frame"].window.print();
        }, 250);
      },
      printPopUp(content, css, printPopUpPage) {
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
          `${printPopUpPage}?${randomId}`,
          "print_card",
          `height=${windowHeight},width=${windowWidth},top=${top},left=${left}`
        );

        popup.onload = function () {
          popup.print();
          setTimeout(function () {
            popup.close();
          }, 500);
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
