// const ClassicEditor = require( '@ckeditor/ckeditor5-build-classic' );
// const SimpleUploadAdapter = require( '../exmodul/ckeditor5-master/packages/ckeditor5-upload/src/adapters/simpleuploadadapter' );
// import {simpleuploadadapter} from '../exmodul/ckeditor5-master/packages/ckeditor5-upload/src/adapters/simpleuploadadapter.js';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
// import MyUploadAdapter from './upload_adafter';

// const {MyUploadAdapter} =require('./upload_adafter');
// adafter
class MyUploadAdapter {
    constructor( loader ) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;

        // URL where to send files.
        this.url = 'http://127.0.0.1:3001/';
    }

    // Starts the upload process.
    upload() {
        return new Promise( ( resolve, reject ) => {
            this._initRequest();
            this._initListeners( resolve, reject );
            this._sendRequest();
        } );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        xhr.open( 'POST', this.url, true );
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners( resolve, reject ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${ loader.file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;

            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve( {
                default: response.url
            } );
        } );

        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {
        const data = new FormData();

        data.append( 'upload', this.loader.file );

        this.xhr.send( data );
    }
}

// adafter

function MyCustomUploadAdapterPlugin( editor ) {
    let adafter = new MyUploadAdapter()
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        return new MyUploadAdapter( loader );
    };
}
// import {HtmlEmbed} from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
// import {HtmlEmbed} from '../exmodul/ckeditor5-master/packages/ckeditor5-html-embed/src/htmlembed';
// const HtmlEmbed = require('@ckeditor/ckeditor5-html-embed/src/htmlembed');
var  HtmlEmbed = require('../exmodul/ckeditor5-master/packages/ckeditor5-html-embed/src/htmlembed');
ClassicEditor
    .create( document.querySelector( '#editor' ), {
        extraPlugins: [ MyCustomUploadAdapterPlugin ],
        plugins: [ HtmlEmbed],
        // ...
    } )
    .catch( error => {
        console.log( error );
    } );

// ClassicEditor
// .create( document.querySelector( '#editor' ),{
//     plugins: [ SimpleUploadAdapter],
//         // toolbar: [ ... ],
//         simpleUpload: {
//             // The URL that the images are uploaded to.
//             uploadUrl: 'http://example.com',

//             // Enable the XMLHttpRequest.withCredentials property.
//             // withCredentials: true,

//             // Headers sent along with the XMLHttpRequest to the upload server.
//             // headers: {
//             //     'X-CSRF-TOKEN': 'CSRF-Token',
//             //     Authorization: 'Bearer <JSON Web Token>'
//             // }
//         }
// } )
// .catch( error => {
//     console.error( error );
// } );