import os


def safe_delete(filename: str):
    try:
        os.remove(filename)
    except OSError:
        pass
