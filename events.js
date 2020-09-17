import helpers from './helpers.js';

window.addEventListener( 'load', () => {
    
     //When the video frame is clicked. This will enable picture-in-picture
     document.getElementById( 'local' ).addEventListener( 'click', () => {
        if ( !document.pictureInPictureElement ) {
            document.getElementById( 'local' ).requestPictureInPicture()
                .catch( error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error( error );
                } );
        }

        else {
            document.exitPictureInPicture()
                .catch( error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error( error );
                } );
        }
    } );


    document.getElementById( 'create-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();
        let emailarray = ['spj.8596@gmail.com','jayeshjadhav09519@gmail.com'];
  //      login.getLoginData();
        let roomid = document.querySelector( '#roomid' ).value;
        let email = document.querySelector( '#email' ).value;
        let a=0;
        if ( roomid && email ) {
            //remove error message, if any
            document.querySelector( '#err-msg' ).innerHTML = "";

            for(var i=0;i<emailarray.length;i++)
            {
                if(emailarray[i]===email)
                {
                    sessionStorage.setItem( 'username', email );
                    //create room link
                    let roomLink = `${ location.origin }?room=${ roomid }`;

                    //show message with link to room
                    document.querySelector( '#room-created' ).innerHTML = `Room successfully created. Click <a href='${ roomLink }'>here</a> to enter room. 
                        Share the room link with your partners.`;

                    //empty the values
                    document.querySelector( '#roomid' ).value = '';
                    document.querySelector( '#email' ).value = '';
                    a=1;
                    break;
                }
            }
            if(a!=1)
            {
                document.querySelector( '#err-msg' ).innerHTML = "User not exist";
            }
        }

        else {
            document.querySelector( '#err-msg' ).innerHTML = "All fields are required";
        }
    
    } );

    document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let name = document.querySelector( '#username' ).value;

        if ( name ) {
            //remove error message, if any
            document.querySelector( '#err-msg-username' ).innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', name );

            //reload room
            location.reload();
        }

        else {
            document.querySelector( '#err-msg-username' ).innerHTML = "Please input your name";
        }
    } );

    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'expand-remote-video' ) ) {
            helpers.maximiseStream( e );
        }

        else if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            helpers.singleStreamToggleMute( e );
        }
    } );


    // document.getElementById( 'closeModal' ).addEventListener( 'click', () => {
    //     helpers.toggleModal( 'recording-options-modal', false );
    // } ); 




} );