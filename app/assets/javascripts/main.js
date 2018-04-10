/**
 * @namespace TEMPLATEapp
 */
! function() {
    window.TEMPLATEapp = window.TEMPLATEapp || {}
}(),
function(e) {
    "use strict";
    TEMPLATEapp.Utils = function() {
        function t() {
            e(".back-to-top").on("click", function(t) {
                t.preventDefault(), e("html, body").animate({
                    scrollTop: e('[role="main"]').offset().top - 137
                }, 300), e(this).blur()
            })
        }

        function n() {
            e(".back-to-top").click()
        }

        function i() {
            e("html").removeClass("no-js")
        }

        function a() {
            e(".form-control__show-password").length > 0 && (e(".form-control__show-password").find(".show-password__show").show(), e(".form-control__show-password").on("click", function(t) {
                t.preventDefault();
                var n = e(this).attr("title");
                "Show password" === n ? (e(this).parents(".form-group").find("input").attr("type", "text"), e(this).attr("title", "Hide password")) : "Hide password" === n && (e(this).parents(".form-group").find("input").attr("type", "password"), e(this).attr("title", "Show password")), e(".show-password__show, .show-password__hide").toggle()
            }))
        }

        function o() {
            if (s()) e("body").addClass("ios");
            else if (e("select").length > 0) {
                if (e("select").attr("data-placeholder"))
                    for (var t = e("select")[0].options, n = 0; n < t.length; n++) {
                        var i = t[n];
                        "" === i.value && (i.text = "")
                    }
                e("select").chosen({
                    disable_search_threshold: 50
                })
            }
        }

        function r() {
            e(window).keyup(function(t) {
                if (9 === (t.keyCode ? t.keyCode : t.which))
                    if (e(t.target).parents(".footer").length > 0) {
                        var n = document.body.scrollHeight - window.innerHeight - window.scrollY;
                        0 !== n && e("html, body").scrollTop(e(document).height())
                    } else {
                        var i = e(window).scrollTop(),
                            a = e(t.target).offset().top,
                            o = a - i,
                            r = e("#navbar").height();
                        o < r && e("html, body").scrollTop(i - 100)
                    }
            })
        }

        function s() {
            return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
        }

        function l() {
            return window.innerWidth
        }

        function c(e) {
            e.prop("disabled", !1)
        }

        function u(e) {
            e.prop("disabled", !0)
        }

        function d(t, n, i) {
            p(), e.get("/api/account", n, function(e) {
                m = e.HasMultipleCAEs, i && !m ? t.submit() : f(m), p()
            }).fail(function() {})
        }

        function f(t) {
            t ? e(".cae-container--toggle").removeClass("hidden") : e(".cae-container--toggle").addClass("hidden")
        }

        function p() {
            e(".loading").toggleClass("hidden")
        }

        function h(e, t) {
            for (var n = "", i = 0; i < e.length; i++) {
                var a = e.charAt(i),
                    o = t.charCodeAt(i);
                n += o >= 65 && o < 91 ? a.toUpperCase() : a.toLowerCase()
            }
            return n
        }
        var _, m;
        return _ = function(e) {
            t(), i(), a(), o(), r()
        }, {
            init: _,
            triggerBackToTop: n,
            isIos: s,
            getScreenWidth: l,
            enableButton: c,
            disableButton: u,
            checkEmailForCAE: d,
            toggleCAEField: f,
            toggleLoading: p,
            caeChecked: !1,
            matchCase: h
        }
    }(), TEMPLATEapp.Utils.init()
}(jQuery),
function(e, t) {
    "use strict";
    TEMPLATEapp.Navigation = function() {
        function t() {
            e(document).on("scroll", function() {
                var t = e(document).scrollTop(),
                    n = e(".system-status-message__container").outerHeight(!0);
                t >= n ? e("#nav").hasClass("navbar-fixed-top") || (e("#nav").addClass("navbar-fixed-top"), e("#nav").autoHidingNavbar("setDisableAutohide", !1)) : t < n && e("#nav").hasClass("navbar-fixed-top") && (e("#nav").removeClass("navbar-fixed-top"), e("#nav").autoHidingNavbar("setDisableAutohide", !0))
            })
        }

        function n() {
            e("#nav").autoHidingNavbar({
                showOnUpscroll: !0,
                showOnBottom: !1,
                animationDuration: 0
            }), e("#nav").on("focusin", function() {
                e(this).autoHidingNavbar("show")
            })
        }

        function i() {
            e("[data-toggle=offcanvas]").on("click", function(e) {
                e.preventDefault(), a()
            }), e(".offcanvas__close").click(function(e) {
                e.preventDefault(), a()
            })
        }

        function a() {
            var t = e(".offcanvas--trigger"),
                n = 0;
            t.toggleClass("active"), t.hasClass("active") || (n = 300), setTimeout(function() {
                e(".offcanvas--showhide").toggle()
            }, n)
        }

        function o() {
            e(".navbar__search-icon-container").on("click", function() {
                var t = e(this).parents(".navbar__search"),
                    n = e(this).parents(".navbar-fixed-top");
                t.toggleClass("active"), n.toggleClass("search-active"), t.hasClass("active") ? s() : (r(), l())
            }), e(".navbar__search-icon-button").on("click", function(t) {
                t.preventDefault(), e(".navbar__search-bar").val().length > 0 && e(this).parents("form").submit()
            })
        }

        function r() {
            e(".navbar__search-bar").val("")
        }

        function s() {
            e(".navbar__search-icon-button").removeAttr("tabindex"), e(".navbar__search-bar").removeAttr("tabindex"), e(".navbar__search-button").removeAttr("tabindex")
        }

        function l() {
            e(".navbar__search-icon-button").attr("tabindex", "-1"), e(".navbar__search-bar").attr("tabindex", "-1"), e(".navbar__search-button").attr("tabindex", "-1")
        }

        function c() {
            e(document).on("click", ".navbar .dropdown-menu", function(e) {
                e.stopPropagation()
            })
        }

        function u() {
            enquire.register("screen and (max-width: 992px)", {
                match: function() {
                    e(".visible-md .navbar__search").removeClass("active"), e(".offcanvas__container").hasClass("active") && e(".navbar-toggle").click(), e("#content_page.search-results").length > 0 ? e(".visible-xxs .navbar__search").addClass("active") : e("#nav").removeClass("search-active")
                }
            }), enquire.register("screen and (min-width: 993px)", {
                match: function() {
                    e(".visible-xxs .navbar__search").removeClass("active"), e(".offcanvas__container").hasClass("active") && e(".navbar-toggle").click(), e("#content_page.search-results").length > 0 ? e(".visible-md .navbar__search").addClass("active") : e("#nav").removeClass("search-active")
                }
            })
        }

        function d() {
            e(".system-status-message__container").on("close.bs.alert", function() {
                e("#nav").addClass("navbar-fixed-top"), e("#nav").autoHidingNavbar("setDisableAutohide", !1)
            })
        }
        var f;
        return f = function() {
            if (n(), e(".system-status-message__container").length > 0) {
                t(), d();
                var a = e(".system-status-message__container").outerHeight(!0);
                e("#nav").autoHidingNavbar("setHideOffset", a)
            } else e("#nav").addClass("navbar-fixed-top");
            i(), o(), c(), u()
        }, {
            init: f
        }
    }(), TEMPLATEapp.Navigation.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.GlobalSearch = function() {
        function t() {
            e(".navbar__search-bar").on("keyup", function() {
                e(this).val().length > 0 ? TEMPLATEapp.Utils.enableButton(e(".navbar__search-button")) : TEMPLATEapp.Utils.disableButton(e(".navbar__search-button"))
            })
        }
        var n;
        return n = function() {
            t()
        }, {
            init: n
        }
    }(), TEMPLATEapp.GlobalSearch.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.Lazyload = function() {
        function e(e) {
            return e >= 1200 ? "xlarge" : e >= 992 ? "large" : e >= 768 ? "medium" : e >= 480 ? "small" : e < 480 ? "xsmall" : void 0
        }

        function t(t) {
            function n(e, t, n) {
                var i = new Image,
                    a = "data-" + t,
                    o = "";
                o = e.getAttribute(a) ? e.getAttribute(a) : e.getAttribute("data-src"), i.onload = function() {
                    e.parent ? e.parent.replaceChild(i, e) : e.src = o, e.className = e.className.replace("lazy", ""), n && n()
                }, i.src = o
            }

            function i(e) {
                var t = e.getBoundingClientRect();
                return t.top >= 0 && t.left >= 0 && t.top <= (window.innerHeight + 200 || document.documentElement.clientHeight + 200)
            }
            /* lazyload.js (c) Lorenzo Giuliani
             * MIT License (http://www.opensource.org/licenses/mit-license.html)
             *
             * expects a list of:  
             * `<img src="blank.gif" data-src="my_image.png" width="600" height="400" class="lazy">`
             */
            var a = function(e, t) {
                    if (document.querySelectorAll) t = document.querySelectorAll(e);
                    else {
                        var n = document,
                            i = n.styleSheets[0] || n.createStyleSheet();
                        i.addRule(e, "f:b");
                        for (var a = n.all, o = 0, r = [], s = a.length; o < s; o++) a[o].currentStyle.f && r.push(a[o]);
                        i.removeRule(0), t = r
                    }
                    return t
                },
                o = function() {
                    for (var t = new Array, o = a("img.lazy"), r = TEMPLATEapp.Utils.getScreenWidth(), s = e(r), l = 0; l < o.length; l++) t.push(o[l]);
                    for (var l = 0; l < t.length; l++) i(t[l]) && n(t[l], s, function() {
                        t.splice(l, 1)
                    })
                };
            o(),
                function(e, t) {
                    window.addEventListener ? window.addEventListener(e, t, !1) : window.attachEvent ? this.attachEvent("on" + e, t) : this["on" + e] = t
                }("scroll", o)
        }
        var n;
        return n = function() {
            t(e(TEMPLATEapp.Utils.getScreenWidth()))
        }, {
            init: n
        }
    }(), e(".lazy").length > 0 && TEMPLATEapp.Lazyload.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e) {
    "use strict";
    TEMPLATEapp.home = function() {
        function t() {
            var t = {
                    useEasing: !1,
                    useGrouping: !0,
                    separator: ",",
                    decimal: ".",
                    prefix: "",
                    suffix: ""
                },
                n = [];
            e.each(e("[data-count-start]"), function() {
                var i = {
                    element: e(this).attr("id"),
                    start: e(this).data("count-start"),
                    end: e(this).data("count-end"),
                    decimals: e(this).data("count-decimals"),
                    countUp: null
                };
                i.countUp = new CountUp(i.element, i.start, i.end, i.decimals, 2, t), n.push(i)
            }), e.each(n, function() {
                this.countUp.start()
            })
        }

        function n() {
            e(".homepage-licences__cta").on("click", function(t) {
                t.preventDefault();
                var n = e("#homepage-licences__select").val();
                window.location.href = n
            })
        }

        function i() {
            var t;
            enquire.register("screen and (min-width:0px) and (max-width: 768px)", {
                match: function() {
                    o(), t = r(1)
                }
            }), enquire.register("screen and (min-width:769px) and (max-width: 1200px)", {
                match: function() {
                    o(), t = r(2)
                }
            }), enquire.register("screen and (min-width: 1201px)", {
                match: function() {
                    o(), t = r(3)
                }
            }), e(".homepage-services__show-more").on("click", function(n) {
                "show more" === e(this).text().toLowerCase() ? a(t) : o()
            }), e(".homepage-services__show-more").keyup(function(t) {
                13 != t.keyCode && 32 != t.keyCode || e(".homepage-services__service").each(function() {
                    e(this).attr("tabindex") ? (e(this).removeAttr("tabindex"), e(".homepage-services__service")[6].focus()) : e(this).attr("tabindex", -1)
                })
            })
        }

        function a(t) {
            e(".homepage-services__show-more").text("Show Less"), e(".homepage-services__expander").css({
                height: t
            })
        }

        function o() {
            e(".homepage-services__show-more").text("Show More"), e(".homepage-services__expander").css({
                height: 0
            })
        }

        function r(t) {
            var n = e(".homepage-services__expander").find(".homepage-services__service"),
                i = 0;
            if (1 === t) {
                var a = 0;
                n.each(function() {
                    a += e(this).parent().height()
                }), i = a / t
            } else if (2 === t || 3 === t) {
                var n = e(".homepage-services__expander").find(".homepage-services__service"),
                    o = n.length,
                    r = n.parent().height(),
                    s = Math.ceil(o / t);
                i = s * r
            }
            return i
        }

        function s() {
            e(".value-toggle__button").on("click", function() {
                e(".value-toggle").toggleClass("active"), "last payment" === e(this).next(".home-page__header__stat__title").text().toLowerCase() ? e(this).next(".home-page__header__stat__title").text("Show My Last Payment") : e(this).next(".home-page__header__stat__title").text("Last Payment")
            })
        }
        var l;
        return l = function() {
            t(), n(), e(".homepage-services__container").length > 0 && i(), e(".value-toggle__button").length > 0 && s()
        }, {
            init: l
        }
    }(), e("#home_page").length > 0 && TEMPLATEapp.home.init()
}(jQuery),
function(e) {
    "use strict";
    TEMPLATEapp.Login = function() {
        function t() {
            e("#login__form").validate({
                errorClass: "has-error",
                validClass: "has-success",
                ignore: ":not(:visible)",
                highlight: function(t, n, i) {
                    e(t).parents(".form-group").addClass(n).removeClass(i), e(t).parents(".form-group").find(".sprite").removeClass("hidden"), "password" === e(t).attr("id") && e(t).parents(".form-group").find(".form-control__show-password").hide()
                },
                unhighlight: function(t, n, i) {
                    e(t).parents(".form-group").addClass(i).removeClass(n), e(t).parents(".form-group").find(".sprite").addClass("hidden"), "password" === e(t).attr("id") && e(t).parents(".form-group").find(".form-control__show-password").show()
                },
                onfocusout: function(t) {
                    if ("email" === e(t).attr("id") && e(t).valid()) {
                        s = !1;
                        var n = e(t).val(),
                            i = {
                                email: n
                            };
                        TEMPLATEapp.Utils.checkEmailForCAE(e("#login__form"), i, !1), s = !0
                    }
                    e(t).val().length > 0 && e(t).valid()
                },
                rules: {
                    email: {
                        required: !0,
                        email: !0
                    },
                    password: {
                        required: !0
                    },
                    cae: {
                        required: !0
                    }
                },
                messages: {
                    email: {
                        required: "We're missing some info. Please be sure to fill in all the fields.",
                        email: "This doesn't look like an email. Missed a note?"
                    },
                    password: {
                        required: "We're missing some info. Please be sure to fill in all the fields."
                    },
                    cae: {
                        required: "We're missing some info. Please be sure to fill in all the fields."
                    }
                },
                submitHandler: function(t) {
                    if (e(t).valid() && s) t.submit();
                    else {
                        if (!e(t).valid() || s) return !1;
                        var n = e("#email").val(),
                            i = {
                                email: n
                            };
                        TEMPLATEapp.Utils.checkEmailForCAE(e("#login__form"), i, !0), s = !0
                    }
                }
            })
        }

        function n() {
            var t;
            e("#login__signup-modal, #login__licence-modal, #login__help-modal").on("shown.bs.modal", function(n) {
                e(document).off("focusin.modal"), t = e(n.relatedTarget), i()
            }), e("#login__signup-modal, #login__licence-modal, #login__help-modal").on("hide.bs.modal", function(e) {
                i(), t.focus()
            })
        }

        function i() {
            e(".login-more-info .login-more-info__option-list").toggle()
        }

        function a() {
            e(".signup-modal__select").on("change", function() {
                var t = e(this).val();
                "Other" === this.options[this.selectedIndex].innerHTML ? e(this).parents(".custom-select__container").find(".custom-select__label").hide() : e(this).parents(".custom-select__container").find(".custom-select__label").show(), o(t)
            })
        }

        function o(t) {
            t.length <= 0 && (t = e(".signup-modal__select").val()), e(".signup-modal__button").attr("href", t)
        }
        var r, s = !1;
        return r = function() {
            if (t(), n(), a(), o(""), e("#email").val().length > 0 && e("#email").valid()) {
                var i = e("#email").val(),
                    r = {
                        email: i
                    };
                TEMPLATEapp.Utils.checkEmailForCAE(e("#login__form"), r), s = !0
            }
        }, {
            init: r
        }
    }(), e("#login_page").length > 0 && TEMPLATEapp.Login.init()
}(jQuery),
function(e) {
    "use strict";
    TEMPLATEapp.forgottenPassword = function() {
        function t() {
            e(".forgotten-password__form").validate({
                errorClass: "has-error",
                validClass: "has-success",
                ignore: ":not(:visible)",
                highlight: function(t, n, i) {
                    e(t).parents(".form-group").addClass(n).removeClass(i), e(t).parents(".form-group").find(".sprite").removeClass("hidden"), "password" === e(t).attr("id") && e(t).parents(".form-group").find(".form-control__show-password").hide()
                },
                unhighlight: function(t, n, i) {
                    e(t).parents(".form-group").addClass(i).removeClass(n), e(t).parents(".form-group").find(".sprite").addClass("hidden"), "password" === e(t).attr("id") && e(t).parents(".form-group").find(".form-control__show-password").show()
                },
                onfocusout: function(t) {
                    if ("email" === e(t).attr("id") && e(t).valid()) {
                        a = !1;
                        var n = e(t).val(),
                            i = {
                                email: n
                            };
                        TEMPLATEapp.Utils.checkEmailForCAE(e("#login__form"), i, !1), a = !0
                    }
                    e(t).val().length > 0 && e(t).valid()
                },
                rules: {
                    email: {
                        required: !0,
                        email: !0
                    },
                    cae: {
                        required: !0
                    }
                },
                messages: {
                    email: {
                        required: "We're missing some info. Please be sure to fill in all the fields.",
                        email: "This doesn't look like an email. Missed a note?"
                    },
                    cae: {
                        required: "We're missing some info. Please be sure to fill in all the fields."
                    }
                },
                submitHandler: function(t) {
                    if (e(t).valid() && a) e.post("/api/account/forgotpassword", e(t).serialize(), function() {
                        n(), TEMPLATEapp.Utils.triggerBackToTop()
                    }).fail(function() {
                        n(), TEMPLATEapp.Utils.triggerBackToTop()
                    });
                    else {
                        if (!e(t).valid() || a) return !1;
                        var i = e("#email").val(),
                            o = {
                                email: i
                            };
                        TEMPLATEapp.Utils.checkEmailForCAE(e("#login__form"), o, !0), a = !0
                    }
                }
            })
        }

        function n() {
            e(".forgotten-password__success").removeClass("hidden")
        }
        var i, a = !1;
        return i = function() {
            if (t(), e("#email").val().length > 0 && e("#email").valid()) {
                var n = e("#email").val(),
                    i = {
                        email: n
                    };
                TEMPLATEapp.Utils.checkEmailForCAE(e(".forgotten-password__form"), i), a = !0
            }
        }, {
            init: i
        }
    }(), e(".forgotten-password__form").length > 0 && TEMPLATEapp.forgottenPassword.init()
}(jQuery),
function(e, t) {
    "use strict";
    TEMPLATEapp.securityQuestion = function() {
        function t() {
            e(".security-question__form").validate({
                errorClass: "has-error",
                validClass: "has-success",
                ignore: ":not(:visible)",
                highlight: function(t, n, i) {
                    e(t).parents(".form-group").addClass(n).removeClass(i), e(t).parents(".form-group").find(".sprite").removeClass("hidden")
                },
                unhighlight: function(t, n, i) {
                    e(t).parents(".form-group").addClass(i).removeClass(n), e(t).parents(".form-group").find(".sprite").addClass("hidden")
                },
                onkeyup: function(t, n) {
                    var i = e(".security-question").val().length,
                        a = e(".security-answer").val().length;
                    i >= 6 && a >= 6 ? e(".security-question__form").find(".btn").prop("disabled", !1) : e(".security-question__form").find(".btn").prop("disabled", !0), 9 === n.which && "" === this.elementValue(t) || (t.name in this.submitted || t === this.lastElement) && this.element(t)
                },
                rules: {
                    security_question: {
                        required: !0,
                        minlength: 6
                    },
                    security_answer: {
                        required: !0,
                        minlength: 6
                    }
                },
                messages: {
                    security_question: {
                        required: "We're missing some info. Please be sure to fill in all the fields.",
                        minlength: "Your security question must be at least 6 characters long."
                    },
                    security_answer: {
                        required: "We're missing some info. Please be sure to fill in all the fields.",
                        minlength: "Your security answer must be at least 6 characters long."
                    }
                },
                submitHandler: function(e) {
                    e.submit()
                }
            })
        }

        function n() {
            var t = i(),
                n = a(),
                r = o(),
                s = r - (t + n);
            e(".terms-and-conditions").css({
                height: s
            })
        }

        function i() {
            return e("#security_question_template").find("nav").outerHeight(!0) + e("#security_question_template").find("article > .row").outerHeight(!0)
        }

        function a() {
            return e("#security_question_template").find(".buttons__container").outerHeight(!0)
        }

        function o() {
            return e("body").outerHeight(!0)
        }
        var r;
        return r = function() {
            t(), enquire.register("screen and (max-width: 768px)", {
                match: function() {
                    e(".terms-and-conditions__container").length > 0 && n()
                }
            }), e(".buttons__decline-button").length > 0 && e(".buttons__decline-button").on("click", function(t) {
                t.preventDefault(), e(".form__error-box").removeClass("hidden")
            }), e(".buttons__print-button").length > 0 && e(".buttons__print-button").on("click", function(e) {
                e.preventDefault(), window.print()
            }), e(".buttons__accept-button").length > 0 && e(".buttons__accept-button").on("click", function(t) {
                t.preventDefault(), e(".terms_accepted").val(1), e(".security-question__terms-and-conditions-form").submit()
            })
        }, {
            init: r
        }
    }(), e("#security_question_template").length > 0 && TEMPLATEapp.securityQuestion.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.searchResults = function() {
        function t() {
            e(".search-results__try-again").find(".btn").on("click", function() {
                TEMPLATEapp.Utils.triggerBackToTop(), e(".navbar__search-bar:visible").focus()
            })
        }
        var n;
        return n = function() {
            t()
        }, {
            init: n
        }
    }(), e("#content_page.search-results").length > 0 && TEMPLATEapp.searchResults.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e) {
    "use strict";
    TEMPLATEapp.ErrorPage = function() {
        function t() {
            e(".error-page__btn--back").length > 0 && e(".error-page__btn--back").on("click", function() {
                window.history.back()
            })
        }
        var n;
        return n = function() {
            t()
        }, {
            init: n
        }
    }(), e("#error_page").length > 0 && TEMPLATEapp.ErrorPage.init()
}(jQuery),
function(e) {
    "use strict";
    TEMPLATEapp.FiltereeListPage = function() {
        function t() {
            y = e.parseJSON(e(".filtered-list__filter-json").val())
        }

        function n() {
            e(".filtered-list__filter").on("change", function() {
                if (i(), "0" !== e(this).val()) {
                    l(e(this)) && (c(e(this).parent().next(".form-group").find(".filtered-list__filter")), u(e(this)))
                } else e(this).parent().find(".filtered-list__remove-filter").click()
            })
        }

        function i() {
            k = a(), k.length > 0 ? o(k) : r()
        }

        function a() {
            var t = [];
            return e(".filtered-list__filter").each(function() {
                "0" !== e(this).val() && (t.push(e(this).val()), e(this).parent().addClass("active"))
            }), t
        }

        function o(t) {
            var n, i, a;
            switch (s(), t.length) {
                case 1:
                    n = e('[data-filters="' + t[0] + '"]'), n.show(), n.find("[data-filters]").show();
                    break;
                case 2:
                    n = e('[data-filters="' + t[0] + '"]'), i = n.find('[data-filters="' + t[1] + '"]'), n.show(), i.show(), i.find("[data-filters]").show();
                    break;
                case 3:
                    n = e('[data-filters="' + t[0] + '"]'), i = n.find('[data-filters="' + t[1] + '"]'), a = i.find('[data-filters="' + t[2] + '"]'), n.show(), i.show(), a.show();
                    break;
                default:
                    r()
            }
        }

        function r() {
            e("[data-filters]").show()
        }

        function s() {
            e("[data-filters]").hide()
        }

        function l(e) {
            return e.parent().next(".form-group").length > 0
        }

        function c(e) {
            e.prop("disabled", !1)
        }

        function u(e) {
            var t = d(e);
            _(e.parent().nextAll(".form-group").find(".filtered-list__filter")), f(e.parent().next(".form-group").find(".filtered-list__filter"), t)
        }

        function d(t) {
            var n = [];
            return t.parent().hasClass("filtered-list__filter--first-level") ? e.each(y.FirstLevelItems, function(t, i) {
                i.Title === k[0] && e.each(i.SecondLevelItems, function(e, t) {
                    n.push(t.Title)
                })
            }) : t.parent().hasClass("filtered-list__filter--second-level") && e.each(y.FirstLevelItems, function(t, i) {
                i.Title === k[0] && e.each(i.SecondLevelItems, function(t, i) {
                    i.Title === k[1] && e.each(i.ThirdLevelItems, function(e, t) {
                        n.push(t.Title)
                    })
                })
            }), n
        }

        function f(t, n) {
            e.each(n, function(n, i) {
                e.isArray(i) ? t.append(e("<option></option>").attr("value", n).text(n)) : t.append(e("<option></option>").attr("value", i).text(i))
            }), b()
        }

        function p() {
            e(".filtered-list__filter-form").on("click", ".filtered-list__remove-filter", function(t) {
                t.preventDefault();
                var n = e(this).parent(),
                    a = n.find(".filtered-list__filter");
                n.hasClass("filtered-list__filter--first-level") ? (h(a), g(e(".filtered-list__filter-form").find(".form-group")), m(n.nextAll(".form-group")), v(n.nextAll(".form-group").find(".filtered-list__filter")), b()) : n.hasClass("filtered-list__filter--second-level") ? (h(a), g(n), m(n.next()), v(n.next().find(".filtered-list__filter")), b()) : n.hasClass("filtered-list__filter--third-level") && (h(a), g(n), b()), i()
            })
        }

        function h(e) {
            e.prop("selectedIndex", 0)
        }

        function _(e) {
            e.empty().append(x)
        }

        function m(e) {
            e.find(".filtered-list__filter").empty().append(x)
        }

        function g(e) {
            e.removeClass("active")
        }

        function v(e) {
            e.prop("disabled", !0)
        }

        function b() {
            e(".filtered-list__filter").trigger("chosen:updated")
        }
        var w, y, k, x = e("<option></option>").attr("value", 0).text("Please Select");
        return w = function() {
            t(), n(), p()
        }, {
            init: w
        }
    }(), e("#content_page.filtered-list").length > 0 && TEMPLATEapp.FiltereeListPage.init()
}(jQuery),
function(e, t) {
    "use strict";
    TEMPLATEapp.Glossary = function() {
        function t() {
            e('[data-toggle="glossary"]').on("click", function(t) {
                t.preventDefault(), i(n(e(this)))
            })
        }

        function n(e) {
            return e.data("glossary-term")
        }

        function i(t) {
            o || (o = !0, e.get("/api/glossary", {
                term: t
            }, function(t) {
                var n = t.title,
                    i = t.description,
                    a = e("#glossary__modal");
                a.find(".modal__title").text(n), a.find(".modal__description").html(i), e("#glossary__modal").modal({
                    keyboard: !0,
                    backdrop: !0
                }), o = !1
            }).fail(function() {
                o = !1
            }))
        }
        var a, o = !1;
        return a = function() {
            t()
        }, {
            init: a
        }
    }(), TEMPLATEapp.Glossary.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.Glossary = function() {
        function t() {
            e("#cookie__modal").length > 0 && (e("#cookie__modal").modal({
                keyboard: !1,
                backdrop: !1
            }), e("body").addClass("cookie-modal"))
        }

        function n() {
            e("#cookie__modal").on("hide.bs.modal", function(t) {
                e("body").removeClass("cookie-modal")
            })
        }
        var i;
        return i = function() {
            t(), n()
        }, {
            init: i
        }
    }(), TEMPLATEapp.Glossary.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.Video = function() {
        function t(e) {
            var t = document.createElement("script"),
                n = document.getElementsByTagName("script")[0];
            t.src = e, n.parentNode.insertBefore(t, n)
        }

        function n() {
            e(".video__play-button-container").on("click", function() {
                var t = e(this).parent();
                i(e(this)), t.hasClass("youtube") ? a(e(this)) : t.hasClass("brightcove") && r(e(this))
            })
        }

        function i(e) {
            e.hide(), e.next(".video__cover-image").hide()
        }

        function a(t) {
            var n = t.siblings(".youtube-player").attr("id"),
                i = e("#" + n).data("youtube-video-id");
            l = new YT.Player(n, {
                height: "390",
                width: "640",
                videoId: i,
                events: {
                    onReady: o
                }
            })
        }

        function o(e) {
            e.target.playVideo()
        }

        function r(e) {
            var t = e.siblings(".video-js").attr("id");
            videojs(t).play()
        }
        var s, l;
        return s = function() {
            e(".embed-responsive.youtube").length > 0 && t("https://www.youtube.com/iframe_api"), e(".embed-responsive.brightcove").length > 0 && t("//players.brightcove.net/60142679001/default_default/index.min.js"), n()
        }, {
            init: s
        }
    }(), TEMPLATEapp.Video.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.Steps = function() {
        function t() {
            e("[data-step]").removeClass("active")
        }

        function n(t) {
            e('[data-step="' + t + '"]').addClass("active"), p = t, c()
        }

        function i() {
            a(), o(), r()
        }

        function a() {
            e(".steps__nav-link").on("click", function(i) {
                i.preventDefault();
                var a = parseInt(e(this).attr("href"));
                t(), n(a)
            })
        }

        function o() {
            e(".steps__footer-back").on("click", function() {
                var i = p - 1;
                t(), n(i), s(e(this))
            })
        }

        function r() {
            e(".steps__footer-next").on("click", function() {
                var i = p + 1;
                t(), n(i), s(e(this))
            })
        }

        function s(e) {
            enquire.register("screen and (max-width:768px)", {
                match: function() {
                    e.parents(".steps__container")[0].scrollIntoView(!0)
                }
            })
        }

        function l() {
            f = e("[data-step-count]").data("step-count")
        }

        function c() {
            1 === p && TEMPLATEapp.Utils.disableButton(e(".steps__footer-back")), p > 1 && TEMPLATEapp.Utils.enableButton(e(".steps__footer-back")), p < f && TEMPLATEapp.Utils.enableButton(e(".steps__footer-next")), p === f && TEMPLATEapp.Utils.disableButton(e(".steps__footer-next"))
        }

        function u() {
            var t = "";
            switch (f) {
                case 2:
                    t = "steps__nav-list--two-steps";
                    break;
                case 3:
                    t = "steps__nav-list--three-steps";
                    break;
                case 4:
                    t = "steps__nav-list--four-steps";
                    break;
                case 5:
                    t = "steps__nav-list--five-steps";
                    break;
                case 6:
                    t = "steps__nav-list--six-steps"
            }
            e(".steps__nav-list").addClass(t)
        }
        var d, f, p = 1;
        return d = function() {
            t(), n(p), i(), l(), u()
        }, {
            init: d
        }
    }(), e('[data-steps="true"]').length > 0 && TEMPLATEapp.Steps.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.Reference = function() {
        function t(e) {
            return e.find(".reference__typehead-data").val().split(",")
        }

        function n(e) {
            return new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: e
            })
        }

        function i() {
            e(".typeahead").each(function() {
                var i = e(this).parents(".reference__container"),
                    a = t(i),
                    o = n(a);
                e(this).typeahead({
                    hint: !0,
                    highlight: !0,
                    minLength: 1
                }, {
                    source: o,
                    limit: 5
                }), e(this).bind("typeahead:render", function(t) {
                    var n = t.target.value,
                        a = Array.prototype.slice.call(arguments, 1);
                    i.find(".reference__data-item").hide(), e.each(a, function(t, a) {
                        i.find('.reference__data-item[data-name="' + a + '"]').show();
                        var o = e('.reference__data-item[data-name="' + a + '"]').find(".reference__data-item-title"),
                            r = o.html().replace(/(<([^>]+)>)/gi, ""),
                            s = new RegExp(n, "i"),
                            l = r.replace(s, function(e) {
                                return "<span>" + TEMPLATEapp.Utils.matchCase(n, e) + "</span>"
                            });
                        o.html(l)
                    })
                }), e(this).on("typeahead:select", function(t, n) {
                    i.find(".reference__data-item").hide(), i.find('.reference__data-item[data-name="' + n + '"]').find(".reference__data-item-title").html(e('.reference__data-item[data-name="' + n + '"]').find(".reference__data-item-title").html().replace(/(<([^>]+)>)/gi, "")), i.find('.reference__data-item[data-name="' + n + '"]').show()
                }), e(this).on("keyup", function(t) {
                    "" === t.target.value && i.find(".reference__data-item").each(function() {
                        e(this).find(".reference__data-item-title").html(e(this).find(".reference__data-item-title").html().replace(/(<([^>]+)>)/gi, "")), e(this).show()
                    })
                })
            })
        }
        var a;
        return a = function() {
            i()
        }, {
            init: a
        }
    }(), e(".reference__container").length > 0 && TEMPLATEapp.Reference.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.Gallery = function() {
        function t() {
            e(".carousel").on("slid.bs.carousel", function(t) {
                e(this).find(".gallery__slide-number").text(e(this).find(".active").index() + 1)
            })
        }

        function n() {
            enquire.register("screen and (max-width:768px)", {
                match: function() {
                    e('[data-toggle="lightbox"]').off("click"), e('[data-toggle="lightbox"]').on("click", function(e) {
                        e.preventDefault()
                    })
                }
            }), enquire.register("screen and (min-width:769px)", {
                match: function() {
                    e('[data-toggle="lightbox"]').off("click"), e('[data-toggle="lightbox"]').on("click", function(t) {
                        t.preventDefault(), e(this).ekkoLightbox({
                            alwaysShowClose: !0,
                            onContentLoaded: function() {
                                i(e(this)), o(e(this))
                            },
                            onHidden: function() {
                                e(this)[0]._$element.focus()
                            }
                        })
                    })
                }
            })
        }

        function i(t) {
            var n = t[0]._$modal.find(".in .img-fluid").height(),
                i = Math.round(.7 * e(window).height());
            n > i ? (t[0]._$modal.find(".ekko-lightbox-container").height(i), t[0]._$modal.find(".in .img-fluid").height(i), a(t)) : t[0]._$modal.find(".ekko-lightbox-container").height(n)
        }

        function a(e) {
            var t = e[0]._$modal.find(".in .img-fluid").width();
            e[0]._$modal.find(".modal-dialog").css({
                "max-width": t
            })
        }

        function o(e) {
            var t = r(e),
                n = s(e);
            0 === e[0]._$modal.find(".gallery__slide-number").length ? l(e, n, t) : c(e, n)
        }

        function r(e) {
            return e[0]._$galleryItems.length
        }

        function s(e) {
            return e[0]._galleryIndex + 1
        }

        function l(e, t, n) {
            var i = '<span><span class="gallery__slide-number">' + t + '</span><span class="gallery__slide-number-divider"></span><span class="gallery__total-slides">' + n + "</span></span>";
            e[0]._$modal.find(".ekko-lightbox-nav-overlay a:first-child").after(i)
        }

        function c(e, t) {
            e[0]._$modal.find(".gallery__slide-number").text(t)
        }
        var u;
        return u = function() {
            t(), n()
        }, {
            init: u
        }
    }(), e(".gallery").length > 0 && TEMPLATEapp.Gallery.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.Troubleshooter = function() {
        function t() {
            f.on("click", function(t) {
                var n = t.target;
                if (e(n).hasClass("troubleshooter__nav")) {
                    i(e(n).attr("id"))
                }
            })
        }

        function n() {
            m.on("change", function(t) {
                d = e(this).val(), i(d)
            })
        }

        function i(t) {
            var n = t.split("--");
            e(".troubleshooter__breadcrumbs-item--dynamics").remove();
            var i, a, o, r;
            w.attr("id", n[0]);
            var s = l[d].ContactUsUrl.length > 0 || "null" !== l[d].ContactUsUrl;
            if (s) var c = l[d].ContactUsUrl,
                f = l[d].ContactUsCaption;
            n.length > 1 ? p.show() : p.hide();
            for (var m = 0; m < n.length; m++) {
                var C = n[m];
                if (0 === m) i = l[C].Topics, a = n[0], r = n[m], _.show(), h.hide(), g.hide(), w.hide(), k.hide(), b.hide(), x.hide();
                else {
                    if (o = i[C].Title, !(i = i[C].Topics)) return;
                    a += "--" + C, g.attr("id", r).show(), x.show(), m < n.length - 1 && k.before('<li class="troubleshooter__breadcrumbs-item troubleshooter__breadcrumbs-item--dynamics"><button id="' + a + '" class="troubleshooter__nav troubleshooter__breadcrumbs-link">' + o + "</button></li>"), y.text(o), k.show(), r = a, w.show(), s ? (b.attr("href", c), b.text(f), b.show()) : b.hide(), _.hide(), h.text(u[m - 1]).show()
                }
            }
            v.fadeOut(300, function() {
                v.empty(), i && (i.map(function(t, n) {
                    if (t.SolutionLink) {
                        var i = t.SolutionLink.indexOf("?") > -1 ? "&" : "?";
                        v.append(e('<a href="' + t.SolutionLink + i + "previousTopicId=" + t.Id + "&path=" + a + "&userTypeId=" + d + '" class="btn btn-primary troubleshooter__btn"></a>').attr("id", a + "--" + n).text(t.Title))
                    } else v.append(e('<button class="btn btn-primary troubleshooter__nav troubleshooter__btn"></btn>').attr("id", a + "--" + n).text(t.Title))
                }), v.fadeIn(), v.focus())
            })
        }

        function a() {
            c = e.parseJSON(e(".troubleshooter__json").val()), u = e.parseJSON(e(".troubleshooter_subtitles__json").val()), l = {}, c.map(function(e) {
                l[e.UserTypeId] = e
            })
        }

        function o(e, t) {
            t || (t = window.location.href), e = e.replace(/[\[\]]/g, "\\$&");
            var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"),
                i = n.exec(t);
            return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
        }

        function r() {
            var e = o("path");
            e && i(e)
        }
        var s, l, c, u, d, f, p, h, _, m, g, v, b, w, y, k, x;
        return s = function() {
            f = e(".troubleshooter"), f.length <= 0 || (v = e(".troubleshooter__step"), m = e(".troubleshooter__select"), h = e(".troubleshooter__headline"), _ = e(".troubleshooter__headline--select"), g = e(".troubleshooter__back"), b = e(".troubleshooter__contact"), x = f.find(".troubleshooter__bottom"), w = e(".troubleshooter__breadcrumbs-link--start"), k = e(".troubleshooter__breadcrumbs-item--last"), y = e(".troubleshooter__breadcrumbs-link--last"), p = e(".troubleshooter__breadcrumbs"), g.hide(), b.hide(), x.hide(), h.hide(), p.hide(), d = m.val(), a(), r(), n(), t())
        }, {
            init: s
        }
    }(), TEMPLATEapp.Troubleshooter.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.Formsteps = function() {
        function t(t, n, i, a) {
            var o = e.parseHTML(a),
                r = e.parseHTML(t);
            t ? c.text("").append(r) : c.text(p), a ? f.text("").append(o) : f.text(m), i ? u.text(i) : u.text(_), n ? d.attr("placeholder", n) : d.attr("placeholder", h)
        }

        function n(e, t) {
            "true" === e ? g.hide() : g.show(), "true" === t ? v.hide() : v.show()
        }

        function i(i, a, r) {
            var s;
            if (i.target.options && (s = i.target.value, t()), i.target.checked) {
                e(a).addClass(b);
                var l = i.target.getAttribute("data-helpcopy"),
                    c = i.target.getAttribute("data-filehelpcopy"),
                    u = i.target.getAttribute("data-querylabel"),
                    d = i.target.getAttribute("data-placeholder");
                n(i.target.getAttribute("data-hide-fileupload"), i.target.getAttribute("data-hide-query")), t(l, d, u, c)
            }
            o(r, r + 1, s)
        }

        function a() {
            var t;
            s.each(function(n, a) {
                if (e(a).on("change", function(e) {
                        i(e, a, n)
                    }), n > 0) {
                    t.hasClass(b) || e(a).hide();
                    var o = t.find("select");
                    if (t.find("select").length > 0) {
                        var r = o[0].selectedOptions[0].value;
                        e(a).find("[data-parent]").hide(), r.length > 0 && e(a).find("[data-parent=" + r + "]").show()
                    }
                }
                t = e(a)
            })
        }

        function o(t, n, i) {
            var a = e(s[n]).find("[type=radio]");
            a && a.each(function(t, n) {
                e(n).prop("checked", !1)
            }), e(s[n]).show().removeClass(b), e(s[n]).find("[data-parent]").hide(), e(s[n]).find("[data-parent=" + i + "]").show()
        }
        var r, s, l, c, u, d, f, p, h, _, m, g, v, b = "step-completed";
        return {
            init: function() {
                r = e('[data-behaviour="form-steps"]'), r.length <= 0 || (c = r.find("#query-help"), u = r.find("#query-label"), d = r.find("#query-field"), f = r.find("#file-help"), p = c.attr("data-default"), _ = u.attr("data-default"), h = d.attr("data-default"), m = f.attr("data-default"), g = e('[data-behaviour="fileupload"]').closest(".form-group--full"), v = c.closest(".form-group--full"), s = r.find('[data-behaviour="form-step"]'), l = r.find("select"), a())
            }
        }
    }(), TEMPLATEapp.Formsteps.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.Fileupload = function() {
        function t(e, t) {
            e ? o.text(e) : o.text(""), t ? r.text(t) : r.text("")
        }

        function n(n) {
            var i = n.wrap("<form>").parent("form");
            e(i).on("reset", function(e) {
                e.stopPropagation(), e.preventDefault()
            }), e(i).trigger("reset"), n.unwrap(), c.show(), t()
        }

        function i(e) {
            var t = ["Bytes", "KB", "MB", "GB", "TB"];
            if (0 == e) return "n/a";
            var n = parseInt(Math.floor(Math.log(e) / Math.log(1024)));
            return 0 == n ? e + " " + t[n] : (e / Math.pow(1024, n)).toFixed(1) + " " + t[n]
        }

        function a(e, n) {
            if (e.size > n) return s.text(e.name), void s.closest(".has-error").show();
            s.closest(".has-error").hide();
            var a = i(e.size),
                o = e.name;
            c.hide(), t(o, a), l.css("display", "flex")
        }
        var o, r, s, l, c;
        return {
            init: function() {
                var t = e('[data-behaviour="fileupload"]');
                if (!(t.length <= 0)) {
                    var i = t.find(".file-upload__field"),
                        u = t.find(".file-upload__button--remove");
                    c = t.find(".file-upload__container"), l = t.find(".file-uploaded__container").hide(), o = t.find(".file-upload__name"), r = t.find(".file-upload__size"), s = t.find("[data-file-error]");
                    var d = i.attr("data-maxsize");
                    i.on("change", function(e) {
                        e.target.files[0] && a(e.target.files[0], d)
                    }), u.on("click", function(e) {
                        e.preventDefault(), n(i), l.hide()
                    })
                }
            }
        }
    }(), TEMPLATEapp.Fileupload.init()
}(jQuery, ResponsiveBootstrapToolkit),
function(e, t) {
    "use strict";
    TEMPLATEapp.RaiseAQueryEdit = function() {
        var t;
        return t = function() {
            var t = e("#raiseAQueryEdit");
            if (!(t.length < 1)) {
                var n = e(".personDetails__value"),
                    i = e("#personDetails").find(".form-control");
                t.on("click", function() {
                    i.show(), n.hide(), e(this).hide()
                })
            }
        }, {
            init: t
        }
    }(), TEMPLATEapp.RaiseAQueryEdit.init()
}(jQuery, ResponsiveBootstrapToolkit);