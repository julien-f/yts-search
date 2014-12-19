# yts-search

command line interface to the movies database ```yts```.

## install instructions
```bash
npm install -g yts-search
```

## usage

```bash
  Usage: yts-search [options] [query]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -l, --limit <num>       Max amount of movie results (1-50)
    -p, --page <num>        Page number [1]
    -q, --quality <option>  Quality (720p|1080p|3d|all) [all]
    -r, --rating <num>      Minimum movie rating (1-9)
    -g, --genre <option>    Movie genre (all)
    -s, --sort <option>     Sort by (date|seeds|peers|size|alphabet|rating|downloaded|year) [date]
    -m, --magnet            Displays only the magnet uri
```

### examples

1. checkout the latest available movies
```bash
yts-search
```

2. search movie by name
```bash
yts-search "my favorite movie"
```

3. search movies with rating greater than 7
```bash
yts-search -r 7
```

4. search a specific movie with specific quality
```bash
yts-search "my favorite movie" -q 720p
```

5. search movie by id
```bash
yts-search ID
```

6. search movie and display magnet uri
```bash
yts-search "my favorite movie" -q 720p -m
```

7. yts-search might be used with [download-torrent](https://github.com/esnunes/download-torrent) to download legal content
```bash
yts-search "my favorite public domain movie" -q 1080p -m | download-torrent -i
```
