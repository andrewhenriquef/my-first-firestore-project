document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();

  const db = firebase.firestore();

  // Query inside a collection
  // const productsRef = db.collection('products');
  // const query = productsRef.where('price', '>', 26) // where
  //                          .orderBy('price', 'desc') // ordering
  //                          .limit(1) //pagination/limitation

  // query.get()
  //      .then(products => {
  //        products.forEach(doc => {
  //          data = doc.data()
  //          document.write(`${data.name}  at $${data.price} <br>`)
  //        })
  //      })


  // real time update post on page
  // const myPost = db.collection('posts').doc('firstpost');

  // myPost.onSnapshot( doc => {
  //   const data = doc.data();
  //   document.write(data.title + `<br>`)
  //   document.write(data.createdAt.toDate())
  // })
  // myPost.onSnapshot( doc => {
  //   const data = doc.data();
  //   document.querySelector('#title').innerHTML = data.title;
  // })
});

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
          .then(result => {
            console.log(result)
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user)
          }).catch(console.log)
}

function updatePost(e) {
  const db = firebase.firestore();
  const myPost = db.collection('posts').doc('firstpost');

  myPost.update({ title: e.target.value })

}

function uploadFile(files) {
  const storageRef = firebase.storage().ref();
  const horseRef = storageRef.child('horse.jpg');

  const file = files.item(0);
  const task = horseRef.put(file)

  task.then(snapshot => {
    horseRef.getDownloadURL().then(function(url) {
      console.log(url)
      document.querySelector('#imgUpload').setAttribute('src', url)
    })
  }).catch(console.log)

}