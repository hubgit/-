(function(){commentsModule=function(){this.VERSION="1.1";this.events={};this.params={comment_max_lines:5,items_per_page:20,sort_order:"Ascending",filter:"none",current_page:1,prefix:"",parent_uri:"",postFreq:0,textarea_height:"40px",character_count:0,limitingCharacters:false,critical_error_msg:"We're having some problems displaying the comments at the moment. Sorry. We're doing our best to fix it"};this.flags={ready:false,glow_ready:false,filter_tabs_events_added:false,submit_box_events_added:false,postOk:true,speedBumping:false,setupComplete:false};this.translations={you:"You",your:"Your",rated:"rated",already_rated:"Already rated",rate_this:"rate this",comments:"Comments",your_comments:"Your comments",add_your_comment:"Add your comment"};this.message_types=["error","message"];var a=this;this.container={};this.loadingElements={};this.tabElements={};this.initParams=function(c){for(var b in c){this.params[b]=c[b]}if(this.params.ajax_load_url&&this.params.bbc_id_env&&this.params.ajax_preview_url&&this.params.items_per_page&&this.params.sort_order&&this.params.site_name&&this.params.forum_id){a.flags.ready=true;a.init();a.enableForm()}};this.initGlow=function(b){a.glow=b;if(a.glow.isReady){a.flags.glow_ready=true}};this.initLogger=function(b){a.logger=b;a.flags.logger_ready=true};this.setRootNode=function(c){for(var d in c){var b=a.glow.dom.get(c[d]);if(b.length>0){this.container=b;this.rootSelector=c[d];break}}};this.findNode=function(c){var b=a.container.get(c);return(b.length>0)?b:a.glow.dom.get(c)};this.init=function(){if(this.flags.setupComplete){this.loadingElements=this.findNode(".loading");this.attachPaginatorEventsToLinks();this.attachModalIframeToPopupLinks();this.attachFormEvents()}else{this.setRootNode(["#comments",".comments_module"]);this.loadingElements=this.findNode(".loading");this.postingElements=this.findNode(".dna-tab-posting");this.tabElements=this.findNode("ul.tabs li");this.commentsList=this.findNode("div.dna-comment-list");this.messageElement=this.findNode(".comments-message");this.formElements=this.findNode(" form.postcomment input, form.postcomment textarea");this.formSubmitElements=this.findNode(" form.postcomment input");this.previewElement=this.findNode(".dna-comment-preview");this.attachPaginatorEventsToLinks();this.attachModalIframeToPopupLinks();this.attachFilterEventsToLinks();this.attachFormEvents();this.attachPostCommentLinkEvent();this.attachInitialViewCommentsLink();this.populateCommentCountAnchors();this.findNode("form.postcomment input.dna-commentbox-preview").css("display","inline");if(typeof(identity)=="object"){identity.status.enableJavaScript();identity.addSigninHandler(function(){a.setLoggedIn();a.loadLoggedInFragment()})}if(location.protocol=="https:"){this.params.ajax_load_url=this.params.ajax_load_url.replace("http:","https:")}this.flags.setupComplete=true}this.personaliseCommentFeed();this.updateCommentCounts(a.params.comment_count)};this.attachInitialViewCommentsLink=function(){};this.enhanceCommentFeed=function(){a.findNode(".dna-comments-comment-footer").css("visibility","hidden");a.findNode("ul.collections li.comment").each(function(){a.glow.events.addListener(this,"mouseover",function(){a.glow.dom.get(this).get(".dna-comments-comment-footer").css("visibility","visible")},this);a.glow.events.addListener(this,"mouseout",function(){a.glow.dom.get(this).get(".dna-comments-comment-footer").css("visibility","hidden")},this)})};this.personaliseCommentFeed=function(){if(a.params.logged_in&&typeof(a.params.user_id)=="number"){a.findNode("a.comment_username_"+a.params.user_id).each(function(){a.glow.dom.get(this).html(a.translations.you)});a.findNode("span.comment_moderated_username_"+a.params.user_id).each(function(){a.glow.dom.get(this).html(a.translations.your)});a.findNode("p.comment_complain_"+a.params.user_id).each(function(){a.glow.dom.get(this).css("display","none")});if(a.params.dml||a.params.del){a.findNode("div.dna-comment-list .dna-comments-comment-footer").each(function(){if(a.params.dml){var b=a.glow.dom.get(this).parent().attr("id").replace("comment_","");var c='<p class="flag"><a href="'+a.params.ml+b+'" class="popup" target="_blank">Moderation History</a></p>';c+=(a.glow.dom.get(this).children().hasClass("flag"))?"":"";a.glow.dom.get(this).prepend(c)}})}}};this.populateCommentCountAnchors=function(){var b=(typeof(a.params.comment_count)=="number"&&a.params.comment_count>0)?'<span class="dna-comment-count-number">('+a.params.comment_count+")</span>":'<span class="dna-comment-count-number"></span>';var c=a.findNode(".dna-comment-count-simple");var e=a.findNode(".dna-comment-count-personal");var d=a.findNode(".dna-comment-anchor");c.html('<a href="#dna-comments">'+a.translations.comments+" "+b+'<span class="gvl3-icon gvl3-icon-comment"></span></a> ');e.html('<a href="#dna-comments">'+a.translations.your_comments+" "+b+'<span class="gvl3-icon gvl3-icon-comment"></span></a> ');d.html('<a href="#dna-comments">'+a.translations.add_your_comment+"</a> ");a.glow.events.addListener(c,"click",a.scrollTop,this);a.glow.events.addListener(e,"click",a.scrollTop,this);a.glow.events.addListener(d,"click",a.scrollTop,this)};this.setLoggedIn=function(){this.findNode(".dna-commentbox-logged-in").show();this.findNode(".dna-commentbox-logged-out").hide();this.attachFormEvents();this.formatSubmitCommentForm();this.enableForm()};this.loadLoggedInFragment=function(){var b="?preset="+a.params.preset+"&ptrt="+escape(a.params.parent_uri)+"&idenv="+escape(a.params.bbc_id_env)+"&siteId="+a.params.site_name+"&loc="+a.params.loc;this.glow.net.loadScript(this.params.base_non_secure_url+"fragment/userfragment/"+b)};this.setEditorsPick=function(d){var b=a.findNode(".loading img");a.glow.dom.get(d.source).prepend('<img src="'+b.attr("src")+'" style="position: absolute; margin-left: -24px" /> ');var c=a.glow.net.get(d.source.href,{onLoad:function(e){a.glow.dom.get(d.source).get("img").remove();if(a.params.filter=="EditorPicks"){a.glow.dom.get(d.source.parentNode.parentNode.parentNode).remove()}alert(e.text())},onError:function(e){a.glow.dom.get(d.source).get("img").remove();alert(e.text())},useCache:false});return false};this.attachModalIframeToPopupLinks=function(){var b=this.commentsList.get("a.popup");b.each(function(){a.glow.events.addListener(this,"click",a.openJsPopupWindow,this)})};this.openModalIframe=function(b){a.overlay=new a.glow.widgets.Overlay(a.glow.dom.create('<div id="dna-comments-modal-overlay" class="dna-url-popup"><div class="dna-close-panel"><a href="#" onclick="comments.overlay.hide(); return false;">x</div><iframe id="modalpopup" src="'+b.source.href+'" width="100%" height="100%" frameborder="0"></iframe></div>'),{modal:true});a.overlay.show();return false};this.openJsPopupWindow=function(b){window.open(b.source.href,"dna_popup_window","height = 615, width = 694, scrollbars = 1");return false};this.openJsWindow=function(b){window.open(b.source.href,"dna_window");return false};this.attachPaginatorEventsToLinks=function(){var b=a.findNode("ul.comments_pagination_ul li a");b.each(function(){var c=this.innerHTML.toLowerCase().replace(/^\s*/,"").replace(/\s*$/,"");switch(c){case"first":case"start":a.glow.events.addListener(this,"click",function(){a.loadPage(1,this,function(){window.location="#"+a.params.prefix+"comments"});return false});break;case"last":case"end":a.glow.events.addListener(this,"click",function(){a.loadPage(a.params.page_count,this,function(){window.location="#"+a.params.prefix+"comments"});return false});break;case"newer":a.glow.events.addListener(this,"click",function(){a.loadPage(a.params.current_page-1,this,function(){window.location="#"+a.params.prefix+"comments"});return false});break;case"older":a.glow.events.addListener(this,"click",function(){a.loadPage(a.params.current_page+1,this,function(){window.location="#"+a.params.prefix+"comments"});return false});break;default:a.glow.events.addListener(this,"click",function(){a.loadPage(c,this,function(){window.location="#"+a.params.prefix+"comments"});return false});break}})};this.attachFilterEventsToLinks=function(){if(!this.params.filter_tabs_events_added){this.tabElements.get("a").each(function(){var b=this.href.match(/filter=([a-zA-Z]*)/);a.glow.events.addListener(this,"click",function(){a.params.filter=b[1];a.loadPage(1,this,function(){a.setTab(b[1])});return false})});this.params.filter_tabs_events_added=true}};this.attachFormEvents=function(){if(!this.flags.submit_box_events_added){var b=this.findNode("form.postcomment");this.glow.events.addListener(b,"submit",function(){a.postComment();return false});this.glow.events.addListener(this.findNode("textarea#dna-commentbox-text"),"focus",this.prepareSubmitBoxForSubmit);this.glow.events.addListener(this.findNode("textarea#dna-commentbox-text"),"blur",this.formatSubmitCommentForm);this.glow.events.addListener(this.findNode("input.dna-commentbox-preview"),"click",this.previewComment);this.glow.events.addListener(this.findNode("a.popup"),"click",this.openJsPopupWindow);this.glow.events.addListener(this.findNode("a.no-popup"),"click",this.openJsWindow);this.formatSubmitCommentForm();this.flags.submit_box_events_added=true}};this.checkUserAuthedToComment=function(){var b=a.glow.net.get("/users/authorized.bool?url="+a.params.policy_uri,{onLoad:function(c){if(parseInt(c.text())==0){a.showError('Sorry, you need to complete your registration details by <a href="https://'+a.params.bbc_id_env+"/users/dash/more?ptrt="+a.params.parent_uri+"&target_resource="+a.params.policy_uri+'">clicking here</a>.');a.disableForm()}else{a.enableForm()}}})};this.attachPostCommentLinkEvent=function(){var b=this.findNode(".dna-commentbox-add-comment-cta");if(b.length>0){this.glow.events.addListener(b,"click",function(){var c=a.glow.dom.get("textarea#dna-commentbox-text");a.scrollTextarea();c[0].focus();return false})}};this.formatSubmitCommentForm=function(){var b=a.findNode("form.postcomment textarea#dna-commentbox-text");if(b.length<1){return false}var c=parseInt(b.parent().css("width"))-((2*parseInt(b.css("padding-left")))+2);b.css("width",c);a.findNode("p.dna-comments-footer").css("width",parseInt(b.parent().css("width"))-((parseInt(b.css("padding-left")))+2));var d=b.val();if(d.toLowerCase()=="add your comment"||d.replace(/^\s*/,"").replace(/\s*$/,"")==""){var b=a.findNode("form.postcomment textarea#dna-commentbox-text");b.val("Add your comment");b.css("height",a.params.textarea_height);a.findNode("form.postcomment .dna-comments-footer").hide()}};this.prepareSubmitBoxForSubmit=function(){var b=a.findNode("form.postcomment textarea#dna-commentbox-text");var c=b.val();if(c.toLowerCase()=="add your comment"){b.val("");b.css("height","80px");a.findNode("p.dna-comments-footer").show()}else{a.formatSubmitCommentForm()}};this.loadPage=function(f,d,e,c,b){a.showLoader();var b=(typeof(b)=="boolean")?b:true;var g={siteId:this.params.site_name,forumId:this.params.forum_id,sortOrder:this.params.sort_order,limit:this.params.items_per_page,comments_page:f,filter:this.params.filter,preset:this.params.preset,parentUri:this.params.parent_uri,loc:this.params.loc,timezone:this.params.timezone,viaAjax:true};if(c){g.postId=c}var h=a.glow.data.encodeUrl(g);this.glow.net.loadScript(this.params.ajax_load_url+"?"+h);if(d){d.blur()}return false};this.postComment=function(){var b=a.findNode("#dna-commentbox-text").val().replace(/^\s*/,"").replace(/\s*$/,"");if(b.length==0){a.showError("You must enter some text in the comment box");return false}if(a.flags.postOk==false&&a.flags.speedBumping==true){a.showError("Sorry, you can only post a comment to this article once every "+a.params.postFreq+" seconds. You have <strong>"+a.getSpeedBumpCountdown()+"</strong> seconds left since the time of your last post.");return false}var e=a.findNode("form.postcomment");var c=e.val();c.sortOrder=a.params.sort_order;c.limit=a.params.items_per_page;c.filter=a.params.filter;c.preset=a.params.preset;c.viaAjax=true;a.disableForm();a.showPosting("posting your comment",true);var d=a.glow.data.encodeUrl(c);a.glow.net.loadScript(e.attr("action")+"?"+d);return false};this.previewComment=function(){var b=a.findNode("textarea#dna-commentbox-text").val().replace(/^\s*/,"").replace(/\s*$/,"");if(b.length==0){a.showError("You must enter some text in the comment box");return false}var c=(a.params.num_comments)?a.params.num_comments+1:1;var f=a.findNode("form.postcomment");var d=f.val();d.id=c;d.comment=b;d.preset=a.params.preset;d.viaAjax=true;a.showPosting("generating preview",true);var e=a.glow.data.encodeUrl(d);a.glow.net.loadScript(a.params.ajax_preview_url+"?"+e);return false};this.stripslashes=function(b){b=b.replace(/\\'/g,"'");b=b.replace(/\\"/g,'"');b=b.replace(/\\0/g,"\0");b=b.replace(/\\\\/g,"\\");return b};this.updateCsrf=function(b){a.findNode("input.dna-comments-csrf").val(b)};this.scrollToElement=function(c,b){var d=b||10;this.glow.dom.get(window).scrollTop(c.offset().top-d);return false};this.scrollTop=function(){this.scrollToElement(this.container);return false};this.scrollTopError=function(){this.scrollToElement(this.findNode(".comments-message"));return false};this.scrollTextarea=function(){this.scrollToElement(this.findNode("#dna-commentbox-text"));return false};this.showMessage=function(e,d){d=d||"message";for(var b in a.message_types){var c="comments-message-"+a.message_types[b];if(a.messageElement.hasClass(c)&&a.message_types[b]!=d){a.messageElement.removeClass(c)}}a.messageElement.addClass("comments-message-"+d);a.messageElement.show();a.messageElement.html(a.stripslashes(e));a.hideLoader();a.hidePosting();a.enableFormInputs();a.scrollTopError();a.findNode(".dna-comments-all-loaders").hide();return true};this.showError=function(b){if(typeof(b)!="string"){b=a.params.critical_error_msg}return this.showMessage(b,"error")};this.hideMessage=function(){if(!a.messageElement.hasClass("sticky")){a.messageElement.html();a.messageElement.hide();return true}return false};this.hideError=function(){a.hideMessage();return true};this.showLoader=function(){this.loadingElements.css("display","inline")};this.hideLoader=function(){this.loadingElements.css("display","none")};this.showPosting=function(c,b){this.postingElements.get("span").html(c);if(b==true){this.postingElements.get("img").css("display","inline")}else{this.postingElements.get("img").css("display","none")}this.postingElements.css("display","inline")};this.hidePosting=function(){this.postingElements.css("display","none")};this.disableFormInputs=function(){this.formSubmitElements.attr("disabled","true")};this.enableFormInputs=function(){this.formSubmitElements.removeAttr("disabled")};this.disableForm=function(){this.formElements.attr("disabled","true")};this.enableForm=function(){this.formElements.removeAttr("disabled")};this.setTab=function(b){};this.setSpeedBump=function(){a.params.speedBumpTimeLeft=a.params.postFreq;a.flags.postOk=false;a.flags.speedBumping=true;a.speedBumpTime=setInterval(function(){a.params.speedBumpTimeLeft--;var b=a.findNode("span.speed-bump-countdown");if(b){b.html(a.params.speedBumpTimeLeft)}if(a.params.speedBumpTimeLeft==0){clearInterval(a.speedBumpTime);a.flags.postOk=true;a.flags.speedBumping=false;a.hideError()}},1000)};this.updateCommentCounts=function(b){if(b>0){a.glow.dom.get("body .dna-comment-count-number").html("("+b+")")}};this.getSpeedBumpCountdown=function(){return'<span class="speed-bump-countdown">'+a.params.speedBumpTimeLeft+"</span>"};this.addNotificationPadding=function(){if(a.limitedFormInput&&a.limitedFormInput.parent()){a.limitedFormInput.parent().css("padding-bottom","28px")}};this.removeNotificationPadding=function(){if(a.limitedFormInput&&a.limitedFormInput.parent()){a.limitedFormInput.parent().css("padding-bottom","8px")}};this.removeLastScriptNode=function(){var b=comments.glow.dom.get("script");b[b.length-1].parentNode.removeChild(b[b.length-1])};this.destroyRecaptcha=function(){return true}}}());var comments;(function(){gloader.load(["glow","1","glow.events","glow.dom","glow.widgets"],{async:true,onLoad:function(a){a.ready(function(){window.comments=new commentsModule();window.comments.initGlow(a);try{require(["istats-1"],function(c){window.comments.initLogger(c)})}catch(b){}if(typeof(window.commentsParams)=="object"){window.comments.initParams(window.commentsParams);try{delete (window.commentsParams)}catch(b){}}})}})})();