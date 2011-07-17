(function(){function Fidget(g,h){var s={'UNITS':'em','INIT_SIZE':1,'MAX_STEPS':10,'TOLERANCE':0.99,'LH_ADJUST':true,'LH_UNITS':'','LH_INIT':1.1,'LH_MIN':1,'LH_MAX':1.5},opt,q;for(opt in Fidget.GLOBAL_OPTIONS){s[opt]=Fidget.GLOBAL_OPTIONS[opt]}for(opt in h){s[opt]=h[opt]}function recurse(a,b,c,d,e,f){g.style[a]=c+b;var q=g.clientHeight/g.parentNode.clientHeight,half_up=e?(c+e)/2:c*2,half_down=(c+(d||0))/2;if(f>s.MAX_STEPS-1){if(q>1){g.style[a]=0;g.clientHeight;g.style[a]=d+b}return q}if(q>1){return recurse(a,b,half_down,(d||0),c,(f||0)+1)}else{if(q<s.TOLERANCE){return recurse(a,b,half_up,c,e,(f||0)+1)}else{return q}}}if(s.LH_ADJUST){g.style.lineHeight=s.LH_INIT}recurse('fontSize',s.UNITS,s.INIT_SIZE);q=g.clientHeight/g.parentNode.clientHeight;if(s.LH_ADJUST&&(q>s.TOLERANCE||q>1)){recurse('lineHeight',s.LH_UNITS,s.LH_INIT,s.LH_MIN,s.LH_MAX)}q=g.clientHeight/g.parentNode.clientHeight;return q}window.Fidget=Fidget})();