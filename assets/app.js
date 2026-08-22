(function(){
"use strict";
var RTDB="https://kurama-mods-pro-default-rtdb.firebaseio.com";
var API_KEY="AIzaSyDcPbyCSJGwY3-WrICK2swoqRArbsihMEA";
var REDUCED=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function el(id){return document.getElementById(id)}
function esc(){throw new Error("use textContent")}

var TERMS={
deploy:[
["t-plus","[+] Initializing Kuruma Mods Executive Suite..."],
["t-plus","[+] Verifying Superuser Permissions: GRANTED (UID 0)"],
["t-plus","[+] Hooking target PID 14892 -> com.dts.freefireth"],
["t-dim","[+] Locating libil2cpp.so base... [0x7f83a12000]"],
["t-plus","[+] Applying aim vector hook offset [0x1A2F4B0] -> PATCHED"],
["t-plus","[+] Applying ESP glDepthFunc override -> ACTIVE"],
["t-ok","[+] Log nullifier initialized. Zero tracking logs."],
["t-ok","[+] Rendering overlay on layer 2003 (TYPE_APPLICATION_OVERLAY)"],
["t-warn","[!] EXECUTION STABLE. ENTERING WAR THEATER."]
],
keycheck:[
["t-dim","// login: MainActivity -> checkLicenseInFirebase(key)"],
["t-plus","[GET] /license_keys/<KEY>.json"],
["t-dim","      ?key=AIzaSyDcPbyCSJGwY3-WrICK2swoqRArbsihMEA"],
["t-dim","      host=kurama-mods-pro-default-rtdb.firebaseio.com"],
["t-ok","[200] null                        -> INVALID"],
["t-ok","[200] {\"blocked\":true}            -> BLOCKED"],
["t-ok","[200] {\"expiresAt\":1750000000000} -> EXPIRED (past)"],
["t-plus","[200] {\"blocked\":false,...}       -> OK  -> loadMainUI()"],
["t-dim","// then every 30s: GET /project_status -> kill-switch"],
["t-warn","[!] timeouts: 5000ms connect / 5000ms read"]
]};

var curTermBody=null,curTimer=null;
function stopType(){if(curTimer){clearInterval(curTimer);curTimer=null}}
function typeInto(body,lines){
  stopType();body.innerHTML="";
  if(REDUCED){lines.forEach(function(l){var d=document.createElement("div");d.className="ln "+l[0];d.textContent=l[1];body.appendChild(d)});return}
  var li=0,ci=0,cur=document.createElement("span");cur.className="cursor";var line=null;
  curTimer=setInterval(function(){
    if(li>=lines.length){clearInterval(curTimer);curTimer=null;return}
    if(!line){line=document.createElement("div");line.className="ln "+lines[li][0];body.appendChild(line)}
    var txt=lines[li][1];line.textContent=txt.slice(0,++ci);line.appendChild(cur);
    if(ci>=txt.length){li++;ci=0;line=null}
  },18);
}
function initTerms(){
  document.querySelectorAll("[data-term-body]").forEach(function(body){
    var name=body.getAttribute("data-term-body");
    curTermBody=body;typeInto(body,TERMS[name]||[]);
    var term=body.closest(".term");if(!term)return;
    term.addEventListener("click",function(e){
      if(e.target.closest(".term-tabs button"))return;
      typeInto(body,TERMS[name]||[]);
    });
    term.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();typeInto(body,TERMS[name]||[])}});
  });
  document.querySelectorAll(".term-tabs button").forEach(function(btn){
    btn.addEventListener("click",function(){
      var wrap=btn.closest(".term").querySelector("[data-term-body]");
      document.querySelectorAll(".term-tabs button").forEach(function(b){b.classList.toggle("on",b===btn)});
      typeInto(wrap,TERMS[btn.getAttribute("data-term-tab")]||[]);
    });
  });
}

function timeAgo(ts){
  var s=Math.max(1,Math.floor((Date.now()-ts)/1000));
  if(s<60)return s+"s ago";
  var m=Math.floor(s/60);if(m<60)return m+"m ago";
  var h=Math.floor(m/60);if(h<24)return h+"h ago";
  return Math.floor(h/24)+"d ago";
}

function fb(path,opts){return fetch(RTDB+path,opts).then(function(r){return r.text().then(function(t){if(!r.ok)throw new Error(t||r.status);return t})})}

