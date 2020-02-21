import os
import hashlib
from flask import Flask, request, abort, jsonify, send_from_directory
from flask_cors import CORS


UPLOAD_DIRECTORY = "/project/api_uploaded_files"

if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)


api = Flask(__name__)
CORS(api)

@api.route("/files")
def list_files():
    """Endpoint to list files on the server."""
    files = []
    for filename in os.listdir(UPLOAD_DIRECTORY):
        path = os.path.join(UPLOAD_DIRECTORY, filename)
        if os.path.isfile(path):
            files.append(filename)
    return jsonify(files)


@api.route("/files/<path:path>", methods=["GET", "OPTIONS"])
def get_file(path):
    """Download a file."""
    return send_from_directory(UPLOAD_DIRECTORY, path, as_attachment=True)


@api.route("/files/upload", methods=["POST"])
def post_file():
    """Upload a file."""
    
    m = hashlib.sha3_256()
    m.update(request.data)
    filename=m.hexdigest()

    with open(os.path.join(UPLOAD_DIRECTORY, filename), "wb") as fp:
        fp.write(request.data)

    # Return 201 CREATED
    return "%s" % filename, 201


if __name__ == "__main__":
    api.run(debug=True, port=9000)