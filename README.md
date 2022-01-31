# Node.js simple file server for testing

Upload with curl:
```sh
curl -X PUT -F data=@myFile.txt http://localhost:3000/dummy/$(uuidgen)/myFile.txt
```

Download example:
```
http://localhost:3000/FFA1A8D4-6983-4011-8F33-18DBEA068557/myFile.txt
```