function renderAnnouncement(item){
  return {txt:item.msg||item.text||"",when:item.ts};
}
function loadAnnouncements(){
  var bar=el("announceBar");if(!bar)return;
  var box=bar.querySelector(".ann-in");box.textContent="LOADING //";
  fb("/public/announcements.json?orderBy=%22ts%22&limitToLast=5").then(function(t){
    box.innerHTML="";
    var data=JSON.parse(t);
    if(!data||!Object.keys(data).length){box.textContent="NO ANNOUNCEMENTS YET";return}
    var arr=Object.values(data).sort(function(a,b){return (b.ts||0)-(a.ts||0)});
    var tag=document.createElement("span");tag.className="ann-tag";tag.textContent="LIVE";
    var txt=document.createElement("div");txt.className="ann-txt";txt.textContent=arr[0].msg||arr[0].text||"";
    var when=document.createElement("span");when.className="ann-time";
    when.title=new Date(arr[0].ts).toLocaleString();
    when.textContent=timeAgo(arr[0].ts);
    box.appendChild(tag);box.appendChild(txt);box.appendChild(when);
    var list=el("annListFull");
    if(list){
      list.innerHTML="";
      arr.forEach(function(a){
        var c=document.createElement("article");c.className="pf ann-item";
        var p=document.createElement("p");p.className="pf-text";p.textContent=a.msg||a.text||"";
        var top=document.createElement("div");top.className="pf-top";
        var b=document.createElement("b");b.textContent=a.title||"STARGAZE";
        var t2=document.createElement("span");t2.textContent=timeAgo(a.ts||0);
        top.appendChild(b);top.appendChild(t2);c.appendChild(top);c.appendChild(p);
        list.appendChild(c);
      });
    }
  }).catch(function(err){
    box.innerHTML="";var s=document.createElement("span");s.className="ann-txt";
    s.textContent=/denied|401|403/i.test(err.message)?"FEED LOCKED — owner must enable public reads on /public/announcements":"FEED OFFLINE — retry shortly";
    box.appendChild(s);
  });
}
window.__refreshAnnouncements=loadAnnouncements;

var YT_RE=/(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,15})/i;
var IMG_RE=(/\.(png|jpe?g|gif|webp)(\?\S*)?$/i),IMGUR_RE=/^https?:\/\/(\w+\.)?imgur\.com\/[\w-]+/i;
function mediaNode(url){
  var a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener noreferrer nofollow";
  var m=url.match(YT_RE);
  if(m){var f=document.createElement("iframe");f.src="https://www.youtube-nocookie.com/embed/"+m[2];
    f.loading="lazy";f.allowFullscreen=true;f.title="user video";a.appendChild(f);return a}
  if(/streamable\.com\//.test(url)){var f2=document.createElement("iframe");f2.src=url.replace("/streamable.com/","/streamable.com/e/");
    f2.loading="lazy";f2.allowFullscreen=true;a.appendChild(f2);return a}
  if(IMG_RE.test(url)||IMGUR_RE.test(url)){var img=document.createElement("img");img.src=url;img.alt="user proof image";img.loading="lazy";a.appendChild(img);return a}
  a.textContent="media link";return a;
}
function card(p){
  var c=document.createElement("article");c.className="pf";
  var top=document.createElement("div");top.className="pf-top";
  var b=document.createElement("b");b.textContent=(p.name||"anon").slice(0,24);
  var meta=document.createElement("span");meta.textContent=((p.device||"").slice(0,18)+" · "+timeAgo(p.ts||Date.now())).trim();
  top.appendChild(b);top.appendChild(meta);
  var tx=document.createElement("p");tx.className="pf-text";tx.textContent=(p.text||"").slice(0,280);
  c.appendChild(top);c.appendChild(tx);
  var u=(p.media||"").trim();
  if(/^https?:\/\//i.test(u)&&u.length<=600){var md=document.createElement("div");md.className="pf-media";md.appendChild(mediaNode(u));c.appendChild(md)}
  return c;
}
function feedState(msg){var d=document.createElement("div");d.className="state";d.textContent=msg;return d}
function loadProofs(){
  var feed=el("proofFeed");if(!feed)return;
  fb("/public/proofs.json").then(function(t){
    var data=t==="null"?null:JSON.parse(t);
    feed.innerHTML="";
    if(!data){feed.appendChild(feedState("NO PROOFS YET — the first one sets the bar."));return}
    Object.values(data).sort(function(a,b){return (b.ts||0)-(a.ts||0)}).slice(0,48)
      .forEach(function(p){feed.appendChild(card(p))});
  }).catch(function(err){
    feed.innerHTML="";
    feed.appendChild(feedState(/denied|401|403/i.test(err.message)
      ?"WALL LOCKED — database rules don't allow public reads on /public/proofs yet. Owner: apply the rules in the setup box below."
      :"WALL OFFLINE — network hiccup. Hit refresh."));
  });
  var stamp=el("feedStamp");if(stamp)stamp.textContent="SYNCED "+new Date().toLocaleTimeString();
}
window.__refreshProofs=loadProofs;

function initProofForm(){
  var form=el("proofForm");if(!form)return;
  var out=el("formMsg");
  form.addEventListener("submit",function(ev){
    ev.preventDefault();
    var name=el("fName").value.trim(),device=el("fDevice").value.trim(),
        text=el("fText").value.trim(),media=el("fMedia").value.trim();
    if(text.length<4){out.textContent="SAY A LITTLE MORE — 4 CHARACTERS MINIMUM.";return}
    if(media&&!/^https?:\/\//i.test(media)){out.textContent="MEDIA MUST BE AN HTTP(S) LINK.";return}
    var last=+(localStorage.getItem("pf_last")||0);
    if(Date.now()-last<60000){out.textContent="RATE LIMITED — ONE PROOF PER MINUTE.";return}
    out.textContent="SENDING...";
    fb("/public/proofs.json",{method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name:name.slice(0,24),device:device.slice(0,18),text:text.slice(0,280),media:media.slice(0,600),ts:Date.now()})
    }).then(function(){
      localStorage.setItem("pf_last",String(Date.now()));
      out.textContent="LOGGED. VISIBLE ON THE WALL.";
      form.reset();loadProofs();
    }).catch(function(){
      out.textContent="WRITE DENIED — owner must enable writes on /public/proofs (rules in the setup box above).";
    });
  });
}

