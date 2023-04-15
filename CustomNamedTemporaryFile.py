import os
import tempfile
import atexit

class TemporaryFile:
    def __init__(self, name, io, delete):
        self.name = name
        self.__io = io
        self.__delete = delete

    def __getattr__(self, k):
        return getattr(self.__io, k)

    def delete(self):
        if self.__delete:
            try:
                os.unlink(self.name)
            except FileNotFoundError:
                pass

def NamedTemporaryFile(mode='w+b', bufsize=-1, suffix='', prefix='tmp', dir=None, delete=True):
    if not dir:
        dir = tempfile.gettempdir()
    i = 0
    while True:
        name = os.path.join(dir, f"{prefix}_{i:03d}_{os.urandom(32).hex()}{suffix}")
        try:
            fh = open(name, "w+b", bufsize)
            break
        except OSError:
            i += 1
    if mode is None:
        return TemporaryFile(name, None, delete)
    fh = open(name, "w+b", bufsize)
    if mode != "w+b":
        fh.close()
        fh = open(name, mode)
    tf = TemporaryFile(name, fh, delete)
    atexit.register(tf.delete)
    return tf
