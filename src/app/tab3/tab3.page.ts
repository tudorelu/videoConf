import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import * as RTCMultiConnection from 'rtcmulticonnection';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

	connection: any = null;
	predefinedRoomId: string = "1234xxxQ";

	initVideoCall(){

        console.log("Init Call");

	    this.connection = new RTCMultiConnection();
	    var connection = this.connection;

	    // this line is VERY_important
	    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

	    // if you want audio+video conferencing
	    connection.session = {
	        audio: true
	    };

	    connection.onMediaError = function (error) {
	    	console.log("Media error encountered.");

	    	console.log(error.name);
	    	console.log(error.message);
		    // error.name == 'PermissionDeniedError' etc.
		    // error.message
		    // error.constraintName
		    // error.session --- original session that is used to capture media
		}

		/*	    
		connection.captureUserMedia(function(camera) {
		    var video = document.createElement('video');
		    video.src = URL.createObjectURL(camera);
		    video.muted = true;

		    var streamEvent = {
		        type: 'local',
		        stream: camera,
		        streamid: camera.id,
		        mediaElement: video
		    };
		    connection.onstream(streamEvent);
		}, {audio:true});
		*/
	 	connection.openOrJoin(this.predefinedRoomId);

	 	let videoContainer = document.getElementById('webRTC-video-me');
	 	videoContainer.style.backgroundColor = "red";

	 	connection.videosContainer = videoContainer;

	 	
    }

    openRoom(){
        console.log("Open Room Clicked");
        this.connection.open( this.predefinedRoomId );
    }

    joinRoom(){
        console.log("Join Room Clicked");
        this.connection.join( this.predefinedRoomId );
    }
}
