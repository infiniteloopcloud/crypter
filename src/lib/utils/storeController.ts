// window.indexedDB =
//     window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// window.IDBTransaction = window.IDBTransaction ||
//     window.webkitIDBTransaction ||
//     window.msIDBTransaction || { READ_WRITE: 'readwrite' };
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
export const checkBrowserCompatibility = () => {
    if (!window.indexedDB) {
        console.log(
            "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
        );
    }
};

export const processCrypt = async () => {
    const open = window.indexedDB.open('crypter', 1);

    open.onupgradeneeded = function () {
        const db = open.result;
        db.createObjectStore('private_keys', { autoIncrement: false });
    };

    open.onsuccess = function () {
        const db = open.result;
        const tx = db.transaction('private_keys', 'readwrite');
        const store = tx.objectStore('private_keys');

        store.put({ firstname: 'John', lastname: 'Doe', age: 33 }, 'current_active');

        tx.oncomplete = function () {
            db.close();
        };
    };
};

export const getCryp = async () => {
    const open = window.indexedDB.open('crypter', 1);

    open.onupgradeneeded = function () {
        const db = open.result;
        db.createObjectStore('private_keys', { autoIncrement: false });
    };

    open.onsuccess = function () {
        const db = open.result;
        const tx = db.transaction('private_keys', 'readonly');
        const store = tx.objectStore('private_keys');

        store.get('current_active');

        const objectStoreRequest = store.get('current_active');

        objectStoreRequest.onsuccess = (event) => {
            if (objectStoreRequest.result !== undefined) {
                console.log(objectStoreRequest.result);
            }
        };

        tx.oncomplete = function () {
            db.close();
        };
    };
};
