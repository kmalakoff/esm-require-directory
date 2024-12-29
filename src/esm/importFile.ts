export default function importFile(fullPath, callback) {
  import(`file://${fullPath}`)
    .then((module) => {
      callback(null, module);
    })
    .catch(callback);
}
