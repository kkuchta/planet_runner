# Planet Runner

<a href="http://kkuchta.github.io/planet_runner">See it live</a>

Just a little toy thing to play with a js physics engine.  The sum total of the features include:

- A Best-Candidate planetary distribution (a little nicer looking than pure random)
- Gravity among fixed planets (moving planets was easier, but not as much fun)
- Press any key to accelerate your ball in its current direction

## Build

I'm using the Gulp js build tool, which is kinda nice.  Both more flexible and more verbose than Grunt- I don't that I'll stay with it in the future; we'll see.  Anyway, if you have Gulp installed, it's something like:

```
gulp && gulp watch
```

to compile the haml/coffeescript to `out/`.

To run it, just open `out/index.html`.

I haven't actually tried these build instructions, so I may be forgetting some steps.  If anyone actually wants to build this, let me know and I'll clean up this documentation.  Since this is just a toy project, though, that seems unlikely.

## Code Layout

Honestly, if you're looking at this repo, you're probably a recruiter or someone skimming through my github profile.  To help you along: the actual meat of this project is `/src/scripts`.  `main.coffee` is the jumping-off point; the best-candidate algorithm is isolated in `distribution.coffee`, and the physics logic is in `planet` and `world`.
