(function(){
"use strict";
var REDUCED=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function el(id){return document.getElementById(id)}
function fetchJSON(url){
  return fetch(url,{headers:{Accept:"application/json"}}).then(function(r){
    return r.text().then(function(t){if(!r.ok)throw new Error(r.status);return JSON.parse(t)});
  });
}

var YT_RE=/(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,15})/i;
var IMG_RE=/\.(png|jpe?g|gif|webp|svg)(\?\S*)?$/i;
function mediaInto(box,url,cls){
  var m=url.match(YT_RE);
  if(m){var f=document.createElement("iframe");f.src="https://www.youtube-nocookie.com/embed/"+m[2];
    f.loading="lazy";f.allowFullscreen=true;f.title="proof clip";box.appendChild(f);return}
  if(/\.mp4(\?\S*)?$/i.test(url)){var v=document.createElement("video");v.src=url;v.controls=true;
    v.preload="metadata";v.playsInline=true;if(cls)v.className=cls;box.appendChild(v);return}
  if(IMG_RE.test(url)){var i=document.createElement("img");i.src=url;i.alt="proof media";i.loading="lazy";
    if(cls)i.className=cls;box.appendChild(i);return}
  var a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener noreferrer nofollow";
  a.textContent="open clip";box.appendChild(a);
}

function timeAgo(v){
  var ts=typeof v==="number"?v:Date.parse(v||"");
  if(!ts)return "";
  var s=Math.max(1,Math.floor((Date.now()-ts)/1000));
  if(s<60)return s+"s ago";
  var m=Math.floor(s/60);if(m<60)return m+"m ago";
  var h=Math.floor(m/60);if(h<24)return h+"h ago";
  var d=Math.floor(h/24);return d===1?"yesterday":Math.floor(d/7)>0&&d>=7?Math.floor(d/7)+"w ago":d+"d ago";
}

var STATUS={green:{dot:"--ok",label:"UPDATED · PROVED"},yellow:{dot:"--warn",label:"USE SECOND ACCOUNT"},red:{dot:"--bad",label:"DONT USE · PATCHED"}};

function versionCard(v){
  var c=document.createElement("div");c.className="tk-card tk-ver";
  var st=STATUS[v.status]||STATUS.green;
  var top=document.createElement("div");top.className="tk-ver-top";
  var d=document.createElement("span");d.className="tk-dot";d.style.background="var("+st.dot+")";
  var lab=document.createElement("span");lab.className="tk-lab";lab.textContent=st.label;
  top.appendChild(d);top.appendChild(lab);
  var num=document.createElement("div");num.className="tk-num";num.textContent="V"+v.v;
  var name=document.createElement("div");name.className="tk-name";name.textContent=v.name||("");
  c.appendChild(top);c.appendChild(num);if(v.name)c.appendChild(name);
  return c;
}
function proofCard(p){
  var c=document.createElement("div");c.className="tk-card tk-proof";
  var m=document.createElement("div");m.className="tk-media";
  mediaInto(m,p.media,null);
  var cap=document.createElement("div");cap.className="tk-cap";
  var t=document.createElement("span");t.textContent=(p.text||"").slice(0,90);
  var v=document.createElement("b");v.textContent=p.v?("V"+p.v):"";
  cap.appendChild(t);cap.appendChild(v);
  c.appendChild(m);c.appendChild(cap);
  c.addEventListener("click",function(){location.href="proof.html"});
  return c;
}
function buildTicker(data){
  var track=el("tickerTrack");if(!track)return;
  track.innerHTML="";
  var seq=[];
  (data.proofs||[]).forEach(function(p){
    var vi=seq.findIndex(function(s){return s.kind==="ver"&&s.v.v===p.v});
    if(vi<0){seq.push({kind:"ver",v:(data.versions||[]).find(function(x){return x.v===p.v})||{v:p.v,status:"green",name:p.v+" BUILD"},at:seq.length});vi=seq.length-1}
  });
  var ordered=[];
  (data.versions||[]).forEach(function(v){
    if(!(data.proofs||[]).some(function(p){return p.v===v.v}))return;
    ordered.push({kind:"ver",v:v});
    (data.proofs||[]).forEach(function(p){if(p.v===v.v)ordered.push({kind:"proof",p:p})});
  });
  (data.proofs||[]).forEach(function(p){
    if(!ordered.some(function(o){return o.p===p}))ordered.push({kind:"proof",p:p});
  });
  function render(){
    ordered.forEach(function(item){
      track.appendChild(item.kind==="ver"?versionCard(item.v):proofCard(item.p));
    });
  }
  render();
  if(!REDUCED){render();track.setAttribute("data-dup","1")}
  else{track.parentElement.classList.add("static")}
}

function loadHome(){
  if(!el("tickerTrack")&&!el("announceBar"))return;
  fetchJSON("admin.json").then(function(data){
    buildTicker(data);
    var bar=el("announceBar");
    if(bar){
      var inn=bar.querySelector(".ann-in");inn.innerHTML="";
      var arr=(data.announcements||[]);
      if(!arr.length){inn.textContent="NO ANNOUNCEMENTS";return}
      var tag=document.createElement("span");tag.className="ann-tag";tag.textContent="LIVE";
      var txt=document.createElement("div");txt.className="ann-txt";txt.textContent=arr[0].msg||arr[0].text||"";
      var when=document.createElement("span");when.className="ann-time";when.textContent=timeAgo(arr[0].ts);
      inn.appendChild(tag);inn.appendChild(txt);inn.appendChild(when);
    }
  }).catch(function(){
    var track=el("tickerTrack");
    if(track){track.innerHTML="";var s=document.createElement("div");s.className="state";s.textContent="FEED OFFLINE — admin.json unreachable";track.appendChild(s)}
  });
}

function loadDownloads(){
  var host=el("dlHost");if(!host)return;
  fetchJSON("admin.json").then(function(data){
    host.innerHTML="";
    (data.versions||[]).forEach(function(v){
      var st=STATUS[v.status]||STATUS.green;
      var sec=document.createElement("article");sec.className="dlv";
      var head=document.createElement("div");head.className="dlv-head";
      var left=document.createElement("div");
      var num=document.createElement("h2");num.className="dlv-v";num.textContent="V"+v.v;
      var nm=document.createElement("span");nm.className="dlv-name";nm.textContent=v.name||"";
      left.appendChild(num);left.appendChild(nm);
      var badge=document.createElement("span");badge.className="badge";
      badge.style.borderColor="var("+st.dot+")";badge.style.color="var("+st.dot+")";
      badge.textContent=st.label;
      head.appendChild(left);head.appendChild(badge);
      sec.appendChild(head);
      var meta=document.createElement("div");meta.className="dlv-meta";
      if(v.date)meta.appendChild(document.createTextNode(v.date+"  "));
      sec.appendChild(meta);
      var de=document.createElement("p");de.className="dlv-desc";de.textContent=v.desc||"";sec.appendChild(de);
      if(v.features&&v.features.length){
        var ul=document.createElement("ul");ul.className="feat-list";
        v.features.forEach(function(f){var li=document.createElement("li");li.textContent=f;ul.appendChild(li)});
        sec.appendChild(ul);
      }
      if(v.keyLine){var kl=document.createElement("div");kl.className="keyline";
        var kb=document.createElement("b");kb.textContent="KEY // ";var kt=document.createElement("span");kt.textContent=v.keyLine;
        kl.appendChild(kb);kl.appendChild(kt);sec.appendChild(kl)}
      if(v.notes&&v.notes.length){
        var nl=document.createElement("ul");nl.className="note-list";
        v.notes.forEach(function(x){var li=document.createElement("li");li.textContent=x;nl.appendChild(li)});
        sec.appendChild(nl);
      }
      if(v.tg){var tr=document.createElement("a");tr.className="tg-row";tr.href="https://t.me/"+String(v.tg).replace("@","");
        tr.target="_blank";tr.rel="noopener noreferrer nofollow";tr.textContent="TELEGRAM "+v.tg;sec.appendChild(tr)}
      if(v.steps&&v.steps.length){
        var ol=document.createElement("ol");ol.className="mini-steps";
        v.steps.forEach(function(s){var li=document.createElement("li");li.textContent=s;ol.appendChild(li)});
        var gh=document.createElement("div");gh.className="dlv-guide-h";gh.textContent="INSTALL GUIDE";
        sec.appendChild(gh);sec.appendChild(ol);
      }
      var row=document.createElement("div");row.className="dlv-actions";
      if(v.file&&v.status!=="red"){
        var a=document.createElement("a");a.className="btn btn-solid";a.href=v.file;
        a.textContent="GET V"+v.v;row.appendChild(a);
      }else{
        var w=document.createElement("span");w.className="dlv-warn";w.textContent=v.status==="red"?"ARCHIVED — DO NOT INSTALL":"NO PUBLIC FILE";row.appendChild(w);
      }
      sec.appendChild(row);
      host.appendChild(sec);
    });
    if(!host.children.length)host.appendChild(Object.assign(document.createElement("div"),{className:"state",textContent:"NO VERSIONS IN admin.json"}));
  }).catch(function(){
    host.innerHTML="";host.appendChild(Object.assign(document.createElement("div"),{className:"state",textContent:"COULD NOT LOAD admin.json"}));
  });
}

function loadGallery(){
  var host=el("proofGrid");if(!host)return;
  fetchJSON("admin.json").then(function(data){
    host.innerHTML="";
    (data.proofs||[]).forEach(function(p){
      var c=document.createElement("figure");c.className="pf";
      var m=document.createElement("div");m.className="pf-media";mediaInto(m,p.media,null);
      var cap=document.createElement("figcaption");
      var tx=document.createElement("div");tx.className="pf-text";tx.textContent=(p.text||"").slice(0,140);
      var vt=document.createElement("div");vt.className="pf-top";
      var b=document.createElement("b");b.textContent=p.v?("BUILD V"+p.v):"PROOF";
      var dt=document.createElement("span");dt.textContent=p.date||"";
      vt.appendChild(b);vt.appendChild(dt);cap.appendChild(vt);cap.appendChild(tx);
      c.appendChild(m);c.appendChild(cap);host.appendChild(c);
    });
    if(!host.children.length)host.appendChild(Object.assign(document.createElement("div"),{className:"state",textContent:"EMPTY — add proofs to admin.json"}));
    var al=el("annListFull");
    if(al){al.innerHTML="";
      (data.announcements||[]).forEach(function(a){
        var c2=document.createElement("article");c2.className="pf";
        var t=document.createElement("div");t.className="pf-top";
        var b=document.createElement("b");b.textContent=a.title||"STARGAZE";
        var s=document.createElement("span");s.textContent=timeAgo(a.ts);
        t.appendChild(b);t.appendChild(s);
        var p2=document.createElement("p");p2.className="pf-text";p2.textContent=a.msg||a.text||"";
        c2.appendChild(t);c2.appendChild(p2);al.appendChild(c2);
      });
    }
  }).catch(function(){
    host.innerHTML="";host.appendChild(Object.assign(document.createElement("div"),{className:"state",textContent:"COULD NOT LOAD admin.json"}));
  });
}

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
]};
var curTimer=null;
function typeInto(body,lines){
  if(curTimer){clearInterval(curTimer);curTimer=null}
  body.innerHTML="";
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
    typeInto(body,TERMS.deploy);
    var term=body.closest(".term");
    if(term){term.addEventListener("click",function(){typeInto(body,TERMS.deploy)});
      term.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();typeInto(body,TERMS.deploy)}});}
  });
}
function initCopy(){
  document.querySelectorAll("[data-copy]").forEach(function(btn){
    btn.addEventListener("click",function(){
      var src=el(btn.getAttribute("data-copy"));if(!src)return;
      var txt=src.textContent;
      function done(){btn.textContent="COPIED";btn.classList.add("done");setTimeout(function(){btn.textContent="COPY";btn.classList.remove("done")},1400)}
      function fallback(){var ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();
        try{document.execCommand("copy");done()}catch(e){}
        document.body.removeChild(ta)}
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done,fallback)}else{fallback()}
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
  document.querySelectorAll(".rail nav a").forEach(function(a){
    a.classList.toggle("on",a.getAttribute("href")===here||(here==="index.html"&&a.getAttribute("href")==="#download"));
  });
}
document.addEventListener("DOMContentLoaded",function(){
  initNav();initReveal();initTerms();initCopy();loadHome();loadDownloads();loadGallery();
});
})();
