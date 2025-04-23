const firebaseConfig = {
  apiKey: "AIzaSyCKQ7fw85TRFjdWcBqoH4i7Tsw7H-h3QM4",
  authDomain: "controle-financeiro-b70d0.firebaseapp.com",
  databaseURL: "https://controle-financeiro-b70d0-default-rtdb.firebaseio.com",
  projectId: "controle-financeiro-b70d0",
  storageBucket: "controle-financeiro-b70d0.firebasestorage.app",
  messagingSenderId: "860992213381",
  appId: "1:860992213381:web:d54cbf762505bad90274ec"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();