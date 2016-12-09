Web UI for the Corridors Verts MTL Project
==========================================

This project provides the map interface for presenting 'green corridor' projects,
as part of the corridorsvertsmtl.org project. The interface leverages Mapbox.

Technologies: gulp, browserify, semantic-ui, mapbox-gl

Installation
------------

To install the project:

   npm install
   gulp build

If you don't have gulp installed, then it can be installed via:

   npm install -g gulp
   
Known Limitations
-----------------

Currently there is an open [issue](https://github.com/cvmtl/cvmtl-webui/issues/16)
that prevents the project being built on Ubuntu 16.04.1 LTS and possibly other
versions of Linux. The build process does work on MacOS X, and this is what has
been used for the current deployed version.


