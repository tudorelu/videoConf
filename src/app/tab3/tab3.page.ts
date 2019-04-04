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
	        audio: true,
	        video: true
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
	 	

	 	let videoContainer = document.getElementById('videos-container');
	 	videoContainer.style.backgroundColor = "red";

	 	connection.videosContainer = videoContainer;

	 	console.log("Vid container is: ");
	 	console.log(connection.videosContainer);

	 	/*
	 	connection.onstream = function(event) {
		    var existing = document.getElementById(event.streamid);
		    if(existing && existing.parentNode) {
		      existing.parentNode.removeChild(existing);
		    }
		    event.mediaElement.removeAttribute('src');
		    event.mediaElement.removeAttribute('srcObject');
		    event.mediaElement.muted = true;
		    event.mediaElement.volume = 0;
		    var video = document.createElement('video');
		    try {
		        video.setAttributeNode(document.createAttribute('autoplay'));
		        video.setAttributeNode(document.createAttribute('playsinline'));
		    } catch (e) {
		        video.setAttribute('autoplay', 'true');
		        video.setAttribute('playsinline', 'true');
		    }
		    if(event.type === 'local') {
		      video.volume = 0;
		      try {
		          video.setAttributeNode(document.createAttribute('muted'));
		      } catch (e) {
		          video.setAttribute('muted', 'true');
		      }
		    }
		    video.srcObject = event.stream;

		    var width = parseInt(connection.videosContainer.clientWidth / 3) - 20;
		    var mediaElement = getHTMLMediaElement(video, {
		        title: event.userid,
		        buttons: ['full-screen'],
		        width: width,
		        showOnMouseEnter: false
		    });
		    connection.videosContainer.appendChild(mediaElement);
		    setTimeout(function() {
		        mediaElement.media.play();
		    }, 5000);
		    mediaElement.id = event.streamid;
		    // to keep room-id in cache
		    localStorage.setItem(connection.socketMessageEvent, connection.sessionid);
		    chkRecordConference.parentNode.style.display = 'none';
		    if(chkRecordConference.checked === true) {
		      btnStopRecording.style.display = 'inline-block';
		      recordingStatus.style.display = 'inline-block';
		      var recorder = connection.recorder;
		      if(!recorder) {
		        recorder = RecordRTC([event.stream], {
		          type: 'video'
		        });
		        recorder.startRecording();
		        connection.recorder = recorder;
		      }
		      else {
		        recorder.getInternalRecorder().addStreams([event.stream]);
		      }
		      if(!connection.recorder.streams) {
		        connection.recorder.streams = [];
		      }
		      connection.recorder.streams.push(event.stream);
		      recordingStatus.innerHTML = 'Recording ' + connection.recorder.streams.length + ' streams';
		    }
		    if(event.type === 'local') {
		      connection.socket.on('disconnect', function() {
		        if(!connection.getAllParticipants().length) {
		          location.reload();
		        }
		      });
		    }
		};		
		*/	

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
