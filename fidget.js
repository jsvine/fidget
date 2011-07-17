(function(){
	function Fidget(div, options){
		var s = { // settings
				'UNITS': 'em', // Alt: 'px' or '%'
				'INIT_SIZE': 1, // Initial font-size, to be concatenated with UNITS.
				'MAX_STEPS': 10, // Max number of binary-search steps each for each adjustment; prevents stack overflow.
				'TOLERANCE': 0.99, // How close to the target height is acceptable? E.g., 0.99 means within 1 percent of target height. Note: MAX_STEPS takes precedence over TOLERANCE. 
				'LH_ADJUST': true, // If Fiddle reaches MAX_STEPS before an acceptable TOLERANCE, should Fiddle try adjusting the text's line-height?
				'LH_UNITS': '', // Alt: '%'
				'LH_INIT': 1.1, // What initial line-height should Fiddle use?
				'LH_MIN': 1, // What minimum line-height should Fiddle use?
				'LH_MAX': 1.5 // What maximum line-height should Fiddle use?
			}, 
			opt, q;

			// Replace default options with global options, if provided.
			for (opt in Fidget.GLOBAL_OPTIONS) {
				s[opt] = Fidget.GLOBAL_OPTIONS[opt];	
			}	
			// Replace default and global options with local options, if provided.
			for (opt in options) {
				s[opt] = options[opt];	
			}

			function recurse(attr, units, size, min, max, steps) {
				div.style[attr] = size + units; // Set attr (either fontSize or lineHeight) to given size.				
				var q = div.clientHeight / div.parentNode.clientHeight, 
					half_up = max ? (size + max) / 2 : size * 2,
					half_down = (size + (min || 0)) / 2;
				if (steps > s.MAX_STEPS - 1) {
					if (q > 1) { 
						div.style[attr] = 0; // A fix for browsers that don't register small-fraction changes in fontSize or lineHeight.
						div.clientHeight;
						div.style[attr] = min + units; }
					return q;
				}
				if (q > 1) { 
					return recurse(attr, units, half_down, (min || 0), size, (steps || 0) + 1); 
				} else {
					if (q < s.TOLERANCE) {
						return recurse(attr, units, half_up, size, max, (steps || 0) + 1);	
					} else {
						return q;	
					}
				}	
			}
			if (s.LH_ADJUST) {div.style.lineHeight = s.LH_INIT;}
			recurse('fontSize', s.UNITS, s.INIT_SIZE);
			q = div.clientHeight / div.parentNode.clientHeight; 
			if (s.LH_ADJUST && (q > s.TOLERANCE || q > 1)) {
				recurse('lineHeight', s.LH_UNITS, s.LH_INIT, s.LH_MIN, s.LH_MAX);
			}
			q = div.clientHeight / div.parentNode.clientHeight; 
			return q; // Returns fraction of target height attained.
	} 	
	window.Fidget = Fidget;
})();
