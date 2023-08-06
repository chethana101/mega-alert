/*
 |---------------------------------------------------------------------
 | Validate Main Function
 |---------------------------------------------------------------------
 */
(function (global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document
            ? factory(global, true)
            : function (w) {
                if (!w.document) {
                    throw new Error("Mega Alert requires a window with a document");
                }
                return factory(w);
            };
        module.exports = MegaAlert;
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    window.MegaAlert = function (container, options = {}) {
        let data = {};
        data.options = options;
        /*
        |---------------------------------------------------------------------
        | Parent element validation
        |---------------------------------------------------------------------
        */
        if (container != null) {
            if (typeof container === "string") {
                if (document.body.contains(document.querySelector(container))) {
                    data.container = document.querySelector(container);
                }
            } else {
                if (document.body.contains(container)) {
                    data.container = container;
                }
            }
        } else {
            throw new Error("Directory binding element can not empty");
        }

        /*
        |---------------------------------------------------------------------
        | Error alert function
        |---------------------------------------------------------------------
        */
        data.error = function (config) {
            const component = buildAlert("error", config);
            data.container.append(component);
            return component;
        }

        /*
        |---------------------------------------------------------------------
        | Warning alert function
        |---------------------------------------------------------------------
        */
        data.warning = function (config) {
            const component = buildAlert("warning", config);
            data.container.append(component);
            return component;
        }

        /*
        |---------------------------------------------------------------------
        | Info alert function
        |---------------------------------------------------------------------
        */
        data.info = function (config) {
            const component = buildAlert("info", config);
            data.container.append(component);
            return component;
        }

        /*
        |---------------------------------------------------------------------
        | Success alert function
        |---------------------------------------------------------------------
        */
        data.success = function (config) {
            const component = buildAlert("success", config);
            data.container.append(component);
            return component;
        }

        /*
        |---------------------------------------------------------------------
        | Success alert function
        |---------------------------------------------------------------------
        */
        data.loading = function (config) {
            const component = buildLoadingAlert(config);
            data.container.append(component);
            return component;
        }

        /*
        |---------------------------------------------------------------------
        | Promise alert function
        |---------------------------------------------------------------------
        */
        data.promise = function (config) {
            // Check if custom title exists
            if (!config?.title) {
                config.title = "Promise is pending...";
            }
            // Get promise alert component
            const component = buildLoadingAlert(config);
            data.container.append(component);

            // Check if custom title available for promise success
            const promiseResolvedTitle = config?.promiseResolvedTitle ? config.promiseResolvedTitle : "Promise resolved";
            // Check if custom paragraph available for promise success
            const promiseResolvedParagraph = config?.promiseResolvedParagraph ? config.promiseResolvedParagraph : null;

            // Check if custom title available for promise reject
            const promiseRejectTitle = config?.promiseRejectTitle ? config.promiseRejectTitle : "Promise rejected";
            // Check if custom paragraph available for promise success
            const promiseRejectParagraph = config?.promiseRejectParagraph ? config.promiseRejectParagraph : null;

            config.promise.then((resolvedValue) => {
                data.container.replaceChild(buildAlert("success", {
                    title: promiseResolvedTitle,
                    paragraph: promiseResolvedParagraph,
                }), component);
            }).catch((rejectedReason) => {
                data.container.replaceChild(buildAlert("error", {
                    title: promiseRejectTitle,
                    paragraph: promiseRejectParagraph,
                }), component);
            });
            return component;
        }

        /*
        |---------------------------------------------------------------------
        | Remove specific alerts
        |---------------------------------------------------------------------
        */
        data.removeAlert = function (element) {
            element.classList.add(getAnimationClass("close"));
            // After the animation completes, remove the element from the DOM
            setTimeout(function () {
                element.remove();
            }, 500);
        }

        /*
        |---------------------------------------------------------------------
        | Remove all the alerts
        |---------------------------------------------------------------------
        */
        data.removeAllAlerts = function () {
            const allAlerts = data.container.querySelectorAll(".mega-alert");
            allAlerts.forEach((element) => {
                element.classList.add(getAnimationClass("close"));
                // After the animation completes, remove the element from the DOM
                setTimeout(function () {
                    element.remove();
                }, 500);
            })
        }


        /*
        |---------------------------------------------------------------------
        | Validation functions
        |---------------------------------------------------------------------
        */
        function validateOptions(options) {
            // Validate `theme` attribute data type
            const themes = ["dark", "light", "colored"];
            if (options?.theme) {
                if (typeof options.theme !== "string") {
                    throw new Error("`theme` value should be a string");
                }
                if (!themes.includes(options.theme)) {
                    throw new Error("`theme` value is undefined. Only can use `dark`, `light` and `colored`");
                }
            }

            // Validate `position` attribute data type
            const positions = ["top-left", "top-right", "top-center", "bottom-left", "bottom-right", "bottom-center"];
            if (options?.position) {
                if (typeof options.position !== "string") {
                    throw new Error("`position` value should be a string");
                }
                if (!positions.includes(options.position)) {
                    throw new Error("`position` value is undefined");
                }
            }

            // Validate `icon` attribute data type
            if (options?.icon && typeof options.icon !== "boolean") {
                throw new Error("`icon` value should be a boolean");
            }
            // Validate `closeIcon` attribute data type
            if (options?.closeIcon && typeof options.closeIcon !== "boolean") {
                throw new Error("`closeIcon` value should be a boolean");
            }
            // Validate `title` attribute data type
            if (options?.title && typeof options.title !== "string") {
                throw new Error("`title` value should be a string");
            }
            // Validate `paragraph` attribute data type
            if (options?.paragraph && typeof options.paragraph !== "string") {
                throw new Error("`paragraph` value should be a string");
            }
            // Validate `titleVisibility` attribute data type
            if (options?.titleVisibility && typeof options.titleVisibility !== "boolean") {
                throw new Error("`titleVisibility` value should be a boolean");
            }
            // Validate `paragraphVisibility` attribute data type
            if (options?.paragraphVisibility && typeof options.paragraphVisibility !== "boolean") {
                throw new Error("`paragraphVisibility` value should be a boolean");
            }
            // Validate `animation` attribute data type
            if (options?.animation && typeof options.animation !== "boolean") {
                throw new Error("`animation` value should be a boolean");
            }
            // Validate `createAnimation` attribute data type
            if (options?.createAnimation && typeof options.createAnimation !== "boolean") {
                throw new Error("`createAnimation` value should be a boolean");
            }
            // Validate `closeAnimation` attribute data type
            if (options?.closeAnimation && typeof options.closeAnimation !== "boolean") {
                throw new Error("`closeAnimation` value should be a boolean");
            }
            // Validate `leftBorderColor` attribute data type
            if (options?.leftBorderColor && typeof options.leftBorderColor !== "boolean") {
                throw new Error("`leftBorderColor` value should be a boolean");
            }
            // Validate `titleFontSize` attribute data type
            if (options?.titleFontSize && typeof options.titleFontSize !== "string") {
                throw new Error("`titleFontSize` value should be a string");
            }
            // Validate `paragraphFontSize` attribute data type
            if (options?.paragraphFontSize && typeof options.paragraphFontSize !== "string") {
                throw new Error("`paragraphFontSize` value should be a string");
            }
            // Validate `autoClose` attribute data type
            if (options?.autoClose && typeof options.autoClose !== "number") {
                throw new Error("`autoClose` value should be a number");
            }
            // Validate `iconElement` attribute data type
            if (options?.iconElement && typeof options.iconElement !== "string") {
                throw new Error("`iconElement` value should be a string");
            }
            // Validate `progressBar` attribute data type
            if (options?.progressBar && typeof options.progressBar !== "boolean") {
                throw new Error("`progressBar` value should be a boolean");
            }
            // Validate `closeOnBodyClick` attribute data type
            if (options?.closeOnBodyClick && typeof options.closeOnBodyClick !== "boolean") {
                throw new Error("`closeOnBodyClick` value should be a boolean");
            }
        }

        /**
         * Create main alert element/component
         * @param type
         * @param config
         * */
        function buildAlert(type, config = {}) {
            // Validate the config parameters
            validateOptions(data.options);
            // Validate the title and paragraph data types
            if (config != null) {
                validateOptions(config);
            }
            // Add parent classes
            data.container.classList.add("mega-alert-container");
            // Check the alert container position
            if (data.options?.position) {
                setContainerPosition(data.options.position);
            }

            const megaAlert = document.createElement("div");
            megaAlert.classList.add("mega-alert");
            // Check the theme type
            if (data.options?.theme) {
                setAlertTheme(megaAlert, type);
            } else {
                megaAlert.classList.add("mega-alert-light-theme");
            }
            // If animation true
            if (data.options?.animation && data.options.animation) {
                megaAlert.classList.add(getAnimationClass("open"));
            }

            // Alert config data
            const alertConfig = getAlertConfig(type);

            // Check the type and get specific icon if `icon` parameter true
            if (data.options?.icon && data.options.icon === true) {
                const megaAlertIcon = document.createElement("div");
                megaAlertIcon.classList.add("mega-alert-icon", alertConfig.iconClass);

                const svgIcon = alertConfig.icon;
                megaAlertIcon.appendChild(svgIcon);
                megaAlert.appendChild(megaAlertIcon);
            }

            // If close on body click option true
            if (data.options?.closeOnBodyClick) {
                megaAlert.style.cursor = "pointer";
                megaAlert.onclick = function () {
                    megaAlert.classList.add(getAnimationClass("close"));
                    // After the animation completes, remove the element from the DOM
                    setTimeout(function () {
                        megaAlert.remove();
                    }, 500);
                }
            }

            // Set alert body
            config.alertComponent = megaAlert;
            megaAlert.appendChild(getAlertBody(alertConfig, config));

            // Get close button if `iconClose` parameter is true
            if (data.options?.closeIcon && data.options.closeIcon === true) {
                const megaAlertAction = document.createElement("div");
                megaAlertAction.classList.add("mega-alert-action");
                // If paragraph does not exists add margin auto
                if (config?.paragraph || config?.buttons) {
                    megaAlertAction.style.margin = "0";
                }
                megaAlertAction.appendChild(createCloseIcon());
                // Add close listener
                megaAlertAction.onclick = function () {
                    if (document.contains(megaAlertAction.closest(".mega-alert"))) {
                        let parentMegaAlert = megaAlertAction.closest(".mega-alert");
                        // Check if animation true
                        if (data.options?.animation && data.options.animation) {
                            parentMegaAlert.classList.add(getAnimationClass("close"));
                            // After the animation completes, remove the element from the DOM
                            setTimeout(function () {
                                parentMegaAlert.remove();
                            }, 500);
                        } else {
                            parentMegaAlert.remove();
                        }
                    }
                }
                // Add auto close listener
                if (data.options?.autoClose) {
                    // Check if the progress bar set visible or not
                    if (data.options?.progressBar) {
                        const progressBar = document.createElement("div");
                        progressBar.classList.add("mega-alert-progress-bar");
                        megaAlert.appendChild(progressBar);
                        startProgressBar(data.options.autoClose, progressBar);
                    }

                    setTimeout(function () {
                        if (data.options?.animation && data.options.animation) {
                            megaAlert.classList.add(getAnimationClass("close"));
                            // After the animation completes, remove the element from the DOM
                            setTimeout(function () {
                                megaAlert.remove();
                            }, 500);
                        } else {
                            megaAlert.remove();
                        }
                    }, data.options.autoClose);
                }
                megaAlert.appendChild(megaAlertAction);
            }

            return megaAlert;
        }

        /**
         * Create loading alert element/component
         * @param config
         * */
        function buildLoadingAlert(config = {}) {
            // Validate the config parameters
            validateOptions(data.options);
            // Validate the title and paragraph data types
            if (config != null) {
                validateOptions(config);
            }
            // Add parent classes
            data.container.classList.add("mega-alert-container");
            // Check the alert container position
            if (data.options?.position) {
                setContainerPosition(data.options.position);
            }

            const megaAlert = document.createElement("div");
            megaAlert.classList.add("mega-alert");
            // Check the theme type
            if (data.options?.theme && data.options.theme === "dark") {
                megaAlert.classList.add("mega-alert-dark-theme");
            } else {
                megaAlert.classList.add("mega-alert-light-theme");
            }

            // If animation true
            if (data.options?.animation && data.options.animation) {
                megaAlert.classList.add(getAnimationClass("open"));
            }

            // Alert config data
            const alertConfig = getAlertConfig("loading");

            // Check the type and get specific icon if `icon` parameter true
            if (data.options?.icon && data.options.icon === true) {
                const megaAlertIcon = document.createElement("div");
                megaAlertIcon.classList.add("mega-alert-icon");

                const spinnerIcon = document.createElement("div");
                spinnerIcon.classList.add(alertConfig.iconClass);
                megaAlertIcon.appendChild(spinnerIcon);
                megaAlert.appendChild(megaAlertIcon);
            }

            // Set alert body
            megaAlert.appendChild(getAlertBody(alertConfig, config));

            return megaAlert;
        }

        /**
         * Set the alert theme
         * @param megaAlert
         * @param type
         * */
        function setAlertTheme(megaAlert, type) {
            // Set alert background color
            switch (data.options.theme) {
                case "light":
                    megaAlert.classList.add("mega-alert-light-theme");
                    megaAlert.classList.add(getDarkLightDefaultClasses(type, false));
                    break;
                case "dark":
                    megaAlert.classList.add("mega-alert-dark-theme");
                    megaAlert.classList.add(getDarkLightDefaultClasses(type, false));
                    break;
                case "colored":
                    megaAlert.classList.add("mega-alert-colored-theme");
                    megaAlert.classList.add(getDarkLightDefaultClasses(type, true));
                    break;
                default:
                    megaAlert.classList.add("mega-alert-light-theme");
            }
            // Set alert border color
            if (data.options?.leftBorderColor && data.options.leftBorderColor) {
                if (data.options.theme === "colored") {
                    megaAlert.classList.add(getDarkLightDefaultBorderClasses(type, true));
                } else {
                    megaAlert.classList.add(getDarkLightDefaultBorderClasses(type, false));
                }
            }
        }

        /**
         * Get the default class according to the type
         * @param type
         * @param colored
         * */
        function getDarkLightDefaultClasses(type, colored) {
            if (type === "error") {
                return (colored) ? "mega-alert-colored-theme-error" : "mega-alert-theme-error";
            }
            if (type === "warning") {
                return (colored) ? "mega-alert-colored-theme-warning" : "mega-alert-theme-warning";
            }
            if (type === "info") {
                return (colored) ? "mega-alert-colored-theme-info" : "mega-alert-theme-info";
            }
            if (type === "success") {
                return (colored) ? "mega-alert-colored-theme-success" : "mega-alert-theme-success";
            }
        }

        /**
         * Get the default border color class according to the type
         * @param type
         * @param colored
         * */
        function getDarkLightDefaultBorderClasses(type, colored) {
            if (type === "error") {
                return (colored) ? "mega-alert-colored-theme-error-border" : "mega-alert-theme-error-border";
            }
            if (type === "warning") {
                return (colored) ? "mega-alert-colored-theme-warning-border" : "mega-alert-theme-warning-border";
            }
            if (type === "info") {
                return (colored) ? "mega-alert-colored-theme-info-border" : "mega-alert-theme-info-border";
            }
            if (type === "success") {
                return (colored) ? "mega-alert-colored-theme-success-border" : "mega-alert-theme-success-border";
            }
        }

        /**
         * Set the container position according to the option `position`
         * @param position
         * */
        function setContainerPosition(position) {
            switch (position) {
                case "top-right":
                    data.container.classList.add("mega-alert-top-right");
                    break;
                case "top-left":
                    data.container.classList.add("mega-alert-top-left");
                    break;
                case "top-center":
                    data.container.classList.add("mega-alert-top-center");
                    break;
                case "bottom-right":
                    data.container.classList.add("mega-alert-bottom-right");
                    break;
                case "bottom-left":
                    data.container.classList.add("mega-alert-bottom-left");
                    break;
                case "bottom-center":
                    data.container.classList.add("mega-alert-bottom-center");
                    break;
                default:
                    data.container.classList.add("mega-alert-top-right");
            }
        }

        /**
         * Get alert body
         * @param alertConfig
         * */
        function getAlertBody(alertConfig, config) {
            const megaAlertBody = document.createElement("div");
            megaAlertBody.classList.add("mega-alert-body");

            // Is title visibility set
            if ((config.hasOwnProperty("titleVisibility") && config.titleVisibility) || !config.hasOwnProperty("titleVisibility")) {
                // If there is custom title add it otherwise add the default title
                let mainTitle;
                if (config != null && config?.title) {
                    mainTitle = createTitleComponent(config.title);
                } else {
                    mainTitle = createTitleComponent(alertConfig.title);
                }
                megaAlertBody.appendChild(mainTitle);
            }

            // Is paragraph visibility set
            if ((config.hasOwnProperty("paragraphVisibility") && config.paragraphVisibility) || !config.hasOwnProperty("paragraphVisibility")) {
                // Check if paragraph exist or not
                if (config != null && config?.paragraph) {
                    // Add Spacer
                    const spacer = document.createElement("div");
                    spacer.classList.add("mega-alert-spacer");
                    megaAlertBody.appendChild(spacer);
                    // Add the paragraph
                    megaAlertBody.appendChild(createParagraphComponent(config.paragraph));
                }
            }

            // Is buttons are set
            if (config?.buttons && config?.alertComponent) {
                const buttonContainer = document.createElement("div");
                buttonContainer.style.marginTop = "3px";

                config.buttons.forEach((buttonConfig) => {
                    const button = document.createElement("button");
                    button.classList.add("mega-alert-default-button");
                    // If button name set
                    if (buttonConfig?.buttonName) {
                        button.textContent = buttonConfig.buttonName;
                    } else {
                        button.textContent = "Button";
                    }
                    // If button onclick listener set
                    if (buttonConfig?.onClick) {
                        button.onclick = () => buttonConfig.onClick(config.alertComponent);
                    }
                    buttonContainer.append(button);
                });
                megaAlertBody.append(buttonContainer);
            }

            return megaAlertBody;
        }

        /**
         * Get all the alert config data
         * @param type
         * */
        function getAlertConfig(type) {
            switch (type) {
                case "error":
                    return {
                        iconClass: "mega-alert-icon-error",
                        icon: createErrorIcon(),
                        title: "Error",
                    };
                    break;
                case "warning":
                    return {
                        iconClass: "mega-alert-icon-warning",
                        icon: createWarningIcon(),
                        title: "Warning",
                    };
                    break;
                case "info":
                    return {
                        iconClass: "mega-alert-icon-info",
                        icon: createInformationIcon(),
                        title: "Information",
                    };
                    break;
                case "success":
                    return {
                        iconClass: "mega-alert-icon-success",
                        icon: createSuccessIcon(),
                        title: "Success",
                    };
                    break;
                case "loading":
                    return {
                        iconClass: "mega-alert-spinner",
                        title: "Loading...",
                    };
                    break;
                default:
                    return {
                        iconClass: "mega-alert-icon-error",
                        icon: createErrorIcon(),
                        title: "Error",
                    };
            }
        }

        /**
         * Create title component/element
         * @param name
         * */
        function createTitleComponent(name) {
            const titleBox = document.createElement("div");
            titleBox.classList.add("mega-alert-title-box");

            const title = document.createElement("div");
            title.classList.add("mega-alert-title");
            // Check if custom font size exists
            if (data.options?.titleFontSize) {
                title.style.fontSize = data.options.titleFontSize;
            }
            title.textContent = name;

            titleBox.appendChild(title);
            return titleBox;
        }

        /**
         * Create paragraph component/element
         * @param content
         * */
        function createParagraphComponent(content) {
            const paragraphBox = document.createElement("div");
            paragraphBox.classList.add("mega-alert-paragraph-box");

            const paragraph = document.createElement("p");
            paragraph.classList.add("mega-alert-paragraph");
            // Check if custom font size exists
            if (data.options?.paragraphFontSize) {
                paragraph.style.fontSize = data.options.paragraphFontSize;
            }
            paragraph.textContent = content;
            paragraphBox.appendChild(paragraph);

            return paragraphBox;
        }

        /**
         * Create close icon component
         * @param name
         * */
        function createCloseIcon() {
            const closeButton = document.createElement("button");
            closeButton.classList.add("mega-alert-close-button");
            closeButton.setAttribute("type", "button");
            closeButton.setAttribute("aria-label", "close");

            const closeIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            closeIcon.setAttribute("aria-hidden", "true");
            closeIcon.setAttribute("viewBox", "0 0 14 16");

            const closeIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            closeIconPath.setAttribute("fill-rule", "evenodd");
            closeIconPath.setAttribute(
                "d",
                "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
            );

            closeIcon.appendChild(closeIconPath);
            closeButton.appendChild(closeIcon);
            return closeButton;
        }

        /**
         * Create error icon for the alert
         * */
        function createErrorIcon() {
            // If custom icon set
            if (data.options?.setCustomIcons && data.options.setCustomIcons?.error && data.options.setCustomIcons.error != "") {
                const icon = data.options.setCustomIcons.error;
                const type = checkValueType(icon);
                return processIconType(icon, type);
            }
            // If custom icon not set
            const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgIcon.setAttribute("viewBox", "0 0 24 24");
            svgIcon.setAttribute("width", "100%");
            svgIcon.setAttribute("height", "100%");

            const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            svgPath.setAttribute(
                "d",
                "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"
            );

            svgIcon.appendChild(svgPath);

            return svgIcon;
        }

        /**
         * Create success icon for the alert
         * */
        function createSuccessIcon() {
            // If custom icon set
            if (data.options?.setCustomIcons && data.options.setCustomIcons?.success && data.options.setCustomIcons.success != "") {
                const icon = data.options.setCustomIcons.success;
                const type = checkValueType(icon);
                return processIconType(icon, type);
            }
            // If custom icon not set
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute(
                "d",
                "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"
            );

            svg.appendChild(path);
            return svg;
        }

        /**
         * Create information icon for the alert
         * */
        function createInformationIcon() {
            // If custom icon set
            if (data.options?.setCustomIcons && data.options.setCustomIcons?.info && data.options.setCustomIcons.info != "") {
                const icon = data.options.setCustomIcons.info;
                const type = checkValueType(icon);
                return processIconType(icon, type);
            }
            // If custom icon not set
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute(
                "d",
                "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"
            );

            svg.appendChild(path);
            return svg;
        }

        /**
         * Create warning icon for the alert
         * */
        function createWarningIcon() {
            // If custom icon set
            if (data.options?.setCustomIcons && data.options.setCustomIcons?.warning && data.options.setCustomIcons.warning != "") {
                const icon = data.options.setCustomIcons.warning;
                const type = checkValueType(icon);
                return processIconType(icon, type);
            }
            // If custom icon not set
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute(
                "d",
                "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"
            );

            svg.appendChild(path);
            return svg;
        }

        /**
         * Get animation removing class
         * */
        function getAnimationClass(type) {
            const leftPositions = ["bottom-left", "top-left"];
            const rightPositions = ["bottom-right", "top-right"];
            const topPositions = ["top-center"];
            const bottomPositions = ["bottom-center"];
            if (leftPositions.includes(data.options.position)) {
                return (type === "close") ? "mega-alert-slide-left" : "mega-alert-open-slide-left";
            }
            if (rightPositions.includes(data.options.position)) {
                return (type === "close") ? "mega-alert-slide-right" : "mega-alert-open-slide-right";
            }
            if (topPositions.includes(data.options.position)) {
                return (type === "close") ? "mega-alert-slide-top" : "mega-alert-open-slide-top";
            }
            if (bottomPositions.includes(data.options.position)) {
                return (type === "close") ? "mega-alert-slide-bottom" : "mega-alert-open-slide-bottom";
            }
            return "mega-alert-slide-left";
        }

        /**
         * Auto close progress bar animation
         * @param duration
         * @param progressBar
         * */
        function startProgressBar(duration, progressBar) {
            // Reset progress bar and make it visible
            progressBar.style.width = '100%'; // Start from 100%
            progressBar.style.visibility = 'visible';

            let startTime = null;

            function updateProgress(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsedTime = timestamp - startTime;
                const progress = Math.max(100 - ((elapsedTime / duration) * 100), 0); // Go from 100 to 0

                progressBar.style.width = `${progress}%`;

                if (progress > 0) {
                    requestAnimationFrame(updateProgress);
                } else {
                    // Hide the progress bar when it completes
                    progressBar.style.visibility = 'hidden';
                }
            }

            requestAnimationFrame(updateProgress);
        }

        /**
         * Check the custom icon type
         * @param input
         * */
        function checkValueType(input) {
            switch (typeof input) {
                case "string":
                    if (/^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(input)) {
                        return "url";
                    } else if (input.startsWith("<") && input.endsWith(">")) {
                        try {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(input, "text/html");
                            const isElement = doc.body.firstChild instanceof Element;
                            return isElement ? "element" : "string";
                        } catch (e) {
                            return "string";
                        }
                    } else {
                        return "string";
                    }
                case "object":
                    if (input instanceof Element) {
                        return "element";
                    }
                default:
                    return "string";
            }
        }

        /**
         * Process the icon according to the type
         * @param icon
         * @param type
         * */
        function processIconType(icon, type) {
            // If icon type is string
            if (type === "string") {
                const elementName = data.options?.iconElement ? data.options.iconElement : "span";
                const element = document.createElement(elementName);
                element.classList = icon;
                return element;
            }
            // If icon type is url
            if (type === "url") {
                const element = document.createElement("img");
                element.style.width = "inherit";
                element.style.height = "inherit";
                element.src = icon;
                return element;
            }
            // If icon type is url
            if (type === "element") {
                return icon;
            }
        }

        return data;
    };
});
