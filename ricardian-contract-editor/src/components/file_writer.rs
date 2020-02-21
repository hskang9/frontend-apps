use stdweb::Value;
use stdweb::js;
use stdweb::web::File;
use std::path::Path;
use std::io::Write;



pub struct FsService(Option<Value>);

impl FsService {
    pub fn new() -> Self {
        let lib = js! {
            return;
        };
        FsService(Some(lib))
    }

    pub fn write(&mut self, path: &Path, data: Vec<u8>)  {
        let path = Path::new(path);
        let display = path.display();

        // Open a file in write-only mode, returns `io::Result<File>`
        let mut file = match File::create(&path) {
            Err(why) => panic!("couldn't create {}: {:?}", display, why),
            Ok(file) => file,
        };

        // Write the `LOREM_IPSUM` string to `file`, returns `io::Result<()>`
        match file.write_all(&data[..]) {
            Err(why) => panic!("couldn't write to {}:  {:?}", display, why),
            Ok(_) => println!("successfully wrote to {}", display),
        }
    }

}