(function(){var e,g="ckns_policy",h={personalisation:"ckps_.+|X-AB-iplayer-.+|ACTVTYMKR|BBC_EXAMPLE_COOKIE|BBCIplayer|BBCiPlayerM|BBCIplayerSession|BBCMediaselector|BBCPostcoder|bbctravel|CGISESSID|ed|food-view|forceDesktop|h4|IMRID|locserv|mmcore\\.tst|MyLang|myloc|NTABS|ttduserPrefs|V5|WEATHER|BBCScienceDiscoveryPlaylist_\\w+|bitratePref|correctAnswerCount|genreCookie|highestQuestionScore|incorrectAnswerCount|longestStreak|MSCSProfile|programmes-oap-expanded|quickestAnswer|score|servicePanel|slowestAnswer|totalTimeForAllFormatted|v|BBCwords|score|correctAnswerCount|highestQuestionScore|hploc|BGUID|BBCWEACITY|mstouch|myway|BBCNewsCustomisation|cbbc_anim|cbeebies_snd|bbcsr_usersx|cbeebies_rd|BBC-Latest_Blogs|zh-enc|pref_loc|m|bbcEmp.+|recs-.+|_lvd2|_lvs2|tick|_fcap_CAM1|_rcc2",performance:"ckpf_.+|BBCLiveStatsClick|id|_em_.+|cookies_enabled|mbox(-admin)?|mc_.+|omniture_unique|s_.+|sc_.+|adpolicyAdDisplayFrequency|s1|ns_session|ns_cookietest|ns_ux|NO-SA|tr_pr1|gvsurvey|bbcsurvey|si_v|sa_labels|obuid",ads:"ckad_.+|rsi_segs|c",necessary:"ckns_.+|BBC-UID|blq\\.dPref|SSO2-UID|BBC-H2-User|rmRpDetectReal|bbcComSurvey|IDENTITY_ENV|IDENTITY|IDENTITY-HTTPS|IDENTITY_SESSION|BBCCOMMENTSMODULESESSID|bbcBump.+|IVOTE_VOTE_HISTORY|pulse|BBCPG|BBCPGstat"};function b(l){var n=bbccookies._getCookieName(l),m=bbccookies.readPolicy();if(a(n,m)){return e.write(l)}else{return null}}var d=function(){var l=document;return{write:function(m){return l.cookie=m},read:function(){return l.cookie}}};var k=function(){try{Object.defineProperty(document,"cookie",{set:b,get:function(){return e.read()}})}catch(l){}};function i(){var p=document.cookie.replace(/; +/g,";").split(";"),m,n=[];for(var o=0,l=p.length;o<l;o++){m=p[o];n.push(bbccookies._getCookieName(m))}return n}function f(o){if(f.cached){return f.cached}var m="",n;for(var l in o){if(o.hasOwnProperty(l)&&h[l]){if(o[l]===true){m+=(m?"|":"")+h[l]}}}n=new RegExp("^("+(m?m:".*")+")$","i");return f.cached=n}f.cached=null;function a(n){var m,l=false;if(/^donotallow-/i.test(n)){l=false}else{m=bbccookies.readPolicy();list=f(m);l=list.test(n)}return l}function c(){var m=bbccookies.readPolicy(),o=i(),p;for(var n=0,l=o.length;n<l;n++){if(!a(o[n],m)){p=new Date();p.setTime(0);p=p.toUTCString();bbccookies._setEverywhere(o[n],"deleted",p)}}}function j(){e=new d();c()}bbccookies.set=function(m,l){var n=bbccookies._getCookieName(m);if(l||a(n)){return e.write(m)}return null};bbccookies.get=function(){return e.read()};bbccookies.isAllowed=function(l){return a.apply(this,arguments)};j()})();