var Autobot = {
    title: "GrepoBot",
    version: "5.1",
    domain: window.location.protocol + "//bot.grepobot.com/",
    scriptDomain: window.location.protocol + "//cdn.jsdelivr.net/gh/xadam1/grepobot-cracked@v5.1/",
    botWnd: "",
    botPremWnd: "",
    botEmailWnd: "",
    facebookWnd: "",
    isLogged: !1,
    Account: {
        player_id: Game.player_id,
        player_name: Game.player_name,
        world_id: Game.world_id,
        locale_lang: Game.locale_lang,
        premium_grepolis: Game.premium_user,
        csrfToken: Game.csrfToken
    },
    trial_time: 0,
    premium_time: 0,
    facebook_like: 0,
    toolbox_element: null,
    init: function() {
        ConsoleLog.Log("Initialize Autobot", 0), Autobot.authenticate(), Autobot.obServer(), Autobot.isActive(), Autobot.setToolbox(), Autobot.initAjax(), Autobot.initMapTownFeature(), Autobot.fixMessage(), Assistant.init()
    },
    setToolbox: function() {
        Autobot.toolbox_element = $(".nui_bot_toolbox")
    },
    authenticate: function() {
        DataExchanger.Auth("login", Autobot.Account, function(t) {
            ModuleManager.callbackAuth(t)
        })
    },
    obServer: function() {
        $.Observer(GameEvents.notification.push).subscribe("GRCRTNotification", function() {
            $("#notification_area>.notification.getPremiumNotification").on("click", function() {
                Autobot.getPremium()
            })
        })
    },
    initWnd: function() {
        if (Autobot.isLogged) {
            if (void 0 !== Autobot.botWnd) {
                try {
                    Autobot.botWnd.close()
                } catch (t) {}
                Autobot.botWnd = void 0
            }
            if (void 0 !== Autobot.botPremWnd) {
                try {
                    Autobot.botPremWnd.close()
                } catch (t) {}
                Autobot.botPremWnd = void 0
            }
            Autobot.botWnd = Layout.dialogWindow.open("", Autobot.title + ' v<span style="font-size: 10px;">' + Autobot.version + "</span>", 500, 350, "", !1), Autobot.botWnd.setHeight([350]), Autobot.botWnd.setPosition(["center", "center"]);
            var t = Autobot.botWnd.getJQElement();
            t.append($("<div/>", {
                class: "menu_wrapper",
                style: "left: 78px; right: 14px"
            }).append($("<ul/>", {
                class: "menu_inner"
            }).prepend(Autobot.addMenuItem("AUTHORIZE", "Account", "Account")).prepend(Autobot.addMenuItem("CONSOLE", "Assistant", "Assistant")).prepend(Autobot.addMenuItem("ASSISTANT", "Console", "Console")))), "undefined" != typeof Autoattack && t.find(".menu_inner li:last-child").before(Autobot.addMenuItem("ATTACKMODULE", "Attack", "Autoattack")), "undefined" != typeof Autobuild && t.find(".menu_inner li:last-child").before(Autobot.addMenuItem("CONSTRUCTMODULE", "Build", "Autobuild")), "undefined" != typeof Autoculture && t.find(".menu_inner li:last-child").before(Autobot.addMenuItem("CULTUREMODULE", "Culture", "Autoculture")), "undefined" != typeof Autofarm && t.find(".menu_inner li:last-child").before(Autobot.addMenuItem("FARMMODULE", "Farm", "Autofarm")), $("#Autobot-AUTHORIZE").click()
        }
    },
    addMenuItem: function(t, o, e) {
        return $("<li/>").append($("<a/>", {
            class: "submenu_link",
            href: "#",
            id: "Autobot-" + t,
            rel: e
        }).click(function() {
            if (Autobot.botWnd.getJQElement().find("li a.submenu_link").removeClass("active"), $(this).addClass("active"), Autobot.botWnd.setContent2(Autobot.getContent($(this).attr("rel"))), "Console" == $(this).attr("rel")) {
                var t = $(".terminal"),
                    o = $(".terminal-output")[0].scrollHeight;
                t.scrollTop(o)
            }
        }).append(function() {
            return "Support" != e ? $("<span/>", {
                class: "left"
            }).append($("<span/>", {
                class: "right"
            }).append($("<span/>", {
                class: "middle"
            }).html(o))) : '<a id="help-button" onclick="return false;" class="confirm"></a>'
        }))
    },
    getContent: function(t) {
        return "Console" == t ? ConsoleLog.contentConsole() : "Account" == t ? Autobot.contentAccount() : "Support" != t ? void 0 !== window[t] ? window[t].contentSettings() : "" : void console.log("GrepoBot: SupportBTN Clicked")
    },
    contentAccount: function() {
        var t = {
                "Name:": Game.player_name,
                "World:": Game.world_id,
                "Rank:": Game.player_rank,
                "Towns:": Game.player_villages,
                "Language:": Game.locale_lang,
                "Premium: ": "[ CRACKED by T0rmentor ]"
            },
            o = $("<table/>", {
                class: "game_table layout_main_sprite",
                cellspacing: "0",
                width: "100%"
            }).append(function() {
                var o = 0,
                    e = $("<tbody/>");
                return $.each(t, function(t, n) {
                    e.append($("<tr/>", {
                        class: o % 2 ? "game_table_even" : "game_table_odd"
                    }).append($("<td/>", {
                        style: "background-color: #DFCCA6;width: 30%;"
                    }).html(t)).append($("<td/>").html(n))), o++
                }), e
            }),
            e = FormBuilder.gameWrapper("Account", "account_property_wrapper", o, "margin-bottom:9px;")[0].outerHTML;
        return e += $("<div/>", {
            id: "grepobanner",
            style: ""
        })[0].outerHTML
    },
    contentSupport: function() {
        console.log("GrepoBot: Support Window would load.")
    },
    checkAlliance: function() {
        $(".allianceforum.main_menu_item").hasClass("disabled") || DataExchanger.members_show(function(t) {
            null != t.plain.html && jQuery.each($(t.plain.html).find("#ally_members_body .ally_name a"), function() {
                var t = atob($(this).attr("href"));
                console.log(JSON.parse(t.substr(0, t.length - 3)))
            })
        })
    },
    fixMessage: function() {
        var t;
        HumanMessage._initialize = (t = HumanMessage._initialize, function() {
            t.apply(this, arguments), $(window).unbind("click")
        })
    },
    getPremium: function() {
        if (Autobot.isLogged) {
            if ($.Observer(GameEvents.menu.click).publish({
                    option_id: "premium"
                }), void 0 !== Autobot.botPremWnd) {
                try {
                    Autobot.botPremWnd.close()
                } catch (t) {}
                Autobot.botPremWnd = void 0
            }
            if (void 0 !== Autobot.botWnd) {
                try {
                    Autobot.botWnd.close()
                } catch (t) {}
                Autobot.botWnd = void 0
            }
            Autobot.botPremWnd = Layout.dialogWindow.open("", "Autobot v" + Autobot.version + " - Premium", 500, 350, "", !1), Autobot.botPremWnd.setHeight([350]), Autobot.botPremWnd.setPosition(["center", "center"]);
            var t = $("<div/>", {
                id: "payment"
            }).append($("<div/>", {
                id: "left"
            }).append($("<ul/>", {
                id: "time_options"
            }).append($("<li/>", {
                class: "active"
            }).append($("<span/>", {
                class: "amount"
            }).html("1 Month")).append($("<span/>", {
                class: "price"
            }).html("€&nbsp;4,99"))).append($("<li/>").append($("<span/>", {
                class: "amount"
            }).html("2 Month")).append($("<span/>", {
                class: "price"
            }).html("€&nbsp;9,99")).append($("<div/>", {
                class: "referenceAmount"
            }).append($("<div/>", {
                class: "reference",
                style: "transform: rotate(17deg);"
            }).html("+12 Days&nbsp;")))).append($("<li/>").append($("<span/>", {
                class: "amount"
            }).html("4 Months")).append($("<span/>", {
                class: "price"
            }).html("€&nbsp;19,99")).append($("<div/>", {
                class: "referenceAmount"
            }).append($("<div/>", {
                class: "reference",
                style: "transform: rotate(17deg);"
            }).html("+36 Days&nbsp;")))).append($("<li/>").append($("<span/>", {
                class: "amount"
            }).html("10 Months")).append($("<span/>", {
                class: "price"
            }).html("€&nbsp;49,99")).append($("<div/>", {
                class: "referenceAmount"
            }).append($("<div/>", {
                class: "reference",
                style: "transform: rotate(17deg);"
            }).html("+120 Days&nbsp;")))))).append($("<div/>", {
                id: "right"
            }).append($("<div/>", {
                id: "pothead"
            })).append($("<div/>", {
                id: "information"
            }).append($("<span/>", {
                class: "text"
            }).html("1 month for only €4,99")).append($("<span/>", {
                class: "button"
            }).html("Buy"))));
            Autobot.botPremWnd.setContent2(t);
            var o = 0;
            $("#time_options li").on("click", function() {
                $("#time_options li").removeClass("active"), $(this).addClass("active"), o = $(this).index();
                var t = $("#payment #information .text");
                0 == o ? t.html("1 month for only €4,99") : 1 == o ? t.html("2 month +12 days for only €9,99") : 2 == o ? t.html("4 months +36 days for only €19,99") : 3 == o && t.html("10 months +120 days for only €49,99")
            }), $("#payment #information").on("click", function() {
                var t = window.open(Autobot.domain + "paypal/process.php?payment=" + o + "&player_id=" + Autobot.Account.player_id, "grepolis_payment", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,height=650,width=800"),
                    e = setInterval(function() {
                        t && !t.closed || (clearInterval(e), Autobot.authenticate())
                    }, 500)
            })
        }
    },
    botFacebookWnd: function() {
        console.log("GrepoBot: Facebook Window would show")
    },
    upgrade3Days: function() {
        console.log("GrepoBot: 3day Upgrade called.")
    },
    initAjax: function() {
        $(document).ajaxComplete(function(t, o, e) {
            if (-1 == e.url.indexOf(Autobot.domain) && -1 == e.url.indexOf(Autobot.scriptDomain) && -1 != e.url.indexOf("/game/") && 4 == o.readyState && 200 == o.status) {
                var n = e.url.split("?"),
                    a = n[0].substr(6) + "/" + n[1].split("&")[1].substr(7);
                "undefined" != typeof Autobuild && Autobuild.calls(a), "undefined" != typeof Autoattack && Autoattack.calls(a, o.responseText)
            }
        })
    },
    verifyEmail: function() {
        Autobot.isLogged && DataExchanger.email_validation(function(t) {
            null != t.plain.html && DataExchanger.Auth("verifyEmail", {
                key: btoa(Autobot.stringify({
                    player_id: Autobot.Account.player_id,
                    player_email: $(t.plain.html).find("#current_email_adress").html()
                }))
            }, function(t) {
                null != t.success && Autobot.arrowActivated()
            })
        })
    },
    randomize: function(t, o) {
        return Math.floor(Math.random() * (o - t + 1)) + t
    },
    secondsToTime: function(t) {
        var o = Math.floor(t / 86400),
            e = Math.floor(t % 86400 / 3600),
            n = Math.floor(t % 86400 % 3600 / 60);
        return (o ? o + " days " : "") + (e ? e + " hours " : "") + (n ? n + " minutes " : "")
    },
    timeToSeconds: function(t) {
        for (var o = t.split(":"), e = 0, n = 1; o.length > 0;) e += n * parseInt(o.pop(), 10), n *= 60;
        return e
    },
    arrowActivated: function() {
        var t = $("<div/>", {
            class: "helpers helper_arrow group_quest d_w animate bounce",
            "data-direction": "w",
            style: "top: 0; left: 360px; visibility: visible; display: none;"
        });
        Autobot.toolbox_element.append(t), t.show().animate({
            left: "138px"
        }, "slow").delay(1e4).fadeOut("normal"), setTimeout(function() {
            Autobot.botFacebookWnd()
        }, 25e3)
    },
    createNotification: function(t, o) {
        (void 0 === Layout.notify ? new NotificationHandler : Layout).notify($("#notification_area>.notification").length + 1, t, "<span><b>Autobot</b></span>" + o + "<span class='small notification_date'>Version " + Autobot.version + "</span>")
    },
    toHHMMSS: function(t) {
        var o = ~~(t / 3600),
            e = ~~(t % 3600 / 60),
            n = t % 60;
        return ret = "", o > 0 && (ret += o + ":" + (e < 10 ? "0" : "")), ret += e + ":" + (n < 10 ? "0" : ""), ret += "" + n, ret
    },
    stringify: function(t) {
        var o = typeof t;
        if ("string" === o) return '"' + t + '"';
        if ("boolean" === o || "number" === o) return t;
        if ("function" === o) return t.toString();
        var e = [];
        for (var n in t) e.push('"' + n + '":' + this.stringify(t[n]));
        return "{" + e.join(",") + "}"
    },
    isActive: function() {
        setTimeout(function() {
            DataExchanger.Auth("isActive", Autobot.Account, Autobot.isActive)
        }, 18e4)
    },
    town_map_info: function(t, o) {
        if (null != t && t.length > 0 && o.player_name)
            for (var e = 0; e < t.length; e++)
                if ("flag town" == t[e].className) {
                    "undefined" != typeof Assistant && (Assistant.settings.town_names && $(t[e]).addClass("active_town"), Assistant.settings.player_name && $(t[e]).addClass("active_player"), Assistant.settings.alliance_name && $(t[e]).addClass("active_alliance")), $(t[e]).append('<div class="player_name">' + (o.player_name || "") + "</div>"), $(t[e]).append('<div class="town_name">' + o.name + "</div>"), $(t[e]).append('<div class="alliance_name">' + (o.alliance_name || "") + "</div>");
                    break
                } return t
    },
    checkPremium: function(t) {
        return $(".advisor_frame." + t + " div").hasClass(t + "_active")
    },
    initWindow: function() {
        $(".nui_main_menu").css("top", "249px"), $("<div/>", {
            class: "nui_bot_toolbox"
        }).append($("<div/>", {
            class: "bot_menu layout_main_sprite"
        }).append($("<ul/>").append($("<li/>", {
            id: "Autofarm_onoff",
            class: "disabled"
        }).append($("<span/>", {
            class: "autofarm farm_town_status_0"
        }))).append($("<li/>", {
            id: "Autoculture_onoff",
            class: "disabled"
        }).append($("<span/>", {
            class: "autoculture farm_town_status_0"
        }))).append($("<li/>", {
            id: "Autobuild_onoff",
            class: "disabled"
        }).append($("<span/>", {
            class: "autobuild toolbar_activities_recruits"
        }))).append($("<li/>", {
            id: "Autoattack_onoff",
            class: "disabled"
        }).append($("<span/>", {
            class: "autoattack sword_icon"
        }))).append($("<li/>").append($("<span/>", {
            href: "#",
            class: "botsettings circle_button_settings"
        }).on("click", function() {
            Autobot.isLogged && Autobot.initWnd()
        }).mousePopup(new MousePopup(DM.getl10n("COMMON").main_menu.settings)))))).append($("<div/>", {
            id: "time_autobot",
            class: "time_row"
        })).append($("<div/>", {
            class: "bottom"
        })).insertAfter(".nui_left_box")
    },
    initMapTownFeature: function() {
        var t;
        MapTiles.createTownDiv = (t = MapTiles.createTownDiv, function() {
            var o = t.apply(this, arguments);
            return Autobot.town_map_info(o, arguments[0])
        })
    },
    checkAutoRelogin: function() {
        if (void 0 !== $.cookie("pid") && void 0 !== $.cookie("ig_conv_last_site")) {
            var t = $.cookie("ig_conv_last_site").match(/\/\/(.*?)\.grepolis\.com/g)[0].replace("//", "").replace(".grepolis.com", "");
            DataExchanger.Auth("checkAutorelogin", {
                player_id: $.cookie("pid"),
                world_id: t
            }, function(o) {
                0 != o && setTimeout(function() {
                    DataExchanger.login_to_game_world(t)
                }, 1e3 * o)
            })
        }
    }
};
! function() {
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }, $.fn.serializeObject = function() {
        var t = {},
            o = this.serializeArray();
        return $.each(o, function() {
            void 0 !== t[this.name] ? (t[this.name].push || (t[this.name] = [t[this.name]]), t[this.name].push(this.value || "")) : t[this.name] = this.value || ""
        }), t
    };
    var t = setInterval(function() {
        null != window && ($(".nui_main_menu").length && !$.isEmptyObject(ITowns.towns) ? (clearInterval(t), Autobot.initWindow(), Autobot.initMapTownFeature(), $.getScript(Autobot.scriptDomain + "Evaluate.js", function() {
            $.when($.getScript(Autobot.scriptDomain + "DataExchanger.js"), $.getScript(Autobot.scriptDomain + "ConsoleLog.js"), $.getScript(Autobot.scriptDomain + "FormBuilder.js"), $.getScript(Autobot.scriptDomain + "ModuleManager.js"), $.getScript(Autobot.scriptDomain + "Assistant.js"), $.Deferred(function(t) {
                $(t.resolve)
            })).done(function() {
                Autobot.init()
            })
        })) : /grepolis\.com\/start\?nosession/g.test(window.location.href) && (clearInterval(t), $.getScript(Autobot.scriptDomain + "Evaluate.js", function() {
            $.when($.getScript(Autobot.scriptDomain + "DataExchanger.js"), $.getScript(Autobot.scriptDomain + "Redirect.js"), $.Deferred(function(t) {
                $(t.resolve)
            })).done(function() {
                Autobot.checkAutoRelogin()
            })
        })))
    }, 1e3)
}();
