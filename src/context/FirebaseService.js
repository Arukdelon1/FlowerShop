import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDoc, getDocs, setDoc, addDoc, doc, query, where, orderBy, limit, deleteDoc} from "firebase/firestore/lite";
import { getAuth, browserLocalPersistence, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
    signOut, sendPasswordResetEmail, createUserWithEmailAndPassword  } from "firebase/auth";
import { firebaseConfig } from "../firebase";
import {getStorage} from "firebase/storage";



class FirebaseService {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app, {
            persistence: browserLocalPersistence,
        });
        this.storage = getStorage(this.app)
    }




    async getTempValue(path, label, value) {
        const q = query(collection(this.db, path), where(label, "==", value));
        console.log(q);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        return querySnapshot.docs.map(doc => doc.data());
    }

    async getTemp(path) {
        const q = query(collection(this.db, path));
        console.log(q);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
        return querySnapshot.docs.map(doc => doc.data());
    }

    async deleteDocument(path, id) {
        console.log("delete");

        firebaseService.getTempValue(path, "id", id).then(async (doc) => {
            console.log("start delete");
            console.log(doc);
            const querySnapshot = await getDocs();
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });


        }).catch(err => {
            console.log(err);
        });
    }

    async deleteDocument2(path, id) {
        console.log("delete");

        firebaseService.getTempValue(path, "id", id).then(async (doc) => {
            console.log("start delete");
            console.log(doc);
            await deleteDoc(doc(this.db, path, doc));

        }).catch(err => {
            console.log(err);
        });
    }

    async getCategoryArray(db) {
        const categCol = collection(db, "category");
        const categorySnapshot = await getDocs(categCol);
        return  categorySnapshot.docs.map(doc => doc.data());
    }


    async UploadProduct(name,price,category, uid ,imageURL) {
        console.log(price)
        const productRef = await addDoc(collection(this.db, "products"), {name,price,category,uid ,imageURL});
    }

    async getProducts(db) {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = []
        querySnapshot.forEach((doc) => {
            items.push([doc.data(), doc.id])
        });
        return items
    }
    async getUserInfo(db, uId) {
        const docRef = doc(db, "users", uId);
        const docSnap = await getDoc(docRef);
        return docSnap.data()
    };



    async saveUser(email, password, name, surname,db, uid) {
        const usersRef = doc(db, "users", uid);

        return setDoc(usersRef, { email, password, name, surname, role: "user" }, { merge: true });
    }

    async login(email, password) {
        return await signInWithEmailAndPassword(this.auth, email, password);
    }

    async signup(email, password, name, surname) {
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const user = userCredential.user;
        const usersRef = doc(this.db, "users", user.uid);
        await setDoc(usersRef, { email, name, surname, role: "user" }, { merge: true });
        return userCredential;
    }


    async logout() {
        return await signOut(this.auth);
    }

    async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            'login_hint': '@nung.edu.ua'
        });
        return await signInWithPopup(this.auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                return result.user;
            }).catch((error) => {
                return error;
            });
    }

    async sendPasswordResetEmail(email) {
        return await sendPasswordResetEmail(this.auth, email);
    }

}

export const firebaseService = new FirebaseService();