function initKeyCheck(){
  var btn=el("checkBtn"),input=el("keyInput"),out=el("verdictBox");
  if(!btn)return;
  function run(){
    var k=input.value.trim().replace(/\s+/g,"");
    if(!k){out.innerHTML="";var s=document.createElement("span");s.className="v-mid";s.textContent="ENTER A KEY FIRST.";out.appendChild(s);return}
    out.innerHTML="";out.textContent="CHECKING...";
    fb("/license_keys/"+encodeURIComponent(k)+".json?key="+API_KEY,{headers:{Accept:"application/json"}})
    .then(function(t){
      out.innerHTML="";
      function v(cls,msg){var s=document.createElement("span");s.className=cls;s.textContent=msg;out.appendChild(s)}
      if(t==="null"){v("v-bad","INVALID — key not found in license_keys.");return}
      var o=JSON.parse(t);
      if(o&&o.blocked===true){v("v-bad","BLOCKED — this key was revoked.");return}
      var ex=o&&o.expiresAt||0;
      if(ex>0&&ex<Date.now()){v("v-bad","EXPIRED — expired "+timeAgo(ex)+" ("+new Date(ex).toLocaleDateString()+").");return}
      v("v-ok","OK — valid"+(ex?(" until "+new Date(ex).toLocaleString()):", no expiry")+".");
    })
    .catch(function(){
      out.innerHTML="";
      v("v-bad","ERROR — request rejected by the database (locked rules or offline). The app shows the same ERROR state.");
    });
  }
  btn.addEventListener("click",run);
  input.addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();run()}});
}

function initCopy(){
  document.querySelectorAll("[data-copy]").forEach(function(btn){
    btn.addEventListener("click",function(){
      var src=el(btn.getAttribute("data-copy"));
      var txt=src.textContent;
      function done(){btn.textContent="COPIED";btn.classList.add("done");setTimeout(function(){btn.textContent="COPY";btn.classList.remove("done")},1400)}
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done,function(){fallback()})}else{fallback()}
      function fallback(){var ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();
        try{document.execCommand("copy");done()}catch(e){}
        document.body.removeChild(ta)}
    });
  });
}

function initReveal(){
  var els=document.querySelectorAll(".reveal");
  if(REDUCED||!("IntersectionObserver"in window)){els.forEach(function(x){x.classList.add("in")});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}})},{threshold:.12});
  els.forEach(function(x){io.observe(x)});
}
function initNav(){
  var here=location.pathname.split("/").pop()||"index.html";
  var anchor=location.hash;
  document.querySelectorAll(".rail nav a").forEach(function(a){
    var href=a.getAttribute("href");
    if(anchor){a.classList.toggle("on",href==="#"+anchor.slice(1)||href.endsWith("#"+anchor.slice(1)));return}
    a.classList.toggle("on",href===here||(here==="index.html"&&(href==="/"||href==="index.html")));
  });
}
function initPolling(){
  var hasLive=!!(el("announceBar")||el("proofFeed"));
  if(!hasLive)return;
  loadAnnouncements();
  loadProofs();
  setInterval(function(){if(!document.hidden){loadAnnouncements();if(el("proofFeed"))loadProofs()}},30000);
  var rb=el("refreshFeed");if(rb)rb.addEventListener("click",function(){loadAnnouncements();loadProofs()});
}
document.addEventListener("DOMContentLoaded",function(){
  initNav();initReveal();initTerms();initCopy();initKeyCheck();initProofForm();initPolling();
});
})();
