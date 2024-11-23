export default function importFile(fullPath, callback) {
  import('file://' + fullPath)
    .then(function (module) {
      callback(null, module);
    })
    .catch(callback);
}
