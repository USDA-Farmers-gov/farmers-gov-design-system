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
        let externalLinks = [];

        if (!!extLinkData) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(content, "text/html");
          const links = doc.body.querySelectorAll("a");
          let extLinks = [];

          links.forEach((link) => {
            const internalLink = this.checkIfLinkInternal(link);
            if (!internalLink) extLinks.push(link.href);
          });

          externalLinks = extLinks;
        }

        return externalLinks;
      },
      processLinksInContent(content) {
        // - makes all links open in new window
        // - adds external link icon where appropriate and only if extlink Drupal module enabled.
        const extLinkData = JSON.parse(localStorage.getItem("extlink_data"));
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const links = doc.body.querySelectorAll("a");

        links.forEach((link) => {
          link.setAttribute("target", "_blank");
        });

        if (!!extLinkData) {
          links.forEach((link) => {
            const internalLink = this.checkIfLinkInternal(link);
            if (!internalLink)
              link.innerHTML =
                link.innerHTML +
                `<svg focusable="false" class="ext" role="img" aria-label="(link is external)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 40">
                  <metadata>
                      <sfw xmlns="http://ns.adobe.com/SaveForWeb/1.0/">
                          <slicesourcebounds y="-8160" x="-8165" width="16389" height="16384" bottomleftorigin="true"></slicesourcebounds>
                          <optimizationsettings>
                              <targetsettings targetsettingsid="0" fileformat="PNG24Format">
                                  <png24format transparency="true" filtered="false" interlaced="false" nomattecolor="false" mattecolor="#FFFFFF"></png24format>
                              </targetsettings>
                          </optimizationsettings>
                      </sfw>
                  </metadata>
                  <title>(link is external)</title>
                  <path d="M48 26c-1.1 0-2 0.9-2 2v26H10V18h26c1.1 0 2-0.9 2-2s-0.9-2-2-2H8c-1.1 0-2 0.9-2 2v40c0 1.1 0.9 2 2 2h40c1.1 0 2-0.9 2-2V28C50 26.9 49.1 26 48 26z"></path>
                  <path d="M56 6H44c-1.1 0-2 0.9-2 2s0.9 2 2 2h7.2L30.6 30.6c-0.8 0.8-0.8 2 0 2.8C31 33.8 31.5 34 32 34s1-0.2 1.4-0.6L54 12.8V20c0 1.1 0.9 2 2 2s2-0.9 2-2V8C58 6.9 57.1 6 56 6z"></path>
              </svg>`;
          });
        }

        return doc.body.innerHTML;
      },
      handleLinkAlert(event) {
        const extLinkData = JSON.parse(localStorage.getItem("extlink_data"));
        if (
          !!extLinkData &&
          !!event.target.href &&
          !this.checkIfLinkInternal(event.target.href)
        ) {
          event.preventDefault();

          const confirm = window.confirm(extLinkData.extAlertText);
          if (!!confirm) window.open(event.target, "_blank");
        }
      },
      checkIfLinkInternal(link) {
        const extLinkData = JSON.parse(localStorage.getItem("extlink_data"));
        let isInternal = true;
        const url = !!link.href ? link.href : link;
        // console.log(link.href);

        if (!!extLinkData) {
          let domain = new URL(url);
          domain = domain.hostname;
          if (window.location.hostname === domain) isInternal = true;
          if (window.location.hostname !== domain) {
            let extExclude = new RegExp(
              extLinkData.extExclude.replace(/\\/, "\\"),
              "i"
            );
            isInternal = extExclude.test(domain);
          }
        }
        return isInternal;
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
