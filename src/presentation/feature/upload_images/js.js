const Home = {
  files: {
    relativeTo: Path.join(__dirname, "../static/src")
  },
  handler: (req, res) => {
    var data = req.payload;
    for (var i = 0; i < Object.keys(data).length; i++) {
      if (data.hasOwnProperty("file-" + i)) {
        var g = "file-" + i;
        var name = data[g].hapi.filename;
        console.log(name);
        var path = Path.join(__dirname, "../uploadFiles/" + name);
        var file = Fs.createWriteStream(path);

        file.on("error", function(err) {
          console.error(err);
        });
        data[g].pipe(file);

        data[g].on("end", function(err) {
          setTimeout(function() {
            var ret = {
              filename: data[g].hapi.filename,
              headers: data[g].hapi.headers
            };
            res(JSON.stringify(ret));
          }, 200);
        });
      }
    }
  },

  payload: {
    output: "stream",
    parse: true,
    uploads: "up_files",
    timeout: 30034,
    // allow: 'multipart/form-data',
    failAction: "log",
    maxBytes: 3000000
  }
};

//Root Loading
const Root = {
  files: {
    relativeTo: Path.join(__dirname, "../static/src")
  },
  handler: (req, res) => {
    res.file("index.html");
  }
};

module.exports = [
  { method: "GET", path: "/{static*}", config: Static },
  { method: "POST", path: "/home", config: Home },
  { method: "GET", path: "/", config: Root }
];
