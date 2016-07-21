define(["dialogHelper","loading","connectionManager","globalize","actionsheet","paper-checkbox","emby-input","paper-icon-button-light","emby-button","listViewStyle","material-icons"],function(e,n,t,i,r){return function(a){function o(e,n){for(;!e.classList||!e.classList.contains(n);)if(e=e.parentNode,!e)return null;return e}function d(e,i,r){n.show();var d=a.providerId,s=t.getApiClient(a.serverId);s.ajax({type:"POST",url:ApiClient.getUrl("LiveTv/ChannelMappings"),data:{providerId:d,tunerChannelNumber:i,providerChannelNumber:r},dataType:"json"}).then(function(t){var i=o(e,"listItem");e.setAttribute("data-providernumber",t.ProviderChannelNumber),i.querySelector(".secondary").innerHTML=c(t,p.ProviderName),n.hide()})}function s(e){var n=o(e.target,"btnMap");if(n){var t=n.getAttribute("data-number"),i=n.getAttribute("data-providernumber"),a=p.ProviderChannels.map(function(e){return{name:e.Name,id:e.Id,selected:e.Id.toLowerCase()==i.toLowerCase()}});r.show({positionTo:n,items:a}).then(function(e){d(n,t,e)})}}function l(e,n){var i=t.getApiClient(e);return i.getJSON(i.getUrl("LiveTv/ChannelMappingOptions",{providerId:n}))}function c(e,n){return(e.ProviderChannelNumber||"")+" "+(e.ProviderChannelName||"")+" - "+n}function u(e,n){var t="";return t+='<div class="listItem">',t+='<i class="md-icon listItemIcon">dvr</i>',t+='<div class="listItemBody two-line">',t+="<h3>",t+=e.Name,t+="</h3>",t+='<div class="secondary">',(e.ProviderChannelNumber||e.ProviderChannelName)&&(t+=c(e,n)),t+="</div>",t+="</div>",t+='<button class="btnMap autoSize" is="paper-icon-button-light" type="button" data-number="'+e.Number+'" data-providernumber="'+e.ProviderChannelNumber+'"><i class="md-icon">mode_edit</i></button>',t+="</div>"}function v(){var e="";return e+='<div class="dialogContent">',e+='<div class="dialogContentInner centeredContent">',e+='<form style="margin:auto;">',e+="<h1>"+i.translate("HeaderChannels")+"</h1>",e+='<div class="channels paperList">',e+="</div>",e+="</form>",e+="</div>",e+="</div>"}function m(e,n){l(n.serverId,n.providerId).then(function(n){p=n;var t=e.querySelector(".channels");t.innerHTML=n.TunerChannels.map(function(e){return u(e,n.ProviderName)}).join(""),t.addEventListener("click",s)})}var p,b=this;b.show=function(){var n={removeOnClose:!0};n.size="small";var t=e.createDialog(n);t.classList.add("formDialog"),t.classList.add("ui-body-a"),t.classList.add("background-theme-a");var r="",o=i.translate("MapChannels");return r+='<div class="dialogHeader" style="margin:0 0 2em;">',r+='<button is="paper-icon-button-light" class="btnCancel autoSize" tabindex="-1"><i class="md-icon">&#xE5C4;</i></button>',r+='<div class="dialogHeaderTitle">',r+=o,r+="</div>",r+="</div>",r+=v(),t.innerHTML=r,document.body.appendChild(t),m(t,a),t.querySelector(".btnCancel").addEventListener("click",function(){e.close(t)}),new Promise(function(n){t.addEventListener("close",n),e.open(t)})}}});