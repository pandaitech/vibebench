/* ================= lib.js — helpers & chart engine ================= */
window.LIB = (function(){
  "use strict";

  function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(m){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m];}); }
  function nfmt(v){ v=Math.round(v); var neg=v<0; return (neg?"-":"")+String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g,","); }
  function pct(v){ return (Math.round(v*10)/10)+"%"; }
  function rm(v,u){
    u=u||"j";
    if(u==="pct") return pct(v);
    if(u==="b"){ var b=v/1000; return "RM"+(Math.abs(v)>=1000? (b.toLocaleString("en-MY",{maximumFractionDigits:1})) : nfmt(v))+" bilion"; }
    if(u==="j") return "RM"+nfmt(v)+" juta";
    if(u==="t") return "RM"+nfmt(v);
    return nfmt(v);
  }
  /* value formatter for chart axes: unit j=RM juta, b=RM bilion, pct=%, rm=RM */
  function fmtVal(v,u){ return rm(v,u); }

  /* type → tag chip */
  var TYPE={
    fakta:{n:"Fakta laporan",dot:"#0d5c46"},
    terbitan:{n:"Terbitan kami",dot:"#2b5d8a"},
    unjuran:{n:"Unjuran laporan",dot:"#b06a1b"},
    simulasi:{n:"Simulasi kami",dot:"#6a4a9a"}
  };
  function tag(t){ var o=TYPE[t]||TYPE.fakta; return '<span class="tag '+t+'"><span class="dot2" style="background:'+o.dot+'"></span>'+o.n+'</span>'; }

  /* source chip → opens source modal (delegated in app.js) */
  function sn(page,key,label){
    var lab = label!=null ? label : "PDF ms. "+page;
    return '<sn class="src" data-p="'+page+'" data-k="'+(key||"")+'">&#128269; '+lab+'</sn>';
  }

  function card(o){
    return '<div class="card">'
      +(o.title?'<h4>'+o.title+'</h4>':'')
      +(o.sub?'<p class="sub">'+o.sub+'</p>':'')
      +(o.legend||'')
      +'<div>'+(o.body||'')+'</div>'
      +(o.foot?'<p class="for">'+o.foot+'</p>':'')
      +'</div>';
  }
  function legend(items){ return '<div class="legend">'+items.map(function(it){return '<span class="li"><span class="sw" style="background:'+it.c+'"></span>'+esc(it.n)+'</span>';}).join("")+'</div>'; }

  /* ---------- vertical bars: grouped or stacked ---------- */
  function vbars(o){
    var rows=o.data, sers=o.series, u=o.u||"j", H=o.h||340;
    var col=function(vi){ return (sers[vi]&&(sers[vi].color||sers[vi].c))||"#2b5d8a"; };
    var stack=o.stack, padL=o.padL||78, padR=14, topH=18, botH=56;
    var W2=1000-padL-padR, plotH=H-topH-botH;
    var hi=0, lo=0;
    rows.forEach(function(r){ r.v.forEach(function(v){ if(v>hi)hi=v; if(v<lo)lo=v; }); });
    if(hi===0)hi=1;
    if(lo>=0)lo=0;
    var topOf=hi+(hi-lo)*0.10;
    function Y(v){ return topH + ((topOf-v)/(topOf-lo))*plotH; }
    var zeroY=Y(0);
    var g="";
    var nG=4;
    for(var gl=0; gl<=nG; gl++){
      var val=lo+(topOf-lo)*gl/nG, yy=Y(val);
      g+='<line x1="'+padL+'" y1="'+yy+'" x2="'+(1000-padR)+'" y2="'+yy+'" stroke="rgba(128,128,128,.16)"/>';
      g+='<text x="'+(padL-9)+'" y="'+(yy+5)+'" text-anchor="end" font-size="22" fill="currentColor" opacity=".55">'+fmtVal(val,u)+'</text>';
    }
    if(lo<0) g+='<line x1="'+padL+'" y1="'+zeroY+'" x2="'+(1000-padR)+'" y2="'+zeroY+'" stroke="currentColor" opacity=".4" stroke-width="1.5"/>';
    var slot=W2/rows.length, m=sers.length;
    rows.forEach(function(r,ri){
      var cx=padL+ri*slot+slot/2;
      if(stack){
        var acc=0;
        r.v.forEach(function(v,vi){
          var yT=Y(acc), yB=Y(acc+v), hh=Math.max(2,Math.abs(yB-yT));
          g+='<rect x="'+(cx-slot*0.28)+'" y="'+yT+'" width="'+(slot*0.56)+'" height="'+hh+'" rx="3" fill="'+col(vi)+'"/>';
          acc+=v;
        });
      } else {
        var bw=Math.min(slot*0.55, slot*0.62)/m;
        r.v.forEach(function(v,vi){
          var x0=cx + (vi-(m-1)/2)*bw - bw/2;
          var yT=Y(Math.max(0,v)), yB=Y(Math.min(0,v)), hh=Math.max(2,yB-yT);
          g+='<rect x="'+x0+'" y="'+yT+'" width="'+bw+'" height="'+hh+'" rx="'+(bw>6?4:2)+'" fill="'+col(vi)+'" opacity="'+(vi===0?"1":".8")+'"/>';
        });
      }
      g+='<text x="'+cx+'" y="'+(H-botH+28)+'" text-anchor="middle" font-size="23" fill="currentColor" opacity=".85" font-weight="600">'+esc(r.label)+'</text>';
      if(o.sub && r.sub) g+='<text x="'+cx+'" y="'+(H-botH+47)+'" text-anchor="middle" font-size="18" fill="currentColor" opacity=".5">'+esc(r.sub)+'</text>';
    });
    return '<svg viewBox="0 0 1000 '+H+'" style="width:100%;height:auto;" role="img" aria-label="carta bar">'+g+'</svg>';
  }

  /* ---------- horizontal ranked bars ---------- */
  function hbar(o){
    var rows=o.data, u=o.u||"j", padL=o.padL||250, padR=110;
    var slotH=o.slot||46, H=o.h||(rows.length*slotH+30), topH=12, botH=22;
    var W2=1000-padL-padR, plotH=H-topH-botH;
    var max=0; rows.forEach(function(r){ if(r.v>max)max=r.v; }); max=Math.max(max,1);
    var g="";
    for(var gl=0; gl<=4; gl++){
      var xx=padL+W2*(gl/4);
      g+='<line x1="'+xx+'" y1="'+topH+'" x2="'+xx+'" y2="'+(H-botH)+'" stroke="rgba(128,128,128,.14)"/>';
      g+='<text x="'+xx+'" y="'+(H-6)+'" text-anchor="middle" font-size="18" fill="currentColor" opacity=".5">'+fmtVal(max*gl/4,u)+'</text>';
    }
    var slot=plotH/rows.length;
    rows.forEach(function(r,ri){
      var cy=topH+slot*ri+slot/2, bh=slot*0.6, bw=W2*(r.v/max);
      g+='<text x="'+(padL-12)+'" y="'+(cy+5)+'" text-anchor="end" font-size="21" fill="currentColor">'+esc(r.label)+'</text>';
      g+='<rect x="'+padL+'" y="'+(cy-bh/2)+'" width="'+bw+'" height="'+bh+'" rx="4" fill="'+(r.c||"#2b5d8a")+'"/>';
      g+='<text x="'+(padL+bw+8)+'" y="'+(cy+5)+'" font-size="22" font-weight="700" fill="'+(r.c||"#2b5d8a")+'">'+fmtVal(r.v,u)+'</text>';
    });
    return '<svg viewBox="0 0 1000 '+H+'" style="width:100%;height:auto;">'+g+'</svg>';
  }

  /* ---------- multi-series line/area ---------- */
  function line(o){
    var rows=o.data, sers=o.series, u=o.u||"j", H=o.h||330;
    var padL=o.padL||76, padR=18, topH=14, botH=46, W2=1000-padL-padR, plotH=H-topH-botH;
    var lo=o.min, hi=o.max;
    if(lo==null)lo=0; if(hi==null){ hi=0; rows.forEach(function(r){ sers.forEach(function(s){ if(r[s.k]>hi)hi=r[s.k]; }); }); }
    if(lo==null){ lo=hi; rows.forEach(function(r){ sers.forEach(function(s){ if(r[s.k]<lo)lo=r[s.k]; }); }); }
    hi+=(hi-lo)*0.10;
    function X(i){ return padL+(rows.length===1?W2/2:(i/(rows.length-1))*W2); }
    function Y(v){ return topH+((hi-v)/(hi-lo))*plotH; }
    var g="";
    for(var gl=0;gl<=4;gl++){ var val=lo+(hi-lo)*gl/4, yy=Y(val);
      g+='<line x1="'+padL+'" y1="'+yy+'" x2="'+(1000-padR)+'" y2="'+yy+'" stroke="rgba(128,128,128,.16)"/>';
      g+='<text x="'+(padL-9)+'" y="'+(yy+5)+'" text-anchor="end" font-size="22" fill="currentColor" opacity=".55">'+fmtVal(val,u)+'</text>';
    }
    var step=Math.ceil(rows.length/(1000/140));
    rows.forEach(function(r,i){ if(i%step===0||i===rows.length-1){
      g+='<text x="'+X(i)+'" y="'+(H-18)+'" text-anchor="middle" font-size="21" fill="currentColor" opacity=".8">'+esc(r.x)+'</text>';
    }});
    sers.forEach(function(s){
      var pts=rows.map(function(r,i){ return X(i)+","+Y(r[s.k]); });
      if(o.area){
        var d="M "+X(0)+","+Y(rows[0][s.k]);
        pts.forEach(function(p){ d+=" L "+p; });
        d+=" L "+X(rows.length-1)+","+Y(lo)+" L "+X(0)+","+Y(lo)+" Z";
        g+='<path d="'+d+'" fill="'+s.c+'" opacity=".12"/>';
      }
      g+='<polyline points="'+pts.join(" ")+'" fill="none" stroke="'+s.c+'" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>';
      rows.forEach(function(r,i){
        g+='<circle cx="'+X(i)+'" cy="'+Y(r[s.k])+'" r="4" fill="'+s.c+'" stroke="var(--card)" stroke-width="1.5"/>';
      });
    });
    return '<svg viewBox="0 0 1000 '+H+'" style="width:100%;height:auto;">'+g+'</svg>';
  }

  /* combo: bars (serie barK) + line (serie lineK) */
  function combo(o){
    var rows=o.data, H=o.h||330, u=o.u||"j", up=o.up||"pct";
    var padL=78,padR=18,topH=16,botH=54,W2=1000-padL-padR,plotH=H-topH-botH;
    var hi=0; rows.forEach(function(r){ if(r.bar>hi)hi=r.bar; });
    var barMax=hi*1.1; var pctMax=o.pctMax||80;
    function Yb(v){ return topH+plotH*(1-v/barMax); }
    function X(i){ return padL+(i/(rows.length-1))*W2; }
    function Yp(v){ return topH+plotH*(1-v/pctMax); }
    var g="";
    for(var gl=0;gl<=4;gl++){ var v=barMax*gl/4,yy=Yb(v);
      g+='<line x1="'+padL+'" y1="'+yy+'" x2="'+(1000-padR)+'" y2="'+yy+'" stroke="rgba(128,128,128,.16)"/>';
      g+='<text x="'+(padL-9)+'" y="'+(yy+5)+'" text-anchor="end" font-size="22" fill="currentColor" opacity=".55">'+fmtVal(v,u)+'</text>';
    }
    var slot=W2/rows.length, bw=slot*0.4;
    rows.forEach(function(r,ri){
      var cx=X(ri);
      g+='<rect x="'+(cx-bw/2)+'" y="'+Yb(r.bar)+'" width="'+bw+'" height="'+(Yb(0)-Yb(r.bar))+'" rx="3" fill="#c9a24b" opacity=".85"/>';
      g+='<circle cx="'+cx+'" cy="'+Yp(r.pct)+'" r="4.5" fill="#b3382c"/>';
      g+='<text x="'+cx+'" y="'+(H-18)+'" text-anchor="middle" font-size="22" fill="currentColor" opacity=".85" font-weight="600">'+esc(r.x)+'</text>';
    });
    var pts=rows.map(function(r,i){ return X(i)+","+Yp(r.pct); }).join(" ");
    g+='<polyline points="'+pts+'" fill="none" stroke="#b3382c" stroke-width="3" stroke-dasharray="1 0"/>';
    return '<svg viewBox="0 0 1000 '+H+'" style="width:100%;height:auto;">'+g+'</svg>';
  }

  /* donut */
  function donut(o){
    var data=o.data, cx=o.cx!=null?o.cx:260, cy=o.cy!=null?o.cy:170, r=o.r||120, ir=o.ir||76, H=o.h||340;
    var total=o.total||data.reduce(function(a,b){return a+b.v;},0);
    var g="", a0=-90;
    var W2=520;
    data.forEach(function(d){
      var frac=d.v/total, a1=a0+frac*360, large=frac>0.5?1:0;
      var x0=cx+r*Math.cos(a0*Math.PI/180), y0=cy+r*Math.sin(a0*Math.PI/180);
      var x1=cx+r*Math.cos(a1*Math.PI/180), y1=cy+r*Math.sin(a1*Math.PI/180);
      var xi0=cx+ir*Math.cos(a1*Math.PI/180), yi0=cy+ir*Math.sin(a1*Math.PI/180);
      var xi1=cx+ir*Math.cos(a0*Math.PI/180), yi1=cy+ir*Math.sin(a0*Math.PI/180);
      g+='<path d="M'+x0.toFixed(1)+' '+y0.toFixed(1)+' A'+r+' '+r+' 0 '+large+' 1 '+x1.toFixed(1)+' '+y1.toFixed(1)+' L'+xi0.toFixed(1)+' '+yi0.toFixed(1)+' A'+ir+' '+ir+' 0 '+large+' 0 '+xi1.toFixed(1)+' '+yi1.toFixed(1)+' Z" fill="'+d.c+'"/>';
      if(o.labels){
        var ang=(a0+a1)/2*Math.PI/180, lx=cx+(r+ir)/2*Math.cos(ang), ly=cy+(r+ir)/2*Math.sin(ang);
        if(frac>0.06) g+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" text-anchor="middle" dominant-baseline="central" font-size="21" fill="#fff" font-weight="700">'+d.val+'</text>';
      }
      a0=a1;
    });
    g+='<text x="'+cx+'" y="'+(cy-6)+'" text-anchor="middle" font-size="22" fill="currentColor" opacity=".6">'+esc(o.centerT||"")+'</text>';
    if(o.centerV) g+='<text x="'+cx+'" y="'+(cy+16)+'" text-anchor="middle" font-size="30" font-weight="800" fill="currentColor">'+esc(o.centerV)+'</text>';
    return '<svg viewBox="0 0 '+W2+' '+H+'" style="width:100%;height:auto;">'+g+'</svg>';
  }

  /* simple stacked bar for composition (one column per row, horizontal segments) */
  function stackedH(o){
    var rows=o.data, H=o.h||(rows.length*48+40), padL=o.padL||230, padR=30, topH=16, botH=28;
    var W2=1000-padL-padR, plotH=H-topH-botH;
    var max=0; rows.forEach(function(r){ var t=0; r.v.forEach(function(v){t+=Math.abs(v);}); if(t>max)max=t; });
    var slot=plotH/rows.length;
    var g="";
    rows.forEach(function(r,ri){
      var cy=topH+slot*ri+slot/2, bh=slot*0.62;
      g+='<text x="'+(padL-12)+'" y="'+(cy+5)+'" text-anchor="end" font-size="21" fill="currentColor">'+esc(r.label)+'</text>';
      var x=padL, t=0;
      r.v.forEach(function(v,vi){
        var w=W2*(v/max);
        g+='<rect x="'+x+'" y="'+(cy-bh/2)+'" width="'+w+'" height="'+bh+'" fill="'+r.c[vi]+'" opacity=".9"/>';
        if(w>46) g+='<text x="'+(x+w/2)+'" y="'+(cy+6)+'" text-anchor="middle" font-size="19" fill="#fff" font-weight="700">'+fmtVal(v,r.u)+'</text>';
        x+=w; t+=v;
      });
    });
    return '<svg viewBox="0 0 1000 '+H+'" style="width:100%;height:auto;">'+g+'</svg>';
  }

  return { esc, nfmt, pct, rm, fmtVal, tag, sn, card, legend, vbars, hbar, line, combo, donut, stackedH };
})();
