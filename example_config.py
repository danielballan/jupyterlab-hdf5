from functools import partial
import os
c = get_config()


def hdf5_handler(baseurl, model):
    path = model['path']
    assert path.endswith('.h5')  # an assumption made by h5serv
    # Transform 'a/b/c.h5' to 'c.b.a'
    subdomain = '.'.join(reversed(path[:-3].split(os.sep)))
    return '.'.join([subdomain, baseurl])


baseurl = 'localhost:5000'
c.ContentsManager.external_formats = {'hdf5': partial(hdf5_handler, baseurl)}
