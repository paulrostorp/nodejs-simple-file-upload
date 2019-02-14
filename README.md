# Node.js simple file upload

### Dependencies
- express
- ejs
- fs
- multer


### Run
```
> git clone https://github.com/Majidkn/nodejs-simple-file-upload.git
> cd nodejs-simple-file-upload
> npm install
> npm start
```
The application will be served on `:3000`

### Docker

```bash
docker build -t nodejs-simple-file-upload .

mkdir uploads
chown 1000:1000 uploads
docker run -p 3000:3000 -v $(pwd)/uploads:/usr/src/app/uploads nodejs-simple-file-upload
``` 
