export class errorThrower { 

    constructor(errorBoxId, errorHeading, errorText, closeButtonId) {
        this.id = errorBoxId;
        this.headingId = errorHeading;
        this.textId = errorText;
        this.closeButtonId = closeButtonId;

        document.getElementById(this.closeButtonId).addEventListener('click', () => {
            document.getElementById(this.id).style.display = 'none';
        });
    }


    throw(errorHeadingMessage, errorTextMessage) { 
        // show the error box
        document.getElementById(this.id).style.display = 'flex';

        // set the error heading
        document.getElementById(this.headingId).innerHTML = errorHeadingMessage;

        // set the error text
        document.getElementById(this.textId).innerHTML = errorTextMessage;
    }



}