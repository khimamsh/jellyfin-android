define(["layoutManager","datetime","jQuery","mediaInfo","backdrop","scrollStyles"],function(e,a,t,i,r){function n(e){var a=e.id;if(a)return ApiClient.getItem(Dashboard.getCurrentUserId(),a);var t=e.genre;if(t)return ApiClient.getGenre(t,Dashboard.getCurrentUserId());if(t=e.musicgenre)return ApiClient.getMusicGenre(t,Dashboard.getCurrentUserId());if(t=e.gamegenre)return ApiClient.getGameGenre(t,Dashboard.getCurrentUserId());if(t=e.musicartist)return ApiClient.getArtist(t,Dashboard.getCurrentUserId());throw new Error("Invalid request")}function s(e,a){Dashboard.showLoadingMsg(),n(a).then(function(t){o(e,a,t)})}function o(i,n,s){ia=s;var o=n.context;LibraryMenu.setBackButtonVisible(!0),LibraryMenu.setMenuButtonVisible(!1),LibraryBrowser.renderName(s,t(".itemName",i),!1,o),LibraryBrowser.renderParentName(s,t(".parentName",i),o),LibraryMenu.setTitle(s.SeriesName||s.Name),Dashboard.getCurrentUser().then(function(n){window.scrollTo(0,0),l(i,s,n),m(i,s,o,n),p(i,s,o);var d=!1;"MusicArtist"!=s.Type&&"MusicAlbum"!=s.Type&&"Playlist"!=s.Type&&"BoxSet"!=s.Type&&"Audio"!=s.MediaType&&e.mobile?(d=LibraryBrowser.renderDetailPageBackdrop(i,s),r.clear()):(t("#itemBackdrop",i).addClass("noBackdrop").css("background-image","none"),r.setBackdrops([s]));var c=d&&i.classList.contains("noSecondaryNavPage");LibraryMenu.setTransparentMenu(c);var u=!1;if("Program"==s.Type){var h=new Date;h>=a.parseISO8601Date(s.StartDate,!0)&&h<a.parseISO8601Date(s.EndDate,!0)?(t(".btnPlay",i).removeClass("hide"),u=!0):t(".btnPlay",i).addClass("hide")}else MediaController.canPlay(s)?(t(".btnPlay",i).removeClass("hide"),u=!0):t(".btnPlay",i).addClass("hide");s.LocalTrailerCount&&"Full"==s.PlayAccess?t(".btnPlayTrailer",i).removeClass("hide"):t(".btnPlayTrailer",i).addClass("hide"),LibraryBrowser.enableSync(s,n)?t(".btnSync",i).removeClass("hide"):t(".btnSync",i).addClass("hide"),"Program"==s.Type&&s.TimerId?t(".btnCancelRecording",i).removeClass("hide"):t(".btnCancelRecording",i).addClass("hide"),"Program"!=s.Type||s.TimerId||s.SeriesTimerId?(t(".btnRecord",i).addClass("hide"),t(".btnFloatingRecord",i).addClass("hide")):u?(t(".btnRecord",i).removeClass("hide"),t(".btnFloatingRecord",i).addClass("hide")):(t(".btnRecord",i).addClass("hide"),t(".btnFloatingRecord",i).removeClass("hide")),!s.LocalTrailerCount&&s.RemoteTrailers.length&&"Full"==s.PlayAccess?t(".btnPlayExternalTrailer",i).removeClass("hide").attr("href",s.RemoteTrailers[0].Url):t(".btnPlayExternalTrailer",i).addClass("hide").attr("href","#");var y=(s.MediaSources||[]).filter(function(e){return"Grouping"==e.Type});if(n.Policy.IsAdministrator&&y.length?t(".splitVersionContainer",i).show():t(".splitVersionContainer",i).hide(),LibraryBrowser.getMoreCommands(s,n).length>0?t(".btnMoreCommands",i).removeClass("hide"):t(".btnMoreCommands",i).addClass("hide"),n.Policy.IsAdministrator?t(".chapterSettingsButton",i).show():t(".chapterSettingsButton",i).hide(),"Person"==s.Type&&s.PremiereDate)try{var g=a.parseISO8601Date(s.PremiereDate,!0).toDateString();t("#itemBirthday",i).show().html(Globalize.translate("BirthDateValue").replace("{0}",g))}catch(b){t("#itemBirthday",i).hide()}else t("#itemBirthday",i).hide();if("Person"==s.Type&&s.EndDate)try{var v=a.parseISO8601Date(s.EndDate,!0).toDateString();t("#itemDeathDate",i).show().html(Globalize.translate("DeathDateValue").replace("{0}",v))}catch(b){t("#itemBirthday",i).hide()}if("Person"==s.Type&&s.ProductionLocations&&s.ProductionLocations.length){var f='<a class="textlink" target="_blank" href="https://maps.google.com/maps?q='+s.ProductionLocations[0]+'">'+s.ProductionLocations[0]+"</a>";t("#itemBirthLocation",i).show().html(Globalize.translate("BirthPlaceValue").replace("{0}",f))}else t("#itemBirthLocation",i).hide()}),"Offline"==s.LocationType?t(".offlineIndicator",i).show():t(".offlineIndicator",i).hide();var d=!1;if("Virtual"==s.LocationType&&"Episode"==s.Type)try{s.PremiereDate&&(new Date).getTime()>=a.parseISO8601Date(s.PremiereDate,!0).getTime()&&(d=!0)}catch(u){}d?t(".missingIndicator",i).show():t(".missingIndicator",i).hide(),c(i,s),i.dispatchEvent(new CustomEvent("displayingitem",{detail:{item:s,context:o},bubbles:!0})),Dashboard.hideLoadingMsg()}function l(e,a,t){LibraryBrowser.renderDetailImage(e.querySelector(".detailImageContainer"),a,t.Policy.IsAdministrator&&"Photo"!=a.MediaType)}function d(e,a){LibraryBrowser.refreshDetailImageUserData(e.querySelector(".detailImageContainer"),a)}function c(e,a){t("#peopleHeader",e).html("Audio"==a.MediaType||"MusicAlbum"==a.Type||"Book"==a.MediaType||"Photo"==a.MediaType?Globalize.translate("HeaderPeople"):Globalize.translate("HeaderCastAndCrew"))}function u(e,a,t){var i=e.querySelector(".nextUpSection"),r=a.UserData||{};return"Series"==a.Type&&r.PlayedPercentage?void ApiClient.getNextUpEpisodes({SeriesId:a.Id,UserId:t.Id}).then(function(e){e.Items.length?i.classList.remove("hide"):i.classList.add("hide");var t=LibraryBrowser.getPosterViewHtml({items:e.Items,shape:"detailPage169",showTitle:!0,displayAsSpecial:"Season"==a.Type&&a.IndexNumber,overlayText:!0,lazy:!0,overlayPlayButton:!0}),r=i.querySelector(".nextUpItems");r.innerHTML=t,ImageLoader.lazyChildren(r),LibraryBrowser.createCardMenus(r)}):void i.classList.add("hide")}function m(e,a,i,r){t(".collectionItems",e).empty(),"TvChannel"==a.Type?(t("#childrenCollapsible",e).removeClass("hide"),z(e,a,r)):"Playlist"==a.Type?(t("#childrenCollapsible",e).removeClass("hide"),D(e,a,r)):"Studio"==a.Type||"Person"==a.Type||"Genre"==a.Type||"MusicGenre"==a.Type||"GameGenre"==a.Type||"MusicArtist"==a.Type?(t("#childrenCollapsible",e).removeClass("hide"),P(e,a,r)):a.IsFolder?("BoxSet"==a.Type?t("#childrenCollapsible",e).addClass("hide"):t("#childrenCollapsible",e).removeClass("hide"),A(e,a)):t("#childrenCollapsible",e).addClass("hide"),"Series"==a.Type?u(e,a,r):e.querySelector(".nextUpSection").classList.add("hide"),a.MediaSources&&a.MediaSources.length&&O(e,a);var n=a.Chapters||[];n.length&&AppInfo.enableDetailPageChapters?(t("#scenesCollapsible",e).show(),N(e,a,r,3)):t("#scenesCollapsible",e).hide(),a.SpecialFeatureCount&&0!=a.SpecialFeatureCount&&"Series"!=a.Type?(t("#specialsCollapsible",e).removeClass("hide"),Y(e,a,r,6)):t("#specialsCollapsible",e).addClass("hide"),a.People&&a.People.length?(t("#castCollapsible",e).show(),_(e,a,i,v()?null:6)):t("#castCollapsible",e).hide(),a.PartCount&&a.PartCount>1?(t("#additionalPartsCollapsible",e).removeClass("hide"),E(e,a,r)):t("#additionalPartsCollapsible",e).addClass("hide"),t("#themeSongsCollapsible",e).hide(),t("#themeVideosCollapsible",e).hide(),"MusicAlbum"==a.Type?q(e,a,r):t("#musicVideosCollapsible",e).hide(),H(e,a,r),v()?k(e,a):k(e,a,1)}function p(e,a,r,n){T(e,a,r),n||b(e,a,r),a.Taglines&&a.Taglines.length?t(".tagline",e).html(a.Taglines[0]).show():t(".tagline",e).hide();var s=e.querySelector(".topOverview"),o=e.querySelector(".bottomOverview"),l=screen.availHeight<800||screen.availWidth<600;"MusicAlbum"==a.Type||"MusicArtist"==a.Type||"Season"==a.Type&&l?(LibraryBrowser.renderOverview([o],a),s.classList.add("hide"),o.classList.remove("hide")):(LibraryBrowser.renderOverview([s],a),s.classList.remove("hide"),o.classList.add("hide")),LibraryBrowser.renderAwardSummary(t("#awardSummary",e),a),t(".itemMiscInfo",e).each(function(){i.fillPrimaryMediaInfo(this,a,{interactive:!0})}),t(".itemGenres",e).each(function(){LibraryBrowser.renderGenres(this,a,null,n)}),LibraryBrowser.renderStudios(t(".itemStudios",e),a,n),x(e,a),LibraryBrowser.renderLinks(e.querySelector(".itemExternalLinks"),a),t(".criticRatingScore",e).html((a.CriticRating||"0")+"%"),a.CriticRatingSummary?(t("#criticRatingSummary",e).show(),t(".criticRatingSummaryText",e).html(a.CriticRatingSummary)):t("#criticRatingSummary",e).hide(),M(e,a),S(e,a,n),a.Players?t("#players",e).show().html(a.Players+" Player"):t("#players",e).hide(),a.ArtistItems&&a.ArtistItems.length&&"MusicAlbum"!=a.Type?t(".artist",e).show().html(g(a.ArtistItems,r)):t(".artist",e).hide(),a.MediaSources&&a.MediaSources.length&&a.Path?t(".audioVideoMediaInfo",e).removeClass("hide"):t(".audioVideoMediaInfo",e).addClass("hide"),"Photo"==a.MediaType?(t(".photoInfo",e).removeClass("hide"),h(e,a)):t(".photoInfo",e).addClass("hide"),y(e,a)}function h(e,a){var i="",r=[];if(a.CameraMake&&r.push(W(Globalize.translate("MediaInfoCameraMake"),a.CameraMake)),a.CameraModel&&r.push(W(Globalize.translate("MediaInfoCameraModel"),a.CameraModel)),a.Altitude&&r.push(W(Globalize.translate("MediaInfoAltitude"),a.Altitude.toFixed(1))),a.Aperture&&r.push(W(Globalize.translate("MediaInfoAperture"),"F"+a.Aperture.toFixed(1))),a.ExposureTime){var n=1/a.ExposureTime;r.push(W(Globalize.translate("MediaInfoExposureTime"),"1/"+n+" s"))}a.FocalLength&&r.push(W(Globalize.translate("MediaInfoFocalLength"),a.FocalLength.toFixed(1)+" mm")),a.ImageOrientation,a.IsoSpeedRating&&r.push(W(Globalize.translate("MediaInfoIsoSpeedRating"),a.IsoSpeedRating)),a.Latitude&&r.push(W(Globalize.translate("MediaInfoLatitude"),a.Latitude.toFixed(1))),a.Longitude&&r.push(W(Globalize.translate("MediaInfoLongitude"),a.Longitude.toFixed(1))),a.ShutterSpeed&&r.push(W(Globalize.translate("MediaInfoShutterSpeed"),a.ShutterSpeed)),a.Software&&r.push(W(Globalize.translate("MediaInfoSoftware"),a.Software)),i+=r.join("<br/>"),t(".photoInfoContent",e).html(i)}function y(e){var a=t(".tabDetails",e)[0],i=a.textContent||a.innerText||"";i.trim()?t(".detailsSection",e).removeClass("hide"):t(".detailsSection",e).addClass("hide")}function g(e){for(var a=[],t=0,i=e.length;i>t;t++){var r=e[t];a.push('<a class="textlink" href="itemdetails.html?id='+r.Id+'">'+r.Name+"</a>")}return a=a.join(" / "),1==e.length?Globalize.translate("ValueArtist",a):e.length>1?Globalize.translate("ValueArtists",a):a}function b(e,a,i){if(t(".lnkSibling",e).addClass("hide"),"Episode"==a.Type||"Season"==a.Type||"Audio"==a.Type||"Photo"==a.Type){var r;r="Season"==a.Type?ApiClient.getSeasons(a.SeriesId,{userId:Dashboard.getCurrentUserId(),AdjacentTo:a.Id}):"Episode"==a.Type&&a.SeasonId?ApiClient.getEpisodes(a.SeriesId,{seasonId:a.SeasonId,userId:Dashboard.getCurrentUserId(),AdjacentTo:a.Id}):ApiClient.getItems(Dashboard.getCurrentUserId(),{AdjacentTo:a.Id,ParentId:a.ParentId,SortBy:"SortName"}),i=i||"",r.then(function(r){for(var n=!1,s=0,o=r.Items.length;o>s;s++){var l=r.Items[s];l.Id==a.Id?n=!0:n?t(".lnkNextItem",e).removeClass("hide").attr("href","itemdetails.html?id="+l.Id+"&context="+i):t(".lnkPreviousItem",e).removeClass("hide").attr("href","itemdetails.html?id="+l.Id+"&context="+i)}})}}function v(){return browserInfo.mobile&&AppInfo.enableAppLayouts&&screen.availWidth<=1e3}function f(){return v()?"overflowPortrait":"detailPagePortrait"}function I(){return v()?"overflowSquare":"detailPageSquare"}function C(){return v()?"overflowBackdrop":"detailPage169"}function T(e,a,i){if("Movie"!=a.Type&&"Trailer"!=a.Type&&"Series"!=a.Type&&"Program"!=a.Type&&"Recording"!=a.Type&&"Game"!=a.Type&&"MusicAlbum"!=a.Type&&"MusicArtist"!=a.Type&&"ChannelVideoItem"!=a.Type)return void t("#similarCollapsible",e).hide();t("#similarCollapsible",e).show();var r="MusicAlbum"==a.Type||"MusicArtist"==a.Type?I():f(),n=t(window).width(),s=t(window).height(),o={userId:Dashboard.getCurrentUserId(),limit:n>800&&"detailPagePortrait"==r?4:4,fields:"PrimaryImageAspectRatio,UserData,SyncInfo,CanDelete"};n>=800&&s>=1e3&&(o.limit*=2),v()&&(o.limit=12),ApiClient.getSimilarItems(a.Id,o).then(function(n){if(!n.Items.length)return void t("#similarCollapsible",e).hide();var s=t("#similarCollapsible",e).show();t(".similiarHeader",s).html(Globalize.translate("HeaderIfYouLikeCheckTheseOut",a.Name));var o="";o+=v()?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',o+=LibraryBrowser.getPosterViewHtml({items:n.Items,shape:r,showParentTitle:"MusicAlbum"==a.Type,centerText:!0,showTitle:"MusicAlbum"==a.Type||"Game"==a.Type||"MusicArtist"==a.Type,borderless:"Game"==a.Type,context:i,lazy:!0,showDetailsMenu:!0,coverImage:"MusicAlbum"==a.Type||"MusicArtist"==a.Type,overlayPlayButton:!0}),o+="</div>";var l=e.querySelector("#similarContent");l.innerHTML=o,ImageLoader.lazyChildren(l),LibraryBrowser.createCardMenus(l)})}function S(e,a,i){if("Series"!=a.Type)return void t("#seriesAirTime",e).hide();var r="";a.AirDays&&a.AirDays.length&&(r+=7==a.AirDays.length?"daily":a.AirDays.map(function(e){return e+"s"}).join(",")),a.AirTime&&(r+=" at "+a.AirTime),a.Studios.length&&(r+=i?" on "+a.Studios[0].Name:' on <a class="textlink" href="itemdetails.html?id='+a.Studios[0].Id+'">'+a.Studios[0].Name+"</a>"),r?(r=("Ended"==a.Status?"Aired ":"Airs ")+r,t("#seriesAirTime",e).show().html(r)):t("#seriesAirTime",e).hide()}function M(e,a){if(a.Tags&&a.Tags.length){var i="";i+="<p>"+Globalize.translate("HeaderTags")+"</p>";for(var r=0,n=a.Tags.length;n>r;r++)i+='<div class="itemTag">'+a.Tags[r]+"</div>";t(".itemTags",e).show().html(i)}else t(".itemTags",e).hide()}function w(e,a){return a=t.extend({},a),function(t,i,r){return a.StartIndex=t,a.Limit=i,a.Fields=r,ApiClient.getEpisodes(e,a)}}function L(e){return e=t.extend({},e),function(a,t,i){return e.StartIndex=a,e.Limit=t,e.Fields=i,ApiClient.getItems(Dashboard.getCurrentUserId(),e)}}function A(e,a){ra=null;var i="ItemCounts,AudioInfo,PrimaryImageAspectRatio,SyncInfo,CanDelete",r={ParentId:a.Id,Fields:i};"BoxSet"!==a.Type&&(r.SortBy="SortName");var n,s=Dashboard.getCurrentUserId();"Series"==a.Type?n=ApiClient.getSeasons(a.Id,{userId:s,Fields:i}):"Season"==a.Type?(n=ApiClient.getEpisodes(a.SeriesId,{seasonId:a.Id,userId:s,Fields:i}),ra=w(a.SeriesId,{seasonId:a.Id,userId:s,Fields:i})):"MusicAlbum"==a.Type&&(ra=L(r)),n=n||ApiClient.getItems(Dashboard.getCurrentUserId(),r),n.then(function(t){var i="",r=!1;"MusicAlbum"==a.Type?i=LibraryBrowser.getListViewHtml({items:t.Items,smallIcon:!0,showIndex:!0,index:"disc",showIndexNumber:!0,playFromHere:!0,defaultAction:"playallfromhere",lazy:!0}):"Series"==a.Type?(r=v(),i=LibraryBrowser.getPosterViewHtml({items:t.Items,shape:f(),showTitle:!0,centerText:!0,lazy:!0,overlayPlayButton:!0})):"Season"==a.Type?i=LibraryBrowser.getPosterViewHtml({items:t.Items,shape:"detailPage169",showTitle:!0,displayAsSpecial:"Season"==a.Type&&a.IndexNumber,playFromHere:!0,overlayText:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:AppInfo.enableAppLayouts}):"GameSystem"==a.Type&&(i=LibraryBrowser.getPosterViewHtml({items:t.Items,shape:"auto",showTitle:!0,centerText:!0,lazy:!0,showDetailsMenu:!0}));var n=e.querySelector(".childrenItemsContainer");if(n.innerHTML=i,ImageLoader.lazyChildren(n),r?n.classList.add("hiddenScrollX"):n.classList.remove("hiddenScrollX"),LibraryBrowser.createCardMenus(n),"BoxSet"==a.Type){var s=[{name:Globalize.translate("HeaderMovies"),type:"Movie"},{name:Globalize.translate("HeaderSeries"),type:"Series"},{name:Globalize.translate("HeaderAlbums"),type:"MusicAlbum"},{name:Globalize.translate("HeaderGames"),type:"Game"},{name:Globalize.translate("HeaderBooks"),type:"Book"}];G(e,a,s,t.Items)}}),e.querySelector("#childrenTitle").innerHTML=Globalize.translate("Season"==a.Type?"HeaderEpisodes":"Series"==a.Type?"HeaderSeasons":"MusicAlbum"==a.Type?"HeaderTracks":"GameSystem"==a.Type?"HeaderGames":"HeaderItems"),"MusicAlbum"==a.Type?t(".childrenSectionHeader",e).hide():t(".childrenSectionHeader",e).show()}function P(e,a){require("scripts/itembynamedetailpage".split(","),function(){window.ItemsByName.renderItems(e,a)})}function D(e,a){require("scripts/playlistedit".split(","),function(){PlaylistViewer.render(e,a)})}function z(e,a){require("scripts/livetvcomponents,scripts/livetvchannel,livetvcss".split(","),function(){LiveTvChannelPage.renderPrograms(e,a.Id)})}function G(e,a,t,i){e.querySelector(".collectionItems").innerHTML="";var r,n;for(r=0,n=t.length;n>r;r++){var s=t[r],o=i.filter(function(e){return e.Type==s.type});o.length&&B(e,a,s,o)}var l={name:Globalize.translate("HeaderOtherItems")},d=i.filter(function(e){return!t.filter(function(a){return a.type==e.Type}).length});d.length&&B(e,a,l,d),i.length||B(e,a,{name:Globalize.translate("HeaderItems")},i);var c=e.querySelectorAll(".collectionItems .itemsContainer");for(r=0,n=c.length;n>r;r++)LibraryBrowser.createCardMenus(c[r])}function B(e,a,t,i){var r="";r+='<div class="detailSection">',r+='<div style="display:flex;align-items:center;">',r+="<h1>",r+="<span>"+t.name+"</span>",r+="</h1>",r+='<button class="btnAddToCollection" type="button" is="paper-icon-button-light" style="margin-left:1em;"><iron-icon icon="add"></iron-icon></button>',r+="</div>",r+='<div class="detailSectionContent itemsContainer">';var n="MusicAlbum"==t.type?"detailPageSquare":"detailPagePortrait";r+=LibraryBrowser.getPosterViewHtml({items:i,shape:n,showTitle:!0,centerText:!0,lazy:!0,showDetailsMenu:!0,overlayMoreButton:!0,showAddToCollection:!1,showRemoveFromCollection:!0}),r+="</div>",r+="</div>";var s=e.querySelector(".collectionItems");s.insertAdjacentHTML("beforeend",r),ImageLoader.lazyChildren(s),s.querySelector(".btnAddToCollection").addEventListener("click",function(){require(["alert"],function(e){e({text:Globalize.translate("AddItemToCollectionHelp"),html:Globalize.translate("AddItemToCollectionHelp")+'<br/><br/><a target="_blank" href="https://github.com/MediaBrowser/Wiki/wiki/Collections">'+Globalize.translate("ButtonLearnMore")+"</a>"})})})}function R(e,a,t){Dashboard.showLoadingMsg();var i=ApiClient.getUrl("Collections/"+a.Id+"/Items",{Ids:t.join(",")});ApiClient.ajax({type:"DELETE",url:i}).then(function(){A(e,a),Dashboard.hideLoadingMsg()})}function x(e,a){t(".userDataIcons",e).html(LibraryBrowser.getUserDataIconsHtml(a,!0,"icon-button"))}function k(e,a,i){if("Movie"!=a.Type&&"Trailer"!=a.Type&&"MusicVideo"!=a.Type)return void t("#criticReviewsCollapsible",e).hide();var r={};i&&(r.limit=i),ApiClient.getCriticReviews(a.Id,r).then(function(r){r.TotalRecordCount||a.CriticRatingSummary||a.AwardSummary?(t("#criticReviewsCollapsible",e).show(),F(e,r,i)):t("#criticReviewsCollapsible",e).hide()})}function F(e,t,i){for(var r="",n=t.Items,s=0,o=n.length;o>s;s++){var l=n[s];r+='<div class="paperList criticReviewPaperList">',r+='<paper-icon-item style="padding-top:.5em;padding-bottom:.5em;">',null!=l.Score||null!=l.Likes&&(r+=l.Likes?"<paper-fab mini style=\"background-color:transparent;background-image:url('css/images/fresh.png');background-repeat:no-repeat;background-position:center center;background-size: cover;\" item-icon></paper-fab>":"<paper-fab mini style=\"background-color:transparent;background-image:url('css/images/rotten.png');background-repeat:no-repeat;background-position:center center;background-size: cover;\" item-icon></paper-fab>"),r+="<paper-item-body three-line>",r+='<div style="white-space:normal;">'+l.Caption+"</div>";var d=[];if(l.ReviewerName&&d.push(l.ReviewerName),l.Publisher&&d.push(l.Publisher),r+="<div secondary>"+d.join(", ")+".",l.Date)try{var c=a.parseISO8601Date(l.Date,!0).toLocaleDateString();r+='<span class="reviewDate">'+c+"</span>"}catch(u){}r+="</div>",l.Url&&(r+='<div secondary><a class="textlink" href="'+l.Url+'" target="_blank">'+Globalize.translate("ButtonFullReview")+"</a></div>"),r+="</paper-item-body>",r+="</paper-icon-item>",r+="</div>"}i&&t.TotalRecordCount>i&&(r+='<p style="margin: 0;"><button is="emby-button" type="button" class="raised more moreCriticReviews">'+Globalize.translate("ButtonMore")+"</button></p>");var m=e.querySelector("#criticReviewsContent");m.innerHTML=r,v()?m.classList.add("hiddenScrollX"):m.classList.remove("hiddenScrollX")}function H(e,a){ApiClient.getThemeMedia(Dashboard.getCurrentUserId(),a.Id,!0).then(function(t){var i=t.ThemeSongsResult.OwnerId==a.Id?t.ThemeSongsResult.Items:[],r=t.ThemeVideosResult.OwnerId==a.Id?t.ThemeVideosResult.Items:[];V(e,i),U(e,r),e.dispatchEvent(new CustomEvent("thememediadownload",{detail:{themeMediaResult:t},bubbles:!0}))})}function V(e,a){if(a.length){t("#themeSongsCollapsible",e).show();var i=LibraryBrowser.getListViewHtml({items:a,smallIcon:!0});e.querySelector("#themeSongsContent").innerHTML=i}else t("#themeSongsCollapsible",e).hide()}function U(e,a,i){a.length?(t("#themeVideosCollapsible",e).show(),t("#themeVideosContent",e).html(X(a,i)).lazyChildren()):t("#themeVideosCollapsible",e).hide()}function q(e,a,i){ApiClient.getItems(i.Id,{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"MusicVideo",Recursive:!0,Fields:"DateCreated,SyncInfo,CanDelete",Albums:a.Name}).then(function(a){a.Items.length?(t("#musicVideosCollapsible",e).show(),t("#musicVideosContent",e).html(X(a.Items,i)).lazyChildren()):t("#musicVideosCollapsible",e).hide()})}function E(e,a,i){ApiClient.getAdditionalVideoParts(i.Id,a.Id).then(function(a){a.Items.length?(t("#additionalPartsCollapsible",e).show(),t("#additionalPartsContent",e).html(X(a.Items,i)).lazyChildren()):t("#additionalPartsCollapsible",e).hide()})}function N(e,t,i,r,n){var s="",o=t.Chapters||[],l=LibraryBrowser.getPosterViewInfo().backdropWidth;v()?(s+='<div class="hiddenScrollX itemsContainer">',r=null):s+='<div class="itemsContainer">';for(var d=0,c=o.length;c>d&&!(r&&d>=r);d++){var u=o[d],m=u.Name||"Chapter "+d,p="Full"!=t.PlayAccess||n?"":' onclick="ItemDetailPage.play('+u.StartPositionTicks+');"';s+='<a class="card '+C()+'Card" href="#"'+p+">",s+='<div class="cardBox">',s+='<div class="cardScalable">';var h;h=u.ImageTag?ApiClient.getScaledImageUrl(t.Id,{maxWidth:l,tag:u.ImageTag,type:"Chapter",index:d}):"css/images/items/list/chapter.png",s+='<div class="cardPadder"></div>',s+='<div class="cardContent">',s+='<div class="cardImage lazy" data-src="'+h+'"></div>',s+='<div class="cardFooter">',s+='<div class="cardText">'+m+"</div>",s+='<div class="cardText">',s+=a.getDisplayRunningTime(u.StartPositionTicks),s+="</div>",s+="</div>",s+="</div>",s+="</div>",s+="</div>",s+="</a>"}s+="</div>",r&&o.length>r&&(s+='<p style="margin: 0;"><button is="emby-button" type="button" class="raised more moreScenes">'+Globalize.translate("ButtonMore")+"</button></p>");var y=e.querySelector("#scenesContent");y.innerHTML=s,ImageLoader.lazyChildren(y)}function O(e,a){var t=a.MediaSources.map(function(e){return j(a,e)}).join('<div style="border-top:1px solid #444;margin: 1em 0;"></div>');a.MediaSources.length>1&&(t="<br/>"+t);var i=e.querySelector("#mediaInfoContent");i.innerHTML=t}function j(e,a){var t="";a.Name&&e.MediaSources.length>1&&(t+='<div><span class="mediaInfoAttribute">'+a.Name+"</span></div><br/>");for(var i=0,r=a.MediaStreams.length;r>i;i++){var n=a.MediaStreams[i];if("Data"!=n.Type){t+='<div class="mediaInfoStream">';var s=Globalize.translate("MediaInfoStreamType"+n.Type);t+='<div class="mediaInfoStreamType">'+s+"</div>";var o=[];n.Language&&"Video"!=n.Type&&o.push(W(Globalize.translate("MediaInfoLanguage"),n.Language)),n.Codec&&o.push(W(Globalize.translate("MediaInfoCodec"),n.Codec.toUpperCase())),n.CodecTag&&o.push(W(Globalize.translate("MediaInfoCodecTag"),n.CodecTag)),null!=n.IsAVC&&o.push(W("AVC",n.IsAVC?"Yes":"No")),n.Profile&&o.push(W(Globalize.translate("MediaInfoProfile"),n.Profile)),n.Level&&o.push(W(Globalize.translate("MediaInfoLevel"),n.Level)),(n.Width||n.Height)&&o.push(W(Globalize.translate("MediaInfoResolution"),n.Width+"x"+n.Height)),n.AspectRatio&&"mjpeg"!=n.Codec&&o.push(W(Globalize.translate("MediaInfoAspectRatio"),n.AspectRatio)),"Video"==n.Type&&(null!=n.IsAnamorphic&&o.push(W(Globalize.translate("MediaInfoAnamorphic"),n.IsAnamorphic?"Yes":"No")),o.push(W(Globalize.translate("MediaInfoInterlaced"),n.IsInterlaced?"Yes":"No"))),(n.AverageFrameRate||n.RealFrameRate)&&o.push(W(Globalize.translate("MediaInfoFramerate"),n.AverageFrameRate||n.RealFrameRate)),n.ChannelLayout&&o.push(W(Globalize.translate("MediaInfoLayout"),n.ChannelLayout)),n.Channels&&o.push(W(Globalize.translate("MediaInfoChannels"),n.Channels+" ch")),n.BitRate&&"mjpeg"!=n.Codec&&o.push(W(Globalize.translate("MediaInfoBitrate"),parseInt(n.BitRate/1024)+" kbps")),n.SampleRate&&o.push(W(Globalize.translate("MediaInfoSampleRate"),n.SampleRate+" khz")),n.BitDepth&&o.push(W(Globalize.translate("MediaInfoBitDepth"),n.BitDepth+" bit")),n.PixelFormat&&o.push(W(Globalize.translate("MediaInfoPixelFormat"),n.PixelFormat)),n.RefFrames&&o.push(W(Globalize.translate("MediaInfoRefFrames"),n.RefFrames)),n.NalLengthSize&&o.push(W("NAL",n.NalLengthSize)),"Video"!=n.Type&&o.push(W(Globalize.translate("MediaInfoDefault"),n.IsDefault?"Yes":"No")),"Subtitle"==n.Type&&(o.push(W(Globalize.translate("MediaInfoForced"),n.IsForced?"Yes":"No")),o.push(W(Globalize.translate("MediaInfoExternal"),n.IsExternal?"Yes":"No"))),"Video"==n.Type&&a.Timestamp&&o.push(W(Globalize.translate("MediaInfoTimestamp"),a.Timestamp)),n.DisplayTitle&&o.push(W("Title",n.DisplayTitle)),t+=o.join("<br/>"),t+="</div>"}}if(a.Container&&(t+='<div><span class="mediaInfoLabel">'+Globalize.translate("MediaInfoContainer")+'</span><span class="mediaInfoAttribute">'+a.Container+"</span></div>"),a.Formats&&a.Formats.length,a.Path&&"Http"!=a.Protocol&&(t+='<div style="max-width:600px;overflow:hidden;"><span class="mediaInfoLabel">'+Globalize.translate("MediaInfoPath")+'</span><span class="mediaInfoAttribute">'+a.Path+"</span></div>"),a.Size){var l=(a.Size/1048576).toFixed(0);t+='<div><span class="mediaInfoLabel">'+Globalize.translate("MediaInfoSize")+'</span><span class="mediaInfoAttribute">'+l+" MB</span></div>"}return t}function W(e,a){return'<span class="mediaInfoLabel">'+e+'</span><span class="mediaInfoAttribute">'+a+"</span>"}function X(e,t,i,r){for(var n="",s=LibraryBrowser.getPosterViewInfo().backdropWidth,o=0,l=e.length;l>o&&!(i&&o>=i);o++){var d=e[o],c="card detailPage169Card",u="itemdetails.html?id="+d.Id,m="Full"==d.PlayAccess?" onclick=\"MediaController.play('"+d.Id+"'); return false;\"":"";n+='<a class="'+c+'" href="'+u+'"'+m+">",n+='<div class="cardBox">',n+='<div class="cardScalable">';var p,h=d.ImageTags||{};p=h.Primary?ApiClient.getScaledImageUrl(d.Id,{maxWidth:s,tag:h.Primary,type:"primary"}):"css/images/items/detail/video.png",n+='<div class="cardPadder"></div>',n+='<div class="cardContent">',n+='<div class="cardImage lazy" data-src="'+p+'"></div>',n+='<div class="cardFooter">',n+='<div class="cardText">'+d.Name+"</div>",n+='<div class="cardText">',n+=""!=d.RunTimeTicks?a.getDisplayRunningTime(d.RunTimeTicks):"&nbsp;",n+="</div>",n+="</div>",n+="</div>",n+="</div>",n+="</div>",n+="</a>"}return i&&e.length>i&&(n+='<p style="margin: 0;padding-left:5px;"><button is="emby-button" type="button" class="raised more '+r+'">'+Globalize.translate("ButtonMore")+"</button></p>"),n}function Y(e,a,t,i){ApiClient.getSpecialFeatures(t.Id,a.Id).then(function(a){var r=e.querySelector("#specialsContent");r.innerHTML=X(a,t,i,"moreSpecials"),ImageLoader.lazyChildren(r)})}function _(e,a,t,i,r){if(v())return void K(e,a,t,r);for(var n="",s=a.People||[],o=0,l=s.length;l>o&&!(i&&o>=i);o++){var d=s[o],c=r?"#":"itemdetails.html?id="+d.Id;n+='<a class="tileItem smallPosterTileItem" href="'+c+'">';var u,m=!0;d.PrimaryImageTag?u=ApiClient.getScaledImageUrl(d.Id,{maxWidth:100,tag:d.PrimaryImageTag,type:"primary",minScale:2}):(u="css/images/items/list/person.png",m=!1),n+=m?'<div class="tileImage lazy" data-src="'+u+'"></div>':'<div class="tileImage" style="background-image:url(\''+u+"');\"></div>",n+='<div class="tileContent">',n+="<p>"+d.Name+"</p>";var p=d.Role?Globalize.translate("ValueAsRole",d.Role):d.Type;"GuestStar"==p&&(p=Globalize.translate("ValueGuestStar")),p=p||"";var h=40;p.length>h&&(p=p.substring(0,h-3)+"..."),n+="<p>"+p+"</p>",n+="</div>",n+="</a>"}i&&s.length>i&&(n+='<p style="margin: 0;padding-left:5px;"><button is="emby-button" type="button" class="raised more morePeople">'+Globalize.translate("ButtonMore")+"</button></p>");var y=e.querySelector("#castContent");y.innerHTML=n,ImageLoader.lazyChildren(y)}function K(e,a,t,i){var r="";r+=v()?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">';var n=a.People||[];n=n.filter(function(e){return e.PrimaryImageTag}),n.length||(n=a.People||[]);for(var s=0,o=n.length;o>s;s++){var l=n[s],d=i?"#":"itemdetails.html?id="+l.Id;r+='<div class="card '+f()+'Card">',r+='<div class="cardBox">',r+='<div class="cardScalable">';var c,u=!0;l.PrimaryImageTag?c=ApiClient.getScaledImageUrl(l.Id,{maxWidth:100,tag:l.PrimaryImageTag,type:"primary",minScale:2}):(c="css/images/items/list/person.png",u=!1),r+='<div class="cardPadder"></div>',r+='<a class="cardContent" href="'+d+'">',r+=u?'<div class="cardImage coveredCardImage lazy" data-src="'+c+'"></div>':'<div class="cardImage coveredCardImage" style="background-image:url(\''+c+"');\"></div>",r+="</div>",r+="</a>",r+="</div>",r+='<div class="cardFooter outerCardFooter">',r+='<div class="cardText">'+l.Name+"</div>",r+='<div class="cardText">';var m=l.Role?Globalize.translate("ValueAsRole",l.Role):l.Type;"GuestStar"==m&&(m=Globalize.translate("ValueGuestStar")),m=m||"";var p=40;m.length>p&&(m=m.substring(0,p-3)+"..."),r+=m,r+="</div>",r+="</div>",r+="</div>"}r+="</div>";var h=e.querySelector("#castContent");h.innerHTML=r,ImageLoader.lazyChildren(h)}function Q(e){MediaController.play({items:[ia],startPositionTicks:e})}function J(e,a){require(["confirm"],function(t){t("Are you sure you wish to split the media sources into separate items?","Split Media Apart").then(function(){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("Videos/"+a.id+"/AlternateSources")}).then(function(){Dashboard.hideLoadingMsg(),s(e,a)})})})}function Z(){ApiClient.getLocalTrailers(Dashboard.getCurrentUserId(),ia.Id).then(function(e){MediaController.play({items:e})})}function $(e,a){ia&&ia.Id==a&&("Recording"==ia.Type?LibraryBrowser.showTab("livetv.html",3):Dashboard.navigate("home.html"))}function ea(e){if("Program"==ia.Type)return void ApiClient.getLiveTvChannel(ia.ChannelId,Dashboard.getCurrentUserId()).then(function(e){LibraryBrowser.showPlayMenu(null,e.Id,e.Type,!1,e.MediaType,(e.UserData||{}).PlaybackPositionTicks)});var a=ia.UserData||{},t=ia.MediaType;("MusicArtist"==ia.Type||"MusicAlbum"==ia.Type)&&(t="Audio"),LibraryBrowser.showPlayMenu(e,ia.Id,ia.Type,ia.IsFolder,t,a.PlaybackPositionTicks)}function aa(e,a,t){require(["confirm"],function(i){i(Globalize.translate("MessageConfirmRecordingCancellation"),Globalize.translate("HeaderConfirmRecordingCancellation")).then(function(){Dashboard.showLoadingMsg(),ApiClient.cancelLiveTvTimer(t).then(function(){require(["toast"],function(e){e(Globalize.translate("MessageRecordingCancelled"))}),s(e,a)})})})}function ta(){var e=this;e.play=Q,e.setInitialCollapsibleState=m,e.renderDetails=p,e.renderCriticReviews=k,e.renderCast=_,e.renderScenes=N,e.renderMediaSources=O}var ia;t.fn.lazyChildren=function(){for(var e=0,a=this.length;a>e;e++)ImageLoader.lazyChildren(this[e]);return this};var ra=null;return window.ItemDetailPage=new ta,function(e,a){function i(a,t){var i=t;if("UserDataChanged"===i.MessageType&&ia&&i.Data.UserId==Dashboard.getCurrentUserId()){var r=ia.UserData.Key,n=i.Data.UserDataList.filter(function(e){return e.Key==r})[0];n&&(ia.UserData=n,Dashboard.getCurrentUser().then(function(a){d(e,ia,a)}))}}t(".btnPlay",e).on("click",function(){ea(this)}),t(".btnPlayTrailer",e).on("click",function(){Z(e)}),t(".btnSplitVersions",e).on("click",function(){J(e,a)}),t(".btnSync",e).on("click",function(){require(["syncDialog"],function(e){e.showMenu({items:[ia]})})}),t(".btnRecord,.btnFloatingRecord",e).on("click",function(){var t=a.id;Dashboard.showLoadingMsg(),require(["recordingCreator"],function(i){i.show(t,ia.ServerId).then(function(){s(e,a)})})}),t(".btnCancelRecording",e).on("click",function(){aa(e,a,ia.TimerId)}),t(".btnMoreCommands",e).on("click",function(){var e=this;Dashboard.getCurrentUser().then(function(a){LibraryBrowser.showMoreCommands(e,ia.Id,ia.Type,LibraryBrowser.getMoreCommands(ia,a))})}),t(".childrenItemsContainer",e).on("playallfromhere",function(e,a){LibraryBrowser.playAllFromHere(ra,a)}).on("queueallfromhere",function(e,a){LibraryBrowser.queueAllFromHere(ra,a)}),t(e).on("click",".moreScenes",function(){Dashboard.getCurrentUser().then(function(a){N(e,ia,a)})}).on("click",".morePeople",function(){_(e,ia,a.context)
}).on("click",".moreSpecials",function(){Dashboard.getCurrentUser().then(function(a){Y(e,ia,a)})}).on("click",".moreCriticReviews",function(){k(e,ia)}),e.querySelector(".collectionItems").addEventListener("removefromcollection",function(a){var t=a.detail.itemId;R(e,ia,[t])}),e.addEventListener("viewbeforeshow",function(){var e=this;s(e,a),Events.on(ApiClient,"websocketmessage",i),Events.on(LibraryBrowser,"itemdeleting",$)}),e.addEventListener("viewbeforehide",function(){Events.off(LibraryBrowser,"itemdeleting",$),ia=null,Events.off(ApiClient,"websocketmessage",i),LibraryMenu.setTransparentMenu(!1)})}});