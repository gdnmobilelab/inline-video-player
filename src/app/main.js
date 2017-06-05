import Main from './Main.html';
import Hammer from 'hammerjs';
import YouTubeIframeLoader from 'youtube-iframe';

const target = document.querySelector( '.interactive-atom' );
target.innerHTML = ''; // TODO hydration

const data = {
	Hammer: Hammer,
	videoUrl: 'https://playertest.longtailvideo.com/adaptive/bipbop/bipbop.m3u8',
	videoPosterUrl: 'https://assets.guim.co.uk/images/2170b16eb045a34f8c79761b203627b4/fallback-logo.png' 
};

var mainComp = new Main({ target, data });

mainComp.observe('paused', paused => {
	if (paused) {
		mainComp.set({
    		'playControlClass': '',
    		'pauseControlClass': 'hidden'
    	});
	} else {
		mainComp.set({
    		'playControlClass': 'hidden',
    		'pauseControlClass': ''
    	});
	}
})

mainComp.observe('muted', muted => {
	if (muted) {
		mainComp.set({
			'volumeOnControlClass': 'hidden',
			'volumeOffControlClass': '',
    	});
	} else {
		mainComp.set({
			'volumeOnControlClass': '',
			'volumeOffControlClass': 'hidden',
    	});
	}
})

YouTubeIframeLoader.load(function(YT) {
	mainComp.addVideoEventHandlers(YT);
});
