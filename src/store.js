var store = {
  db: null,
  init: function() {
    if (store.db) { return Promise.resolve(store.db); }
    return idb.open('Tomato', 1)
    .then(function(db) {
      return store.db = db;
    });
  },
  user_profile: function(mode) {
    return store.init().then(function(db) {
      return db.transaction('user_profile', mode).objectStore('user_profile');
    })
  }
}
