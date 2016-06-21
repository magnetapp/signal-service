/*
 * FirebaseService.ts
 * 
 */

const firebase = require('firebase');

let $firebaseApp = null;

export class FirebaseService {

  constructor() { }
  
  auth(firebaseUrl: string, pathToKeyFile: string): Promise<any> {
    
    return new Promise((resolve, reject) => {
      
      console.log('Authenticating to Firebase');
      
      try {
        // Init firebase app
        $firebaseApp = firebase.initializeApp({
          serviceAccount: pathToKeyFile,
          databaseURL: firebaseUrl
        });

        if ($firebaseApp) {
          console.log('Succesfully authenticated to ' + firebaseUrl);
          resolve($firebaseApp);
        } else {
          reject('Cannot auth to Firebase');
        }
      } catch (ex) {
        reject(`Cannot auth to Firebase: ${ex}`);
      }
    });
  }

  get(): any {
    if ($firebaseApp) {
      return $firebaseApp;
    } else {
      throw new Error('Firebase app not found.');
    }
  }
}


// import Firebase = require('firebase');
// import {Config} from './../../config';

// export interface IFirebaseService {
//   create(path: string, data: Object): Promise<Object>;
//   createAt(path: string, data: Object): Promise<Object>;
//   read(path: string): Promise<Object>;
//   update(path: string, data: Object): Promise<Object>;
//   delete(path: string, data: Object): void;
// }

// export class FirebaseService implements IFirebaseService {
  
//   private firebase: any;
  
//   constructor(_firebaseUrl?: string) {
//     if (!this.firebase) {
//       var firebaseUrl = _firebaseUrl || Config.FB_URL();
//       this.firebase = new Firebase(firebaseUrl);
//     }  
//   }
  
//   private waitForResponse($ref: any): Promise<Object> {
//     return new Promise((resolve, reject) => {
//       $ref.once('child_added', ($snap) => {
//         resolve({key: $snap.key(), value: $snap.val()});
//       }, reject);
//     });
//   }
  
//   create(path: string, data: Object): Promise<Object> {
//     var $ref = this.firebase.child(path);
//     $ref.push(data);
//     return this.waitForResponse($ref);
//   }
  
//   createAt(path: string, data: Object): Promise<Object> {
//     var $ref = this.firebase.child(path);
//     $ref.set(data);
//     return this.waitForResponse($ref);
//   }
  
//   read(path: string):Promise<Object> {
//     return this.waitForResponse(this.firebase.child(path));
//   }
  
//   update(path: string, data: Object): Promise<Object> {
//     var $ref = this.firebase.child(path);
//     $ref.update(data);
//     return this.waitForResponse($ref);
//   }
  
//   delete(path: string, data: Object): void {
//     this.firebase.child(path).remove();
//   }
// }