# StreamRecorderCmd

The StreamRecorderCmd project is a cmdline tool. it opens a mpeg-audio stream (url) and writes the stream content to a file for a given duration.

e.g. $ streamrecord —-duration 60 —-file test.mp3 http://internetradio.de/stream

It uses commander to read command line arguments.
