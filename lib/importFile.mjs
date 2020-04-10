export default function importFile(fullPath, callback) {
  import(fullPath)
    .then(function (module) {
      callback(null, module);
    })
    .catch(callback);
}
